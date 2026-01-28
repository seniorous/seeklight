package com.example.software.ui.viewmodels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.software.ai.TextEmbeddingBridge
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.repository.EmbeddingRepository
import com.example.software.data.repository.ImageMemoryRepository
import com.example.software.domain.usecase.SearchMode
import com.example.software.domain.usecase.SearchResult
import com.example.software.domain.usecase.SearchUseCase
import com.example.software.domain.usecase.TimeRange
import com.example.software.util.AppLog
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * 历史记录 UI 状态
 */
data class HistoryUiState(
    val memories: List<ImageMemory> = emptyList(),
    val searchQuery: String = "",
    val searchMode: SearchMode = SearchMode.HYBRID,
    val timeRange: TimeRange = TimeRange.All,
    val selectedTag: String? = null,
    val isLoading: Boolean = true,
    val isSearching: Boolean = false,
    val isSemanticAvailable: Boolean = false,
    val selectedMemory: ImageMemory? = null,
    val showDeleteConfirmation: Boolean = false,
    val memoryToDelete: ImageMemory? = null,
    val showTimeFilter: Boolean = false,
    val searchTimeMs: Long = 0,
    val errorMessage: String? = null
)

/**
 * 历史记录 ViewModel
 * 
 * 支持关键词搜索、语义搜索和混合搜索
 */
class HistoryViewModel(
    application: Application,
    private val repository: ImageMemoryRepository,
    private val embeddingRepository: EmbeddingRepository?
) : AndroidViewModel(application) {
    
    companion object {
        private const val TAG = "HistoryViewModel"
        private const val SEARCH_DEBOUNCE_MS = 300L
    }
    
    // UI 状态
    private val _uiState = MutableStateFlow(HistoryUiState())
    val uiState: StateFlow<HistoryUiState> = _uiState
    
    // 所有记忆（原始数据）
    private var allMemories: List<ImageMemory> = emptyList()
    
    // 搜索相关
    private val embeddingBridge = TextEmbeddingBridge.getInstance()
    private var searchUseCase: SearchUseCase? = null
    private var searchJob: Job? = null
    
    init {
        // 初始化语义搜索
        initializeSemanticSearch()
        
        // 监听数据库变化
        viewModelScope.launch {
            repository.getAllMemories().collect { memories ->
                allMemories = memories
                updateFilteredMemories()
                _uiState.update { it.copy(isLoading = false) }
            }
        }
    }
    
    /**
     * 初始化语义搜索
     */
    private fun initializeSemanticSearch() {
        viewModelScope.launch {
            try {
                val context = getApplication<Application>()
                val initialized = embeddingBridge.initialize(context)
                
                if (initialized && embeddingRepository != null) {
                    searchUseCase = SearchUseCase(
                        memoryRepository = repository,
                        embeddingRepository = embeddingRepository,
                        embeddingBridge = embeddingBridge
                    )
                    _uiState.update { it.copy(isSemanticAvailable = true) }
                    AppLog.i(TAG, "Semantic search initialized successfully")
                } else {
                    AppLog.w(TAG, "Semantic search not available: initialized=$initialized, repo=${embeddingRepository != null}")
                }
            } catch (e: Exception) {
                AppLog.e(TAG, "Failed to initialize semantic search: ${e.message}", e)
            }
        }
    }
    
    /**
     * 根据搜索词、时间范围和标签过滤记忆
     */
    private fun updateFilteredMemories() {
        val query = _uiState.value.searchQuery
        val timeRange = _uiState.value.timeRange
        val selectedTag = _uiState.value.selectedTag
        val searchMode = _uiState.value.searchMode
        
        // 如果有搜索词且语义搜索可用，使用 SearchUseCase
        if (query.isNotBlank() && searchUseCase != null && _uiState.value.isSemanticAvailable) {
            performSemanticSearch(query, timeRange, selectedTag, searchMode)
            return
        }
        
        // 否则使用简单的本地过滤
        var filtered = allMemories
        
        // 时间筛选
        val range = timeRange.toMillisRange()
        if (range != null) {
            filtered = filtered.filter { memory ->
                memory.createdAt in range.first..range.second
            }
        }
        
        // 标签筛选
        if (selectedTag != null) {
            filtered = filtered.filter { memory ->
                memory.tags.contains(selectedTag)
            }
        }
        
        // 关键词筛选（降级模式）
        if (query.isNotBlank()) {
            filtered = filtered.filter { memory ->
                memory.description.contains(query, ignoreCase = true) ||
                memory.tags.any { it.contains(query, ignoreCase = true) }
            }
        }
        
        _uiState.update { it.copy(memories = filtered, isSearching = false) }
    }
    
    /**
     * 执行语义搜索
     */
    private fun performSemanticSearch(
        query: String,
        timeRange: TimeRange,
        selectedTag: String?,
        searchMode: SearchMode
    ) {
        searchJob?.cancel()
        searchJob = viewModelScope.launch {
            _uiState.update { it.copy(isSearching = true) }
            
            val startTime = System.currentTimeMillis()
            
            try {
                val tags = if (selectedTag != null) listOf(selectedTag) else emptyList()
                val results = searchUseCase!!.search(
                    query = query,
                    mode = searchMode,
                    timeRange = timeRange,
                    tags = tags
                )
                
                val elapsed = System.currentTimeMillis() - startTime
                val memories = results.map { it.memory }
                
                _uiState.update { 
                    it.copy(
                        memories = memories,
                        isSearching = false,
                        searchTimeMs = elapsed
                    )
                }
                
                AppLog.d(TAG, "Semantic search: '$query' found ${results.size} results in ${elapsed}ms")
                
            } catch (e: Exception) {
                AppLog.e(TAG, "Search failed: ${e.message}", e)
                // 降级到简单搜索
                val filtered = allMemories.filter { memory ->
                    memory.description.contains(query, ignoreCase = true) ||
                    memory.tags.any { it.contains(query, ignoreCase = true) }
                }
                _uiState.update { 
                    it.copy(
                        memories = filtered,
                        isSearching = false,
                        errorMessage = "语义搜索失败，已降级到关键词搜索"
                    )
                }
            }
        }
    }
    
    /**
     * 更新搜索查询（带防抖）
     */
    fun onSearchQueryChanged(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
        
        // 取消之前的搜索
        searchJob?.cancel()
        
        if (query.isBlank()) {
            updateFilteredMemories()
            return
        }
        
        // 防抖搜索
        searchJob = viewModelScope.launch {
            delay(SEARCH_DEBOUNCE_MS)
            updateFilteredMemories()
        }
    }
    
    /**
     * 更新搜索模式
     */
    fun onSearchModeChanged(mode: SearchMode) {
        _uiState.update { it.copy(searchMode = mode) }
        if (_uiState.value.searchQuery.isNotBlank()) {
            updateFilteredMemories()
        }
    }
    
    /**
     * 清空搜索
     */
    fun clearSearch() {
        searchJob?.cancel()
        _uiState.update { it.copy(searchQuery = "", isSearching = false) }
        updateFilteredMemories()
    }
    
    /**
     * 更新时间范围筛选
     */
    fun onTimeRangeChanged(timeRange: TimeRange) {
        _uiState.update { it.copy(timeRange = timeRange) }
        updateFilteredMemories()
    }
    
    /**
     * 清除时间筛选
     */
    fun clearTimeFilter() {
        _uiState.update { it.copy(timeRange = TimeRange.All) }
        updateFilteredMemories()
    }
    
    /**
     * 显示/隐藏时间筛选面板
     */
    fun toggleTimeFilter(show: Boolean) {
        _uiState.update { it.copy(showTimeFilter = show) }
    }
    
    /**
     * 选择标签筛选
     */
    fun selectTag(tag: String?) {
        _uiState.update { it.copy(selectedTag = tag) }
        updateFilteredMemories()
    }
    
    /**
     * 清除标签筛选
     */
    fun clearTagFilter() {
        _uiState.update { it.copy(selectedTag = null) }
        updateFilteredMemories()
    }
    
    /**
     * 清除所有筛选
     */
    fun clearAllFilters() {
        searchJob?.cancel()
        _uiState.update { 
            it.copy(
                searchQuery = "",
                timeRange = TimeRange.All,
                selectedTag = null,
                isSearching = false
            )
        }
        updateFilteredMemories()
    }
    
    /**
     * 选择记忆查看详情
     */
    fun selectMemory(memory: ImageMemory) {
        _uiState.update { it.copy(selectedMemory = memory) }
    }
    
    /**
     * 清除选中的记忆
     */
    fun clearSelectedMemory() {
        _uiState.update { it.copy(selectedMemory = null) }
    }
    
    /**
     * 请求删除记忆（显示确认对话框）
     */
    fun requestDeleteMemory(memory: ImageMemory) {
        _uiState.update { 
            it.copy(memoryToDelete = memory, showDeleteConfirmation = true) 
        }
    }
    
    /**
     * 取消删除
     */
    fun cancelDelete() {
        _uiState.update { 
            it.copy(showDeleteConfirmation = false, memoryToDelete = null) 
        }
    }
    
    /**
     * 确认删除
     */
    fun confirmDelete() {
        val memory = _uiState.value.memoryToDelete ?: return
        viewModelScope.launch {
            try {
                repository.deleteMemory(memory)
                // 同时删除向量
                embeddingRepository?.deleteEmbedding(memory.id)
                
                _uiState.update { state ->
                    state.copy(
                        showDeleteConfirmation = false,
                        memoryToDelete = null,
                        selectedMemory = if (state.selectedMemory?.id == memory.id) null else state.selectedMemory
                    )
                }
            } catch (e: Exception) {
                _uiState.update { it.copy(errorMessage = "删除失败: ${e.message}") }
            }
        }
    }
    
    /**
     * 删除所有记忆
     */
    fun deleteAllMemories() {
        viewModelScope.launch {
            try {
                repository.deleteAllMemories()
            } catch (e: Exception) {
                _uiState.update { it.copy(errorMessage = "删除失败: ${e.message}") }
            }
        }
    }
    
    /**
     * 清除错误消息
     */
    fun clearError() {
        _uiState.update { it.copy(errorMessage = null) }
    }
    
    /**
     * ViewModel 工厂
     */
    class Factory(
        private val application: Application,
        private val repository: ImageMemoryRepository,
        private val embeddingRepository: EmbeddingRepository?
    ) : ViewModelProvider.Factory {
        @Suppress("UNCHECKED_CAST")
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            if (modelClass.isAssignableFrom(HistoryViewModel::class.java)) {
                return HistoryViewModel(application, repository, embeddingRepository) as T
            }
            throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
