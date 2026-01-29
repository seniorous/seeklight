## ADDED Requirements

### Requirement: 结构化记忆字段

系统 SHALL 将结构化输出映射为可查询的数据库字段。

#### Scenario: 保存结构化字段
- **GIVEN** 模型输出包含结构化 JSON
- **WHEN** 保存记忆
- **THEN** 数据库记录保存以下字段：
  - `summary`（<=30 字）
  - `tags.objects`、`tags.scene`、`tags.action`、`tags.time_context`
  - `visual_features.dominant_colors`、`visual_features.lighting_mood`、`visual_features.composition`
  - `memory_extraction.ocr_text`、`memory_extraction.narrative_caption`、`memory_extraction.unique_identifier`

#### Scenario: 兼容旧数据
- **GIVEN** 历史记忆无结构化字段
- **WHEN** 读取展示
- **THEN** 仍使用旧的 `description` 字段显示

---

### Requirement: 标签过滤与归档

系统 SHALL 对标签进行过滤与规范化后落库。

#### Scenario: 标签数量与内容限制
- **GIVEN** 模型输出包含标签列表
- **WHEN** 进行过滤
- **THEN** 每一类标签数量在 3~12 之间
- **AND** 过滤抽象概念、技术词、网址、纯数字与符号标签

#### Scenario: 标签分类存储
- **GIVEN** 过滤后的标签
- **WHEN** 保存记忆
- **THEN** 按 `objects/scene/action/time_context` 分类存储

---

### Requirement: 用户可读展示

系统 SHALL 只向用户展示可读描述，不展示原始 JSON。

#### Scenario: 列表展示
- **WHEN** 记忆出现在列表中
- **THEN** 显示 `summary` 作为摘要

#### Scenario: 详情展示
- **WHEN** 用户进入记忆详情
- **THEN** 显示 `memory_extraction.narrative_caption` 与关键视觉特征
- **AND** 不显示原始 JSON 文本

