package com.example.software.ai

import com.example.software.util.AppLog
import org.json.JSONObject
import java.io.File

/**
 * 模型配置验证器
 * 
 * 确保 MNN 视觉模型配置正确，特别是 is_visual 标志
 * MNN 使用 is_visual 来决定是否创建 Omni 类（支持图片处理）还是普通 Llm 类
 */
object ModelConfigValidator {
    private const val TAG = "ModelConfigValidator"
    
    /**
     * 视觉模型配置所需的字段
     */
    data class VisualModelRequirements(
        val hasIsVisual: Boolean,
        val isVisualValue: Boolean,
        val hasVisualModel: Boolean,
        val visualModelPath: String?,
        val issues: List<String>
    )
    
    /**
     * 验证模型配置是否支持视觉功能
     * 
     * @param configPath 配置文件路径
     * @return 验证结果
     */
    fun validateVisualConfig(configPath: String): VisualModelRequirements {
        val configFile = File(configPath)
        val issues = mutableListOf<String>()
        
        if (!configFile.exists()) {
            return VisualModelRequirements(
                hasIsVisual = false,
                isVisualValue = false,
                hasVisualModel = false,
                visualModelPath = null,
                issues = listOf("配置文件不存在: $configPath")
            )
        }
        
        return try {
            val configContent = configFile.readText()
            val config = JSONObject(configContent)
            
            // 检查 is_visual 字段
            val hasIsVisual = config.has("is_visual")
            val isVisualValue = if (hasIsVisual) config.optBoolean("is_visual", false) else false
            
            // 检查 visual_model 字段
            val hasVisualModel = config.has("visual_model")
            val visualModelPath: String? = if (hasVisualModel) config.optString("visual_model", "") else null
            
            // 收集问题
            if (!hasIsVisual) {
                issues.add("缺少 is_visual 字段 - 模型不会被识别为视觉模型")
            } else if (!isVisualValue) {
                issues.add("is_visual 设置为 false - 模型不会被识别为视觉模型")
            }
            
            if (!hasVisualModel) {
                issues.add("缺少 visual_model 字段 - 可能无法加载视觉编码器")
            } else {
                // 检查 visual.mnn 文件是否存在
                val modelDir = configFile.parentFile
                val visualFile = File(modelDir, visualModelPath ?: "visual.mnn")
                if (!visualFile.exists()) {
                    issues.add("视觉模型文件不存在: ${visualFile.absolutePath}")
                } else {
                    AppLog.i(TAG, "找到视觉模型文件: ${visualFile.absolutePath}")
                }
            }
            
            VisualModelRequirements(
                hasIsVisual = hasIsVisual,
                isVisualValue = isVisualValue,
                hasVisualModel = hasVisualModel,
                visualModelPath = visualModelPath,
                issues = issues
            )
        } catch (e: Exception) {
            AppLog.e(TAG, "解析配置文件失败: ${e.message}", e)
            VisualModelRequirements(
                hasIsVisual = false,
                isVisualValue = false,
                hasVisualModel = false,
                visualModelPath = null,
                issues = listOf("解析配置文件失败: ${e.message}")
            )
        }
    }
    
    /**
     * 修复视觉模型配置
     * 
     * 确保配置包含必要的视觉模型字段
     * 
     * @param configPath 配置文件路径
     * @param enableVisual 是否启用视觉功能
     * @return 是否成功修复
     */
    fun fixVisualConfig(configPath: String, enableVisual: Boolean = true): Boolean {
        val configFile = File(configPath)
        
        if (!configFile.exists()) {
            AppLog.e(TAG, "配置文件不存在: $configPath")
            return false
        }
        
        return try {
            val configContent = configFile.readText()
            val config = JSONObject(configContent)
            
            var modified = false
            
            // 添加或更新 is_visual
            if (!config.has("is_visual") || config.optBoolean("is_visual", false) != enableVisual) {
                config.put("is_visual", enableVisual)
                modified = true
                AppLog.i(TAG, "设置 is_visual = $enableVisual")
            }
            
            // 确保有 visual_model 字段（如果启用视觉）
            if (enableVisual && !config.has("visual_model")) {
                config.put("visual_model", "visual.mnn")
                modified = true
                AppLog.i(TAG, "添加默认 visual_model = visual.mnn")
            }
            
            if (modified) {
                // 格式化 JSON 输出
                configFile.writeText(config.toString(2))
                AppLog.i(TAG, "配置文件已更新: $configPath")
            } else {
                AppLog.i(TAG, "配置文件无需更新")
            }
            
            true
        } catch (e: Exception) {
            AppLog.e(TAG, "修复配置文件失败: ${e.message}", e)
            false
        }
    }
    
    /**
     * 检查模型目录是否包含完整的视觉模型文件
     * 
     * @param modelDir 模型目录
     * @return 文件检查结果
     */
    fun checkVisualModelFiles(modelDir: File): Map<String, Boolean> {
        val requiredFiles = listOf(
            "config.json",
            "llm.mnn",         // LLM 模型
            "visual.mnn",      // 视觉编码器
            "tokenizer.txt"    // 分词器
        )
        
        val optionalFiles = listOf(
            "embeddings_bf16.bin",  // 嵌入层
            "llm_config.json"       // LLM 特定配置
        )
        
        val results = mutableMapOf<String, Boolean>()
        
        for (file in requiredFiles) {
            val exists = File(modelDir, file).exists()
            results[file] = exists
            if (!exists) {
                AppLog.w(TAG, "缺少必需文件: $file")
            }
        }
        
        for (file in optionalFiles) {
            val exists = File(modelDir, file).exists()
            results["(可选) $file"] = exists
        }
        
        return results
    }
    
    /**
     * 判断模型是否为视觉语言模型（基于目录结构）
     */
    fun isVisualLanguageModel(modelDir: File): Boolean {
        // 检查是否有 visual.mnn 文件
        val visualFile = File(modelDir, "visual.mnn")
        if (visualFile.exists()) {
            return true
        }
        
        // 检查目录名称是否包含 VL 相关关键词
        val dirName = modelDir.name.lowercase()
        val vlKeywords = listOf("vl", "vision", "visual", "qwen2-vl", "qwen3-vl", "qwen2.5-vl")
        return vlKeywords.any { dirName.contains(it) }
    }
    
    /**
     * 自动检测并修复视觉模型配置
     * 
     * @param configPath 配置文件路径
     * @return 修复结果描述
     */
    fun autoFixIfNeeded(configPath: String): String {
        val validation = validateVisualConfig(configPath)
        val configFile = File(configPath)
        val modelDir = configFile.parentFile
        
        // 检查是否是视觉模型
        val isVLModel = modelDir?.let { isVisualLanguageModel(it) } ?: false
        
        if (!isVLModel) {
            return "此模型不是视觉语言模型，无需修复"
        }
        
        if (validation.issues.isEmpty()) {
            return "配置正确，无需修复"
        }
        
        // 尝试修复
        val fixed = fixVisualConfig(configPath, enableVisual = true)
        
        return if (fixed) {
            "配置已修复:\n- 设置 is_visual = true\n- 确保 visual_model 字段存在"
        } else {
            "修复失败: ${validation.issues.joinToString(", ")}"
        }
    }
}
