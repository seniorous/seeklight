package com.example.software.ui.viewmodels

import android.app.Application
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.software.ai.CloudInferenceClient
import com.example.software.ai.MnnLlmBridge
import com.example.software.ai.ModelManager
import com.example.software.data.local.CloudSettingsStore
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.repository.ImageMemoryRepository
import com.example.software.util.AppLog
import com.example.software.util.MemoryJsonParser
import com.example.software.util.StructuredMemory
import com.example.software.util.TagGroups
import com.example.software.util.VisualFeatures
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileOutputStream

/**
 * 批量导入任务项
 */
data class ImportTask(
    val uri: Uri,
    val status: ImportStatus = ImportStatus.PENDING,
    val progress: Float = 0f,
    val description: String = "",
    val tags: List<String> = emptyList(),
    val errorMessage: String? = null
)

/**
 * 导入状态
 */
enum class ImportStatus {
    PENDING,      // 等待中
    PROCESSING,   // 处理中
    COMPLETED,    // 已完成
    FAILED        // 失败
}

/**
 * 批量导入 UI 状态
 */
data class BatchImportUiState(
    val tasks: List<ImportTask> = emptyList(),
    val currentIndex: Int = 0,
    val isImporting: Boolean = false,
    val isCompleted: Boolean = false,
    val totalCount: Int = 0,
    val completedCount: Int = 0,
    val failedCount: Int = 0,
    val errorMessage: String? = null
)

/**
 * 批量导入 ViewModel
 */
class BatchImportViewModel(application: Application) : AndroidViewModel(application) {
    
    private val logTag = "BatchImportVM"
    private val modelManager = ModelManager(application)
    private val mnnBridge = MnnLlmBridge.getInstance()
    private val cloudClient = CloudInferenceClient()
    private val cloudSettingsStore = CloudSettingsStore(application)
    
    private var repository: ImageMemoryRepository? = null
    private var importJob: Job? = null
    
    // 结构化提示词 - 统一 JSON Schema
    private val prompt = """# Role
你是一个专业的“视觉记忆档案员”。你的任务是将输入的图片转化为深度结构化的记忆数据。你需要不仅仅识别物体，还要捕捉图片中的氛围、独特的视觉特征以及潜在的故事性。

# Goals
1. 标签化 (Tagging): 提取多维度的关键词，包括物体、场景、动作、时间。
2. 特征化 (Characterization): 分析图片的光影、构图、主要色调以及独特细节。
3. 记忆锚点 (Memory Anchors): 生成用于未来检索的“记忆钩子”。

# Output Format
请严格以 JSON 格式输出，不要包含任何 JSON 以外文字。Schema:

{
  "summary": "一句简短、精准的图片描述（30字以内），用于列表展示",
  "tags": {
    "objects": ["物体1", "物体2", "..."],
    "scene": ["场景类型", "具体的地点特征"],
    "action": ["正在发生的动作"],
    "time_context": ["推测的时间", "季节", "节日"]
  },
  "visual_features": {
    "dominant_colors": ["主要颜色1", "主要颜色2"],
    "lighting_mood": "光影氛围 (e.g., 赛博朋克, 温暖午后, 阴郁)",
    "composition": "构图风格 (e.g., 特写, 广角, 对称)"
  },
  "memory_extraction": {
    "ocr_text": "如果图中有文字，请在此提取，无则留空",
    "narrative_caption": "一段详实的描述（100字左右），包含画面细节、人物表情、环境互动，用于生成Embedding向量。",
    "unique_identifier": "画面中最独特、最反直觉或最显眼的一个细节"
  }
}"""
    
    private val _uiState = MutableStateFlow(BatchImportUiState())
    val uiState: StateFlow<BatchImportUiState> = _uiState.asStateFlow()
    
    /**
     * 设置数据仓库
     */
    fun setRepository(repo: ImageMemoryRepository) {
        this.repository = repo
    }
    
    /**
     * 添加图片到导入队列
     */
    fun addImages(uris: List<Uri>) {
        val tasks = uris.map { ImportTask(uri = it) }
        _uiState.update { 
            it.copy(
                tasks = it.tasks + tasks,
                totalCount = it.tasks.size + tasks.size
            )
        }
        AppLog.i(logTag, "Added ${uris.size} images, total: ${_uiState.value.totalCount}")
    }
    
    /**
     * 清空队列
     */
    fun clearQueue() {
        _uiState.update { BatchImportUiState() }
    }
    
    /**
     * 移除单个任务
     */
    fun removeTask(uri: Uri) {
        _uiState.update { state ->
            val newTasks = state.tasks.filter { it.uri != uri }
            state.copy(
                tasks = newTasks,
                totalCount = newTasks.size
            )
        }
    }
    
    /**
     * 开始批量导入
     */
    fun startImport() {
        if (_uiState.value.isImporting) return
        if (_uiState.value.tasks.isEmpty()) return
        
        // 检查模型是否已配置
        if (!mnnBridge.isSessionValid()) {
            _uiState.update { it.copy(errorMessage = "请先配置模型") }
            return
        }
        
        AppLog.i(logTag, "Starting batch import, count: ${_uiState.value.tasks.size}")
        
        importJob = viewModelScope.launch {
            _uiState.update { 
                it.copy(
                    isImporting = true,
                    isCompleted = false,
                    currentIndex = 0,
                    completedCount = 0,
                    failedCount = 0
                )
            }
            
            val tasks = _uiState.value.tasks
            
            for ((index, task) in tasks.withIndex()) {
                if (task.status == ImportStatus.COMPLETED) continue
                
                _uiState.update { state ->
                    val newTasks = state.tasks.toMutableList()
                    newTasks[index] = task.copy(status = ImportStatus.PROCESSING, progress = 0f)
                    state.copy(tasks = newTasks, currentIndex = index)
                }
                
                try {
                    processImage(index, task.uri)
                } catch (e: Exception) {
                    AppLog.e(logTag, "Failed to process image at $index: ${e.message}", e)
                    _uiState.update { state ->
                        val newTasks = state.tasks.toMutableList()
                        newTasks[index] = task.copy(
                            status = ImportStatus.FAILED,
                            errorMessage = e.message
                        )
                        state.copy(
                            tasks = newTasks,
                            failedCount = state.failedCount + 1
                        )
                    }
                }
            }
            
            _uiState.update { 
                it.copy(
                    isImporting = false,
                    isCompleted = true
                )
            }
            
            AppLog.i(logTag, "Batch import completed. Success: ${_uiState.value.completedCount}, Failed: ${_uiState.value.failedCount}")
        }
    }
    
    /**
     * 取消导入
     */
    fun cancelImport() {
        importJob?.cancel()
        _uiState.update { 
            it.copy(
                isImporting = false,
                errorMessage = "导入已取消"
            )
        }
    }
    
    /**
     * 处理单张图片
     */
    private suspend fun processImage(index: Int, uri: Uri) {
        val context = getApplication<Application>()
        
        // 1. 加载图片
        val inputStream = context.contentResolver.openInputStream(uri)
        val bitmap = BitmapFactory.decodeStream(inputStream)
        inputStream?.close()
        
        if (bitmap == null) {
            throw Exception("无法解码图片")
        }
        
        // 2. 保存到临时文件
        val imagePath = saveBitmapToTemp(bitmap, index)
        
        // 3. 更新进度
        _uiState.update { state ->
            val newTasks = state.tasks.toMutableList()
            newTasks[index] = state.tasks[index].copy(progress = 0.3f)
            state.copy(tasks = newTasks)
        }
        
        val settings = cloudSettingsStore.load()
        val cloudOutput = if (!settings.privacyMode) {
            tryCloudInference(imagePath)
        } else {
            null
        }

        if (cloudOutput != null) {
            val parsed = MemoryJsonParser.parse(cloudOutput)
            val normalized = normalizeStructured(parsed.structured, parsed.fallbackSummary, parsed.fallbackNarrative)
            saveMemory(
                uri = uri,
                imagePath = imagePath,
                structured = normalized,
                tokensGenerated = 0,
                inferenceTimeMs = 0
            )
            _uiState.update { state ->
                val newTasks = state.tasks.toMutableList()
                newTasks[index] = state.tasks[index].copy(
                    status = ImportStatus.COMPLETED,
                    progress = 1f,
                    description = normalized.summary,
                    tags = normalized.allTags
                )
                state.copy(
                    tasks = newTasks,
                    completedCount = state.completedCount + 1
                )
            }
        } else {
            // 端侧推理
            val descriptionBuilder = StringBuilder()
            var tokenCount = 0
            mnnBridge.generateStream(
                prompt = prompt,
                imagePath = imagePath,
                maxTokens = 256
            ) { token ->
                descriptionBuilder.append(token)
                tokenCount++
                
                // 更新进度
                val progress = 0.3f + (tokenCount.toFloat() / 256f) * 0.6f
                _uiState.update { state ->
                    val newTasks = state.tasks.toMutableList()
                    newTasks[index] = state.tasks[index].copy(
                        progress = progress.coerceAtMost(0.9f),
                        description = descriptionBuilder.toString()
                    )
                    state.copy(tasks = newTasks)
                }
            }.collect { streamToken ->
                when (streamToken) {
                    is MnnLlmBridge.StreamToken.Complete -> {
                        val rawOutput = descriptionBuilder.toString()
                        val parsed = MemoryJsonParser.parse(rawOutput)
                        val normalized = normalizeStructured(parsed.structured, parsed.fallbackSummary, parsed.fallbackNarrative)
                        
                        saveMemory(
                            uri = uri,
                            imagePath = imagePath,
                            structured = normalized,
                            tokensGenerated = streamToken.totalTokens,
                            inferenceTimeMs = streamToken.decodeTimeMs
                        )
                        
                        _uiState.update { state ->
                            val newTasks = state.tasks.toMutableList()
                            newTasks[index] = state.tasks[index].copy(
                                status = ImportStatus.COMPLETED,
                                progress = 1f,
                                description = normalized.summary,
                                tags = normalized.allTags
                            )
                            state.copy(
                                tasks = newTasks,
                                completedCount = state.completedCount + 1
                            )
                        }
                    }
                    is MnnLlmBridge.StreamToken.Error -> {
                        throw Exception(streamToken.message)
                    }
                    else -> {}
                }
            }
        }
        
        // 释放 bitmap
        bitmap.recycle()
    }
    
    /**
     * 保存图片到临时文件
     */
    private fun saveBitmapToTemp(bitmap: Bitmap, index: Int): String {
        val context = getApplication<Application>()
        val externalDir = context.getExternalFilesDir(null)
        val modelsDir = if (externalDir != null && externalDir.canWrite()) {
            File(externalDir, "models/qwen3-vl-2b-instruct-mnn").also { it.mkdirs() }
        } else {
            context.cacheDir
        }
        
        val maxSize = 420
        val scaledBitmap = if (bitmap.width > maxSize || bitmap.height > maxSize) {
            val scale = minOf(maxSize.toFloat() / bitmap.width, maxSize.toFloat() / bitmap.height)
            val newWidth = (bitmap.width * scale).toInt()
            val newHeight = (bitmap.height * scale).toInt()
            Bitmap.createScaledBitmap(bitmap, newWidth, newHeight, true)
        } else {
            bitmap
        }
        
        val tempFile = File(modelsDir, "batch_input_$index.jpg")
        FileOutputStream(tempFile).use { out ->
            scaledBitmap.compress(Bitmap.CompressFormat.JPEG, 85, out)
        }
        
        tempFile.setReadable(true, false)
        tempFile.setWritable(true, false)
        
        if (scaledBitmap != bitmap) {
            scaledBitmap.recycle()
        }
        
        return tempFile.absolutePath
    }
    
    /**
     * 保存记忆到数据库
     */
    private suspend fun saveMemory(
        uri: Uri,
        imagePath: String,
        structured: NormalizedMemory,
        tokensGenerated: Int,
        inferenceTimeMs: Long
    ) {
        val repo = repository ?: return
        
        val memory = ImageMemory(
            imagePath = imagePath,
            imageUri = uri.toString(),
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
            promptUsed = prompt,
            tokensGenerated = tokensGenerated,
            inferenceTimeMs = inferenceTimeMs,
            firstTokenLatencyMs = 0,
            decodeSpeed = if (inferenceTimeMs > 0) tokensGenerated * 1000f / inferenceTimeMs else 0f
        )
        
        repo.saveMemory(memory)
    }

    private fun normalizeStructured(
        structured: StructuredMemory?,
        fallbackSummary: String,
        fallbackNarrative: String
    ): NormalizedMemory {
        val summary = structured?.summary?.ifBlank { fallbackSummary } ?: fallbackSummary
        val narrative = structured?.memoryExtraction?.narrativeCaption?.ifBlank { fallbackNarrative } ?: fallbackNarrative
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

    private suspend fun tryCloudInference(imagePath: String): String? {
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
     * 清除错误消息
     */
    fun clearError() {
        _uiState.update { it.copy(errorMessage = null) }
    }
}
