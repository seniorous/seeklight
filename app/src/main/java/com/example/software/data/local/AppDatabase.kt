package com.example.software.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import com.example.software.data.local.dao.ImageMemoryDao
import com.example.software.data.local.dao.MemoryEmbeddingDao
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.local.entity.MemoryEmbedding
import com.example.software.data.local.entity.TagsConverter

/**
 * 应用数据库
 * 
 * 使用单例模式确保整个应用只有一个数据库实例。
 */
@Database(
    entities = [ImageMemory::class, MemoryEmbedding::class],
    version = 4,
    exportSchema = false
)
@TypeConverters(TagsConverter::class)
abstract class AppDatabase : RoomDatabase() {
    
    abstract fun imageMemoryDao(): ImageMemoryDao
    abstract fun memoryEmbeddingDao(): MemoryEmbeddingDao
    
    companion object {
        private const val DATABASE_NAME = "seeklight_database"
        
        @Volatile
        private var INSTANCE: AppDatabase? = null
        
        /**
         * 数据库迁移：版本 2 → 3
         * 添加 memory_embeddings 表用于语义搜索
         */
        val MIGRATION_2_3 = object : Migration(2, 3) {
            override fun migrate(database: SupportSQLiteDatabase) {
                // 创建 memory_embeddings 表
                database.execSQL("""
                    CREATE TABLE IF NOT EXISTS memory_embeddings (
                        memoryId INTEGER NOT NULL PRIMARY KEY,
                        embedding BLOB NOT NULL,
                        modelVersion TEXT NOT NULL,
                        createdAt INTEGER NOT NULL,
                        FOREIGN KEY (memoryId) REFERENCES image_memories(id) ON DELETE CASCADE
                    )
                """)
                
                // 创建索引
                database.execSQL("""
                    CREATE UNIQUE INDEX IF NOT EXISTS index_memory_embeddings_memoryId 
                    ON memory_embeddings(memoryId)
                """)
                
                database.execSQL("""
                    CREATE INDEX IF NOT EXISTS index_memory_embeddings_modelVersion 
                    ON memory_embeddings(modelVersion)
                """)
            }
        }
        
        /**
         * 数据库迁移：版本 3 → 4
         * 为结构化记忆输出新增字段
         */
        val MIGRATION_3_4 = object : Migration(3, 4) {
            override fun migrate(database: SupportSQLiteDatabase) {
                database.execSQL("ALTER TABLE image_memories ADD COLUMN summary TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN narrative TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN ocrText TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN uniqueIdentifier TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN dominantColors TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN lightingMood TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN composition TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN tagObjects TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN tagScene TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN tagAction TEXT NOT NULL DEFAULT ''")
                database.execSQL("ALTER TABLE image_memories ADD COLUMN tagTimeContext TEXT NOT NULL DEFAULT ''")
            }
        }
        
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
                .addMigrations(MIGRATION_2_3, MIGRATION_3_4)
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
