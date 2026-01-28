package com.example.software.ui.viewmodels

import android.app.Application
import android.graphics.Bitmap
import android.net.Uri
import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.TestScope
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.Mockito.mock
import org.mockito.Mockito.`when`
import org.mockito.junit.MockitoJUnitRunner
import java.io.ByteArrayInputStream

/**
 * ImageDescriptionViewModel 单元测试
 */
@OptIn(ExperimentalCoroutinesApi::class)
@RunWith(MockitoJUnitRunner.Silent::class)
class ImageDescriptionViewModelTest {
    
    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule()
    
    private val testDispatcher = StandardTestDispatcher()
    private val testScope = TestScope(testDispatcher)
    
    @Mock
    private lateinit var application: Application
    
    private lateinit var viewModel: ImageDescriptionViewModel
    
    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        
        // Mock ContentResolver
        val contentResolver = mock(android.content.ContentResolver::class.java)
        `when`(application.contentResolver).thenReturn(contentResolver)
        `when`(application.filesDir).thenReturn(java.io.File("/tmp/test"))
        `when`(application.getExternalFilesDir(null)).thenReturn(java.io.File("/tmp/test/external"))
        `when`(application.cacheDir).thenReturn(java.io.File("/tmp/test/cache"))
        
        viewModel = ImageDescriptionViewModel(application)
    }
    
    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }
    
    @Test
    fun `initial state should be correct`() {
        // Then: 初始状态应正确
        val state = viewModel.uiState.value
        
        assertNull(state.selectedImageUri)
        assertNull(state.selectedImageBitmap)
        assertEquals("", state.description)
        assertFalse(state.isProcessing)
        assertFalse(state.isModelLoading)
        assertFalse(state.isModelLoaded)
        assertNull(state.errorMessage)
    }
    
    @Test
    fun `clearImage should reset image state`() = runTest {
        // Given: 已设置图片状态
        // 由于我们无法直接设置私有状态，这里测试 clearImage 方法的幂等性
        
        // When: 清除图片
        viewModel.clearImage()
        
        // Then: 状态应重置
        val state = viewModel.uiState.value
        assertNull(state.selectedImageUri)
        assertNull(state.selectedImageBitmap)
        assertEquals("", state.description)
    }
    
    @Test
    fun `clearError should clear error message`() = runTest {
        // When: 清除错误
        viewModel.clearError()
        
        // Then: 错误消息应为空
        assertNull(viewModel.uiState.value.errorMessage)
    }
    
    @Test
    fun `cancelInference should stop processing`() = runTest {
        // When: 取消推理
        viewModel.cancelInference()
        
        // Then: 应不再处理中
        assertFalse(viewModel.uiState.value.isProcessing)
    }
    
    @Test
    fun `isModelAvailable should return false when model not downloaded`() {
        // When: 检查模型可用性
        val available = viewModel.isModelAvailable()
        
        // Then: 应返回 false（模型未下载）
        assertFalse(available)
    }
    
    @Test
    fun `getAvailableMemoryMb should return positive value`() {
        // When: 获取可用内存
        val memory = viewModel.getAvailableMemoryMb()
        
        // Then: 应返回正值
        assertTrue(memory >= 0)
    }
    
    @Test
    fun `performanceMetrics default values should be zero`() {
        // Given: 默认的性能指标
        val metrics = PerformanceMetrics()
        
        // Then: 所有值应为 0
        assertEquals(0L, metrics.prefillTimeMs)
        assertEquals(0L, metrics.decodeTimeMs)
        assertEquals(0, metrics.totalTokens)
        assertEquals(0.0, metrics.tokensPerSecond, 0.001)
        assertEquals(0L, metrics.totalTimeMs)
    }
    
    @Test
    fun `performanceMetrics totalTimeMs should be sum of prefill and decode`() {
        // Given: 有值的性能指标
        val metrics = PerformanceMetrics(
            prefillTimeMs = 1000,
            decodeTimeMs = 2000,
            totalTokens = 100,
            tokensPerSecond = 50.0
        )
        
        // Then: totalTimeMs 应为 prefill + decode
        assertEquals(3000L, metrics.totalTimeMs)
    }
    
    @Test
    fun `uiState should be immutable data class`() {
        // Given: UI 状态
        val state1 = ImageDescriptionUiState()
        val state2 = state1.copy(description = "test")
        
        // Then: 应创建新对象
        assertEquals("", state1.description)
        assertEquals("test", state2.description)
    }
}
