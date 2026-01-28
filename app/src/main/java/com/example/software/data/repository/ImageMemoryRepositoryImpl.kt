package com.example.software.data.repository

import com.example.software.data.local.dao.ImageMemoryDao
import com.example.software.data.local.entity.ImageMemory
import kotlinx.coroutines.flow.Flow

/**
 * 图像记忆仓库实现
 */
class ImageMemoryRepositoryImpl(
    private val imageMemoryDao: ImageMemoryDao
) : ImageMemoryRepository {
    
    override suspend fun saveMemory(memory: ImageMemory): Long {
        return imageMemoryDao.insert(memory)
    }
    
    override suspend fun updateMemory(memory: ImageMemory) {
        imageMemoryDao.update(memory.copy(updatedAt = System.currentTimeMillis()))
    }
    
    override suspend fun deleteMemory(memory: ImageMemory) {
        imageMemoryDao.delete(memory)
    }
    
    override suspend fun deleteMemoryById(id: Long) {
        imageMemoryDao.deleteById(id)
    }
    
    override suspend fun deleteAllMemories() {
        imageMemoryDao.deleteAll()
    }
    
    override fun getAllMemories(): Flow<List<ImageMemory>> {
        return imageMemoryDao.getAllMemories()
    }
    
    override suspend fun getAllMemoriesOnce(): List<ImageMemory> {
        return imageMemoryDao.getAllMemoriesOnce()
    }
    
    override suspend fun getMemoryById(id: Long): ImageMemory? {
        return imageMemoryDao.getById(id)
    }
    
    override fun getMemoryByIdFlow(id: Long): Flow<ImageMemory?> {
        return imageMemoryDao.getByIdFlow(id)
    }
    
    override fun searchMemories(keyword: String): Flow<List<ImageMemory>> {
        return imageMemoryDao.searchByDescription(keyword)
    }
    
    override suspend fun searchMemoriesOnce(keyword: String): List<ImageMemory> {
        return imageMemoryDao.searchByDescriptionOnce(keyword)
    }
    
    override suspend fun getMemoryCount(): Int {
        return imageMemoryDao.getCount()
    }
    
    override fun getMemoryCountFlow(): Flow<Int> {
        return imageMemoryDao.getCountFlow()
    }
}
