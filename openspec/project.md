# Project Context

> **项目名称**: SeekLight（寻光）| **最后更新**: 2026-01-28

## Purpose

这是一个 Android 移动应用项目，目标是构建一个**基于端侧大模型的图像记忆库**。

### 愿景

让用户能够通过自然语言搜索自己的照片记忆，例如搜索"面条"找到所有包含面条的图片。

### 核心能力

1. **端侧 VLM 推理** ✅ 已实现
   - 使用 Qwen3-VL-2B 在设备本地分析图像
   - 无需网络，保护隐私
   
2. **图像记忆存储** 🚧 计划中
   - 保存每张图片的 AI 描述到本地数据库
   - 支持历史记录查看
   
3. **语义搜索** 🚧 计划中
   - 通过关键词搜索图片
   - 未来支持向量语义搜索

### 技术目标

- 构建原生 Android 应用，提供流畅的用户体验
- 采用声明式 UI 框架 Jetpack Compose
- 遵循 Material Design 3 设计规范
- 支持深色/浅色主题和 Android 12+ 动态颜色
- 实现端侧大模型部署和 RAG 功能

## Tech Stack

### 核心技术

| 技术 | 版本 | 用途 |
|------|------|------|
| Kotlin | 2.0.21 | 主要开发语言 |
| Android Gradle Plugin | 8.13.2 | 构建工具 |
| Jetpack Compose | BOM 2024.09.00 | 声明式 UI 框架 |
| Material 3 | Latest | 设计系统 |

### Android 配置

| 配置项 | 值 |
|--------|-----|
| compileSdk | 36 (Android 16) |
| targetSdk | 36 |
| minSdk | 24 (Android 7.0) |
| JVM Target | 11 |
| Package Name | `com.example.software` |

### 依赖库

- **androidx.core:core-ktx** (1.17.0) - Kotlin 扩展
- **androidx.lifecycle:lifecycle-runtime-ktx** (2.10.0) - 生命周期管理
- **androidx.activity:activity-compose** (1.12.2) - Activity Compose 集成
- **androidx.compose.ui** - Compose UI 核心
- **androidx.compose.material3** - Material Design 3 组件

### 测试框架

- **JUnit** (4.13.2) - 单元测试
- **AndroidX JUnit** (1.3.0) - Android 测试扩展
- **Espresso** (3.7.0) - UI 测试
- **Compose UI Test** - Compose 测试框架

## Project Conventions

### Code Style

#### Kotlin 编码规范

- 使用 Kotlin 官方代码风格
- 缩进：4 个空格
- 最大行宽：120 字符
- 使用 `data class` 定义数据模型
- 使用 `sealed class/interface` 定义 UI 状态
- 避免使用 `!!` 操作符，优先使用安全调用 `?.`
- 使用 `const val` 定义编译时常量

#### 命名规范

| 类型 | 命名规范 | 示例 |
|------|----------|------|
| 类/接口 | PascalCase | `UserRepository`, `LoginScreen` |
| 函数 | camelCase | `getUserById()`, `loadData()` |
| 变量 | camelCase | `userName`, `isLoading` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Composable 函数 | PascalCase | `LoginButton`, `UserCard` |
| 包名 | 全小写 | `com.example.software.data` |

#### Compose 特定规范

- Modifier 顺序：padding → size → background → clip → clickable → padding(内部)
- 每个可复用组件添加 `@Preview` 注解
- 使用 `remember` 和 `derivedStateOf` 优化重组
- 状态提升（State Hoisting）原则

### Architecture Patterns

#### Clean Architecture（三层架构）

```
app/src/main/java/com/example/software/
├── data/                 # 数据层
│   ├── repository/       # 仓库实现
│   ├── datasource/       # 数据源（本地/远程）
│   └── models/           # 数据传输对象 (DTO)
├── domain/               # 领域层
│   ├── usecases/         # 业务用例
│   ├── models/           # 领域模型
│   └── repository/       # 仓库接口
├── presentation/         # 表现层
│   ├── screens/          # 页面 Composable
│   ├── components/       # 可复用 UI 组件
│   ├── viewmodels/       # ViewModel
│   └── theme/            # 主题配置
├── di/                   # 依赖注入模块
└── utils/                # 工具类
```

#### 核心设计原则

- **单向数据流 (UDF)**：ViewModel → UI State → Composable
- **依赖注入**：使用 Hilt（计划引入）
- **关注点分离**：UI、业务逻辑、数据访问分离
- **SOLID 原则**：单一职责、开闭原则、依赖倒置

#### 状态管理模式

```kotlin
// UI State 定义
sealed interface UiState<out T> {
    object Loading : UiState<Nothing>
    data class Success<T>(val data: T) : UiState<T>
    data class Error(val message: String) : UiState<Nothing>
}

// ViewModel 模式
class MyViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<UiState>(UiState.Loading)
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()
}
```

### Testing Strategy

#### 测试分层

| 测试类型 | 位置 | 框架 | 覆盖目标 |
|----------|------|------|----------|
| 单元测试 | `app/src/test/` | JUnit, Mockk | ViewModel, UseCase, Repository |
| UI 测试 | `app/src/androidTest/` | Compose Test | Composable 函数 |
| 集成测试 | `app/src/androidTest/` | Espresso | 端到端流程 |

#### 测试规范

- ViewModel 测试使用 `runTest` 和 `MainDispatcherRule`
- 使用 Fake Repository 模式而非 Mock
- UI 测试使用 `createComposeRule()`
- 测试命名：`given_when_then` 或 `methodName_condition_expectedResult`

### Git Workflow

#### 分支策略

| 分支 | 用途 |
|------|------|
| `main` | 生产版本，稳定代码 |
| `develop` | 开发分支，集成测试 |
| `feature/*` | 功能开发分支 |
| `bugfix/*` | Bug 修复分支 |
| `release/*` | 发布准备分支 |

#### Commit 规范（Conventional Commits）

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**类型 (type)**：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具变更

**示例**：
```
feat(auth): add login screen with email validation
fix(ui): resolve button alignment issue on small screens
docs(readme): update installation instructions
```

## Domain Context

### 业务领域

- 移动端应用开发
- 端侧 AI（On-Device VLM）✅ 已实现
- 图像记忆存储与检索 🚧 计划中
- RAG（检索增强生成）功能探索

### 核心业务概念

| 概念 | 说明 |
|------|------|
| **图像记忆** | 一张图片 + AI 生成的描述 + 元数据（时间、标签等） |
| **记忆库** | 存储所有图像记忆的本地数据库 |
| **语义搜索** | 通过自然语言描述搜索匹配的图像记忆 |
| **端侧推理** | 在设备本地运行 AI 模型，无需网络 |

### 技术概念

- **VLM (Vision Language Model)**：视觉语言模型，能理解图像并生成文本
- **MNN**：阿里巴巴开源的移动端神经网络推理框架
- **Composable**：Jetpack Compose 中的 UI 构建块
- **Recomposition**：Compose 的 UI 更新机制
- **State Hoisting**：将状态提升到父组件管理
- **Side Effects**：Compose 中的副作用处理（LaunchedEffect, DisposableEffect）

## Important Constraints

### 技术约束

- **最低 Android 版本**：Android 7.0 (API 24)
- **目标 Android 版本**：Android 16 (API 36)
- **JVM 版本**：Java 11
- **Kotlin 版本**：2.0.21+

### 性能要求

- 启动时间 < 2 秒
- UI 响应时间 < 16ms（60fps）
- 内存占用合理，避免 OOM
- 支持后台运行和生命周期管理

### 设计约束

- 遵循 Material Design 3 规范
- 支持深色/浅色主题
- 支持 Android 12+ 动态颜色（Material You）
- 符合 WCAG 2.1 AA 无障碍标准

## External Dependencies

### 已集成

| 依赖 | 用途 | 状态 |
|------|------|------|
| AndroidX Core KTX | Kotlin 扩展函数 | ✅ |
| Lifecycle Runtime KTX | 生命周期感知组件 | ✅ |
| Activity Compose | Activity 与 Compose 集成 | ✅ |
| Compose BOM | Compose 版本管理 | ✅ |
| Material 3 | UI 组件库 | ✅ |
| Coil | 图片加载 | ✅ |
| **MNN SDK** | 端侧神经网络推理框架 | ✅ |
| **Qwen3-VL-2B-MNN** | 视觉语言模型（1.37GB） | ✅ |

### 端侧 AI 能力 (2026-01-28 验证)

| 指标 | 测量值 |
|------|--------|
| 模型 | Qwen3-VL-2B-Instruct (MNN 格式) |
| 首 Token 延迟 | 3224ms |
| 解码速度 | 14.0 tok/s |
| 内存要求 | >= 4GB RAM |

### 计划集成

| 依赖 | 用途 | 优先级 |
|------|------|--------|
| Room | 本地数据库（图像记忆存储） | **高** |
| Navigation Compose | 页面导航（历史记录页） | **高** |
| Hilt | 依赖注入 | 中 |
| DataStore | 偏好设置存储 | 中 |
| Text Embedding 模型 | 语义搜索向量化 | 低 |

### 开发工具

- **Android Studio** - 主要 IDE
- **Cursor** - AI 辅助编码
- **Gradle** - 构建系统
- **Git** - 版本控制
