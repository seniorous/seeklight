# Change: 更新 VLM 输出结构与记忆存储

## Why
当前模型输出过于宽泛、标签过多，且直接展示原始 JSON 不利于用户阅读，需要通过结构化输出与过滤机制提升可用性。

## What Changes
- 替换系统提示词为结构化记忆提取角色与固定 JSON Schema
- 解析并过滤模型输出，将结构化字段映射为数据库字段
- 前端仅展示可读描述（摘要与详述），不展示原始 JSON
- 标签按分类存储在后端数据库，供检索与统计使用

## Impact
- Affected specs: `on-device-llm`, `image-memory`
- Affected code: 提示词配置、输出解析器、数据库实体/迁移、结果展示 UI
