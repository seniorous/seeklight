package com.example.software.data.local.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.software.data.local.entity.MemoryEmbedding
import kotlinx.coroutines.flow.Flow

/**
 * 记忆向量数据访问对象
 */
@Dao
interface MemoryEmbeddingDao {
    
    /**
     * 插入或更新向量
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(embedding: MemoryEmbedding)
    
    /**
     * 批量插入向量
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(embeddings: List<MemoryEmbedding>)
    
    /**
     * 根据记忆 ID 获取向量
     */
    @Query("SELECT * FROM memory_embeddings WHERE memoryId = :memoryId")
    suspend fun getByMemoryId(memoryId: Long): MemoryEmbedding?
    
    /**
     * 获取所有向量
     */
    @Query("SELECT * FROM memory_embeddings")
    suspend fun getAll(): List<MemoryEmbedding>
    
    /**
     * 获取所有向量（Flow）
     */
    @Query("SELECT * FROM memory_embeddings")
    fun getAllFlow(): Flow<List<MemoryEmbedding>>
    
    /**
     * 获取指定模型版本的向量数量
     */
    @Query("SELECT COUNT(*) FROM memory_embeddings WHERE modelVersion = :modelVersion")
    suspend fun countByModelVersion(modelVersion: String): Int
    
    /**
     * 获取所有向量数量
     */
    @Query("SELECT COUNT(*) FROM memory_embeddings")
    suspend fun count(): Int
    
    /**
     * 删除指定记忆的向量
     */
    @Query("DELETE FROM memory_embeddings WHERE memoryId = :memoryId")
    suspend fun deleteByMemoryId(memoryId: Long)
    
    /**
     * 删除所有向量
     */
    @Query("DELETE FROM memory_embeddings")
    suspend fun deleteAll()
    
    /**
     * 获取没有向量的记忆 ID 列表
     * 
     * 用于增量生成向量
     */
    @Query("""
        SELECT m.id FROM image_memories m 
        LEFT JOIN memory_embeddings e ON m.id = e.memoryId 
        WHERE e.memoryId IS NULL
    """)
    suspend fun getMemoryIdsWithoutEmbedding(): List<Long>
    
    /**
     * 获取需要更新向量的记忆 ID 列表（模型版本不匹配）
     */
    @Query("""
        SELECT memoryId FROM memory_embeddings 
        WHERE modelVersion != :currentModelVersion
    """)
    suspend fun getMemoryIdsWithOutdatedEmbedding(currentModelVersion: String): List<Long>
    
    /**
     * 检查记忆是否有向量
     */
    @Query("SELECT EXISTS(SELECT 1 FROM memory_embeddings WHERE memoryId = :memoryId)")
    suspend fun hasEmbedding(memoryId: Long): Boolean
}
