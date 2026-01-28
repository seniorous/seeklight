## ADDED Requirements

### Requirement: Image Memory Storage

系统 SHALL 将每次图像描述的结果持久化存储到本地数据库，以便用户后续查看和搜索。

#### Scenario: 保存图像记忆

- **WHEN** 用户完成一次图像描述生成
- **THEN** 系统自动将以下信息保存到数据库：
  - 图片文件路径
  - AI 生成的描述文本
  - 使用的提示词
  - 性能指标（token 数、推理时间）
  - 时间戳
- **AND** 保存操作在后台异步执行，不阻塞 UI

#### Scenario: 查看历史记忆

- **WHEN** 用户进入历史记录页面
- **THEN** 系统按时间倒序显示所有已保存的图像记忆
- **AND** 每条记忆显示缩略图、描述摘要、创建时间
- **AND** 列表支持下拉刷新和滚动加载

#### Scenario: 查看记忆详情

- **WHEN** 用户点击某条历史记忆
- **THEN** 系统显示该记忆的完整信息
- **AND** 包括原图大图、完整描述、性能指标

#### Scenario: 删除记忆

- **WHEN** 用户选择删除某条记忆
- **THEN** 系统显示确认对话框
- **AND** 确认后从数据库中删除该记录
- **AND** 不删除原始图片文件

---

### Requirement: History Navigation

系统 SHALL 提供页面导航功能，允许用户在主页和历史记录页之间切换。

#### Scenario: 导航到历史记录

- **WHEN** 用户在主页点击"历史记录"入口
- **THEN** 系统导航到历史记录页面
- **AND** 保留主页状态

#### Scenario: 返回主页

- **WHEN** 用户在历史记录页点击返回
- **THEN** 系统返回主页
- **AND** 恢复之前的状态

#### Scenario: 从详情页返回

- **WHEN** 用户在记忆详情页点击返回
- **THEN** 系统返回历史记录列表
- **AND** 保持列表滚动位置

---

### Requirement: Memory Data Model

系统 SHALL 使用结构化的数据模型存储图像记忆。

#### Scenario: 数据完整性

- **WHEN** 保存一条图像记忆
- **THEN** 以下字段 SHALL 为必填：
  - `imagePath`: 图片在设备上的绝对路径
  - `description`: AI 生成的描述文本
  - `createdAt`: 创建时间戳（毫秒）
- **AND** 以下字段为可选：
  - `promptUsed`: 使用的提示词
  - `tokensGenerated`: 生成的 token 数量
  - `inferenceTimeMs`: 推理耗时（毫秒）

#### Scenario: 数据持久化

- **WHEN** 应用被关闭或设备重启
- **THEN** 所有已保存的图像记忆 SHALL 保持完整
- **AND** 下次打开应用时能正常读取

---

### Requirement: Empty State Handling

系统 SHALL 在历史记录为空时提供友好的空状态提示。

#### Scenario: 无历史记录

- **WHEN** 用户首次进入历史记录页且无任何记忆
- **THEN** 系统显示空状态插图和提示文案
- **AND** 提示用户去主页生成第一条图像描述
- **AND** 提供快捷按钮跳转到主页
