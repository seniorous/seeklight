## ADDED Requirements

### Requirement: On-Device VLM Support

系统 SHALL 支持在 Android 设备上本地运行视觉语言模型（VLM），无需网络连接即可进行图像理解和文本生成。

#### Scenario: 加载 MNN 模型

- **WHEN** 用户启动应用且设备有足够内存（>=4GB RAM）
- **THEN** 系统加载 Qwen3-VL-2B-Instruct MNN 模型
- **AND** 模型在 30 秒内完成初始化

#### Scenario: 图像理解

- **WHEN** 用户提供一张图片和文本提示
- **THEN** 系统使用 VLM 分析图像内容
- **AND** 返回与图像相关的文本响应

#### Scenario: 模型不存在

- **WHEN** 本地模型文件不存在
- **THEN** 系统提示用户下载模型
- **AND** 提供下载进度显示

---

### Requirement: Model Management

系统 SHALL 提供模型文件的管理功能，包括下载、验证和删除。

#### Scenario: 下载模型

- **WHEN** 用户选择下载模型
- **THEN** 系统从 Hugging Face 下载指定格式的模型
- **AND** 支持断点续传
- **AND** 显示下载进度

#### Scenario: 验证模型完整性

- **WHEN** 模型下载完成
- **THEN** 系统验证模型文件的完整性
- **AND** 若验证失败则提示重新下载

#### Scenario: 删除模型

- **WHEN** 用户选择删除本地模型
- **THEN** 系统清除所有相关模型文件
- **AND** 释放存储空间

---

### Requirement: Multiple Model Formats

系统 SHALL 支持多种模型格式以适应不同部署场景。

#### Scenario: MNN 格式（Android 端侧）

- **WHEN** 在 Android 设备上运行
- **THEN** 系统优先使用 MNN 格式模型
- **AND** 利用 MNN 框架进行高效推理

#### Scenario: GGUF 格式（通用推理）

- **WHEN** MNN 格式不可用或用户指定
- **THEN** 系统可使用 GGUF Q8_0 格式模型
- **AND** 通过 llama.cpp 兼容接口进行推理

#### Scenario: FP8 格式（高精度）

- **WHEN** 需要最高精度输出
- **THEN** 系统可使用 FP8 格式模型
- **AND** 接受更高的内存和计算开销
