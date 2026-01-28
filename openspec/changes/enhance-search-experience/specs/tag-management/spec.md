# Capability: 标签管理 (Tag Management)

## ADDED Requirements

### Requirement: 标签分类体系

系统 SHALL 将标签自动归类到预定义的分类中。

#### Scenario: 自动分类 - 人物

- **GIVEN** 标签 "朋友"
- **WHEN** 系统进行分类
- **THEN** 归类到 "人物" 分类

#### Scenario: 自动分类 - 地点

- **GIVEN** 标签 "海边"
- **WHEN** 系统进行分类
- **THEN** 归类到 "地点" 分类

#### Scenario: 自动分类 - 物品

- **GIVEN** 标签 "美食"
- **WHEN** 系统进行分类
- **THEN** 归类到 "物品" 分类

#### Scenario: 自动分类 - 活动

- **GIVEN** 标签 "旅行"
- **WHEN** 系统进行分类
- **THEN** 归类到 "活动" 分类

#### Scenario: 自动分类 - 其他

- **GIVEN** 标签 "xyz123"（无法识别）
- **WHEN** 系统进行分类
- **THEN** 归类到 "其他" 分类

---

### Requirement: 标签统计

系统 SHALL 统计每个标签的使用数量。

#### Scenario: 显示标签使用数量

- **GIVEN** 标签 "猫" 在 15 条记忆中出现
- **WHEN** 查看标签管理页面
- **THEN** 显示 "猫 (15)"

#### Scenario: 按使用数量排序

- **GIVEN** 标签列表
- **WHEN** 查看标签管理页面
- **THEN** 默认按使用数量降序排列
- **AND** 最常用的标签在前

#### Scenario: 按分类分组显示

- **GIVEN** 多个不同分类的标签
- **WHEN** 查看标签管理页面
- **THEN** 标签按分类分 Tab 显示
- **AND** 每个 Tab 显示该分类的标签数量

---

### Requirement: 标签筛选

系统 SHALL 支持通过点击标签筛选相关记忆。

#### Scenario: 单标签筛选

- **GIVEN** 用户在标签管理页面
- **WHEN** 点击标签 "猫"
- **THEN** 跳转到记忆库并显示所有包含 "猫" 标签的记忆

#### Scenario: 从记忆详情筛选

- **GIVEN** 用户在记忆详情页面
- **WHEN** 点击标签 "旅行"
- **THEN** 跳转到记忆库并筛选 "旅行" 标签

#### Scenario: 清除标签筛选

- **GIVEN** 已应用标签筛选 "猫"
- **WHEN** 点击清除筛选
- **THEN** 显示所有记忆

---

### Requirement: 标签编辑

系统 SHALL 支持手动编辑标签。

#### Scenario: 重命名标签

- **GIVEN** 用户长按标签 "小猫"
- **WHEN** 选择 "重命名" 并输入 "猫咪"
- **THEN** 所有使用 "小猫" 的记忆更新为 "猫咪"

#### Scenario: 删除标签

- **GIVEN** 用户长按标签 "临时标签"
- **WHEN** 选择 "删除"
- **THEN** 弹出确认对话框
- **AND** 确认后从所有记忆中移除该标签

#### Scenario: 合并标签

- **GIVEN** 存在标签 "猫" 和 "小猫"
- **WHEN** 用户选择合并，目标标签为 "猫"
- **THEN** "小猫" 的所有记忆更新为 "猫"
- **AND** "小猫" 标签被删除

---

### Requirement: 标签管理页面

系统 SHALL 提供独立的标签管理页面。

#### Scenario: 进入标签管理

- **GIVEN** 用户在记忆库页面
- **WHEN** 点击标签管理入口
- **THEN** 导航到标签管理页面

#### Scenario: 分类 Tab 切换

- **GIVEN** 用户在标签管理页面
- **WHEN** 切换到 "地点" Tab
- **THEN** 显示所有 "地点" 分类的标签

#### Scenario: 搜索标签

- **GIVEN** 用户在标签管理页面
- **WHEN** 输入搜索词 "猫"
- **THEN** 筛选显示包含 "猫" 的标签

#### Scenario: 空标签状态

- **GIVEN** 某分类下没有标签
- **WHEN** 切换到该分类 Tab
- **THEN** 显示空状态 "该分类下暂无标签"

---

### Requirement: 手动添加标签

系统 SHALL 支持用户为记忆手动添加标签。

#### Scenario: 在记忆详情添加标签

- **GIVEN** 用户在记忆详情页面
- **WHEN** 点击 "添加标签" 并输入 "重要"
- **THEN** 标签 "重要" 添加到该记忆
- **AND** 实时保存到数据库

#### Scenario: 标签建议

- **GIVEN** 用户输入标签 "猫"
- **WHEN** 已存在标签 "猫咪"、"小猫"
- **THEN** 显示建议列表供选择
- **AND** 可选择已有标签或创建新标签

#### Scenario: 标签格式限制

- **GIVEN** 用户输入标签
- **WHEN** 输入超过 20 字符
- **THEN** 显示提示 "标签长度不能超过 20 字符"
- **AND** 阻止添加
