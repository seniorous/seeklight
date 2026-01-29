package com.example.software.data.local.entity

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import androidx.room.TypeConverter
import androidx.room.TypeConverters

/**
 * 标签列表转换器
 */
class TagsConverter {
    @TypeConverter
    fun fromTags(tags: List<String>): String {
        return tags.joinToString(",")
    }
    
    @TypeConverter
    fun toTags(data: String): List<String> {
        return if (data.isBlank()) emptyList() else data.split(",")
    }
}

/**
 * 图像记忆实体
 * 
 * 存储每次图像描述的结果，包括图片路径、AI 生成的描述、提取的标签等。
 */
@Entity(
    tableName = "image_memories",
    indices = [
        Index(value = ["createdAt"]),
        Index(value = ["description"]),
        Index(value = ["tagsString"])
    ]
)
@TypeConverters(TagsConverter::class)
data class ImageMemory(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    
    /** 图片在设备上的绝对路径 */
    val imagePath: String,
    
    /** 原始 URI 字符串 */
    val imageUri: String,
    
    /** AI 生成的描述文本（兼容旧字段） */
    val description: String,
    
    /** 列表展示摘要 */
    val summary: String = "",
    
    /** 详细叙述（用于向量） */
    val narrative: String = "",
    
    /** OCR 文本 */
    val ocrText: String = "",
    
    /** 记忆锚点 */
    val uniqueIdentifier: String = "",
    
    /** 主要色调 */
    val dominantColors: List<String> = emptyList(),
    
    /** 光影氛围 */
    val lightingMood: String = "",
    
    /** 构图 */
    val composition: String = "",
    
    /** 提取的特征标签（用于搜索） */
    val tags: List<String> = emptyList(),
    
    /** 标签字符串（用于数据库索引和搜索） */
    val tagsString: String = "",
    
    /** 分类标签：物体 */
    val tagObjects: List<String> = emptyList(),
    
    /** 分类标签：场景 */
    val tagScene: List<String> = emptyList(),
    
    /** 分类标签：动作 */
    val tagAction: List<String> = emptyList(),
    
    /** 分类标签：时间 */
    val tagTimeContext: List<String> = emptyList(),
    
    /** 使用的提示词 */
    val promptUsed: String,
    
    /** 生成的 token 数量 */
    val tokensGenerated: Int,
    
    /** 推理耗时（毫秒） */
    val inferenceTimeMs: Long,
    
    /** 首 Token 延迟（毫秒） */
    val firstTokenLatencyMs: Long = 0,
    
    /** 解码速度（tok/s） */
    val decodeSpeed: Float = 0f,
    
    /** 创建时间戳（毫秒） */
    val createdAt: Long = System.currentTimeMillis(),
    
    /** 更新时间戳（毫秒） */
    val updatedAt: Long = System.currentTimeMillis()
) {
    /**
     * 获取描述摘要（前 100 字符）
     */
    fun getDescriptionSummary(maxLength: Int = 100): String {
        val base = if (summary.isNotBlank()) summary else description
        return if (base.length <= maxLength) {
            base
        } else {
            base.take(maxLength) + "..."
        }
    }
    
    fun hasVisualFeatures(): Boolean {
        return dominantColors.isNotEmpty() || lightingMood.isNotBlank() || composition.isNotBlank()
    }
    
    fun getSearchableText(): String {
        return listOf(summary, narrative, description, ocrText, uniqueIdentifier)
            .filter { it.isNotBlank() }
            .joinToString(" ")
    }
    
    /**
     * 获取标签显示文本
     */
    fun getTagsDisplay(): String {
        return tags.joinToString(" ") { "#$it" }
    }
}
