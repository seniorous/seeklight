// Copyright (c) 2024 Alibaba Group Holding Limited All rights reserved.
// Simplified version for MNN LLM integration

package com.alibaba.mnnllm.android.llm

/**
 * 生成进度监听器
 * 
 * 用于接收流式生成的 token
 */
interface GenerateProgressListener {
    /**
     * 接收生成的 token
     * 
     * @param progress 生成的文本片段
     * @return true 停止生成，false 继续生成
     */
    fun onProgress(progress: String?): Boolean
}
