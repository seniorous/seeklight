package com.example.software.data.repository

import com.example.software.data.local.dao.MemoryEmbeddingDao
import com.example.software.data.local.entity.MemoryEmbedding
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import java.util.concurrent.ConcurrentHashMap

/**
 * 向量存储仓库实现
 * 
 * 包含内存缓存以优化搜索性能
 */
class EmbeddingRepositoryImpl(
    private val embeddingDao: MemoryEmbeddingDao
) : EmbeddingRepository {
    
    // 内存缓存
    private val cache = ConcurrentHashMap<Long, FloatArray>()
    private val cacheMutex = Mutex()
    private var cacheInitialized = false
    
    /**
     * 保存向量
     */
    override suspend fun saveEmbedding(memoryId: Long, embedding: FloatArray, modelVersion: String) {
        val entity = MemoryEmbedding(
            memoryId = memoryId,
            embedding = MemoryEmbedding.floatArrayToByteArray(embedding),
            modelVersion = modelVersion
        )
        embeddingDao.insertOrUpdate(entity)
        
        // 更新缓存
        cache[memoryId] = embedding
    }
    
    /**
     * 批量保存向量
     */
    override suspend fun saveEmbeddings(embeddings: List<Pair<Long, FloatArray>>, modelVersion: String) {
        val entities = embeddings.map { (memoryId, embedding) ->
            MemoryEmbedding(
                memoryId = memoryId,
                embedding = MemoryEmbedding.floatArrayToByteArray(embedding),
                modelVersion = modelVersion
            )
        }
        embeddingDao.insertAll(entities)
        
        // 更新缓存
        embeddings.forEach { (memoryId, embedding) ->
            cache[memoryId] = embedding
        }
    }
    
    /**
     * 获取向量
     */
    override suspend fun getEmbedding(memoryId: Long): FloatArray? {
        // 先检查缓存
        cache[memoryId]?.let { return it }
        
        // 从数据库加载
        val entity = embeddingDao.getByMemoryId(memoryId)
        return entity?.getEmbeddingVector()?.also { embedding ->
            cache[memoryId] = embedding
        }
    }
    
    /**
     * 获取所有向量（用于搜索）
     */
    override suspend fun getAllEmbeddings(): Map<Long, FloatArray> {
        cacheMutex.withLock {
            if (!cacheInitialized) {
                loadAllToCache()
                cacheInitialized = true
            }
        }
        return cache.toMap()
    }
    
    /**
     * 获取所有向量（Flow）
     */
    override fun getAllEmbeddingsFlow(): Flow<Map<Long, FloatArray>> {
        return embeddingDao.getAllFlow().map { entities ->
            entities.associate { it.memoryId to it.getEmbeddingVector() }
        }
    }
    
    /**
     * 删除向量
     */
    override suspend fun deleteEmbedding(memoryId: Long) {
        embeddingDao.deleteByMemoryId(memoryId)
        cache.remove(memoryId)
    }
    
    /**
     * 获取没有向量的记忆 ID
     */
    override suspend fun getMemoryIdsWithoutEmbedding(): List<Long> {
        return embeddingDao.getMemoryIdsWithoutEmbedding()
    }
    
    /**
     * 获取需要更新的记忆 ID
     */
    override suspend fun getMemoryIdsNeedingUpdate(currentModelVersion: String): List<Long> {
        return embeddingDao.getMemoryIdsWithOutdatedEmbedding(currentModelVersion)
    }
    
    /**
     * 获取向量数量
     */
    override suspend fun getEmbeddingCount(): Int {
        return embeddingDao.count()
    }
    
    /**
     * 检查记忆是否有向量
     */
    override suspend fun hasEmbedding(memoryId: Long): Boolean {
        // 先检查缓存
        if (cache.containsKey(memoryId)) return true
        
        // 检查数据库
        return embeddingDao.hasEmbedding(memoryId)
    }
    
    /**
     * 加载所有向量到缓存
     */
    private suspend fun loadAllToCache() {
        val entities = embeddingDao.getAll()
        cache.clear()
        entities.forEach { entity ->
            cache[entity.memoryId] = entity.getEmbeddingVector()
        }
    }
    
    /**
     * 清除缓存（用于测试）
     */
    fun clearCache() {
        cache.clear()
        cacheInitialized = false
    }
}
