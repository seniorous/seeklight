package com.example.software.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.software.data.local.dao.ImageMemoryDao
import com.example.software.data.local.entity.ImageMemory

/**
 * 应用数据库
 * 
 * 使用单例模式确保整个应用只有一个数据库实例。
 */
@Database(
    entities = [ImageMemory::class],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    
    abstract fun imageMemoryDao(): ImageMemoryDao
    
    companion object {
        private const val DATABASE_NAME = "seeklight_database"
        
        @Volatile
        private var INSTANCE: AppDatabase? = null
        
        /**
         * 获取数据库单例
         */
        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: buildDatabase(context).also { INSTANCE = it }
            }
        }
        
        private fun buildDatabase(context: Context): AppDatabase {
            return Room.databaseBuilder(
                context.applicationContext,
                AppDatabase::class.java,
                DATABASE_NAME
            )
                .fallbackToDestructiveMigration() // 开发阶段简化迁移
                .build()
        }
        
        /**
         * 关闭数据库（用于测试）
         */
        fun closeDatabase() {
            INSTANCE?.close()
            INSTANCE = null
        }
    }
}
