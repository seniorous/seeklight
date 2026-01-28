// Copyright (c) 2024 Alibaba Group Holding Limited All rights reserved.
// Simplified version for MNN LLM integration

package com.alibaba.mnnllm.android.llm

import com.example.software.util.AppLog

/**
 * MNN LLM 会话
 * 
 * 封装 MNN 原生 LLM 推理功能的 JNI 绑定
 * 
 * 注意：此类的包名必须是 com.alibaba.mnnllm.android.llm
 * 以匹配 libmnnllmapp.so 中的 JNI 方法签名
 */
class LlmSession(
    private val configPath: String,
    private val history: List<String>? = null
) {
    companion object {
        private const val TAG = "LlmSession"
        
        @Volatile
        private var isLibraryLoaded = false
        
        /**
         * 加载原生库
         */
        fun loadLibrary(): Boolean {
            if (isLibraryLoaded) return true
            
            return try {
                System.loadLibrary("MNN")
                AppLog.i(TAG, "Loaded libMNN.so")
                
                System.loadLibrary("mnnllmapp")
                AppLog.i(TAG, "Loaded libmnnllmapp.so")
                
                isLibraryLoaded = true
                true
            } catch (e: UnsatisfiedLinkError) {
                AppLog.e(TAG, "Failed to load MNN libraries: ${e.message}")
                false
            }
        }
        
        fun isLoaded(): Boolean = isLibraryLoaded
    }
    
    // 原生指针
    private var nativePtr: Long = 0
    
    @Volatile
    private var isLoading = false
    
    @Volatile
    private var isGenerating = false
    
    @Volatile
    private var releaseRequested = false
    
    /**
     * 加载模型
     */
    fun load(): Boolean {
        if (!isLibraryLoaded) {
            AppLog.e(TAG, "Library not loaded")
            return false
        }
        
        synchronized(this) {
            isLoading = true
            try {
                // 构建最小配置
                val configJson = """{"is_r1": false, "mmap_dir": "", "keep_history": false}"""
                val mergedConfig = "{}"
                
                AppLog.d(TAG, "Initializing LLM session with config: $configPath")
                nativePtr = initNative(configPath, history, mergedConfig, configJson)
                
                AppLog.d(TAG, "LLM session initialized, nativePtr: $nativePtr")
                return nativePtr != 0L
            } catch (e: Exception) {
                AppLog.e(TAG, "Failed to initialize LLM session: ${e.message}", e)
                return false
            } finally {
                isLoading = false
                if (releaseRequested) {
                    releaseInner()
                }
            }
        }
    }
    
    /**
     * 生成文本
     * 
     * @param prompt 输入提示（可包含图片路径，格式：<img>path</img>text）
     * @param progressListener 进度监听器
     * @return 生成结果，包含 "response" 键
     */
    fun generate(
        prompt: String,
        progressListener: GenerateProgressListener
    ): HashMap<String, Any> {
        if (nativePtr == 0L) {
            AppLog.e(TAG, "Session not initialized")
            return hashMapOf("response" to "", "error" to "Session not initialized")
        }
        
        synchronized(this) {
            isGenerating = true
            try {
                AppLog.i(TAG, "Generating response for prompt: ${prompt.take(100)}...")
                val result = submitNative(nativePtr, prompt, false, progressListener)
                AppLog.i(TAG, "Generation complete")
                return result
            } catch (e: Exception) {
                AppLog.e(TAG, "Generation failed: ${e.message}", e)
                return hashMapOf("response" to "", "error" to (e.message ?: "Unknown error"))
            } finally {
                isGenerating = false
                if (releaseRequested) {
                    releaseInner()
                }
            }
        }
    }
    
    /**
     * 重置会话
     */
    fun reset() {
        synchronized(this) {
            if (nativePtr != 0L) {
                resetNative(nativePtr)
            }
        }
    }
    
    /**
     * 释放资源
     */
    fun release() {
        synchronized(this) {
            if (!isGenerating && !isLoading) {
                releaseInner()
            } else {
                releaseRequested = true
            }
        }
    }
    
    private fun releaseInner() {
        if (nativePtr != 0L) {
            AppLog.d(TAG, "Releasing LLM session")
            releaseNative(nativePtr)
            nativePtr = 0
        }
    }
    
    /**
     * 获取调试信息
     */
    fun getDebugInfo(): String {
        return if (nativePtr != 0L) {
            try {
                getDebugInfoNative(nativePtr)
            } catch (e: Exception) {
                "Error getting debug info: ${e.message}"
            }
        } else {
            "Session not initialized"
        }
    }
    
    /**
     * 更新系统提示
     */
    fun updateSystemPrompt(prompt: String) {
        if (nativePtr != 0L) {
            updateSystemPromptNative(nativePtr, prompt)
        }
    }
    
    /**
     * 更新最大生成 token 数
     */
    fun updateMaxNewTokens(maxTokens: Int) {
        if (nativePtr != 0L) {
            updateMaxNewTokensNative(nativePtr, maxTokens)
        }
    }
    
    /**
     * 检查会话是否已初始化
     */
    fun isInitialized(): Boolean = nativePtr != 0L
    
    // ==================== JNI 方法声明 ====================
    // 这些方法名必须与 libmnnllmapp.so 中的 JNI 函数匹配
    
    private external fun initNative(
        configPath: String?,
        history: List<String>?,
        mergedConfigStr: String?,
        configJsonStr: String?
    ): Long
    
    private external fun submitNative(
        instanceId: Long,
        input: String,
        keepHistory: Boolean,
        listener: GenerateProgressListener
    ): HashMap<String, Any>
    
    private external fun resetNative(instanceId: Long)
    
    private external fun getDebugInfoNative(instanceId: Long): String
    
    private external fun releaseNative(instanceId: Long)
    
    private external fun updateSystemPromptNative(llmPtr: Long, systemPrompt: String)
    
    private external fun updateMaxNewTokensNative(llmPtr: Long, maxNewTokens: Int)
    
    private external fun updateConfigNative(llmPtr: Long, configJson: String)
    
    private external fun setWavformCallbackNative(
        instanceId: Long,
        listener: AudioDataListener?
    ): Boolean
    
    private external fun updateEnableAudioOutputNative(llmPtr: Long, enable: Boolean)
}
