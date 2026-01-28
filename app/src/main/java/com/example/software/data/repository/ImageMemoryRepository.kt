package com.example.software.data.repository

import com.example.software.data.local.entity.ImageMemory
import kotlinx.coroutines.flow.Flow

/**
 * 图像记忆仓库接口
 */
interface ImageMemoryRepository {
    
    /**
     * 保存记忆
     * @return 新记录的 ID
     */
    suspend fun saveMemory(memory: ImageMemory): Long
    
    /**
     * 更新记忆
     */
    suspend fun updateMemory(memory: ImageMemory)
    
    /**
     * 删除记忆
     */
    suspend fun deleteMemory(memory: ImageMemory)
    
    /**
     * 根据 ID 删除记忆
     */
    suspend fun deleteMemoryById(id: Long)
    
    /**
     * 删除所有记忆
     */
    suspend fun deleteAllMemories()
    
    /**
     * 获取所有记忆（实时观察）
     */
    fun getAllMemories(): Flow<List<ImageMemory>>
    
    /**
     * 获取所有记忆（一次性）
     */
    suspend fun getAllMemoriesOnce(): List<ImageMemory>
    
    /**
     * 根据 ID 获取记忆
     */
    suspend fun getMemoryById(id: Long): ImageMemory?
    
    /**
     * 根据 ID 获取记忆（实时观察）
     */
    fun getMemoryByIdFlow(id: Long): Flow<ImageMemory?>
    
    /**
     * 搜索记忆
     */
    fun searchMemories(keyword: String): Flow<List<ImageMemory>>
    
    /**
     * 搜索记忆（一次性）
     */
    suspend fun searchMemoriesOnce(keyword: String): List<ImageMemory>
    
    /**
     * 获取记忆总数
     */
    suspend fun getMemoryCount(): Int
    
    /**
     * 获取记忆总数（实时观察）
     */
    fun getMemoryCountFlow(): Flow<Int>
}
