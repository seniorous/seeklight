## Context
现有仅端侧推理。需引入云端推理提升质量，并提供隐私模式与失败回退机制。云端接口采用自定义 REST，参考 SiliconFlow VLM 接口格式。

## Goals / Non-Goals
- Goals:
  - 云端优先，隐私模式与失败时回退端侧
  - BaseURL + API Key 可配置，默认系统配置
  - 明确超时/重试策略，确保用户即时反馈
- Non-Goals:
  - 开发阶段不做密钥加密
  - 不实现复杂的多供应商自动路由

## Decisions
- 推理路由器统一决策：隐私模式强制端侧；否则云端优先
- 云端失败策略：最多 3 次重试，总时限 0.8s，先提示再回退
- 默认云端模型：`Qwen/Qwen3-VL-235B-A22B-Thinking`

## Alternatives Considered
- 仅端侧：质量不足
- 仅云端：隐私不可控

## Risks / Trade-offs
- 0.8s 时限可能导致云端命中率下降 → 允许用户关闭隐私模式并可配置 BaseURL
- 开发阶段明文存储 Key → 标记为开发限制，后续切换 Keystore

## Migration Plan
- 新增设置项，默认值启用系统默认 BaseURL/Key
- 发布后可加入加密与凭据管理

## Open Questions
- 无
