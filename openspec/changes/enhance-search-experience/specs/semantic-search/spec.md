# Capability: 语义搜索 (Semantic Search)

## ADDED Requirements

### Requirement: Text Embedding 生成

系统 SHALL 使用本地 Text Embedding 模型为记忆描述生成向量表示。

#### Scenario: 成功生成向量

- **GIVEN** 已加载 Text Embedding 模型
- **WHEN** 输入文本 "一只橘色的猫在沙发上睡觉"
- **THEN** 返回 384 维 Float 向量
- **AND** 向量生成耗时 < 100ms

#### Scenario: 空文本处理

- **GIVEN** 已加载 Text Embedding 模型
- **WHEN** 输入空字符串
- **THEN** 返回零向量或抛出明确异常

#### Scenario: 模型未加载

- **GIVEN** Text Embedding 模型未初始化
- **WHEN** 尝试生成向量
- **THEN** 返回错误信息 "Embedding 模型未加载"
- **AND** 不会导致应用崩溃

---

### Requirement: 向量存储

系统 SHALL 将记忆的向量表示持久化存储到本地数据库。

#### Scenario: 保存向量

- **GIVEN** 已生成记忆的向量
- **WHEN** 保存向量到数据库
- **THEN** 向量与 memory_id 关联存储
- **AND** 记录模型版本号

#### Scenario: 更新向量

- **GIVEN** 记忆已有旧版本向量
- **WHEN** 模型版本升级后重新生成
- **THEN** 新向量覆盖旧向量
- **AND** 更新模型版本号

#### Scenario: 删除关联

- **GIVEN** 记忆被删除
- **WHEN** 执行删除操作
- **THEN** 关联的向量自动删除（CASCADE）

---

### Requirement: 语义相似度搜索

系统 SHALL 支持基于向量余弦相似度的语义搜索。

#### Scenario: 语义搜索成功

- **GIVEN** 数据库中有 10 条带向量的记忆
- **WHEN** 用户搜索 "宠物"
- **THEN** 返回语义相关的记忆（如包含猫、狗描述的记忆）
- **AND** 结果按相似度降序排列

#### Scenario: 指定 Top-K 返回

- **GIVEN** 数据库中有 100 条记忆
- **WHEN** 用户搜索并指定 topK = 10
- **THEN** 最多返回 10 条最相关结果

#### Scenario: 无匹配结果

- **GIVEN** 数据库中没有语义相关的记忆
- **WHEN** 用户搜索 "火箭发射"
- **THEN** 返回空列表
- **AND** 显示 "未找到相关记忆"

---

### Requirement: 混合搜索

系统 SHALL 支持关键词搜索与语义搜索的混合模式。

#### Scenario: 混合搜索融合

- **GIVEN** 搜索词为 "猫"
- **WHEN** 执行混合搜索（alpha = 0.3）
- **THEN** 关键词匹配结果权重 30%
- **AND** 语义匹配结果权重 70%
- **AND** 最终结果去重并按融合分数排序

#### Scenario: 精确匹配优先

- **GIVEN** 存在描述完全包含 "橘猫" 的记忆
- **WHEN** 搜索 "橘猫"
- **THEN** 精确匹配的记忆排在前列

#### Scenario: 搜索模式切换

- **GIVEN** 用户在搜索界面
- **WHEN** 切换搜索模式（关键词/语义/混合）
- **THEN** 搜索结果按新模式重新计算
- **AND** 当前模式有明确指示

---

### Requirement: 后台向量生成

系统 SHALL 在后台为新记忆或无向量记忆生成向量。

#### Scenario: 新记忆向量生成

- **GIVEN** 用户创建新记忆
- **WHEN** 记忆保存成功
- **THEN** 后台自动触发向量生成任务

#### Scenario: 批量向量补全

- **GIVEN** 有 50 条记忆无向量（老数据）
- **WHEN** 应用启动或用户主动触发
- **THEN** 后台逐条生成向量
- **AND** 显示生成进度

#### Scenario: 任务中断恢复

- **GIVEN** 向量生成任务进行中
- **WHEN** 应用被杀死
- **THEN** 下次启动继续未完成的任务
- **AND** 已完成的向量不会重复生成
