package com.example.software.ui.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.repository.ImageMemoryRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
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
    
    private val _searchQuery = MutableStateFlow("")
    private val _isLoading = MutableStateFlow(true)
    private val _selectedMemory = MutableStateFlow<ImageMemory?>(null)
    private val _showDeleteConfirmation = MutableStateFlow(false)
    private val _memoryToDelete = MutableStateFlow<ImageMemory?>(null)
    private val _errorMessage = MutableStateFlow<String?>(null)
    
    /**
     * UI 状态
     */
    val uiState: StateFlow<HistoryUiState> = combine(
        repository.getAllMemories(),
        _searchQuery,
        _isLoading,
        _selectedMemory,
        _showDeleteConfirmation,
        _memoryToDelete,
        _errorMessage
    ) { values ->
        @Suppress("UNCHECKED_CAST")
        val memories = values[0] as List<ImageMemory>
        val query = values[1] as String
        val isLoading = values[2] as Boolean
        val selected = values[3] as ImageMemory?
        val showDelete = values[4] as Boolean
        val toDelete = values[5] as ImageMemory?
        val error = values[6] as String?
        
        val filteredMemories = if (query.isBlank()) {
            memories
        } else {
            memories.filter { it.description.contains(query, ignoreCase = true) }
        }
        
        HistoryUiState(
            memories = filteredMemories,
            searchQuery = query,
            isLoading = isLoading,
            selectedMemory = selected,
            showDeleteConfirmation = showDelete,
            memoryToDelete = toDelete,
            errorMessage = error
        )
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = HistoryUiState()
    )
    
    init {
        // 标记加载完成
        viewModelScope.launch {
            repository.getAllMemories().collect {
                _isLoading.value = false
            }
        }
    }
    
    /**
     * 更新搜索查询
     */
    fun onSearchQueryChanged(query: String) {
        _searchQuery.value = query
    }
    
    /**
     * 清空搜索
     */
    fun clearSearch() {
        _searchQuery.value = ""
    }
    
    /**
     * 选择记忆查看详情
     */
    fun selectMemory(memory: ImageMemory) {
        _selectedMemory.value = memory
    }
    
    /**
     * 清除选中的记忆
     */
    fun clearSelectedMemory() {
        _selectedMemory.value = null
    }
    
    /**
     * 请求删除记忆（显示确认对话框）
     */
    fun requestDeleteMemory(memory: ImageMemory) {
        _memoryToDelete.value = memory
        _showDeleteConfirmation.value = true
    }
    
    /**
     * 取消删除
     */
    fun cancelDelete() {
        _showDeleteConfirmation.value = false
        _memoryToDelete.value = null
    }
    
    /**
     * 确认删除
     */
    fun confirmDelete() {
        val memory = _memoryToDelete.value ?: return
        viewModelScope.launch {
            try {
                repository.deleteMemory(memory)
                _showDeleteConfirmation.value = false
                _memoryToDelete.value = null
                // 如果删除的是当前选中的记忆，清除选中状态
                if (_selectedMemory.value?.id == memory.id) {
                    _selectedMemory.value = null
                }
            } catch (e: Exception) {
                _errorMessage.value = "删除失败: ${e.message}"
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
                _errorMessage.value = "删除失败: ${e.message}"
            }
        }
    }
    
    /**
     * 清除错误消息
     */
    fun clearError() {
        _errorMessage.value = null
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
