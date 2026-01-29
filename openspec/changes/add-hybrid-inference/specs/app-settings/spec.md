## ADDED Requirements

### Requirement: 隐私模式与一键切换

系统 SHALL 提供隐私模式开关，并允许用户一键切换推理策略。

#### Scenario: 一键切换
- **WHEN** 用户点击隐私模式开关
- **THEN** 系统立即切换到对应推理策略

#### Scenario: 默认状态
- **GIVEN** 首次安装应用
- **THEN** 隐私模式默认为开启

---

### Requirement: BaseURL 与 API Key 设置

系统 SHALL 允许用户设置 BaseURL 与 API Key；未设置时使用系统默认配置。

#### Scenario: 使用系统默认
- **GIVEN** 用户未配置 BaseURL 与 API Key
- **WHEN** 发起云端推理
- **THEN** 使用系统默认 BaseURL 与 API Key

#### Scenario: 使用自定义配置
- **GIVEN** 用户配置了 BaseURL 与 API Key
- **WHEN** 发起云端推理
- **THEN** 使用用户配置的参数

---

### Requirement: 云端失败回退端侧

系统 SHALL 在云端不可用时提示用户并回退到端侧推理。

#### Scenario: 失败重试与时限
- **GIVEN** BaseURL 不响应或超时
- **WHEN** 发起云端推理
- **THEN** 系统最多重试 3 次
- **AND** 总耗时不超过 0.8 秒

#### Scenario: 提示后回退
- **GIVEN** 云端请求失败
- **WHEN** 触发回退
- **THEN** 先提示用户“云端不可用，已切换端侧”
- **AND** 继续端侧推理
