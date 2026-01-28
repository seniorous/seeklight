package com.example.software.ui.viewmodels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.software.ai.TextEmbeddingBridge
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.repository.EmbeddingRepository
import com.example.software.data.repository.ImageMemoryRepository
import com.example.software.domain.usecase.MatchType
import com.example.software.domain.usecase.SearchMode
import com.example.software.domain.usecase.SearchResult
import com.example.software.domain.usecase.SearchUseCase
import com.example.software.domain.usecase.TimeRange
import com.example.software.util.AppLog
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * 搜索 UI 状态
 */
data class SearchUiState(
    val query: String = "",
    val searchMode: SearchMode = SearchMode.HYBRID,
    val timeRange: TimeRange = TimeRange.All,
    val selectedTags: List<String> = emptyList(),
    val results: List<SearchResult> = emptyList(),
    val isSearching: Boolean = false,
    val isSemanticAvailable: Boolean = false,
    val searchTimeMs: Long = 0,
    val errorMessage: String? = null
)

/**
 * 搜索 ViewModel
 * 
 * 管理搜索状态和执行搜索逻辑
 */
class SearchViewModel(
    application: Application,
    private val memoryRepository: ImageMemoryRepository,
    private val embeddingRepository: EmbeddingRepository
) : AndroidViewModel(application) {
    
    companion object {
        private const val TAG = "SearchViewModel"
        private const val DEBOUNCE_MS = 300L
    }
    
    private val embeddingBridge = TextEmbeddingBridge.getInstance()
    private lateinit var searchUseCase: SearchUseCase
    
    private val _uiState = MutableStateFlow(SearchUiState())
    val uiState: StateFlow<SearchUiState> = _uiState.asStateFlow()
    
    private var searchJob: Job? = null
    private var isInitialized = false
    
    /**
     * 初始化
     */
    fun initialize() {
        if (isInitialized) return
        
        viewModelScope.launch {
            // 初始化 Embedding Bridge
            val context = getApplication<Application>()
            val initialized = embeddingBridge.initialize(context)
            
            _uiState.update { 
                it.copy(isSemanticAvailable = initialized) 
            }
            
            // 创建 SearchUseCase
            searchUseCase = SearchUseCase(
                memoryRepository = memoryRepository,
                embeddingRepository = embeddingRepository,
                embeddingBridge = embeddingBridge
            )
            
            isInitialized = true
            AppLog.i(TAG, "Initialized, semantic search available: $initialized")
        }
    }
    
    /**
     * 更新搜索词（带防抖）
     */
    fun onQueryChanged(query: String) {
        _uiState.update { it.copy(query = query) }
        
        // 取消之前的搜索
        searchJob?.cancel()
        
        if (query.isBlank()) {
            _uiState.update { it.copy(results = emptyList(), isSearching = false) }
            return
        }
        
        // 防抖搜索
        searchJob = viewModelScope.launch {
            delay(DEBOUNCE_MS)
            performSearch()
        }
    }
    
    /**
     * 更新搜索模式
     */
    fun onSearchModeChanged(mode: SearchMode) {
        _uiState.update { it.copy(searchMode = mode) }
        if (_uiState.value.query.isNotBlank()) {
            performSearchNow()
        }
    }
    
    /**
     * 更新时间范围
     */
    fun onTimeRangeChanged(timeRange: TimeRange) {
        _uiState.update { it.copy(timeRange = timeRange) }
        if (_uiState.value.query.isNotBlank()) {
            performSearchNow()
        }
    }
    
    /**
     * 添加标签筛选
     */
    fun addTagFilter(tag: String) {
        val currentTags = _uiState.value.selectedTags
        if (tag !in currentTags) {
            _uiState.update { it.copy(selectedTags = currentTags + tag) }
            if (_uiState.value.query.isNotBlank()) {
                performSearchNow()
            }
        }
    }
    
    /**
     * 移除标签筛选
     */
    fun removeTagFilter(tag: String) {
        _uiState.update { 
            it.copy(selectedTags = it.selectedTags - tag) 
        }
        if (_uiState.value.query.isNotBlank()) {
            performSearchNow()
        }
    }
    
    /**
     * 清除所有筛选
     */
    fun clearFilters() {
        _uiState.update { 
            it.copy(
                timeRange = TimeRange.All,
                selectedTags = emptyList()
            ) 
        }
        if (_uiState.value.query.isNotBlank()) {
            performSearchNow()
        }
    }
    
    /**
     * 立即执行搜索
     */
    fun performSearchNow() {
        searchJob?.cancel()
        searchJob = viewModelScope.launch {
            performSearch()
        }
    }
    
    /**
     * 执行搜索
     */
    private suspend fun performSearch() {
        val state = _uiState.value
        if (state.query.isBlank()) return
        
        _uiState.update { it.copy(isSearching = true) }
        
        val startTime = System.currentTimeMillis()
        
        try {
            val results = searchUseCase.search(
                query = state.query,
                mode = state.searchMode,
                timeRange = state.timeRange,
                tags = state.selectedTags
            )
            
            val elapsed = System.currentTimeMillis() - startTime
            
            _uiState.update { 
                it.copy(
                    results = results,
                    isSearching = false,
                    searchTimeMs = elapsed,
                    errorMessage = null
                ) 
            }
            
            AppLog.d(TAG, "Search completed: ${results.size} results in ${elapsed}ms")
            
        } catch (e: Exception) {
            AppLog.e(TAG, "Search failed: ${e.message}", e)
            _uiState.update { 
                it.copy(
                    isSearching = false,
                    errorMessage = "搜索失败: ${e.message}"
                ) 
            }
        }
    }
    
    /**
     * 清除错误
     */
    fun clearError() {
        _uiState.update { it.copy(errorMessage = null) }
    }
    
    /**
     * 清除搜索
     */
    fun clearSearch() {
        searchJob?.cancel()
        _uiState.update { 
            SearchUiState(isSemanticAvailable = it.isSemanticAvailable) 
        }
    }
}
