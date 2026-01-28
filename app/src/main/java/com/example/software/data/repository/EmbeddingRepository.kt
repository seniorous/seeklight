package com.example.software.data.repository

import com.example.software.data.local.entity.MemoryEmbedding
import kotlinx.coroutines.flow.Flow

/**
 * 向量存储仓库接口
 */
interface EmbeddingRepository {
    
    /**
     * 保存向量
     */
    suspend fun saveEmbedding(memoryId: Long, embedding: FloatArray, modelVersion: String)
    
    /**
     * 批量保存向量
     */
    suspend fun saveEmbeddings(embeddings: List<Pair<Long, FloatArray>>, modelVersion: String)
    
    /**
     * 获取向量
     */
    suspend fun getEmbedding(memoryId: Long): FloatArray?
    
    /**
     * 获取所有向量（用于搜索）
     */
    suspend fun getAllEmbeddings(): Map<Long, FloatArray>
    
    /**
     * 获取所有向量（Flow，用于实时更新）
     */
    fun getAllEmbeddingsFlow(): Flow<Map<Long, FloatArray>>
    
    /**
     * 删除向量
     */
    suspend fun deleteEmbedding(memoryId: Long)
    
    /**
     * 获取没有向量的记忆 ID
     */
    suspend fun getMemoryIdsWithoutEmbedding(): List<Long>
    
    /**
     * 获取需要更新的记忆 ID（模型版本不匹配）
     */
    suspend fun getMemoryIdsNeedingUpdate(currentModelVersion: String): List<Long>
    
    /**
     * 获取向量数量
     */
    suspend fun getEmbeddingCount(): Int
    
    /**
     * 检查记忆是否有向量
     */
    suspend fun hasEmbedding(memoryId: Long): Boolean
}
