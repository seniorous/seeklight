# Change: 增强搜索体验（第一阶段产品化）

## Why

当前 SeekLight 仅支持基础的关键词文本搜索，用户只能通过完全匹配的关键词找到记忆。这限制了产品的核心价值——"通过自然语言搜索照片记忆"。

**用户痛点**：
- 搜索"宠物"找不到猫/狗的照片（缺乏语义理解）
- 无法按时间范围筛选（如"去年夏天"）
- 标签管理混乱，无法有效利用 AI 生成的标签

**产品机会**：
- 语义搜索是记忆图册的核心差异化能力
- 时间分组已实现，但缺少筛选交互
- 标签系统已有数据基础，缺少管理界面

## What Changes

### 1. 语义搜索能力
- **NEW** 集成本地 Text Embedding 模型（MiniLM-L6 或类似轻量模型）
- **NEW** 为每条记忆生成文本向量并存储
- **NEW** 支持语义相似度搜索（余弦相似度）
- **NEW** 混合搜索模式：关键词 + 语义

### 2. 时间筛选能力
- **NEW** 时间范围选择器组件（日历 UI）
- **NEW** 快捷时间选项（今天/本周/本月/今年）
- **NEW** 自定义日期范围筛选
- **MODIFIED** HistoryScreen 集成时间筛选

### 3. 标签管理能力
- **NEW** 标签管理页面（查看所有标签及使用数量）
- **NEW** 标签筛选器（点击标签查看相关记忆）
- **NEW** 手动编辑/删除/合并标签
- **NEW** 标签分类（人物/地点/物品/活动/情绪）

## Impact

### Affected Specs
- `semantic-search` - 新增能力
- `time-filter` - 新增能力  
- `tag-management` - 新增能力
- `image-memory` - 可能需要扩展 Entity 字段

### Affected Code

| 模块 | 文件 | 变更类型 |
|------|------|----------|
| AI | `TextEmbeddingBridge.kt` | 新增 |
| Data | `ImageMemory.kt` | 扩展字段 |
| Data | `EmbeddingDao.kt` | 新增 |
| ViewModel | `SearchViewModel.kt` | 新增 |
| ViewModel | `TagManagementViewModel.kt` | 新增 |
| UI | `HistoryScreen.kt` | 修改 |
| UI | `TimeFilterSheet.kt` | 新增 |
| UI | `TagManagementScreen.kt` | 新增 |
| UI | `SemanticSearchBar.kt` | 新增 |

### 技术依赖
- 需要集成 Text Embedding 模型（~25MB）
- Room 数据库版本升级（migration）
- 新增向量存储（可选：SQLite 扩展或独立文件）

## Success Metrics

| 指标 | 目标值 |
|------|--------|
| 语义搜索准确率 | > 80%（Top-5 召回） |
| 搜索响应时间 | < 500ms（100 条记忆） |
| 向量生成速度 | < 100ms/条 |
| 模型体积 | < 50MB |

## Risks & Mitigations

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| Embedding 模型过大 | 应用体积膨胀 | 选择量化版模型（INT8） |
| 向量搜索慢 | 搜索体验差 | 限制向量维度（384D），使用近似搜索 |
| Room Migration 失败 | 数据丢失 | 编写迁移测试，支持回滚 |
| 老设备性能差 | 用户流失 | 提供降级方案（纯关键词搜索） |

## Timeline Estimate

此文档不包含时间估算，由开发团队根据任务清单自行规划。
