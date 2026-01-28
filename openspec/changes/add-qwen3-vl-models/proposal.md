# Change: 集成 Qwen3-VL-2B-Instruct 端侧大模型

> **状态**: ✅ 核心功能已完成 | **最后更新**: 2026-01-28

## Why

为 Android 应用提供端侧视觉语言模型（VLM）能力，使应用能够在本地进行图像理解、OCR、视觉问答等 AI 任务，无需依赖云端服务。

## What Changes

- 添加 Qwen3-VL-2B-Instruct 模型的三种格式支持：
  - **MNN** (主要): Android 端侧推理，taobao-mnn/Qwen3-VL-2B-Instruct-MNN ✅
  - **GGUF Q8_0**: llama.cpp 兼容格式，Qwen/Qwen3-VL-2B-Instruct-GGUF ✅
  - **FP8**: 高精度备用，Qwen/Qwen3-VL-2B-Instruct-FP8 ✅
- 创建模型下载和管理脚本 ✅
- 设计端侧 LLM 推理接口规范 ✅
- 实现 Android Compose UI 集成 ✅
- 真机验证端侧推理 ✅

## Current Status (2026-01-28)

### ✅ 已完成

| 功能 | 验证结果 |
|------|----------|
| MNN 模型加载 | 成功，显示"模型已加载" |
| 端侧 VLM 推理 | 首Token 3224ms, 14.0 tok/s |
| 图像描述生成 | 准确识别动漫插画内容 |
| 中英文提示词 | English/中文切换正常 |
| 性能指标展示 | 首Token/解码速度/总Tokens |
| 流式输出 | 逐字显示生成结果 |

### ❌ 未实现（计划在后续变更中完成）

| 功能 | 计划变更 |
|------|----------|
| 自定义提示词输入 | add-custom-prompt |
| 记忆存储（数据库） | add-image-memory-storage |
| 历史记录页面 | add-image-memory-storage |
| 关键词搜索 | add-image-search |
| 批量处理 | add-batch-processing |

## Impact

- **Affected specs**: on-device-llm (新增)
- **Affected code**:
  - `models/` - 模型存储目录（不纳入版本控制）
  - `scripts/download_models.py` - 下载脚本
  - `app/src/main/java/.../ai/` - 推理接口
  - `app/src/main/java/.../ui/` - Compose UI 组件
  - `app/src/main/jniLibs/` - MNN 原生库
- **Dependencies**: 
  - Python: huggingface_hub
  - Android: MNN SDK (已集成)
- **Storage**: 约 5-6GB 模型文件
- **Memory**: Android 端运行需要至少 4GB RAM

## Performance Metrics (真机测试)

| 指标 | 测量值 |
|------|--------|
| 首 Token 延迟 | 3224ms |
| 解码速度 | 14.0 tok/s |
| 测试 Token 数 | 99 |
| 模型格式 | MNN (Qwen3-VL-2B) |
