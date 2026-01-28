package com.example.software.util

import kotlin.math.sqrt

/**
 * 向量计算工具类
 */
object VectorUtils {
    
    /**
     * 计算两个向量的余弦相似度
     * 
     * @param a 向量 A（假设已归一化）
     * @param b 向量 B（假设已归一化）
     * @return 相似度分数 [-1, 1]，归一化向量时为 [0, 1]
     */
    fun cosineSimilarity(a: FloatArray, b: FloatArray): Float {
        require(a.size == b.size) { "Vectors must have the same dimension" }
        
        var dotProduct = 0f
        for (i in a.indices) {
            dotProduct += a[i] * b[i]
        }
        
        return dotProduct
    }
    
    /**
     * 计算两个向量的余弦相似度（非归一化版本）
     */
    fun cosineSimilarityNormalized(a: FloatArray, b: FloatArray): Float {
        require(a.size == b.size) { "Vectors must have the same dimension" }
        
        var dotProduct = 0f
        var normA = 0f
        var normB = 0f
        
        for (i in a.indices) {
            dotProduct += a[i] * b[i]
            normA += a[i] * a[i]
            normB += b[i] * b[i]
        }
        
        val denominator = sqrt(normA) * sqrt(normB)
        return if (denominator > 0) dotProduct / denominator else 0f
    }
    
    /**
     * 批量计算相似度
     * 
     * @param query 查询向量
     * @param candidates 候选向量映射 (id -> vector)
     * @param topK 返回 Top K 结果
     * @return 按相似度降序排列的 (id, score) 列表
     */
    fun batchCosineSimilarity(
        query: FloatArray,
        candidates: Map<Long, FloatArray>,
        topK: Int = Int.MAX_VALUE
    ): List<Pair<Long, Float>> {
        return candidates
            .map { (id, vector) -> id to cosineSimilarity(query, vector) }
            .sortedByDescending { it.second }
            .take(topK)
    }
    
    /**
     * L2 归一化向量
     */
    fun normalize(vector: FloatArray): FloatArray {
        var norm = 0f
        for (v in vector) {
            norm += v * v
        }
        norm = sqrt(norm)
        
        return if (norm > 0) {
            FloatArray(vector.size) { vector[it] / norm }
        } else {
            vector.copyOf()
        }
    }
    
    /**
     * 计算两个向量的欧氏距离
     */
    fun euclideanDistance(a: FloatArray, b: FloatArray): Float {
        require(a.size == b.size) { "Vectors must have the same dimension" }
        
        var sum = 0f
        for (i in a.indices) {
            val diff = a[i] - b[i]
            sum += diff * diff
        }
        
        return sqrt(sum)
    }
    
    /**
     * 向量相加
     */
    fun add(a: FloatArray, b: FloatArray): FloatArray {
        require(a.size == b.size) { "Vectors must have the same dimension" }
        return FloatArray(a.size) { a[it] + b[it] }
    }
    
    /**
     * 向量平均（用于多向量聚合）
     */
    fun average(vectors: List<FloatArray>): FloatArray {
        require(vectors.isNotEmpty()) { "Vector list cannot be empty" }
        
        val dim = vectors[0].size
        val result = FloatArray(dim)
        
        for (vector in vectors) {
            require(vector.size == dim) { "All vectors must have the same dimension" }
            for (i in result.indices) {
                result[i] += vector[i]
            }
        }
        
        val count = vectors.size.toFloat()
        for (i in result.indices) {
            result[i] /= count
        }
        
        return result
    }
}
