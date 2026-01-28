# Tasks: 增强搜索体验

## 阶段概览

| 阶段 | 任务数 | 依赖 | 可并行 |
|------|--------|------|--------|
| 1. 基础设施 | 5 | 无 | 是 |
| 2. 语义搜索 | 6 | 阶段1 | 部分 |
| 3. 时间筛选 | 4 | 无 | 是 |
| 4. 标签管理 | 5 | 无 | 是 |
| 5. 集成测试 | 3 | 阶段2-4 | 否 |

---

## 1. 基础设施准备

### 1.1 添加 ONNX Runtime 依赖
- [ ] 在 `build.gradle.kts` 添加 ONNX Runtime Mobile 依赖
- [ ] 验证 ARM64 兼容性
- [ ] 测试最小 APK 体积增量

**验证**: 运行 `./gradlew :app:dependencies | grep onnx`

### 1.2 下载 Embedding 模型
- [ ] 获取 `all-MiniLM-L6-v2` ONNX 量化模型
- [ ] 放置到 `app/src/main/assets/models/` 
- [ ] 更新 `.gitignore` 排除大文件
- [ ] 编写模型下载脚本 `scripts/download_embedding_model.py`

**验证**: 模型文件存在且 < 30MB

### 1.3 扩展 Room 数据库
- [ ] 创建 `MemoryEmbedding` Entity
- [ ] 创建 `MemoryEmbeddingDao`
- [ ] 编写 Migration 2 → 3
- [ ] 更新 `AppDatabase` 版本号

**验证**: 运行迁移测试，无数据丢失

### 1.4 创建 EmbeddingRepository
- [ ] 定义 `EmbeddingRepository` 接口
- [ ] 实现 `EmbeddingRepositoryImpl`
- [ ] 添加内存缓存逻辑

**验证**: 单元测试覆盖 CRUD 操作

### 1.5 创建 TextEmbeddingBridge
- [ ] 实现 ONNX Session 初始化
- [ ] 实现 `generate(text: String): FloatArray`
- [ ] 添加 Tokenizer 支持
- [ ] 添加错误处理和日志

**验证**: 输入任意文本，输出 384 维向量

---

## 2. 语义搜索实现

### 2.1 实现余弦相似度计算
- [ ] 创建 `VectorUtils.kt` 工具类
- [ ] 实现 `cosineSimilarity(a: FloatArray, b: FloatArray): Float`
- [ ] 实现批量相似度计算（优化性能）

**验证**: 相同向量相似度 = 1.0，正交向量 = 0.0

### 2.2 实现 SearchUseCase
- [ ] 创建 `SearchUseCase` 类
- [ ] 实现 `keywordSearch(query: String): List<ImageMemory>`
- [ ] 实现 `semanticSearch(query: String, topK: Int): List<ImageMemory>`
- [ ] 实现 `hybridSearch(query: String, alpha: Float): List<ImageMemory>`

**验证**: 搜索 "宠物" 能返回包含 "猫"、"狗" 的记忆

### 2.3 创建 SearchViewModel
- [ ] 定义 `SearchUiState` 数据类
- [ ] 实现搜索状态管理
- [ ] 添加防抖处理（300ms）
- [ ] 添加搜索模式切换（关键词/语义/混合）

**验证**: UI 响应正常，无 ANR

### 2.4 实现向量后台生成 Worker
- [ ] 创建 `EmbeddingGenerationWorker`
- [ ] 实现增量生成逻辑
- [ ] 添加进度回调
- [ ] 处理应用退出时的任务恢复

**验证**: 100 条记忆在后台 10 分钟内完成向量化

### 2.5 集成到 HistoryScreen
- [ ] 替换原有搜索逻辑为 `SearchUseCase`
- [ ] 添加搜索模式切换 UI
- [ ] 显示搜索结果数量和耗时

**验证**: 搜索功能正常工作

### 2.6 添加搜索性能指标
- [ ] 记录搜索耗时
- [ ] 记录命中数量
- [ ] 可选：上报匿名统计

**验证**: 控制台能看到性能日志

---

## 3. 时间筛选实现

### 3.1 创建 TimeFilterState
- [ ] 定义 `TimeRange` sealed class
- [ ] 实现快捷选项枚举（Today, ThisWeek, ThisMonth, ThisYear, Custom）
- [ ] 实现日期范围计算逻辑

**验证**: 单元测试覆盖边界情况

### 3.2 创建 TimeFilterSheet 组件
- [ ] 实现 Bottom Sheet 基础布局
- [ ] 添加快捷时间按钮
- [ ] 集成 Material 3 DateRangePicker
- [ ] 添加确认/取消按钮

**验证**: UI 预览正常

### 3.3 更新 HistoryViewModel
- [ ] 添加 `timeFilter` 状态
- [ ] 实现 `onTimeFilterChanged(range: TimeRange)`
- [ ] 集成到搜索逻辑

**验证**: 筛选后列表正确更新

### 3.4 集成到 HistoryScreen
- [ ] 在顶部添加筛选入口
- [ ] 显示当前筛选状态
- [ ] 添加清除筛选按钮

**验证**: 端到端流程正常

---

## 4. 标签管理实现

### 4.1 创建 TagCategory 枚举和分类逻辑
- [ ] 定义 `TagCategory` 枚举
- [ ] 实现 `classifyTag(tag: String): TagCategory`
- [ ] 添加关键词配置

**验证**: 常见标签分类正确

### 4.2 创建 TagManagementViewModel
- [ ] 定义 `TagManagementUiState`
- [ ] 实现标签统计（按使用数量排序）
- [ ] 实现按分类分组
- [ ] 实现标签删除/合并

**验证**: 单元测试通过

### 4.3 创建 TagManagementScreen
- [ ] 实现分类 Tab 布局
- [ ] 实现标签列表（显示使用数量）
- [ ] 实现标签点击（跳转筛选结果）
- [ ] 实现长按删除/编辑

**验证**: UI 交互流畅

### 4.4 更新 HistoryScreen 标签筛选
- [ ] 添加标签筛选状态
- [ ] 实现点击标签触发筛选
- [ ] 显示当前标签筛选状态

**验证**: 标签筛选正常工作

### 4.5 添加标签管理入口
- [ ] 在 HistoryScreen 添加入口按钮
- [ ] 更新 NavGraph 添加路由
- [ ] 实现页面跳转

**验证**: 导航正常

---

## 5. 集成测试与优化

### 5.1 编写集成测试
- [ ] 测试语义搜索准确率（准备测试数据集）
- [ ] 测试时间筛选边界条件
- [ ] 测试标签管理 CRUD

**验证**: 测试覆盖率 > 70%

### 5.2 性能优化
- [ ] Profile 搜索耗时
- [ ] 优化向量缓存策略
- [ ] 优化 UI 重组

**验证**: 搜索响应 < 500ms

### 5.3 文档更新
- [ ] 更新 README 添加新功能说明
- [ ] 更新 openspec/project.md
- [ ] 归档本 change

**验证**: 文档准确完整

---

## 依赖关系图

```
1.1 ONNX 依赖 ──┐
1.2 模型下载 ───┼──► 1.5 EmbeddingBridge ──► 2.1-2.6 语义搜索
1.3 DB 迁移 ────┤
1.4 Repository ─┘

3.1-3.4 时间筛选 ──► 5.1 集成测试

4.1-4.5 标签管理 ──► 5.1 集成测试
```

## 验收标准

- [ ] 所有任务完成
- [ ] 所有测试通过
- [ ] 搜索响应时间 < 500ms
- [ ] 语义搜索 Top-5 召回率 > 80%
- [ ] 无 P1 Bug
- [ ] 代码已 Review
