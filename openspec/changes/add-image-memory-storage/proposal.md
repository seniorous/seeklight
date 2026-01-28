# Change: 添加图像记忆存储功能

> **状态**: 🚧 规划中 | **创建日期**: 2026-01-28

## Why

当前应用只能进行单次图像描述，生成的描述会在退出后丢失。用户无法：
- 查看之前处理过的图片
- 回顾 AI 生成的描述
- 搜索历史记忆

需要将图像描述持久化存储，为后续的搜索功能打下基础。

## What Changes

- 添加 Room 数据库存储图像记忆
- 创建 `ImageMemory` 数据模型
- 实现记忆的 CRUD 操作
- 添加历史记录页面
- 实现 Navigation Compose 页面导航
- 描述生成后自动保存到数据库

## Impact

- **Affected specs**: image-memory (新增)
- **Affected code**:
  - `app/src/main/java/.../data/` - Room 数据库、DAO、Repository
  - `app/src/main/java/.../domain/` - UseCase
  - `app/src/main/java/.../ui/screens/` - 历史记录页面
  - `app/src/main/java/.../ui/navigation/` - 导航配置
- **New Dependencies**:
  - `androidx.room:room-runtime` - Room 数据库
  - `androidx.room:room-ktx` - Room Kotlin 扩展
  - `androidx.navigation:navigation-compose` - Compose 导航
- **Database**: SQLite (通过 Room)
- **Storage**: 每条记忆约 1-5KB（不含图片文件）

## Success Criteria

| 指标 | 目标 |
|------|------|
| 记忆保存 | 描述生成后自动保存 |
| 历史加载 | < 500ms 加载 100 条记忆 |
| 数据完整性 | 图片路径、描述、时间戳完整 |
| 页面导航 | 主页 ↔ 历史记录 流畅切换 |
