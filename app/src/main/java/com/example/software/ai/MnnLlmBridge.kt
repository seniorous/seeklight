package com.example.software.ai

import com.alibaba.mnnllm.android.llm.GenerateProgressListener
import com.alibaba.mnnllm.android.llm.LlmSession
import com.example.software.util.AppLog
import android.util.Base64
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.withContext
import java.io.File

/**
 * MNN LLM JNI 桥接层
 * 
 * 使用 MNN 官方的 LlmSession 类进行推理
 * 包名 com.alibaba.mnnllm.android.llm 与 libmnnllmapp.so 中的 JNI 签名匹配
 */
class MnnLlmBridge private constructor() {
    
    companion object {
        private const val TAG = "MnnLlmBridge"
        
        @Volatile
        private var instance: MnnLlmBridge? = null
        
        /**
         * 获取单例实例
         */
        fun getInstance(): MnnLlmBridge {
            return instance ?: synchronized(this) {
                instance ?: MnnLlmBridge().also { instance = it }
            }
        }
        
        /**
         * 加载原生库
         */
        fun loadLibrary(): Boolean {
            return LlmSession.loadLibrary()
        }
        
        /**
         * 检查库是否已加载
         */
        fun isLoaded(): Boolean = LlmSession.isLoaded()
    }
    
    // MNN 官方 LLM 会话
    private var session: LlmSession? = null
    
    /**
     * 初始化 LLM 会话
     * 
     * @param configPath 模型配置文件路径 (config.json)
     * @return 是否成功
     */
    suspend fun initSession(configPath: String): Boolean = withContext(Dispatchers.IO) {
        if (!LlmSession.isLoaded()) {
            AppLog.e(TAG, "Native library not loaded")
            return@withContext false
        }
        
        try {
            // 释放旧会话
            session?.release()
            
            // 创建新会话
            AppLog.i(TAG, "Initializing session with configPath=$configPath")
            val newSession = LlmSession(configPath)
            val success = newSession.load()
            
            if (success) {
                session = newSession
                AppLog.i(TAG, "LLM session initialized successfully")
            } else {
                AppLog.e(TAG, "Failed to load LLM session")
            }
            
            success
        } catch (e: UnsatisfiedLinkError) {
            AppLog.e(TAG, "JNI method not found: ${e.message}")
            false
        } catch (e: Exception) {
            AppLog.e(TAG, "Failed to create session: ${e.message}", e)
            false
        }
    }
    
    /**
     * 释放会话资源
     */
    fun releaseSession() {
        AppLog.i(TAG, "Releasing session")
        session?.release()
        session = null
    }
    
    /**
     * 生成文本响应（非流式）
     * 
     * @param prompt 输入提示
     * @param imagePath 图像路径（可选，使用 <img>path</img> 格式嵌入）
     * @param maxTokens 最大生成 token 数
     * @return 生成的文本
     */
    suspend fun generate(
        prompt: String,
        imagePath: String? = null,
        maxTokens: Int = 512
    ): Result<GenerationResult> = withContext(Dispatchers.IO) {
        val currentSession = session
        if (currentSession == null || !currentSession.isInitialized()) {
            return@withContext Result.failure(Exception("Session not initialized"))
        }
        
        try {
            val normalizedPrompt = prompt.toByteArray(Charsets.UTF_8).toString(Charsets.UTF_8)
            if (normalizedPrompt != prompt) {
                AppLog.w(TAG, "Prompt normalized using UTF-8")
            }
            val promptBytes = normalizedPrompt.toByteArray(Charsets.UTF_8)
            val promptBase64 = Base64.encodeToString(promptBytes, Base64.NO_WRAP)
            AppLog.i(TAG, "Prompt utf8 bytes=${promptBytes.size}, base64=$promptBase64")
            val imageInfo = imagePath?.let {
                val file = File(it)
                "path=$it, exists=${file.exists()}, size=${file.length()}"
            } ?: "none"
            AppLog.i(
                TAG,
                "Generate start, promptLen=${normalizedPrompt.length}, maxTokens=$maxTokens, image=$imageInfo"
            )
            val startTime = System.currentTimeMillis()
            var tokenCount = 0
            var prefillTime: Long = 0
            var isFirstToken = true
            val responseBuilder = StringBuilder()
            
            // 构建输入（如果有图片，使用 MNN 的图片格式）
            // 注意：官方格式是 <img>路径</img>文本，中间无换行符
            val input = if (imagePath != null) {
                "<img>$imagePath</img>$normalizedPrompt"
            } else {
                normalizedPrompt
            }
            
            AppLog.d(TAG, "Generated input for LLM: ${input.take(100)}...")
            
            // 设置最大 token 数
            currentSession.updateMaxNewTokens(maxTokens)
            
            // 创建进度监听器
            val listener = object : GenerateProgressListener {
                override fun onProgress(progress: String?): Boolean {
                    if (progress != null) {
                        if (isFirstToken) {
                            prefillTime = System.currentTimeMillis() - startTime
                            isFirstToken = false
                        }
                        tokenCount++
                        responseBuilder.append(progress)
                    }
                    return false // 继续生成
                }
            }
            
            // 调用 MNN 生成
            val result = currentSession.generate(input, listener)
            
            val totalTime = System.currentTimeMillis() - startTime
            val decodeTime = totalTime - prefillTime
            val tokensPerSecond = if (decodeTime > 0) {
                tokenCount * 1000.0 / decodeTime
            } else 0.0
            
            // 获取响应文本
            val responseText = result["response"] as? String 
                ?: responseBuilder.toString()
            
            AppLog.i(
                TAG,
                "Generate complete, tokens=$tokenCount, prefillMs=$prefillTime, totalMs=$totalTime"
            )
            Result.success(GenerationResult(
                text = responseText,
                totalTokens = tokenCount,
                totalTimeMs = totalTime,
                prefillTimeMs = prefillTime,
                decodeTimeMs = decodeTime,
                tokensPerSecond = tokensPerSecond
            ))
        } catch (e: Exception) {
            AppLog.e(TAG, "Generation failed: ${e.message}", e)
            Result.failure(e)
        }
    }
    
    /**
     * 流式生成文本
     */
    fun generateStream(
        prompt: String,
        imagePath: String? = null,
        maxTokens: Int = 512,
        onToken: (String) -> Unit
    ): Flow<StreamToken> = flow {
        val currentSession = session
        if (currentSession == null || !currentSession.isInitialized()) {
            AppLog.e(TAG, "Generate stream failed: session not initialized")
            emit(StreamToken.Error("Session not initialized"))
            return@flow
        }
        
        val startTime = System.currentTimeMillis()
        var tokenCount = 0
        var prefillTime: Long = 0
        var isFirstToken = true
        var totalChars = 0
        var nullProgressCount = 0
        
        try {
            val normalizedPrompt = prompt.toByteArray(Charsets.UTF_8).toString(Charsets.UTF_8)
            if (normalizedPrompt != prompt) {
                AppLog.w(TAG, "Prompt normalized using UTF-8")
            }
            val promptBytes = normalizedPrompt.toByteArray(Charsets.UTF_8)
            val promptBase64 = Base64.encodeToString(promptBytes, Base64.NO_WRAP)
            AppLog.i(TAG, "Prompt utf8 bytes=${promptBytes.size}, base64=$promptBase64")
            val imageInfo = imagePath?.let {
                val file = File(it)
                "path=$it, exists=${file.exists()}, size=${file.length()}"
            } ?: "none"
            AppLog.i(
                TAG,
                "Generate stream start, promptLen=${normalizedPrompt.length}, maxTokens=$maxTokens, image=$imageInfo"
            )
            AppLog.i(TAG, "Prompt preview: ${normalizedPrompt.take(200)}")
            // 构建输入
            // MNN VL 模型使用 <img>path</img>text 格式传递图片
            // 官方格式没有换行符：<img>路径</img>文本
            val input = if (imagePath != null) {
                "<img>$imagePath</img>$normalizedPrompt"
            } else {
                normalizedPrompt
            }
            
            AppLog.i(TAG, "Input for generation: ${input.take(200)}...")
            
            // 设置最大 token 数
            currentSession.updateMaxNewTokens(maxTokens)
            
            // 创建进度监听器
            val listener = object : GenerateProgressListener {
                override fun onProgress(progress: String?): Boolean {
                    if (progress == null) {
                        nullProgressCount++
                        if (nullProgressCount == 1) {
                            AppLog.w(TAG, "Progress callback returned null")
                        }
                        return false
                    }
                    if (isFirstToken) {
                        prefillTime = System.currentTimeMillis() - startTime
                        isFirstToken = false
                        AppLog.i(TAG, "First token received, prefillMs=$prefillTime")
                    }
                    tokenCount++
                    totalChars += progress.length
                    if (tokenCount == 1 || tokenCount % 50 == 0) {
                        val tokenBytes = progress.toByteArray(Charsets.UTF_8)
                        val tokenBase64 = Base64.encodeToString(tokenBytes, Base64.NO_WRAP)
                        AppLog.i(
                            TAG,
                            "Token[$tokenCount] len=${progress.length} totalChars=$totalChars " +
                                "preview='${progress.take(50)}' utf8Bytes=${tokenBytes.size} base64=$tokenBase64"
                        )
                    }
                    onToken(progress)
                    return false
                }
            }
            
            // 调用 MNN 生成
            val result = currentSession.generate(input, listener)
            
            AppLog.i(TAG, "Generation result keys=[${result.keys.joinToString(", ")}]")
            AppLog.i(
                TAG,
                "Result values: prompt_len=${result["prompt_len"]}, prefill_time=${result["prefill_time"]}, " +
                    "decode_len=${result["decode_len"]}, decode_time=${result["decode_time"]}, " +
                    "vision_time=${result["vision_time"]}, audio_time=${result["audio_time"]}"
            )
            
            // 检查是否有错误
            val error = result["error"] as? String
            if (error != null) {
                AppLog.e(TAG, "Generation error: $error")
            }
            
            // 获取完整响应（如果回调没有收到）
            val fullResponse = result["response"] as? String
            if (fullResponse != null) {
                AppLog.i(
                    TAG,
                    "Result response length=${fullResponse.length}, preview='${fullResponse.take(200)}'"
                )
            } else {
                AppLog.w(TAG, "Result response missing or null")
            }
            if (fullResponse != null && fullResponse.isNotEmpty() && tokenCount == 0) {
                // 如果回调没有收到 token，但结果中有响应，使用结果
                AppLog.d(TAG, "Using response from result: ${fullResponse.take(100)}")
                onToken(fullResponse)
                tokenCount = fullResponse.length / 2 // 估算 token 数
            }
            
            val totalTime = System.currentTimeMillis() - startTime
            val decodeTime = totalTime - prefillTime
            val tokensPerSecond = if (decodeTime > 0 && tokenCount > 0) {
                tokenCount * 1000.0 / decodeTime
            } else 0.0
            
            AppLog.i(
                TAG,
                "Generate stream complete, tokens=$tokenCount, totalChars=$totalChars, " +
                    "prefillMs=$prefillTime, decodeMs=$decodeTime, nullProgress=$nullProgressCount"
            )
            emit(
                StreamToken.Complete(
                    totalTokens = tokenCount,
                    prefillTimeMs = prefillTime,
                    decodeTimeMs = decodeTime,
                    tokensPerSecond = tokensPerSecond
                )
            )
        } catch (e: Exception) {
            AppLog.e(TAG, "Generate stream failed: ${e.message}", e)
            emit(StreamToken.Error(e.message ?: "Generation failed"))
        }
    }.flowOn(Dispatchers.IO)
    
    /**
     * 重置会话历史
     */
    fun resetSession() {
        AppLog.i(TAG, "Reset session")
        session?.reset()
    }
    
    /**
     * 更新系统提示
     */
    fun updateSystemPrompt(prompt: String) {
        AppLog.i(TAG, "Update system prompt, length=${prompt.length}")
        session?.updateSystemPrompt(prompt)
    }
    
    /**
     * 获取调试信息
     */
    fun getDebugInfo(): String {
        return session?.getDebugInfo() ?: "Session not initialized"
    }
    
    /**
     * 检查会话是否有效
     */
    fun isSessionValid(): Boolean = session?.isInitialized() == true
    
    // ========== Data Classes ==========
    
    /**
     * 生成结果
     */
    data class GenerationResult(
        val text: String,
        val totalTokens: Int,
        val totalTimeMs: Long,
        val prefillTimeMs: Long,
        val decodeTimeMs: Long,
        val tokensPerSecond: Double
    )
    
    /**
     * 流式 Token
     */
    sealed interface StreamToken {
        data class Token(val text: String) : StreamToken
        data class Complete(
            val totalTokens: Int,
            val prefillTimeMs: Long,
            val decodeTimeMs: Long,
            val tokensPerSecond: Double
        ) : StreamToken
        data class Error(val message: String) : StreamToken
    }
}
