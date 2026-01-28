# Tasks: 集成 Qwen3-VL-2B-Instruct 端侧大模型

> **状态**: ✅ 核心功能已完成 | **最后更新**: 2026-01-28

## 进度摘要

| 里程碑 | 状态 | 完成日期 |
|--------|------|----------|
| 模型下载工具 | ✅ 完成 | - |
| MNN 模型下载 | ✅ 完成 | - |
| Android UI 框架 | ✅ 完成 | - |
| **端侧推理验证** | ✅ 完成 | 2026-01-28 |

### 真机验证结果 (2026-01-28)

- **设备**: Android 真机
- **模型加载**: 成功 ✅
- **首 Token 延迟**: 3224ms
- **解码速度**: 14.0 tok/s
- **测试图片**: 动漫插画
- **描述质量**: 准确识别"动漫风格、黑色短发、猫耳"等特征

---

## 1. 基础设施

- [x] 1.1 更新 .gitignore 排除模型文件
- [x] 1.2 创建 models/ 目录结构
- [x] 1.3 创建 models/models.json 模型索引配置

## 2. 下载工具

- [x] 2.1 创建 scripts/requirements.txt
- [x] 2.2 创建 scripts/download_models.py 下载脚本
- [x] 2.3 支持选择性下载（mnn/gguf/fp8）
- [x] 2.4 支持断点续传

## 3. 模型下载

- [x] 3.1 下载 MNN 格式模型 (taobao-mnn/Qwen3-VL-2B-Instruct-MNN) - 1.37 GB
- [x] 3.2 下载 GGUF Q8_0 格式模型 (Qwen/Qwen3-VL-2B-Instruct-GGUF) - 2.89 GB
- [x] 3.3 下载 FP8 格式模型 (Qwen/Qwen3-VL-2B-Instruct-FP8) - 3.24 GB

## 4. Android 集成

- [x] 4.1 添加 MNN Android SDK 依赖
  - [x] 4.1.1 提取 libMNN.so, libmnnllmapp.so 等原生库
  - [x] 4.1.2 配置 jniLibs/arm64-v8a/ 目录
  - [x] 4.1.3 真机验证 JNI 加载成功
- [x] 4.2 创建 ModelManager.kt 模型加载管理
- [x] 4.3 创建 QwenVLInference.kt 推理接口
- [x] 4.4 创建 ImageProcessor.kt 图像预处理
- [x] 4.5 创建 MnnLlmBridge.kt JNI 桥接层
- [x] 4.6 集成到 Compose UI
  - [x] 4.6.1 创建 ImageDescriptionViewModel.kt
  - [x] 4.6.2 创建 ImageDescriptionScreen.kt 主界面
  - [x] 4.6.3 创建 ImagePickerButton.kt 图片选择组件
  - [x] 4.6.4 创建 DescriptionCard.kt 描述展示组件
  - [x] 4.6.5 创建 PerformanceIndicator.kt 性能指标组件
  - [x] 4.6.6 更新 MainActivity.kt 集成主界面
  - [x] 4.6.7 更新 build.gradle.kts 添加依赖和 NDK 配置
  - [x] 4.6.8 更新 AndroidManifest.xml 添加权限
- [x] 4.7 端侧推理功能验证
  - [x] 4.7.1 模型加载到内存
  - [x] 4.7.2 图像预处理流程
  - [x] 4.7.3 VLM 推理生成描述
  - [x] 4.7.4 流式输出显示
  - [x] 4.7.5 性能指标采集

## 5. 测试

- [x] 5.1 单元测试
  - [x] 5.1.1 ImageProcessor 测试
  - [x] 5.1.2 ImageDescriptionViewModel 测试
- [x] 5.2 UI 测试
  - [x] 5.2.1 ImageDescriptionScreen 测试
  - [x] 5.2.2 组件交互测试
- [x] 5.3 真机集成测试
  - [x] 5.3.1 图片选择流程 ✅
  - [x] 5.3.2 模型加载流程 ✅
  - [x] 5.3.3 端侧推理流程 ✅
- [x] 5.4 测试依赖配置
  - [x] 5.4.1 添加 Robolectric
  - [x] 5.4.2 添加 Mockito
  - [x] 5.4.3 添加 Coroutines Test

## 6. 文档

- [ ] 6.1 更新 README 说明模型下载方式
- [ ] 6.2 添加模型使用示例
- [x] 6.3 添加测试指南 (docs/TESTING_GUIDE.md)

---

## 当前能力

| 功能 | 状态 | 说明 |
|------|------|------|
| 单图推理 | ✅ | 选择图片 → VLM 生成描述 |
| 中英文切换 | ✅ | English/中文 提示词切换 |
| 性能监控 | ✅ | 首Token/解码速度/总Tokens |
| 流式输出 | ✅ | 逐字显示生成结果 |

## 待实现功能（后续变更）

| 功能 | 优先级 | 说明 |
|------|--------|------|
| 自定义提示词 | 中 | 支持用户输入任意问题 |
| 记忆存储 | 高 | 保存图片描述到数据库 |
| 历史记录 | 高 | 查看已处理的图片 |
| 关键词搜索 | 高 | 通过描述搜索图片 |
| 批量处理 | 低 | 后台处理多张图片 |
