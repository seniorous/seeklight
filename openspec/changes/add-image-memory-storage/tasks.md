# Tasks: 添加图像记忆存储功能

> **状态**: ✅ 已完成 | **最后更新**: 2026-01-28

## 进度摘要

| 阶段 | 状态 | 任务数 |
|------|------|--------|
| 1. 数据库设计 | ✅ 完成 | 4 |
| 2. Repository 层 | ✅ 完成 | 3 |
| 3. UI 集成 | ✅ 完成 | 6 |
| 4. 页面导航 | ✅ 完成 | 4 |
| 5. 测试 | ⬜ 待补充 | 4 |

---

## 1. 数据库设计

- [x] 1.1 添加 Room 依赖到 build.gradle.kts
  - room-runtime, room-ktx, room-compiler (ksp)
- [x] 1.2 创建 ImageMemory Entity
  ```kotlin
  @Entity(tableName = "image_memories")
  data class ImageMemory(
      @PrimaryKey(autoGenerate = true) val id: Long = 0,
      val imagePath: String,           // 图片文件路径
      val imageUri: String,            // 原始 URI
      val description: String,         // AI 生成的描述
      val promptUsed: String,          // 使用的提示词
      val tokensGenerated: Int,        // 生成的 token 数
      val inferenceTimeMs: Long,       // 推理耗时
      val createdAt: Long,             // 创建时间戳
      val updatedAt: Long              // 更新时间戳
  )
  ```
- [x] 1.3 创建 ImageMemoryDao
  - insert, update, delete
  - getAll (Flow), getById, searchByDescription
- [x] 1.4 创建 AppDatabase

## 2. Repository 层

- [x] 2.1 创建 ImageMemoryRepository 接口
- [x] 2.2 创建 ImageMemoryRepositoryImpl
- [x] 2.3 更新 ImageDescriptionViewModel
  - 推理完成后调用 repository.save()

## 3. UI 集成

- [x] 3.1 创建 HistoryScreen 历史记录页面
  - LazyColumn 显示记忆列表
  - 每项显示：缩略图、描述摘要、时间
- [x] 3.2 创建 MemoryCard 组件
  - 点击查看详情
  - 删除按钮
- [x] 3.3 创建 MemoryDetailScreen 记忆详情页
  - 显示完整描述
  - 显示原图
  - 显示性能指标
- [x] 3.4 创建 HistoryViewModel
- [x] 3.5 添加空状态提示
- [x] 3.6 添加删除确认对话框

## 4. 页面导航

- [x] 4.1 添加 Navigation Compose 依赖
- [x] 4.2 创建 NavGraph 和 Screen 定义
- [x] 4.3 更新 MainActivity 使用 NavHost
- [x] 4.4 添加历史记录入口按钮（TopAppBar）

## 5. 测试

- [ ] 5.1 ImageMemoryDao 单元测试
- [ ] 5.2 ImageMemoryRepository 单元测试
- [ ] 5.3 HistoryViewModel 单元测试
- [ ] 5.4 HistoryScreen UI 测试

---

## 数据库 Schema

```sql
CREATE TABLE image_memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_path TEXT NOT NULL,
    image_uri TEXT NOT NULL,
    description TEXT NOT NULL,
    prompt_used TEXT NOT NULL,
    tokens_generated INTEGER NOT NULL,
    inference_time_ms INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

CREATE INDEX idx_memories_created_at ON image_memories(created_at DESC);
CREATE INDEX idx_memories_description ON image_memories(description);
```

## 依赖版本

```kotlin
// build.gradle.kts (app)
val roomVersion = "2.6.1"
implementation("androidx.room:room-runtime:$roomVersion")
implementation("androidx.room:room-ktx:$roomVersion")
kapt("androidx.room:room-compiler:$roomVersion")

val navVersion = "2.7.7"
implementation("androidx.navigation:navigation-compose:$navVersion")
```
