# Tasks: 集成 Qwen3-VL-2B-Instruct 端侧大模型

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

- [ ] 4.1 添加 MNN Android SDK 依赖（需要从官方 APK 提取 .so 文件）
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

## 5. 测试

- [x] 5.1 单元测试
  - [x] 5.1.1 ImageProcessor 测试
  - [ ] 5.1.2 ModelManager 测试（需真机环境）
  - [x] 5.1.3 ImageDescriptionViewModel 测试
- [x] 5.2 UI 测试
  - [x] 5.2.1 ImageDescriptionScreen 测试
  - [x] 5.2.2 组件交互测试
- [ ] 5.3 集成测试（需真机 + MNN 库）
  - [ ] 5.3.1 图片选择流程测试
  - [ ] 5.3.2 模型加载流程测试
- [x] 5.4 测试依赖配置
  - [x] 5.4.1 添加 Robolectric
  - [x] 5.4.2 添加 Mockito
  - [x] 5.4.3 添加 Coroutines Test

## 6. 文档

- [ ] 6.1 更新 README 说明模型下载方式
- [ ] 6.2 添加模型使用示例
- [x] 6.3 添加测试指南 (docs/TESTING_GUIDE.md)
