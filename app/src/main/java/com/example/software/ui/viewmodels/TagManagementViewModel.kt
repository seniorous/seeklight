package com.example.software.ui.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.repository.ImageMemoryRepository
import com.example.software.util.AppLog
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * 标签分类
 */
enum class TagCategory(val displayName: String, val keywords: List<String>) {
    PERSON("人物", listOf("人", "女", "男", "孩子", "朋友", "家人", "同事", "老人", "宝宝", "情侣")),
    PLACE("地点", listOf("山", "海", "城市", "公园", "餐厅", "家", "学校", "办公", "商场", "街道", "车站", "机场")),
    OBJECT("物品", listOf("车", "花", "书", "手机", "食物", "衣服", "包", "鞋", "电脑", "杯子", "碗", "盘")),
    ACTIVITY("活动", listOf("旅行", "聚会", "运动", "工作", "学习", "吃饭", "购物", "散步", "游泳", "跑步")),
    EMOTION("情绪", listOf("开心", "快乐", "美好", "温馨", "感动", "幸福", "浪漫", "有趣")),
    OTHER("其他", emptyList());
    
    companion object {
        fun classify(tag: String): TagCategory {
            for (category in entries) {
                if (category.keywords.any { keyword -> tag.contains(keyword) }) {
                    return category
                }
            }
            return OTHER
        }
    }
}

/**
 * 标签信息
 */
data class TagInfo(
    val name: String,
    val count: Int,
    val category: TagCategory
)

/**
 * 标签管理 UI 状态
 */
data class TagManagementUiState(
    val allTags: List<TagInfo> = emptyList(),
    val tagsByCategory: Map<TagCategory, List<TagInfo>> = emptyMap(),
    val searchQuery: String = "",
    val totalTagCount: Int = 0,
    val isLoading: Boolean = true,
    val errorMessage: String? = null
)

/**
 * 标签管理 ViewModel
 */
class TagManagementViewModel(
    private val repository: ImageMemoryRepository
) : ViewModel() {
    
    companion object {
        private const val TAG = "TagManagementVM"
    }
    
    private val _uiState = MutableStateFlow(TagManagementUiState())
    val uiState: StateFlow<TagManagementUiState> = _uiState.asStateFlow()
    
    private var allMemories: List<ImageMemory> = emptyList()
    
    init {
        loadTags()
    }
    
    /**
     * 加载标签
     */
    private fun loadTags() {
        viewModelScope.launch {
            repository.getAllMemories().collect { memories ->
                allMemories = memories
                updateTagStats()
                _uiState.update { it.copy(isLoading = false) }
            }
        }
    }
    
    /**
     * 更新标签统计
     */
    private fun updateTagStats() {
        // 统计所有标签及其使用次数
        val tagCountMap = mutableMapOf<String, Int>()
        allMemories.forEach { memory ->
            memory.tags.forEach { tag ->
                tagCountMap[tag] = (tagCountMap[tag] ?: 0) + 1
            }
        }
        
        // 创建 TagInfo 列表
        val allTags = tagCountMap.map { (name, count) ->
            TagInfo(
                name = name,
                count = count,
                category = TagCategory.classify(name)
            )
        }.sortedByDescending { it.count }
        
        // 按分类分组
        val tagsByCategory = allTags.groupBy { it.category }
            .mapValues { (_, tags) -> tags.sortedByDescending { it.count } }
        
        _uiState.update { 
            it.copy(
                allTags = allTags,
                tagsByCategory = tagsByCategory,
                totalTagCount = allTags.size
            )
        }
        
        AppLog.d(TAG, "Tags updated: ${allTags.size} tags from ${allMemories.size} memories")
    }
    
    /**
     * 搜索标签
     */
    fun onSearchQueryChanged(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
    }
    
    /**
     * 删除标签（从所有记忆中移除）
     */
    fun deleteTag(tagName: String) {
        viewModelScope.launch {
            try {
                // 找到所有包含该标签的记忆
                val memoriesToUpdate = allMemories.filter { it.tags.contains(tagName) }
                
                // 逐个更新记忆，移除该标签
                memoriesToUpdate.forEach { memory ->
                    val updatedTags = memory.tags - tagName
                    val updatedMemory = memory.copy(
                        tags = updatedTags,
                        tagsString = updatedTags.joinToString(","),
                        updatedAt = System.currentTimeMillis()
                    )
                    repository.updateMemory(updatedMemory)
                }
                
                AppLog.i(TAG, "Deleted tag '$tagName' from ${memoriesToUpdate.size} memories")
                
            } catch (e: Exception) {
                AppLog.e(TAG, "Failed to delete tag: ${e.message}", e)
                _uiState.update { it.copy(errorMessage = "删除标签失败: ${e.message}") }
            }
        }
    }
    
    /**
     * 重命名标签
     */
    fun renameTag(oldName: String, newName: String) {
        if (newName.isBlank() || oldName == newName) return
        
        viewModelScope.launch {
            try {
                val memoriesToUpdate = allMemories.filter { it.tags.contains(oldName) }
                
                memoriesToUpdate.forEach { memory ->
                    val updatedTags = memory.tags.map { if (it == oldName) newName else it }
                    val updatedMemory = memory.copy(
                        tags = updatedTags,
                        tagsString = updatedTags.joinToString(","),
                        updatedAt = System.currentTimeMillis()
                    )
                    repository.updateMemory(updatedMemory)
                }
                
                AppLog.i(TAG, "Renamed tag '$oldName' to '$newName' in ${memoriesToUpdate.size} memories")
                
            } catch (e: Exception) {
                AppLog.e(TAG, "Failed to rename tag: ${e.message}", e)
                _uiState.update { it.copy(errorMessage = "重命名标签失败: ${e.message}") }
            }
        }
    }
    
    /**
     * 合并标签
     */
    fun mergeTags(sourceTag: String, targetTag: String) {
        if (sourceTag == targetTag) return
        
        viewModelScope.launch {
            try {
                val memoriesToUpdate = allMemories.filter { it.tags.contains(sourceTag) }
                
                memoriesToUpdate.forEach { memory ->
                    val updatedTags = memory.tags
                        .map { if (it == sourceTag) targetTag else it }
                        .distinct()
                    val updatedMemory = memory.copy(
                        tags = updatedTags,
                        tagsString = updatedTags.joinToString(","),
                        updatedAt = System.currentTimeMillis()
                    )
                    repository.updateMemory(updatedMemory)
                }
                
                AppLog.i(TAG, "Merged tag '$sourceTag' into '$targetTag' in ${memoriesToUpdate.size} memories")
                
            } catch (e: Exception) {
                AppLog.e(TAG, "Failed to merge tags: ${e.message}", e)
                _uiState.update { it.copy(errorMessage = "合并标签失败: ${e.message}") }
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
     * ViewModel 工厂
     */
    class Factory(
        private val repository: ImageMemoryRepository
    ) : ViewModelProvider.Factory {
        @Suppress("UNCHECKED_CAST")
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            if (modelClass.isAssignableFrom(TagManagementViewModel::class.java)) {
                return TagManagementViewModel(repository) as T
            }
            throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
