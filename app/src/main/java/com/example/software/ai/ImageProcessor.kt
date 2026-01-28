package com.example.software.ai

import android.graphics.Bitmap
import android.graphics.Matrix
import kotlin.math.max
import kotlin.math.min

/**
 * 图像预处理器
 * 
 * 负责将输入图像转换为模型可接受的格式
 */
class ImageProcessor {
    
    companion object {
        private const val TAG = "ImageProcessor"
        
        // Qwen3-VL 支持的最大图像尺寸
        const val MAX_IMAGE_SIZE = 1280
        const val MIN_IMAGE_SIZE = 28
        
        // 图像归一化参数 (ImageNet 标准)
        val MEAN = floatArrayOf(0.48145466f, 0.4578275f, 0.40821073f)
        val STD = floatArrayOf(0.26862954f, 0.26130258f, 0.27577711f)
    }
    
    /**
     * 预处理结果
     */
    data class ProcessedImage(
        val pixels: FloatArray,
        val width: Int,
        val height: Int,
        val originalWidth: Int,
        val originalHeight: Int
    ) {
        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as ProcessedImage
            return pixels.contentEquals(other.pixels) &&
                   width == other.width &&
                   height == other.height
        }

        override fun hashCode(): Int {
            var result = pixels.contentHashCode()
            result = 31 * result + width
            result = 31 * result + height
            return result
        }
    }
    
    /**
     * 预处理图像
     * 
     * 1. 调整尺寸到模型支持范围
     * 2. 转换为 RGB 浮点数组
     * 3. 归一化
     */
    fun preprocess(bitmap: Bitmap): ProcessedImage {
        val originalWidth = bitmap.width
        val originalHeight = bitmap.height
        
        // 调整尺寸
        val resized = resizeImage(bitmap)
        val width = resized.width
        val height = resized.height
        
        // 提取像素并转换为浮点数组
        val pixels = extractAndNormalizePixels(resized)
        
        // 如果创建了新的 Bitmap，释放它
        if (resized != bitmap) {
            resized.recycle()
        }
        
        return ProcessedImage(
            pixels = pixels,
            width = width,
            height = height,
            originalWidth = originalWidth,
            originalHeight = originalHeight
        )
    }
    
    /**
     * 调整图像尺寸
     * 
     * 保持宽高比，确保最长边不超过 MAX_IMAGE_SIZE
     */
    private fun resizeImage(bitmap: Bitmap): Bitmap {
        val width = bitmap.width
        val height = bitmap.height
        
        // 计算缩放比例
        val maxDim = max(width, height)
        val minDim = min(width, height)
        
        // 如果在支持范围内，直接返回
        if (maxDim <= MAX_IMAGE_SIZE && minDim >= MIN_IMAGE_SIZE) {
            return bitmap
        }
        
        // 计算缩放比例
        val scale = when {
            maxDim > MAX_IMAGE_SIZE -> MAX_IMAGE_SIZE.toFloat() / maxDim
            minDim < MIN_IMAGE_SIZE -> MIN_IMAGE_SIZE.toFloat() / minDim
            else -> 1f
        }
        
        val newWidth = (width * scale).toInt()
        val newHeight = (height * scale).toInt()
        
        return Bitmap.createScaledBitmap(bitmap, newWidth, newHeight, true)
    }
    
    /**
     * 提取像素并归一化
     * 
     * 转换为 CHW 格式的浮点数组 (Channel, Height, Width)
     */
    private fun extractAndNormalizePixels(bitmap: Bitmap): FloatArray {
        val width = bitmap.width
        val height = bitmap.height
        val pixelCount = width * height
        
        // 提取 ARGB 像素
        val pixels = IntArray(pixelCount)
        bitmap.getPixels(pixels, 0, width, 0, 0, width, height)
        
        // 创建 CHW 格式的浮点数组 (3 channels: RGB)
        val floatPixels = FloatArray(3 * pixelCount)
        
        for (i in 0 until pixelCount) {
            val pixel = pixels[i]
            
            // 提取 RGB 分量并归一化到 [0, 1]
            val r = ((pixel shr 16) and 0xFF) / 255f
            val g = ((pixel shr 8) and 0xFF) / 255f
            val b = (pixel and 0xFF) / 255f
            
            // 标准化 (x - mean) / std
            floatPixels[i] = (r - MEAN[0]) / STD[0]                    // R channel
            floatPixels[pixelCount + i] = (g - MEAN[1]) / STD[1]      // G channel
            floatPixels[2 * pixelCount + i] = (b - MEAN[2]) / STD[2]  // B channel
        }
        
        return floatPixels
    }
    
    /**
     * 裁剪图像中心区域
     */
    fun centerCrop(bitmap: Bitmap, targetSize: Int): Bitmap {
        val width = bitmap.width
        val height = bitmap.height
        val minDim = min(width, height)
        
        // 计算裁剪区域
        val startX = (width - minDim) / 2
        val startY = (height - minDim) / 2
        
        // 裁剪正方形区域
        val cropped = Bitmap.createBitmap(bitmap, startX, startY, minDim, minDim)
        
        // 缩放到目标尺寸
        return if (minDim != targetSize) {
            val scaled = Bitmap.createScaledBitmap(cropped, targetSize, targetSize, true)
            if (cropped != bitmap) cropped.recycle()
            scaled
        } else {
            cropped
        }
    }
    
    /**
     * 旋转图像
     */
    fun rotate(bitmap: Bitmap, degrees: Float): Bitmap {
        if (degrees == 0f) return bitmap
        
        val matrix = Matrix().apply {
            postRotate(degrees)
        }
        
        return Bitmap.createBitmap(
            bitmap, 0, 0, 
            bitmap.width, bitmap.height, 
            matrix, true
        )
    }
}
