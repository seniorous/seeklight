package com.example.software.data.local.entity

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey

/**
 * 记忆向量实体
 * 
 * 存储每条记忆的文本向量表示，用于语义搜索。
 * 向量维度为 384（all-MiniLM-L6-v2 模型输出）。
 */
@Entity(
    tableName = "memory_embeddings",
    foreignKeys = [
        ForeignKey(
            entity = ImageMemory::class,
            parentColumns = ["id"],
            childColumns = ["memoryId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [
        Index(value = ["memoryId"], unique = true),
        Index(value = ["modelVersion"])
    ]
)
data class MemoryEmbedding(
    @PrimaryKey
    @ColumnInfo(name = "memoryId")
    val memoryId: Long,
    
    /**
     * 向量数据（384 维 Float，序列化为 ByteArray）
     * 存储格式：384 * 4 bytes = 1536 bytes
     */
    @ColumnInfo(name = "embedding", typeAffinity = ColumnInfo.BLOB)
    val embedding: ByteArray,
    
    /**
     * 模型版本标识
     * 用于模型升级时重新生成向量
     */
    @ColumnInfo(name = "modelVersion")
    val modelVersion: String,
    
    /**
     * 创建时间戳
     */
    @ColumnInfo(name = "createdAt")
    val createdAt: Long = System.currentTimeMillis()
) {
    companion object {
        /** 向量维度 */
        const val EMBEDDING_DIMENSION = 384
        
        /** 当前模型版本 */
        const val CURRENT_MODEL_VERSION = "minilm-l6-v2-v1"
        
        /**
         * 将 FloatArray 转换为 ByteArray
         */
        fun floatArrayToByteArray(floatArray: FloatArray): ByteArray {
            val byteArray = ByteArray(floatArray.size * 4)
            for (i in floatArray.indices) {
                val bits = java.lang.Float.floatToIntBits(floatArray[i])
                byteArray[i * 4] = (bits shr 24).toByte()
                byteArray[i * 4 + 1] = (bits shr 16).toByte()
                byteArray[i * 4 + 2] = (bits shr 8).toByte()
                byteArray[i * 4 + 3] = bits.toByte()
            }
            return byteArray
        }
        
        /**
         * 将 ByteArray 转换为 FloatArray
         */
        fun byteArrayToFloatArray(byteArray: ByteArray): FloatArray {
            val floatArray = FloatArray(byteArray.size / 4)
            for (i in floatArray.indices) {
                val bits = (byteArray[i * 4].toInt() and 0xFF shl 24) or
                          (byteArray[i * 4 + 1].toInt() and 0xFF shl 16) or
                          (byteArray[i * 4 + 2].toInt() and 0xFF shl 8) or
                          (byteArray[i * 4 + 3].toInt() and 0xFF)
                floatArray[i] = java.lang.Float.intBitsToFloat(bits)
            }
            return floatArray
        }
    }
    
    /**
     * 获取向量的 FloatArray 表示
     */
    fun getEmbeddingVector(): FloatArray {
        return byteArrayToFloatArray(embedding)
    }
    
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as MemoryEmbedding

        if (memoryId != other.memoryId) return false
        if (!embedding.contentEquals(other.embedding)) return false
        if (modelVersion != other.modelVersion) return false
        if (createdAt != other.createdAt) return false

        return true
    }

    override fun hashCode(): Int {
        var result = memoryId.hashCode()
        result = 31 * result + embedding.contentHashCode()
        result = 31 * result + modelVersion.hashCode()
        result = 31 * result + createdAt.hashCode()
        return result
    }
}
