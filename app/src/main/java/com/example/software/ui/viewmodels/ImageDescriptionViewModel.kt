package com.example.software.ui.viewmodels

import android.app.Application
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.software.ai.ImageProcessor
import com.example.software.ai.MnnLlmBridge
import com.example.software.ai.ModelManager
import com.example.software.ai.QwenVLInference
import com.example.software.util.AppLog
import android.util.Base64
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream
import java.util.concurrent.atomic.AtomicInteger

/**
 * 图像描述 ViewModel
 * 
 * 管理图像选择、AI 推理和 UI 状态
 */
class ImageDescriptionViewModel(application: Application) : AndroidViewModel(application) {
    
    // AI 组件
    private val modelManager = ModelManager(application)
    private val imageProcessor = ImageProcessor()
    private val qwenVLInference = QwenVLInference(modelManager, imageProcessor)
    private val mnnBridge = MnnLlmBridge.getInstance()
    private val inferenceCounter = AtomicInteger(0)
    private var activeInferenceId: Int? = null
    private val logTag = "ImageDescriptionVM"
    
    // 推理任务
    private var inferenceJob: Job? = null
    
    // UI 状态
    private val _uiState = MutableStateFlow(ImageDescriptionUiState())
    val uiState: StateFlow<ImageDescriptionUiState> = _uiState.asStateFlow()
    
    // 模型状态
    val modelState: StateFlow<ModelManager.ModelState> = modelManager.modelState
    
    init {
        // 尝试加载原生库
        val libraryLoaded = MnnLlmBridge.loadLibrary()
        AppLog.i(logTag, "Native library load result: $libraryLoaded")
        _uiState.update { it.copy(isLibraryLoaded = libraryLoaded) }
    }
    
    /**
     * 选择图片
     */
    fun onImageSelected(uri: Uri) {
        AppLog.i(logTag, "onImageSelected called, uri=$uri")
        viewModelScope.launch {
            try {
                val context = getApplication<Application>()
                val inputStream = context.contentResolver.openInputStream(uri)
                val bitmap = BitmapFactory.decodeStream(inputStream)
                inputStream?.close()
                
                if (bitmap != null) {
                    AppLog.i(
                        logTag,
                        "Image decoded, size=${bitmap.width}x${bitmap.height}, config=${bitmap.config}"
                    )
                    _uiState.update { 
                        it.copy(
                            selectedImageUri = uri,
                            selectedImageBitmap = bitmap,
                            description = "",
                            errorMessage = null,
                            performanceMetrics = PerformanceMetrics()
                        )
                    }
                } else {
                    AppLog.w(logTag, "Image decode returned null, uri=$uri")
                    _uiState.update { it.copy(errorMessage = "无法加载图片") }
                }
            } catch (e: Exception) {
                AppLog.e(logTag, "Failed to load image: ${e.message}", e)
                _uiState.update { it.copy(errorMessage = "加载图片失败: ${e.message}") }
            }
        }
    }
    
    /**
     * 加载模型
     * 
     * 如果模型存在，尝试加载真实模型
     * 如果模型不存在，启用演示模式（使用模拟推理）
     */
    fun loadModel() {
        AppLog.i(logTag, "loadModel requested")
        viewModelScope.launch {
            _uiState.update { it.copy(isModelLoading = true, errorMessage = null) }
            
            // 检查模型是否存在
            if (!modelManager.isMnnModelAvailable()) {
                AppLog.w(logTag, "Model not available, enabling demo mode")
                // 模型不存在，启用演示模式
                _uiState.update { 
                    it.copy(
                        isModelLoading = false,
                        isModelLoaded = false,
                        errorMessage = "MNN 模型未下载，将使用演示模式。\n请先下载模型到: ${modelManager.getModelsDirectory().absolutePath}"
                    )
                }
                return@launch
            }
            
            val result = modelManager.loadMnnModel()
            
            result.fold(
                onSuccess = { configPath ->
                    AppLog.i(logTag, "Model loaded, configPath=$configPath")
                    // 初始化 MNN 会话
                    val sessionInitialized = mnnBridge.initSession(configPath)
                    if (sessionInitialized) {
                        AppLog.i(logTag, "MNN session initialized")
                        _uiState.update { 
                            it.copy(
                                isModelLoading = false,
                                isModelLoaded = true,
                                errorMessage = null
                            )
                        }
                    } else {
                        AppLog.w(logTag, "MNN session init failed, fallback to demo mode")
                        // MNN 会话初始化失败（库已加载但 JNI 桥接未实现）
                        _uiState.update { 
                            it.copy(
                                isModelLoading = false,
                                isModelLoaded = false,
                                errorMessage = "MNN 库已加载，但 JNI 桥接未完成。\n模型文件已就绪，将使用演示模式。"
                            )
                        }
                    }
                },
                onFailure = { error ->
                    AppLog.e(logTag, "Model load failed: ${error.message}", error)
                    _uiState.update { 
                        it.copy(
                            isModelLoading = false,
                            isModelLoaded = false,
                            errorMessage = error.message
                        )
                    }
                }
            )
        }
    }
    
    /**
     * 启用演示模式（无需模型）
     */
    fun enableDemoMode() {
        _uiState.update {
            it.copy(
                isModelLoaded = false,
                errorMessage = null
            )
        }
    }
    
    /**
     * 生成图像描述
     * 
     * 如果模型已加载则使用真实推理，否则使用模拟推理进行演示
     */
    fun describeImage(prompt: String = "Describe the image in detail.") {
        val bitmap = _uiState.value.selectedImageBitmap
        if (bitmap == null) {
            AppLog.w(logTag, "describeImage aborted: selectedImageBitmap is null")
            return
        }
        val inferenceId = inferenceCounter.incrementAndGet()
        activeInferenceId = inferenceId
        AppLog.i(
            logTag,
            "describeImage called, inferenceId=$inferenceId, " +
                "isModelLoaded=${_uiState.value.isModelLoaded}, sessionValid=${mnnBridge.isSessionValid()}"
        )
        AppLog.i(logTag, "Prompt preview: ${prompt.take(200)}")
        val promptBytes = prompt.toByteArray(Charsets.UTF_8)
        val promptBase64 = Base64.encodeToString(promptBytes, Base64.NO_WRAP)
        AppLog.i(logTag, "Prompt utf8 bytes=${promptBytes.size}, base64=$promptBase64")
        
        // 取消之前的推理任务
        inferenceJob?.cancel()
        AppLog.d(logTag, "Previous inference cancelled, inferenceId=$inferenceId")
        
        inferenceJob = viewModelScope.launch {
            _uiState.update { 
                it.copy(
                    isProcessing = true,
                    description = "",
                    errorMessage = null,
                    performanceMetrics = PerformanceMetrics()
                )
            }
            
            val startTime = System.currentTimeMillis()
            
            try {
                // 检查模型是否已加载且 MNN 会话有效
                val useRealInference = _uiState.value.isModelLoaded && mnnBridge.isSessionValid()
                AppLog.i(
                    logTag,
                    "Inference start, inferenceId=$inferenceId, useRealInference=$useRealInference"
                )
                
                if (useRealInference) {
                    // 使用真实 MNN 推理
                    runRealInference(bitmap, prompt, startTime)
                } else {
                    // 使用模拟推理（演示模式）
                    useMockInference(bitmap, prompt, startTime)
                }
            } catch (e: CancellationException) {
                AppLog.w(logTag, "Inference cancelled, inferenceId=$inferenceId")
                // 协程被取消，正常退出，不更新错误状态
                throw e
            } catch (e: Exception) {
                AppLog.e(logTag, "Inference failed, fallback to demo, inferenceId=$inferenceId", e)
                // 其他异常，回退到模拟推理
                try {
                    useMockInference(bitmap, prompt, startTime)
                } catch (e2: CancellationException) {
                    throw e2
                } catch (e2: Exception) {
                    AppLog.e(logTag, "Demo inference failed, inferenceId=$inferenceId", e2)
                    _uiState.update {
                        it.copy(
                            isProcessing = false,
                            errorMessage = "推理失败: ${e2.message}"
                        )
                    }
                }
            }
        }
    }
    
    /**
     * 真实 MNN 推理
     */
    private suspend fun runRealInference(bitmap: Bitmap, prompt: String, startTime: Long) {
        var firstTokenTime: Long? = null
        var tokenCount = 0
        val descriptionBuilder = StringBuilder()
        
        // 保存图片到临时文件供 MNN 使用
        val imagePath = saveBitmapToTemp(bitmap)
        val imageFile = File(imagePath)
        AppLog.i(
            logTag,
            "Real inference image saved, path=$imagePath, exists=${imageFile.exists()}, " +
                "size=${imageFile.length()} bytes, readable=${imageFile.canRead()}"
        )
        
        // 使用流式推理
        mnnBridge.generateStream(
            prompt = prompt,
            imagePath = imagePath,
            maxTokens = 512
        ) { token ->
            // 首 token 时间
            if (firstTokenTime == null) {
                firstTokenTime = System.currentTimeMillis() - startTime
            }
            tokenCount++
            descriptionBuilder.append(token)
            
            // 更新 UI
            val currentTime = System.currentTimeMillis()
            val totalTime = currentTime - startTime
            val decodeTime = totalTime - (firstTokenTime ?: 0)
            val tokensPerSecond = if (decodeTime > 0) {
                tokenCount * 1000.0 / decodeTime
            } else 0.0
            
            _uiState.update {
                it.copy(
                    description = descriptionBuilder.toString(),
                    performanceMetrics = PerformanceMetrics(
                        prefillTimeMs = firstTokenTime ?: 0,
                        decodeTimeMs = decodeTime,
                        totalTokens = tokenCount,
                        tokensPerSecond = tokensPerSecond
                    )
                )
            }
        }.collect { streamToken ->
            when (streamToken) {
                is MnnLlmBridge.StreamToken.Complete -> {
                    AppLog.i(
                        logTag,
                        "Real inference complete, tokens=${streamToken.totalTokens}, " +
                            "prefillMs=${streamToken.prefillTimeMs}, decodeMs=${streamToken.decodeTimeMs}"
                    )
                    _uiState.update {
                        it.copy(
                            isProcessing = false,
                            performanceMetrics = PerformanceMetrics(
                                prefillTimeMs = streamToken.prefillTimeMs,
                                decodeTimeMs = streamToken.decodeTimeMs,
                                totalTokens = streamToken.totalTokens,
                                tokensPerSecond = streamToken.tokensPerSecond
                            )
                        )
                    }
                }
                is MnnLlmBridge.StreamToken.Error -> {
                    AppLog.e(logTag, "Real inference error: ${streamToken.message}")
                    _uiState.update {
                        it.copy(
                            isProcessing = false,
                            errorMessage = streamToken.message
                        )
                    }
                }
                is MnnLlmBridge.StreamToken.Token -> {
                    // Token 已在回调中处理
                }
            }
        }
    }
    
    /**
     * 模拟推理（演示模式，当 MNN 未初始化时使用）
     * 
     * 会显示模拟的流式输出效果
     */
    private suspend fun useMockInference(bitmap: Bitmap, prompt: String, startTime: Long) {
        AppLog.i(logTag, "Mock inference start, promptLen=${prompt.length}")
        val request = QwenVLInference.InferenceRequest(
            prompt = prompt,
            image = bitmap,
            maxTokens = 512,
            stream = true
        )
        
        try {
            qwenVLInference.inferenceStream(request).collect { state ->
                when (state) {
                    is QwenVLInference.InferenceState.Processing -> {
                        // 开始处理
                    }
                    is QwenVLInference.InferenceState.Streaming -> {
                        val currentTime = System.currentTimeMillis()
                        val totalTime = currentTime - startTime
                        
                        _uiState.update {
                            it.copy(
                                description = state.partialText,
                                performanceMetrics = PerformanceMetrics(
                                    prefillTimeMs = 100, // 模拟首 token 时间
                                    decodeTimeMs = totalTime,
                                    totalTokens = state.partialText.length,
                                    tokensPerSecond = if (totalTime > 0) {
                                        state.partialText.length * 1000.0 / totalTime
                                    } else 0.0
                                )
                            )
                        }
                    }
                    is QwenVLInference.InferenceState.Complete -> {
                        AppLog.i(
                            logTag,
                            "Mock inference complete, tokens=${state.response.tokensGenerated}, " +
                                "timeMs=${state.response.inferenceTimeMs}"
                        )
                        _uiState.update {
                            it.copy(
                                isProcessing = false,
                                description = state.response.text,
                                performanceMetrics = PerformanceMetrics(
                                    prefillTimeMs = 100,
                                    decodeTimeMs = state.response.inferenceTimeMs,
                                    totalTokens = state.response.tokensGenerated,
                                    tokensPerSecond = if (state.response.inferenceTimeMs > 0) {
                                        state.response.tokensGenerated * 1000.0 / state.response.inferenceTimeMs
                                    } else 0.0
                                )
                            )
                        }
                    }
                    is QwenVLInference.InferenceState.Error -> {
                        AppLog.e(logTag, "Mock inference error: ${state.message}")
                        _uiState.update {
                            it.copy(
                                isProcessing = false,
                                errorMessage = state.message
                            )
                        }
                    }
                    is QwenVLInference.InferenceState.Idle -> {
                        // 空闲状态
                    }
                }
            }
        } catch (e: CancellationException) {
            // 协程被取消，重新抛出以正确处理
            throw e
        }
    }
    
    /**
     * 保存 Bitmap 到临时文件
     * 
     * 注意：MNN native 层需要访问图片，必须保存到模型目录（权限为 666）
     * 同时压缩图片大小以满足 MNN 要求
     */
    private fun saveBitmapToTemp(bitmap: Bitmap): String {
        val context = getApplication<Application>()
        
        // 使用模型目录，权限与模型文件一致（666）
        val externalDir = context.getExternalFilesDir(null)
        val modelsDir = if (externalDir != null && externalDir.canWrite()) {
            File(externalDir, "models/qwen3-vl-2b-instruct-mnn").also { it.mkdirs() }
        } else {
            context.cacheDir
        }
        
        // 压缩图片到合适的大小（MNN 推荐 420x420）
        val maxSize = 420
        val scaledBitmap = if (bitmap.width > maxSize || bitmap.height > maxSize) {
            val scale = minOf(maxSize.toFloat() / bitmap.width, maxSize.toFloat() / bitmap.height)
            val newWidth = (bitmap.width * scale).toInt()
            val newHeight = (bitmap.height * scale).toInt()
            Bitmap.createScaledBitmap(bitmap, newWidth, newHeight, true)
        } else {
            bitmap
        }
        
        val tempFile = File(modelsDir, "input_image.jpg")
        FileOutputStream(tempFile).use { out ->
            scaledBitmap.compress(Bitmap.CompressFormat.JPEG, 85, out)
        }
        
        // 设置文件权限为所有用户可读（与模型文件权限一致）
        // 这对于 MNN native 层读取图片很重要
        tempFile.setReadable(true, false)  // ownerOnly = false 表示所有用户可读
        tempFile.setWritable(true, false)
        
        // 释放缩放后的 bitmap（如果是新创建的）
        if (scaledBitmap != bitmap) {
            scaledBitmap.recycle()
        }
        
        AppLog.d(
            logTag,
            "Image saved, path=${tempFile.absolutePath}, size=${tempFile.length()} bytes, " +
                "readable=${tempFile.canRead()}, writable=${tempFile.canWrite()}"
        )
        return tempFile.absolutePath
    }
    
    /**
     * 取消推理
     */
    fun cancelInference() {
        inferenceJob?.cancel()
        AppLog.w(logTag, "Inference cancelled by user, inferenceId=$activeInferenceId")
        _uiState.update { it.copy(isProcessing = false) }
    }
    
    /**
     * 清除选择的图片
     */
    fun clearImage() {
        AppLog.i(logTag, "clearImage called")
        _uiState.value.selectedImageBitmap?.recycle()
        _uiState.update {
            it.copy(
                selectedImageUri = null,
                selectedImageBitmap = null,
                description = "",
                errorMessage = null,
                performanceMetrics = PerformanceMetrics()
            )
        }
    }
    
    /**
     * 清除错误消息
     */
    fun clearError() {
        _uiState.update { it.copy(errorMessage = null) }
    }
    
    /**
     * 获取模型信息
     */
    fun getModelInfo(): ModelManager.ModelInfo? {
        return modelManager.getModelInfo()
    }
    
    /**
     * 检查模型是否可用
     */
    fun isModelAvailable(): Boolean {
        return modelManager.isMnnModelAvailable()
    }
    
    /**
     * 获取可用内存
     */
    fun getAvailableMemoryMb(): Long {
        return modelManager.getAvailableMemoryMb()
    }
    
    override fun onCleared() {
        super.onCleared()
        AppLog.i(logTag, "ViewModel cleared, releasing session")
        inferenceJob?.cancel()
        mnnBridge.releaseSession()
        _uiState.value.selectedImageBitmap?.recycle()
    }
}

/**
 * UI 状态数据类
 */
data class ImageDescriptionUiState(
    val selectedImageUri: Uri? = null,
    val selectedImageBitmap: Bitmap? = null,
    val description: String = "",
    val isProcessing: Boolean = false,
    val isModelLoading: Boolean = false,
    val isModelLoaded: Boolean = false,
    val isLibraryLoaded: Boolean = false,
    val errorMessage: String? = null,
    val performanceMetrics: PerformanceMetrics = PerformanceMetrics()
)

/**
 * 性能指标数据类
 */
data class PerformanceMetrics(
    val prefillTimeMs: Long = 0,
    val decodeTimeMs: Long = 0,
    val totalTokens: Int = 0,
    val tokensPerSecond: Double = 0.0
) {
    val totalTimeMs: Long get() = prefillTimeMs + decodeTimeMs
}
