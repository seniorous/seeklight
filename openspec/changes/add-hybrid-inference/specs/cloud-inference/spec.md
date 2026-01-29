## ADDED Requirements

### Requirement: 云端推理接入

系统 SHALL 支持自定义 REST 云端推理服务，并与现有端侧推理共存。

#### Scenario: 云端推理成功
- **GIVEN** BaseURL 与 API Key 可用
- **WHEN** 用户发起图像分析
- **THEN** 系统调用云端 VLM 接口返回结果

#### Scenario: 使用默认云端模型
- **GIVEN** 用户未指定云端模型
- **WHEN** 发起云端推理
- **THEN** 使用 `Qwen/Qwen3-VL-235B-A22B-Thinking`

#### Scenario: 自定义 REST 兼容
- **GIVEN** 用户配置自定义 BaseURL
- **WHEN** 发送云端请求
- **THEN** 请求兼容 SiliconFlow VLM Chat Completions 格式
