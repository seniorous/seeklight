package com.example.software.ui.viewmodels

import android.app.Application
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.util.Base64
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.software.ai.CloudInferenceClient
import com.example.software.ai.ImageProcessor
import com.example.software.ai.MnnLlmBridge
import com.example.software.ai.ModelManager
import com.example.software.ai.QwenVLInference
import com.example.software.ai.TextEmbeddingBridge
import com.example.software.data.local.CloudSettingsStore
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.local.entity.MemoryEmbedding
import com.example.software.data.repository.EmbeddingRepository
import com.example.software.data.repository.ImageMemoryRepository
import com.example.software.util.AppLog
import com.example.software.util.MemoryJsonParser
import com.example.software.util.StructuredMemory
import com.example.software.util.TagGroups
import com.example.software.util.VisualFeatures
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
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
    private val cloudClient = CloudInferenceClient()
    private val cloudSettingsStore = CloudSettingsStore(application)
    
    // 推理任务
    private var inferenceJob: Job? = null
    
    // 数据仓库（用于保存记忆）
    private var repository: ImageMemoryRepository? = null
    private var embeddingRepository: EmbeddingRepository? = null
    private val embeddingBridge = TextEmbeddingBridge.getInstance()
    private var recentMemoriesJob: Job? = null
    
    // 当前使用的提示词
    private var currentPrompt: String = ""
    
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
     * 设置数据仓库（用于保存记忆）
     */
    fun setRepository(repo: ImageMemoryRepository) {
        this.repository = repo
        AppLog.i(logTag, "Repository set")
        recentMemoriesJob?.cancel()
        recentMemoriesJob = viewModelScope.launch {
            repo.getAllMemories().collect { memories ->
                _uiState.update { state ->
                    state.copy(recentMemories = memories.take(4))
                }
            }
        }
    }
    
    /**
     * 设置向量仓库（用于语义搜索）
     */
    fun setEmbeddingRepository(repo: EmbeddingRepository) {
        this.embeddingRepository = repo
        // 初始化 Embedding Bridge
        viewModelScope.launch {
            val context = getApplication<Application>()
            val initialized = embeddingBridge.initialize(context)
            AppLog.i(logTag, "EmbeddingRepository set, bridge initialized: $initialized")
        }
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
                    summary = "",
                    narrative = "",
                    visualFeatures = VisualFeatures(emptyList(), "", ""),
                    uniqueIdentifier = "",
                    ocrText = "",
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
     * 自动配置模型
     * 
     * 检测模型文件并自动加载，一键完成配置
     */
    fun configureModel() {
        AppLog.i(logTag, "configureModel requested")
        viewModelScope.launch {
            _uiState.update { it.copy(isModelLoading = true, errorMessage = null) }
            
            // 步骤 1: 检查模型是否存在
            if (!modelManager.isMnnModelAvailable()) {
                val modelDir = modelManager.getModelsDirectory().absolutePath
                AppLog.w(logTag, "Model not available at: $modelDir")
                _uiState.update { 
                    it.copy(
                        isModelLoading = false,
                        isModelLoaded = false,
                        errorMessage = "模型文件未找到\n\n请将模型文件放置到:\n$modelDir"
                    )
                }
                return@launch
            }
            
            // 步骤 2: 加载模型
            val result = modelManager.loadMnnModel()
            
            result.fold(
                onSuccess = { configPath ->
                    AppLog.i(logTag, "Model loaded, configPath=$configPath")
                    // 步骤 3: 初始化 MNN 会话
                    val sessionInitialized = mnnBridge.initSession(configPath)
                    if (sessionInitialized) {
                        AppLog.i(logTag, "Model configured successfully")
                        _uiState.update { 
                            it.copy(
                                isModelLoading = false,
                                isModelLoaded = true,
                                errorMessage = null
                            )
                        }
                    } else {
                        AppLog.w(logTag, "MNN session init failed")
                        _uiState.update { 
                            it.copy(
                                isModelLoading = false,
                                isModelLoaded = false,
                                errorMessage = "MNN 会话初始化失败\n请检查模型文件是否完整"
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
                            errorMessage = "模型加载失败: ${error.message}"
                        )
                    }
                }
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
        // 保存当前使用的提示词
        currentPrompt = prompt
        
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
                    summary = "",
                    narrative = "",
                    visualFeatures = VisualFeatures(emptyList(), "", ""),
                    uniqueIdentifier = "",
                    ocrText = "",
                    errorMessage = null,
                    performanceMetrics = PerformanceMetrics()
                )
            }
            
            val startTime = System.currentTimeMillis()
            
            try {
                // 检查模型是否已加载且 MNN 会话有效
                if (!_uiState.value.isModelLoaded || !mnnBridge.isSessionValid()) {
                    AppLog.w(logTag, "Model not configured, inferenceId=$inferenceId")
                    _uiState.update {
                        it.copy(
                            isProcessing = false,
                            errorMessage = "请先配置模型"
                        )
                    }
                    return@launch
                }
                
                AppLog.i(logTag, "Inference start, inferenceId=$inferenceId")
                
                // 端云协同推理
                runHybridInference(bitmap, prompt, startTime)
                
            } catch (e: CancellationException) {
                AppLog.w(logTag, "Inference cancelled, inferenceId=$inferenceId")
                throw e
            } catch (e: Exception) {
                AppLog.e(logTag, "Inference failed, inferenceId=$inferenceId", e)
                _uiState.update {
                    it.copy(
                        isProcessing = false,
                        errorMessage = "推理失败: ${e.message}"
                    )
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
        
        // 使用流式推理 - 减少 maxTokens 以避免过长输出
        mnnBridge.generateStream(
            prompt = prompt,
            imagePath = imagePath,
            maxTokens = 256  // 降低 token 数，减少幻觉和无关输出
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
                    val metrics = PerformanceMetrics(
                        prefillTimeMs = streamToken.prefillTimeMs,
                        decodeTimeMs = streamToken.decodeTimeMs,
                        totalTokens = streamToken.totalTokens,
                        tokensPerSecond = streamToken.tokensPerSecond
                    )
                    
                    val rawOutput = descriptionBuilder.toString()
                    val parsed = MemoryJsonParser.parse(rawOutput)
                    val normalized = normalizeStructured(parsed.structured, parsed.fallbackSummary, parsed.fallbackNarrative)
                    AppLog.i(
                        logTag,
                        "Parsed output: summaryLen=${normalized.summary.length}, " +
                            "narrativeLen=${normalized.narrative.length}, tags=${normalized.allTags.size}"
                    )

                    _uiState.update {
                        it.copy(
                            isProcessing = false,
                            summary = normalized.summary,
                            narrative = normalized.narrative,
                            visualFeatures = normalized.visualFeatures,
                            uniqueIdentifier = normalized.uniqueIdentifier,
                            ocrText = normalized.ocrText,
                            description = normalized.summary,
                            parsedTags = emptyList(),
                            performanceMetrics = metrics
                        )
                    }

                    saveMemoryToDatabase(
                        structured = normalized,
                        metrics = metrics
                    )
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
     * 端云协同推理：隐私模式优先端侧，云端失败回退
     */
    private suspend fun runHybridInference(bitmap: Bitmap, prompt: String, startTime: Long) {
        val settings = cloudSettingsStore.load()
        if (settings.privacyMode) {
            AppLog.i(logTag, "Privacy mode enabled, using on-device inference")
            runRealInference(bitmap, prompt, startTime)
            return
        }

        val imagePath = saveBitmapToTemp(bitmap)
        val cloudOutput = tryCloudInference(prompt, imagePath)
        if (cloudOutput != null) {
            val metrics = PerformanceMetrics(
                prefillTimeMs = 0,
                decodeTimeMs = System.currentTimeMillis() - startTime,
                totalTokens = 0,
                tokensPerSecond = 0.0
            )
            val parsed = MemoryJsonParser.parse(cloudOutput)
            val normalized = normalizeStructured(parsed.structured, parsed.fallbackSummary, parsed.fallbackNarrative)
            AppLog.i(
                logTag,
                "Cloud inference success: summaryLen=${normalized.summary.length}, " +
                    "narrativeLen=${normalized.narrative.length}"
            )
            _uiState.update {
                it.copy(
                    isProcessing = false,
                    summary = normalized.summary,
                    narrative = normalized.narrative,
                    visualFeatures = normalized.visualFeatures,
                    uniqueIdentifier = normalized.uniqueIdentifier,
                    ocrText = normalized.ocrText,
                    description = normalized.summary,
                    parsedTags = emptyList(),
                    performanceMetrics = metrics
                )
            }
            saveMemoryToDatabase(structured = normalized, metrics = metrics)
            return
        }

        _uiState.update { it.copy(errorMessage = "云端不可用，已切换端侧") }
        runRealInference(bitmap, prompt, startTime)
    }

    private suspend fun tryCloudInference(prompt: String, imagePath: String): String? {
        val settings = cloudSettingsStore.load()
        // 测试阶段：跳过连通性预检查，直接尝试云端请求
        var attempt = 0
        while (attempt < 3) {
            attempt += 1
            val result = withContext(Dispatchers.IO) {
                cloudClient.requestCompletion(settings, prompt, imagePath)
            }
            if (result.isSuccess) {
                return result.getOrNull()
            }
            AppLog.w(logTag, "Cloud attempt $attempt failed: ${result.exceptionOrNull()?.message}")
        }
        return null
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
                        val metrics = PerformanceMetrics(
                            prefillTimeMs = 100,
                            decodeTimeMs = state.response.inferenceTimeMs,
                            totalTokens = state.response.tokensGenerated,
                            tokensPerSecond = if (state.response.inferenceTimeMs > 0) {
                                state.response.tokensGenerated * 1000.0 / state.response.inferenceTimeMs
                            } else 0.0
                        )
                        val rawOutput = state.response.text
                        val parsed = MemoryJsonParser.parse(rawOutput)
                        val normalized = normalizeStructured(parsed.structured, parsed.fallbackSummary, parsed.fallbackNarrative)

                        _uiState.update {
                            it.copy(
                                isProcessing = false,
                                summary = normalized.summary,
                                narrative = normalized.narrative,
                                visualFeatures = normalized.visualFeatures,
                                uniqueIdentifier = normalized.uniqueIdentifier,
                                ocrText = normalized.ocrText,
                                description = normalized.summary,
                                parsedTags = emptyList(),
                                performanceMetrics = metrics
                            )
                        }

                        saveMemoryToDatabase(
                            structured = normalized,
                            metrics = metrics
                        )
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
     * 保存记忆到数据库
     */
    private fun saveMemoryToDatabase(structured: NormalizedMemory, metrics: PerformanceMetrics) {
        val repo = repository ?: run {
            AppLog.w(logTag, "Repository not set, cannot save memory")
            return
        }
        
        val state = _uiState.value
        val imageUri = state.selectedImageUri?.toString() ?: return
        val imagePath = getImagePath() ?: imageUri
        
        viewModelScope.launch {
            try {
                val memory = ImageMemory(
                    imagePath = imagePath,
                    imageUri = imageUri,
                    description = structured.narrative,
                    summary = structured.summary,
                    narrative = structured.narrative,
                    ocrText = structured.ocrText,
                    uniqueIdentifier = structured.uniqueIdentifier,
                    dominantColors = structured.visualFeatures.dominantColors,
                    lightingMood = structured.visualFeatures.lightingMood,
                    composition = structured.visualFeatures.composition,
                    tags = structured.allTags,
                    tagsString = structured.allTags.joinToString(","),
                    tagObjects = structured.tags.objects,
                    tagScene = structured.tags.scene,
                    tagAction = structured.tags.action,
                    tagTimeContext = structured.tags.timeContext,
                    promptUsed = currentPrompt,
                    tokensGenerated = metrics.totalTokens,
                    inferenceTimeMs = metrics.totalTimeMs,
                    firstTokenLatencyMs = metrics.prefillTimeMs,
                    decodeSpeed = metrics.tokensPerSecond.toFloat()
                )
                
                val id = repo.saveMemory(memory)
                AppLog.i(
                    logTag,
                    "Memory saved, id=$id, tokens=${metrics.totalTokens}, tags=${structured.allTags.size}"
                )
                
                // 生成向量用于语义搜索
                generateEmbeddingForMemory(id, structured.narrative)
                
            } catch (e: Exception) {
                AppLog.e(logTag, "Failed to save memory: ${e.message}", e)
            }
        }
    }
    
    /**
     * 为记忆生成向量
     */
    private suspend fun generateEmbeddingForMemory(memoryId: Long, description: String) {
        val embeddingRepo = embeddingRepository ?: return
        
        if (!embeddingBridge.isInitialized()) {
            AppLog.w(logTag, "Embedding bridge not initialized, skipping vector generation")
            return
        }
        
        try {
            val embedding = embeddingBridge.generateEmbedding(description)
            if (embedding != null) {
                embeddingRepo.saveEmbedding(
                    memoryId = memoryId,
                    embedding = embedding,
                    modelVersion = MemoryEmbedding.CURRENT_MODEL_VERSION
                )
                AppLog.i(logTag, "Embedding generated for memory $memoryId, dim=${embedding.size}")
            } else {
                AppLog.w(logTag, "Failed to generate embedding for memory $memoryId")
            }
        } catch (e: Exception) {
            AppLog.e(logTag, "Error generating embedding: ${e.message}", e)
        }
    }
    
    private fun normalizeStructured(
        structured: StructuredMemory?,
        fallbackSummary: String,
        fallbackNarrative: String
    ): NormalizedMemory {
        val rawSummary = structured?.summary?.ifBlank { fallbackSummary } ?: fallbackSummary
        val narrative = structured?.memoryExtraction?.narrativeCaption?.ifBlank { fallbackNarrative } ?: fallbackNarrative
        val cleanedSummary = cleanSummary(rawSummary)
        val summary = ensureSummaryLength(cleanedSummary, narrative, fallbackNarrative)
        val tags = structured?.tags ?: TagGroups(emptyList(), emptyList(), emptyList(), emptyList())
        val visual = structured?.visualFeatures ?: VisualFeatures(emptyList(), "", "")
        val ocrText = structured?.memoryExtraction?.ocrText ?: ""
        val uniqueIdentifier = structured?.memoryExtraction?.uniqueIdentifier ?: ""
        val allTags = structured?.allTags() ?: emptyList()

        return NormalizedMemory(
            summary = summary,
            narrative = narrative,
            tags = tags,
            visualFeatures = visual,
            ocrText = ocrText,
            uniqueIdentifier = uniqueIdentifier,
            allTags = allTags
        )
    }

    private fun ensureSummaryLength(summary: String, narrative: String, fallbackNarrative: String): String {
        val minLen = 50
        val maxLen = 100
        val candidate = when {
            summary.length >= minLen -> summary
            narrative.length >= minLen -> narrative
            fallbackNarrative.length >= minLen -> fallbackNarrative
            else -> summary.ifBlank { narrative }.ifBlank { fallbackNarrative }
        }
        return cleanSummary(candidate).take(maxLen)
    }

    private fun cleanSummary(summary: String): String {
        val normalized = summary
            .replace(Regex("(?i)\\bjson\\b"), "")
            .replace(Regex("(?i)\\bsummary\\b"), "")
            .replace(Regex("(?i)\\btags\\b"), "")
            .replace(Regex("(?i)objects\\b|scene\\b|action\\b|time_context\\b"), "")
            .replace(Regex("(?i)dominant_colors\\b|lighting_mood\\b|composition\\b"), "")
            .replace(Regex("[:：]+"), " ")
            .replace(Regex("[,，]+"), " ")
            .replace(Regex("[\\{\\}\\[\\]`]+"), " ")
            .replace(Regex("\\s+"), " ")
            .trim()

        // 如果仍然含有大量分隔符或标签痕迹，改用叙事兜底
        val hasNoise = normalized.contains(Regex("(?i)\\b(objects|scene|action|time_context)\\b")) ||
            normalized.count { it == ':' } > 0
        return if (hasNoise) "" else normalized
    }
    
    /**
     * 获取当前图片路径
     */
    private fun getImagePath(): String? {
        val context = getApplication<Application>()
        val uri = _uiState.value.selectedImageUri ?: return null
        
        // 尝试从 content URI 获取真实路径
        return try {
            context.contentResolver.openInputStream(uri)?.use {
                // 返回 URI 字符串作为路径标识
                uri.toString()
            }
        } catch (e: Exception) {
            uri.toString()
        }
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
                summary = "",
                narrative = "",
                visualFeatures = VisualFeatures(emptyList(), "", ""),
                uniqueIdentifier = "",
                ocrText = "",
                parsedTags = emptyList(),
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
        recentMemoriesJob?.cancel()
        mnnBridge.releaseSession()
        _uiState.value.selectedImageBitmap?.recycle()
    }
}

/**
 * 结构化解析后的内存记录
 */
data class NormalizedMemory(
    val summary: String,
    val narrative: String,
    val tags: TagGroups,
    val visualFeatures: VisualFeatures,
    val ocrText: String,
    val uniqueIdentifier: String,
    val allTags: List<String>
)

/**
 * UI 状态数据类
 */
data class ImageDescriptionUiState(
    val selectedImageUri: Uri? = null,
    val selectedImageBitmap: Bitmap? = null,
    val description: String = "",
    val summary: String = "",
    val narrative: String = "",
    val visualFeatures: VisualFeatures = VisualFeatures(emptyList(), "", ""),
    val uniqueIdentifier: String = "",
    val ocrText: String = "",
    val parsedTags: List<String> = emptyList(),
    val recentMemories: List<ImageMemory> = emptyList(),
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
