# Change: 集成 Qwen3-VL-2B-Instruct 端侧大模型

## Why

为 Android 应用提供端侧视觉语言模型（VLM）能力，使应用能够在本地进行图像理解、OCR、视觉问答等 AI 任务，无需依赖云端服务。

## What Changes

- 添加 Qwen3-VL-2B-Instruct 模型的三种格式支持：
  - **MNN** (主要): Android 端侧推理，taobao-mnn/Qwen3-VL-2B-Instruct-MNN
  - **GGUF Q8_0**: llama.cpp 兼容格式，Qwen/Qwen3-VL-2B-Instruct-GGUF
  - **FP8**: 高精度备用，Qwen/Qwen3-VL-2B-Instruct-FP8
- 创建模型下载和管理脚本
- 设计端侧 LLM 推理接口规范

## Impact

- **Affected specs**: on-device-llm (新增)
- **Affected code**:
  - `models/` - 模型存储目录（不纳入版本控制）
  - `scripts/download_models.py` - 下载脚本
  - `app/src/main/java/.../ai/` - 推理接口（后续实现）
- **Dependencies**: 
  - Python: huggingface_hub
  - Android: MNN SDK (后续添加)
- **Storage**: 约 5-6GB 模型文件
- **Memory**: Android 端运行需要至少 4GB RAM
