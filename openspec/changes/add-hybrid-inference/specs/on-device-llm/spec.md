## MODIFIED Requirements

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

#### Scenario: 隐私模式强制端侧
- **GIVEN** 用户开启隐私模式
- **WHEN** 发起图像分析
- **THEN** 系统直接使用端侧 VLM 推理
