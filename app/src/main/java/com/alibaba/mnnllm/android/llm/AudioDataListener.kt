// Copyright (c) 2024 Alibaba Group Holding Limited All rights reserved.
// Simplified version for MNN LLM integration

package com.alibaba.mnnllm.android.llm

/**
 * 音频数据监听器（预留接口）
 */
interface AudioDataListener {
    fun onAudioData(data: ByteArray?)
}
