package com.example.software.ui.viewmodels

import android.app.Application
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.software.ai.MnnLlmBridge
import com.example.software.ai.ModelManager
import com.example.software.data.local.entity.ImageMemory
import com.example.software.data.repository.ImageMemoryRepository
import com.example.software.util.AppLog
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
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
    
    private var repository: ImageMemoryRepository? = null
    private var importJob: Job? = null
    
    // 中文提示词
    private val prompt = """分析这张图片，提供以下信息：
1. 简短描述（1-2句话）
2. 标签：列出图片中可见的主要物体、场景、颜色、人物、食物、动物、活动等

请按以下格式输出：
描述：[你的描述]
标签：标签1, 标签2, 标签3, ..."""
    
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
        
        // 4. 执行推理
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
                    // 5. 解析结果
                    val (description, tags) = parseDescriptionAndTags(descriptionBuilder.toString())
                    
                    // 6. 保存到数据库
                    saveMemory(uri, imagePath, description, tags, streamToken.totalTokens, streamToken.decodeTimeMs)
                    
                    // 7. 更新状态
                    _uiState.update { state ->
                        val newTasks = state.tasks.toMutableList()
                        newTasks[index] = state.tasks[index].copy(
                            status = ImportStatus.COMPLETED,
                            progress = 1f,
                            description = description,
                            tags = tags
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
        description: String,
        tags: List<String>,
        tokensGenerated: Int,
        inferenceTimeMs: Long
    ) {
        val repo = repository ?: return
        
        val memory = ImageMemory(
            imagePath = imagePath,
            imageUri = uri.toString(),
            description = description,
            tags = tags,
            tagsString = tags.joinToString(","),
            promptUsed = prompt,
            tokensGenerated = tokensGenerated,
            inferenceTimeMs = inferenceTimeMs,
            firstTokenLatencyMs = 0,
            decodeSpeed = if (inferenceTimeMs > 0) tokensGenerated * 1000f / inferenceTimeMs else 0f
        )
        
        repo.saveMemory(memory)
    }
    
    /**
     * 解析描述和标签
     */
    private fun parseDescriptionAndTags(rawOutput: String): Pair<String, List<String>> {
        val lines = rawOutput.lines()
        var description = rawOutput
        val tags = mutableListOf<String>()
        
        for (line in lines) {
            val trimmed = line.trim()
            when {
                trimmed.startsWith("Description:", ignoreCase = true) -> {
                    description = trimmed.substringAfter(":").trim()
                }
                trimmed.startsWith("描述：") || trimmed.startsWith("描述:") -> {
                    description = trimmed.substringAfter("：").substringAfter(":").trim()
                }
                trimmed.startsWith("Tags:", ignoreCase = true) -> {
                    val tagsPart = trimmed.substringAfter(":").trim()
                    tags.addAll(parseTags(tagsPart))
                }
                trimmed.startsWith("标签：") || trimmed.startsWith("标签:") -> {
                    val tagsPart = trimmed.substringAfter("：").substringAfter(":").trim()
                    tags.addAll(parseTags(tagsPart))
                }
            }
        }
        
        return Pair(description, tags.distinct().take(15))
    }
    
    private fun parseTags(tagsPart: String): List<String> {
        return tagsPart
            .split(",", "，", "、", " ")
            .map { it.trim() }
            .filter { it.isNotBlank() && it.length > 1 }
    }
    
    /**
     * 清除错误消息
     */
    fun clearError() {
        _uiState.update { it.copy(errorMessage = null) }
    }
}
