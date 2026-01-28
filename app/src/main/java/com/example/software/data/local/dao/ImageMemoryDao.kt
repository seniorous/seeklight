package com.example.software.data.local.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.example.software.data.local.entity.ImageMemory
import kotlinx.coroutines.flow.Flow

/**
 * 图像记忆数据访问对象
 */
@Dao
interface ImageMemoryDao {
    
    /**
     * 插入新记忆
     * @return 新插入记录的 ID
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(memory: ImageMemory): Long
    
    /**
     * 批量插入记忆
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(memories: List<ImageMemory>): List<Long>
    
    /**
     * 更新记忆
     */
    @Update
    suspend fun update(memory: ImageMemory)
    
    /**
     * 删除记忆
     */
    @Delete
    suspend fun delete(memory: ImageMemory)
    
    /**
     * 根据 ID 删除记忆
     */
    @Query("DELETE FROM image_memories WHERE id = :id")
    suspend fun deleteById(id: Long)
    
    /**
     * 删除所有记忆
     */
    @Query("DELETE FROM image_memories")
    suspend fun deleteAll()
    
    /**
     * 获取所有记忆（按创建时间倒序）
     * @return Flow 实时观察数据变化
     */
    @Query("SELECT * FROM image_memories ORDER BY createdAt DESC")
    fun getAllMemories(): Flow<List<ImageMemory>>
    
    /**
     * 获取所有记忆（一次性查询）
     */
    @Query("SELECT * FROM image_memories ORDER BY createdAt DESC")
    suspend fun getAllMemoriesOnce(): List<ImageMemory>
    
    /**
     * 根据 ID 获取单条记忆
     */
    @Query("SELECT * FROM image_memories WHERE id = :id")
    suspend fun getById(id: Long): ImageMemory?
    
    /**
     * 根据 ID 获取单条记忆（Flow）
     */
    @Query("SELECT * FROM image_memories WHERE id = :id")
    fun getByIdFlow(id: Long): Flow<ImageMemory?>
    
    /**
     * 搜索描述中包含关键词的记忆
     * @param keyword 搜索关键词
     */
    @Query("SELECT * FROM image_memories WHERE description LIKE '%' || :keyword || '%' ORDER BY createdAt DESC")
    fun searchByDescription(keyword: String): Flow<List<ImageMemory>>
    
    /**
     * 搜索描述中包含关键词的记忆（一次性查询）
     */
    @Query("SELECT * FROM image_memories WHERE description LIKE '%' || :keyword || '%' ORDER BY createdAt DESC")
    suspend fun searchByDescriptionOnce(keyword: String): List<ImageMemory>
    
    /**
     * 获取记忆总数
     */
    @Query("SELECT COUNT(*) FROM image_memories")
    suspend fun getCount(): Int
    
    /**
     * 获取记忆总数（Flow）
     */
    @Query("SELECT COUNT(*) FROM image_memories")
    fun getCountFlow(): Flow<Int>
    
    /**
     * 分页获取记忆
     */
    @Query("SELECT * FROM image_memories ORDER BY createdAt DESC LIMIT :limit OFFSET :offset")
    suspend fun getMemoriesPaged(limit: Int, offset: Int): List<ImageMemory>
    
    /**
     * 根据图片路径查找记忆
     */
    @Query("SELECT * FROM image_memories WHERE imagePath = :path")
    suspend fun getByImagePath(path: String): ImageMemory?
}
