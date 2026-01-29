# Change: 端云协同推理与隐私模式

## Why
需要在网络可用时使用云端模型提升质量，并在隐私模式或云端不可用时自动回退到端侧模型，保证隐私与可用性。

## What Changes
- 新增“隐私模式”与一键切换入口
- 支持自定义 REST 接入（BaseURL + API Key），未设置则使用系统默认
- 云端请求失败时按“3 次重试 + 0.8s 总时限 + 先提示后回退”策略切换端侧
- 云端默认模型：`Qwen/Qwen3-VL-235B-A22B-Thinking`

## Impact
- Affected specs: `cloud-inference`, `on-device-llm`, `app-settings`
- Affected code: 推理路由器、网络层、设置页与持久化、错误处理与提示 UI
- API reference: SiliconFlow VLM Chat Completions ([docs](https://docs.siliconflow.cn/cn/api-reference/chat-completions/chat-completions#vlm))
