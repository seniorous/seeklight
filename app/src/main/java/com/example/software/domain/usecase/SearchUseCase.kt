package com.example.software.domain.usecase

import com.example.software.ai.TextEmbeddingBridge
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.repository.EmbeddingRepository
import com.example.software.data.repository.ImageMemoryRepository
import com.example.software.util.AppLog
import com.example.software.util.VectorUtils

/**
 * 搜索模式
 */
enum class SearchMode {
    KEYWORD,    // 仅关键词搜索
    SEMANTIC,   // 仅语义搜索
    HYBRID      // 混合搜索
}

/**
 * 时间范围筛选
 */
sealed class TimeRange {
    data object All : TimeRange()
    data object Today : TimeRange()
    data object ThisWeek : TimeRange()
    data object ThisMonth : TimeRange()
    data object ThisYear : TimeRange()
    data class Custom(val startMs: Long, val endMs: Long) : TimeRange()
    
    /**
     * 获取时间范围的毫秒表示
     */
    fun toMillisRange(): Pair<Long, Long>? {
        val now = System.currentTimeMillis()
        val dayMs = 24 * 60 * 60 * 1000L
        
        return when (this) {
            is All -> null
            is Today -> {
                val startOfDay = now - (now % dayMs)
                startOfDay to now
            }
            is ThisWeek -> {
                val calendar = java.util.Calendar.getInstance()
                calendar.set(java.util.Calendar.DAY_OF_WEEK, calendar.firstDayOfWeek)
                calendar.set(java.util.Calendar.HOUR_OF_DAY, 0)
                calendar.set(java.util.Calendar.MINUTE, 0)
                calendar.set(java.util.Calendar.SECOND, 0)
                calendar.set(java.util.Calendar.MILLISECOND, 0)
                calendar.timeInMillis to now
            }
            is ThisMonth -> {
                val calendar = java.util.Calendar.getInstance()
                calendar.set(java.util.Calendar.DAY_OF_MONTH, 1)
                calendar.set(java.util.Calendar.HOUR_OF_DAY, 0)
                calendar.set(java.util.Calendar.MINUTE, 0)
                calendar.set(java.util.Calendar.SECOND, 0)
                calendar.set(java.util.Calendar.MILLISECOND, 0)
                calendar.timeInMillis to now
            }
            is ThisYear -> {
                val calendar = java.util.Calendar.getInstance()
                calendar.set(java.util.Calendar.DAY_OF_YEAR, 1)
                calendar.set(java.util.Calendar.HOUR_OF_DAY, 0)
                calendar.set(java.util.Calendar.MINUTE, 0)
                calendar.set(java.util.Calendar.SECOND, 0)
                calendar.set(java.util.Calendar.MILLISECOND, 0)
                calendar.timeInMillis to now
            }
            is Custom -> startMs to endMs
        }
    }
    
    fun displayName(): String = when (this) {
        is All -> "全部"
        is Today -> "今天"
        is ThisWeek -> "本周"
        is ThisMonth -> "本月"
        is ThisYear -> "今年"
        is Custom -> "自定义"
    }
}

/**
 * 搜索结果
 */
data class SearchResult(
    val memory: ImageMemory,
    val score: Float,
    val matchType: MatchType
)

enum class MatchType {
    KEYWORD,    // 关键词匹配
    SEMANTIC,   // 语义匹配
    BOTH        // 两者都匹配
}

/**
 * 搜索用例
 * 
 * 提供关键词搜索、语义搜索和混合搜索能力。
 */
class SearchUseCase(
    private val memoryRepository: ImageMemoryRepository,
    private val embeddingRepository: EmbeddingRepository,
    private val embeddingBridge: TextEmbeddingBridge
) {
    companion object {
        private const val TAG = "SearchUseCase"
        private const val DEFAULT_TOP_K = 50
        private const val SEMANTIC_THRESHOLD = 0.3f  // 语义相似度阈值
    }
    
    /**
     * 执行搜索
     * 
     * @param query 搜索词
     * @param mode 搜索模式
     * @param timeRange 时间范围
     * @param tags 标签筛选
     * @param alpha 混合搜索中关键词权重 (0-1)
     * @param topK 返回结果数量
     */
    suspend fun search(
        query: String,
        mode: SearchMode = SearchMode.HYBRID,
        timeRange: TimeRange = TimeRange.All,
        tags: List<String> = emptyList(),
        alpha: Float = 0.3f,
        topK: Int = DEFAULT_TOP_K
    ): List<SearchResult> {
        val startTime = System.currentTimeMillis()
        
        if (query.isBlank() && tags.isEmpty()) {
            // 无搜索条件，返回按时间筛选的结果
            return getAllMemories(timeRange).map { 
                SearchResult(it, 1f, MatchType.KEYWORD) 
            }
        }
        
        val results = when (mode) {
            SearchMode.KEYWORD -> keywordSearch(query, timeRange, tags)
            SearchMode.SEMANTIC -> semanticSearch(query, timeRange, tags, topK)
            SearchMode.HYBRID -> hybridSearch(query, timeRange, tags, alpha, topK)
        }
        
        val elapsed = System.currentTimeMillis() - startTime
        AppLog.d(TAG, "Search completed: query='$query', mode=$mode, results=${results.size}, time=${elapsed}ms")
        
        return results
    }
    
    /**
     * 关键词搜索
     */
    private suspend fun keywordSearch(
        query: String,
        timeRange: TimeRange,
        tags: List<String>
    ): List<SearchResult> {
        val allMemories = getAllMemories(timeRange)
        
        // 筛选标签
        val tagFiltered = if (tags.isNotEmpty()) {
            allMemories.filter { memory ->
                tags.any { tag -> memory.tags.contains(tag) }
            }
        } else {
            allMemories
        }
        
        if (query.isBlank()) {
            return tagFiltered.map { SearchResult(it, 1f, MatchType.KEYWORD) }
        }
        
        // 关键词匹配
        return tagFiltered.mapNotNull { memory ->
            val descriptionMatch = memory.description.contains(query, ignoreCase = true)
            val tagMatch = memory.tags.any { it.contains(query, ignoreCase = true) }
            
            if (descriptionMatch || tagMatch) {
                // 简单评分：完全匹配 > 部分匹配
                val score = when {
                    memory.description.equals(query, ignoreCase = true) -> 1.0f
                    memory.tags.any { it.equals(query, ignoreCase = true) } -> 0.9f
                    descriptionMatch && tagMatch -> 0.8f
                    descriptionMatch -> 0.7f
                    else -> 0.6f
                }
                SearchResult(memory, score, MatchType.KEYWORD)
            } else {
                null
            }
        }.sortedByDescending { it.score }
    }
    
    /**
     * 语义搜索
     */
    private suspend fun semanticSearch(
        query: String,
        timeRange: TimeRange,
        tags: List<String>,
        topK: Int
    ): List<SearchResult> {
        if (query.isBlank()) {
            return emptyList()
        }
        
        // 生成查询向量
        val queryEmbedding = embeddingBridge.generateEmbedding(query)
        if (queryEmbedding == null) {
            AppLog.w(TAG, "Failed to generate query embedding")
            return keywordSearch(query, timeRange, tags)  // 降级到关键词搜索
        }
        
        // 获取所有向量
        val allEmbeddings = embeddingRepository.getAllEmbeddings()
        if (allEmbeddings.isEmpty()) {
            AppLog.w(TAG, "No embeddings available, fallback to keyword search")
            return keywordSearch(query, timeRange, tags)
        }
        
        // 获取时间筛选后的记忆
        val allMemories = getAllMemories(timeRange)
        val memoryMap = allMemories.associateBy { it.id }
        
        // 标签筛选
        val validIds = if (tags.isNotEmpty()) {
            allMemories.filter { memory ->
                tags.any { tag -> memory.tags.contains(tag) }
            }.map { it.id }.toSet()
        } else {
            allMemories.map { it.id }.toSet()
        }
        
        // 筛选有效的向量
        val filteredEmbeddings = allEmbeddings.filterKeys { it in validIds }
        
        // 计算相似度
        val similarities = VectorUtils.batchCosineSimilarity(queryEmbedding, filteredEmbeddings, topK)
        
        return similarities
            .filter { it.second >= SEMANTIC_THRESHOLD }
            .mapNotNull { (memoryId, score) ->
                memoryMap[memoryId]?.let { memory ->
                    SearchResult(memory, score, MatchType.SEMANTIC)
                }
            }
    }
    
    /**
     * 混合搜索
     */
    private suspend fun hybridSearch(
        query: String,
        timeRange: TimeRange,
        tags: List<String>,
        alpha: Float,
        topK: Int
    ): List<SearchResult> {
        // 并行执行关键词和语义搜索
        val keywordResults = keywordSearch(query, timeRange, tags)
        val semanticResults = semanticSearch(query, timeRange, tags, topK)
        
        // 合并结果
        val scoreMap = mutableMapOf<Long, Pair<Float, Float>>()  // memoryId -> (keywordScore, semanticScore)
        
        keywordResults.forEach { result ->
            val current = scoreMap[result.memory.id] ?: (0f to 0f)
            scoreMap[result.memory.id] = result.score to current.second
        }
        
        semanticResults.forEach { result ->
            val current = scoreMap[result.memory.id] ?: (0f to 0f)
            scoreMap[result.memory.id] = current.first to result.score
        }
        
        // 获取所有记忆
        val allMemories = getAllMemories(timeRange)
        val memoryMap = allMemories.associateBy { it.id }
        
        // 计算融合分数
        return scoreMap.mapNotNull { (memoryId, scores) ->
            memoryMap[memoryId]?.let { memory ->
                val (keywordScore, semanticScore) = scores
                val fusedScore = alpha * keywordScore + (1 - alpha) * semanticScore
                val matchType = when {
                    keywordScore > 0 && semanticScore > 0 -> MatchType.BOTH
                    keywordScore > 0 -> MatchType.KEYWORD
                    else -> MatchType.SEMANTIC
                }
                SearchResult(memory, fusedScore, matchType)
            }
        }.sortedByDescending { it.score }.take(topK)
    }
    
    /**
     * 获取所有记忆（按时间筛选）
     */
    private suspend fun getAllMemories(timeRange: TimeRange): List<ImageMemory> {
        val allMemories = memoryRepository.getAllMemoriesOnce()
        
        val range = timeRange.toMillisRange() ?: return allMemories
        
        return allMemories.filter { memory ->
            memory.createdAt in range.first..range.second
        }
    }
    
    /**
     * 检查语义搜索是否可用
     */
    fun isSemanticSearchAvailable(): Boolean {
        return embeddingBridge.isInitialized()
    }
}
