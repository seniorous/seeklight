package com.example.software.ai

import android.graphics.Bitmap
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

/**
 * ImageProcessor 单元测试
 * 
 * 测试图像预处理功能
 */
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [33])
class ImageProcessorTest {
    
    private lateinit var imageProcessor: ImageProcessor
    
    @Before
    fun setup() {
        imageProcessor = ImageProcessor()
    }
    
    @Test
    fun `preprocess should return correct dimensions for small image`() {
        // Given: 一张小于最大尺寸的图片
        val bitmap = Bitmap.createBitmap(640, 480, Bitmap.Config.ARGB_8888)
        
        // When: 预处理图片
        val result = imageProcessor.preprocess(bitmap)
        
        // Then: 尺寸应保持不变
        assertEquals(640, result.width)
        assertEquals(480, result.height)
        assertEquals(640, result.originalWidth)
        assertEquals(480, result.originalHeight)
        
        bitmap.recycle()
    }
    
    @Test
    fun `preprocess should resize large image`() {
        // Given: 一张超过最大尺寸的图片
        val bitmap = Bitmap.createBitmap(2000, 1500, Bitmap.Config.ARGB_8888)
        
        // When: 预处理图片
        val result = imageProcessor.preprocess(bitmap)
        
        // Then: 应缩放到最大尺寸内，保持宽高比
        assertTrue(result.width <= ImageProcessor.MAX_IMAGE_SIZE)
        assertTrue(result.height <= ImageProcessor.MAX_IMAGE_SIZE)
        assertEquals(2000, result.originalWidth)
        assertEquals(1500, result.originalHeight)
        
        // 验证宽高比保持不变
        val originalRatio = 2000f / 1500f
        val resultRatio = result.width.toFloat() / result.height.toFloat()
        assertEquals(originalRatio, resultRatio, 0.01f)
        
        bitmap.recycle()
    }
    
    @Test
    fun `preprocess should return normalized pixel values`() {
        // Given: 一张简单的测试图片
        val bitmap = Bitmap.createBitmap(100, 100, Bitmap.Config.ARGB_8888)
        bitmap.eraseColor(android.graphics.Color.WHITE)
        
        // When: 预处理图片
        val result = imageProcessor.preprocess(bitmap)
        
        // Then: 应返回正确数量的像素值 (3 channels * width * height)
        val expectedSize = 3 * result.width * result.height
        assertEquals(expectedSize, result.pixels.size)
        
        // 所有值应在合理范围内（归一化后）
        result.pixels.forEach { pixel ->
            assertTrue("像素值应在合理范围内", pixel in -10f..10f)
        }
        
        bitmap.recycle()
    }
    
    @Test
    fun `centerCrop should return square image`() {
        // Given: 一张矩形图片
        val bitmap = Bitmap.createBitmap(200, 100, Bitmap.Config.ARGB_8888)
        
        // When: 中心裁剪
        val result = imageProcessor.centerCrop(bitmap, 64)
        
        // Then: 应返回正方形图片
        assertEquals(64, result.width)
        assertEquals(64, result.height)
        
        bitmap.recycle()
        result.recycle()
    }
    
    @Test
    fun `rotate should return rotated image`() {
        // Given: 一张图片
        val bitmap = Bitmap.createBitmap(100, 50, Bitmap.Config.ARGB_8888)
        
        // When: 旋转 90 度
        val result = imageProcessor.rotate(bitmap, 90f)
        
        // Then: 宽高应交换
        assertEquals(50, result.width)
        assertEquals(100, result.height)
        
        bitmap.recycle()
        result.recycle()
    }
    
    @Test
    fun `rotate zero degrees should return same bitmap`() {
        // Given: 一张图片
        val bitmap = Bitmap.createBitmap(100, 50, Bitmap.Config.ARGB_8888)
        
        // When: 旋转 0 度
        val result = imageProcessor.rotate(bitmap, 0f)
        
        // Then: 应返回相同的 bitmap
        assertEquals(bitmap, result)
        
        bitmap.recycle()
    }
    
    @Test
    fun `processedImage equals should work correctly`() {
        // Given: 两个相同的 ProcessedImage
        val pixels = floatArrayOf(0.1f, 0.2f, 0.3f)
        val image1 = ImageProcessor.ProcessedImage(pixels, 1, 1, 1, 1)
        val image2 = ImageProcessor.ProcessedImage(pixels.clone(), 1, 1, 1, 1)
        
        // Then: 应该相等
        assertEquals(image1, image2)
        assertEquals(image1.hashCode(), image2.hashCode())
    }
}
