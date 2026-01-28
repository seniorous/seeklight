package com.example.software.ui.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.repository.ImageMemoryRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * 历史记录 UI 状态
 */
data class HistoryUiState(
    val memories: List<ImageMemory> = emptyList(),
    val searchQuery: String = "",
    val isLoading: Boolean = true,
    val selectedMemory: ImageMemory? = null,
    val showDeleteConfirmation: Boolean = false,
    val memoryToDelete: ImageMemory? = null,
    val errorMessage: String? = null
)

/**
 * 历史记录 ViewModel
 */
class HistoryViewModel(
    private val repository: ImageMemoryRepository
) : ViewModel() {
    
    // UI 状态
    private val _uiState = MutableStateFlow(HistoryUiState())
    val uiState: StateFlow<HistoryUiState> = _uiState
    
    // 所有记忆（原始数据）
    private var allMemories: List<ImageMemory> = emptyList()
    
    init {
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
     * 根据搜索词过滤记忆
     */
    private fun updateFilteredMemories() {
        val query = _uiState.value.searchQuery
        val filtered = if (query.isBlank()) {
            allMemories
        } else {
            allMemories.filter { memory ->
                // 搜索描述和标签
                memory.description.contains(query, ignoreCase = true) ||
                memory.tags.any { it.contains(query, ignoreCase = true) }
            }
        }
        _uiState.update { it.copy(memories = filtered) }
    }
    
    /**
     * 更新搜索查询
     */
    fun onSearchQueryChanged(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
        updateFilteredMemories()
    }
    
    /**
     * 清空搜索
     */
    fun clearSearch() {
        _uiState.update { it.copy(searchQuery = "") }
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
                _uiState.update { state ->
                    state.copy(
                        showDeleteConfirmation = false,
                        memoryToDelete = null,
                        // 如果删除的是当前选中的记忆，清除选中状态
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
        private val repository: ImageMemoryRepository
    ) : ViewModelProvider.Factory {
        @Suppress("UNCHECKED_CAST")
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            if (modelClass.isAssignableFrom(HistoryViewModel::class.java)) {
                return HistoryViewModel(repository) as T
            }
            throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
