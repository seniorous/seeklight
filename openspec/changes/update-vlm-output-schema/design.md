## Context
当前模型输出存在标签泛化、格式不稳定及用户可读性差的问题。需要使用固定 JSON Schema 约束输出，并将结构化字段映射到数据库和 UI。

## Goals / Non-Goals
- Goals:
  - 统一输出结构（summary/tags/visual_features/memory_extraction）
  - 将标签按分类保存并可用于搜索
  - UI 仅显示可读描述与关键视觉特征
- Non-Goals:
  - 不在本阶段实现多模型切换
  - 不在本阶段实现云端推理

## Decisions
- 使用固定系统提示词要求严格 JSON 输出
- 解析失败时进行轻量修复（去除尾随文本、补全括号）再解析
- 结构化字段全部落库，原始 JSON 仅用于调试日志

## Alternatives Considered
- 仅靠后处理过滤（无法约束模型输出结构）
- 展示原始 JSON（可读性差，影响产品观感）

## Risks / Trade-offs
- JSON 结构复杂导致模型输出不稳定 → 通过容错修复与回退策略缓解
- 数据库迁移增加开发成本 → 保持字段可选并逐步迁移

## Migration Plan
- 新增字段保持可空
- 旧记录继续显示原描述
- 新记录优先写入结构化字段

## Open Questions
- summary 与 narrative 的展示优先级是否需要用户可配置？
