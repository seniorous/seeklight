## ADDED Requirements

### Requirement: 结构化视觉记忆输出

系统 SHALL 使用固定系统提示词约束 VLM 输出为结构化 JSON，以便后续解析与存储。

#### Scenario: 使用结构化提示词生成
- **WHEN** 用户提交图片进行描述
- **THEN** 系统以“视觉记忆档案员”系统提示词发起推理
- **AND** 输出包含 `summary`、`tags`、`visual_features`、`memory_extraction` 四个顶层字段

#### Scenario: 输出合法 JSON
- **WHEN** 模型返回结果
- **THEN** 系统尝试解析为 JSON
- **AND** 若格式非法，执行一次轻量修复后再解析

