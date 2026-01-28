package com.example.software.ai

import android.app.ActivityManager
import android.content.Context
import com.example.software.util.AppLog
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import java.io.File

/**
 * 模型管理器
 * 
 * 负责模型文件的加载、验证和生命周期管理
 */
class ModelManager(private val context: Context) {
    
    companion object {
        private const val TAG = "ModelManager"
        
        // 模型目录名称
        const val MODELS_DIR = "models"
        const val MNN_MODEL_DIR = "qwen3-vl-2b-instruct-mnn"
        const val GGUF_MODEL_DIR = "qwen3-vl-2b-instruct-gguf"
        
        // MNN 模型文件
        const val MNN_CONFIG_FILE = "config.json"
        const val MNN_LLM_FILE = "llm.mnn"
        
        // 最小可用内存要求 (3GB，为模型加载留出空间)
        const val MIN_AVAILABLE_RAM_MB = 3072L
        
        // 最小总内存要求 (4GB)
        const val MIN_TOTAL_RAM_MB = 4096L
    }
    
    private val activityManager: ActivityManager by lazy {
        context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
    }
    
    /**
     * 模型加载状态
     */
    sealed interface ModelState {
        object NotLoaded : ModelState
        object Loading : ModelState
        data class Loaded(val modelPath: String) : ModelState
        data class Error(val message: String) : ModelState
    }
    
    private val _modelState = MutableStateFlow<ModelState>(ModelState.NotLoaded)
    val modelState: StateFlow<ModelState> = _modelState.asStateFlow()
    
    private var modelPath: String? = null
    
    /**
     * 获取模型存储目录
     * 
     * 优先使用外部存储，如果不可用则使用内部存储
     */
    fun getModelsDirectory(): File {
        // 优先使用外部存储 (更大空间)
        val externalDir = context.getExternalFilesDir(null)
        if (externalDir != null && externalDir.canWrite()) {
            return File(externalDir, MODELS_DIR)
        }
        // 回退到内部存储
        return File(context.filesDir, MODELS_DIR)
    }
    
    /**
     * 检查 MNN 模型是否存在
     */
    fun isMnnModelAvailable(): Boolean {
        val modelDir = File(getModelsDirectory(), MNN_MODEL_DIR)
        val configFile = File(modelDir, MNN_CONFIG_FILE)
        return modelDir.exists() && configFile.exists()
    }
    
    /**
     * 检查设备是否满足最低内存要求
     * 
     * 使用 ActivityManager 获取真实的设备内存信息
     */
    fun hasEnoughMemory(): Boolean {
        val memoryInfo = ActivityManager.MemoryInfo()
        activityManager.getMemoryInfo(memoryInfo)
        
        // 检查设备总内存
        val totalMemoryMb = memoryInfo.totalMem / (1024 * 1024)
        if (totalMemoryMb < MIN_TOTAL_RAM_MB) {
            return false
        }
        
        // 检查可用内存
        val availableMemoryMb = memoryInfo.availMem / (1024 * 1024)
        return availableMemoryMb >= MIN_AVAILABLE_RAM_MB
    }
    
    /**
     * 获取可用内存 (MB)
     * 
     * 返回设备当前可用的实际内存
     */
    fun getAvailableMemoryMb(): Long {
        val memoryInfo = ActivityManager.MemoryInfo()
        activityManager.getMemoryInfo(memoryInfo)
        return memoryInfo.availMem / (1024 * 1024)
    }
    
    /**
     * 获取设备总内存 (MB)
     */
    fun getTotalMemoryMb(): Long {
        val memoryInfo = ActivityManager.MemoryInfo()
        activityManager.getMemoryInfo(memoryInfo)
        return memoryInfo.totalMem / (1024 * 1024)
    }
    
    /**
     * 检查是否处于低内存状态
     */
    fun isLowMemory(): Boolean {
        val memoryInfo = ActivityManager.MemoryInfo()
        activityManager.getMemoryInfo(memoryInfo)
        return memoryInfo.lowMemory
    }
    
    /**
     * 加载 MNN 模型
     */
    suspend fun loadMnnModel(): Result<String> = withContext(Dispatchers.IO) {
        AppLog.i(TAG, "loadMnnModel start")
        _modelState.value = ModelState.Loading
        
        try {
            // 检查内存
            if (!hasEnoughMemory()) {
                val availableMb = getAvailableMemoryMb()
                val totalMb = getTotalMemoryMb()
                val error = "内存不足，当前可用 ${availableMb}MB / 总共 ${totalMb}MB，需要至少 ${MIN_AVAILABLE_RAM_MB}MB 可用内存"
                AppLog.e(TAG, "Memory check failed: $error")
                _modelState.value = ModelState.Error(error)
                return@withContext Result.failure(Exception(error))
            }
            
            // 检查模型文件
            if (!isMnnModelAvailable()) {
                val error = "MNN 模型文件不存在，请先下载模型"
                AppLog.e(TAG, "Model not available: $error")
                _modelState.value = ModelState.Error(error)
                return@withContext Result.failure(Exception(error))
            }
            
            val modelDir = File(getModelsDirectory(), MNN_MODEL_DIR)
            val configPath = File(modelDir, MNN_CONFIG_FILE).absolutePath
            AppLog.i(TAG, "Model directory: ${modelDir.absolutePath}")
            AppLog.i(TAG, "Config path: $configPath")
            
            // 验证并修复视觉模型配置
            // 这是关键步骤：MNN 使用 is_visual 字段决定是否创建 Omni 类来处理图片
            val configValidation = ModelConfigValidator.validateVisualConfig(configPath)
            if (configValidation.issues.isNotEmpty()) {
                AppLog.w(TAG, "模型配置问题: ${configValidation.issues.joinToString(", ")}")
                
                // 如果是视觉模型但配置不正确，尝试修复
                if (ModelConfigValidator.isVisualLanguageModel(modelDir)) {
                    val fixResult = ModelConfigValidator.autoFixIfNeeded(configPath)
                    AppLog.i(TAG, "配置修复结果: $fixResult")
                }
            } else {
                AppLog.i(TAG, "视觉模型配置正确: is_visual=${configValidation.isVisualValue}")
            }
            
            // TODO: 实际加载 MNN 模型
            // 这里需要集成 MNN SDK 后实现
            // val session = MNN.createSession(configPath)
            
            modelPath = configPath
            _modelState.value = ModelState.Loaded(configPath)
            AppLog.i(TAG, "Model state loaded")
            
            Result.success(configPath)
        } catch (e: Exception) {
            val error = "加载模型失败: ${e.message}"
            AppLog.e(TAG, error, e)
            _modelState.value = ModelState.Error(error)
            Result.failure(e)
        }
    }
    
    /**
     * 卸载模型，释放资源
     */
    fun unloadModel() {
        // TODO: 释放 MNN 资源
        modelPath = null
        _modelState.value = ModelState.NotLoaded
    }
    
    /**
     * 获取模型信息
     */
    fun getModelInfo(): ModelInfo? {
        val modelDir = File(getModelsDirectory(), MNN_MODEL_DIR)
        if (!modelDir.exists()) return null
        
        // 计算模型目录大小
        val sizeBytes = modelDir.walkTopDown()
            .filter { it.isFile }
            .sumOf { it.length() }
        
        return ModelInfo(
            name = "Qwen3-VL-2B-Instruct",
            format = "MNN",
            sizeMb = sizeBytes / (1024 * 1024),
            path = modelDir.absolutePath,
            isLoaded = _modelState.value is ModelState.Loaded
        )
    }
    
    /**
     * 模型信息数据类
     */
    data class ModelInfo(
        val name: String,
        val format: String,
        val sizeMb: Long,
        val path: String,
        val isLoaded: Boolean
    )
}
