# Qwen3-VL 图像描述 MVP 测试指南

## 概述

本文档提供 Qwen3-VL 图像描述 MVP 的完整测试指南，包括单元测试、UI 测试和手动测试流程。

## 测试架构

```
app/src/
├── test/                           # 单元测试
│   └── java/com/example/software/
│       ├── ai/
│       │   └── ImageProcessorTest.kt
│       └── ui/viewmodels/
│           └── ImageDescriptionViewModelTest.kt
└── androidTest/                    # 仪器测试（UI 测试）
    └── java/com/example/software/
        └── ui/screens/
            └── ImageDescriptionScreenTest.kt
```

## 1. 单元测试

### 运行所有单元测试

```bash
# 在项目根目录执行
./gradlew test

# 或指定模块
./gradlew :app:testDebugUnitTest
```

### 运行特定测试类

```bash
# 运行 ImageProcessorTest
./gradlew test --tests "com.example.software.ai.ImageProcessorTest"

# 运行 ViewModel 测试
./gradlew test --tests "com.example.software.ui.viewmodels.ImageDescriptionViewModelTest"
```

### 测试覆盖范围

| 测试类 | 覆盖功能 |
|--------|----------|
| `ImageProcessorTest` | 图像预处理、缩放、裁剪、旋转、归一化 |
| `ImageDescriptionViewModelTest` | 状态管理、生命周期、内存检查 |

### 关键测试用例

#### ImageProcessor 测试

- `preprocess should return correct dimensions for small image` - 小图片保持原尺寸
- `preprocess should resize large image` - 大图片正确缩放
- `preprocess should return normalized pixel values` - 像素归一化
- `centerCrop should return square image` - 中心裁剪
- `rotate should return rotated image` - 图像旋转

#### ViewModel 测试

- `initial state should be correct` - 初始状态验证
- `clearImage should reset image state` - 清除图片状态
- `cancelInference should stop processing` - 取消推理
- `performanceMetrics totalTimeMs calculation` - 性能指标计算

## 2. UI 测试（仪器测试）

### 运行所有 UI 测试

```bash
# 需要连接设备或启动模拟器
./gradlew connectedAndroidTest

# 或指定模块
./gradlew :app:connectedDebugAndroidTest
```

### 运行特定 UI 测试

```bash
# 运行 ImageDescriptionScreenTest
./gradlew connectedAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.example.software.ui.screens.ImageDescriptionScreenTest
```

### 测试覆盖范围

| 测试类 | 覆盖功能 |
|--------|----------|
| `ImageDescriptionScreenTest` | UI 组件显示、交互、状态变化 |

### 关键测试用例

- `imagePickerButton_displaysCorrectText` - 图片选择按钮文本
- `descriptionCard_showsEmptyStateMessage` - 空状态提示
- `descriptionCard_showsStreamingIndicator` - 流式输出指示器
- `performanceIndicator_showsMetrics` - 性能指标显示

## 3. 手动测试流程

### 3.1 准备工作

#### 设备要求
- Android 7.0 (API 24) 或更高版本
- ARM64 处理器（arm64-v8a）
- 至少 4GB RAM
- 约 2GB 可用存储空间

#### 安装应用

```bash
# 构建并安装 Debug 版本
./gradlew installDebug
```

### 3.2 功能测试清单

#### A. 图片选择测试

| 测试项 | 步骤 | 预期结果 |
|--------|------|----------|
| 选择相册图片 | 点击"选择图片"→从相册选择图片 | 图片显示在预览区域 |
| 清除已选图片 | 点击图片右上角的 X 按钮 | 图片被清除，显示空状态 |
| 大图片处理 | 选择一张高分辨率图片（>5000px） | 图片正确加载，无崩溃 |
| 不同格式支持 | 分别选择 JPG、PNG、WebP 格式图片 | 所有格式正常加载 |

#### B. 描述生成测试

| 测试项 | 步骤 | 预期结果 |
|--------|------|----------|
| 生成描述按钮 | 选择图片后点击"生成描述" | 按钮可点击，开始生成 |
| 流式输出 | 点击生成描述 | 文字逐步显示，有光标效果 |
| 停止生成 | 生成过程中点击"停止生成" | 生成停止，保留已生成内容 |
| 无图片状态 | 不选择图片直接点击生成 | 按钮应禁用 |

#### C. 性能指标测试

| 测试项 | 步骤 | 预期结果 |
|--------|------|----------|
| 首 Token 时间 | 生成描述，观察性能指标 | 显示 Prefill 时间（毫秒） |
| 解码速度 | 生成完成后查看性能指标 | 显示 tok/s 数值 |
| Token 计数 | 生成完成后查看性能指标 | 显示总 Token 数 |

#### D. 错误处理测试

| 测试项 | 步骤 | 预期结果 |
|--------|------|----------|
| 模型未加载 | 不加载模型直接生成 | 显示提示信息 |
| 内存不足 | 在低内存设备上运行 | 显示内存不足警告 |
| 权限拒绝 | 拒绝存储权限后选择图片 | 显示权限请求或错误提示 |

### 3.3 性能测试

#### 基准测试（在计划文档中指定的设备上）

| 指标 | 目标值 | 测量方法 |
|------|--------|----------|
| 首 Token 时间 | < 5 秒 | 查看性能指标 |
| 解码速度 | >= 8 tok/s | 查看性能指标 |
| 内存占用 | < 4GB | Android Profiler |
| 应用启动时间 | < 2 秒 | 冷启动计时 |

#### 压力测试

1. **连续生成测试**：连续生成 10 次描述，观察：
   - 内存是否持续增长
   - 性能是否下降
   - 是否有崩溃或卡顿

2. **长时间运行**：保持应用运行 30 分钟，间歇性生成描述：
   - 检查内存泄漏
   - 检查温度变化

### 3.4 兼容性测试

| 测试环境 | 测试设备 |
|----------|----------|
| Android 7.0 | 低端设备 |
| Android 10 | 中端设备 |
| Android 13+ | 高端设备 |
| 深色模式 | 系统深色主题 |
| 浅色模式 | 系统浅色主题 |
| 横屏模式 | 旋转设备 |

## 4. 测试报告

### 生成测试报告

```bash
# 运行测试并生成 HTML 报告
./gradlew test --info
./gradlew connectedAndroidTest --info

# 报告位置
# 单元测试：app/build/reports/tests/testDebugUnitTest/index.html
# UI 测试：app/build/reports/androidTests/connected/index.html
```

### 测试覆盖率报告

```bash
# 添加 JaCoCo 插件后
./gradlew jacocoTestReport
# 报告位置：app/build/reports/jacoco/
```

## 5. 持续集成

### GitHub Actions 配置示例

```yaml
name: Android Tests

on: [push, pull_request]

jobs:
  unit-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Run Unit Tests
        run: ./gradlew testDebugUnitTest

  instrumented-test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Run Instrumented Tests
        uses: reactivecircus/android-emulator-runner@v2
        with:
          api-level: 29
          script: ./gradlew connectedDebugAndroidTest
```

## 6. 常见问题排查

### 单元测试失败

**问题**：Robolectric 初始化失败
**解决**：确保 `@Config(sdk = [33])` 注解正确配置

**问题**：协程测试超时
**解决**：使用 `runTest` 和 `StandardTestDispatcher`

### UI 测试失败

**问题**：找不到节点
**解决**：检查 Compose 测试规则和节点匹配器

**问题**：设备连接失败
**解决**：确保 adb 正常工作，设备已授权

### 性能测试不达标

**问题**：首 Token 时间过长
**可能原因**：
- 模型未预热
- 设备内存不足
- CPU 被其他应用占用

**问题**：解码速度低
**可能原因**：
- 未启用 GPU 加速
- 线程配置不当
- 温度过高导致降频

## 7. 测试最佳实践

### 命名规范

```kotlin
// 使用 given_when_then 格式
@Test
fun `given valid image when preprocess then returns correct dimensions`()

// 或使用描述性名称
@Test
fun `preprocess should resize large image to max dimensions`()
```

### 测试隔离

- 每个测试应独立运行
- 使用 `@Before` 和 `@After` 进行设置和清理
- 避免测试间共享状态

### Mock 使用

```kotlin
// 使用 Fake 而非 Mock（推荐）
class FakeModelManager : ModelManager {
    override fun isMnnModelAvailable() = true
    // ...
}

// 必要时使用 Mockito
val mockContext = mock<Context>()
whenever(mockContext.filesDir).thenReturn(tempDir)
```

## 8. 验收标准检查清单

根据计划文档中的验收标准：

- [x] 可以选择图片 → ImagePickerButton 组件已实现
- [x] 可以生成图像描述 → describeImage() 方法已实现
- [x] 流式显示输出 → inferenceStream() + 流式 UI 已实现
- [x] 显示性能指标 → PerformanceIndicator 组件已实现
- [ ] 首 token < 5 秒 → 需要在真机上验证
- [ ] Decode 速度 >= 8 tok/s → 需要在真机上验证
- [ ] 无崩溃/内存溢出 → 需要压力测试验证

## 下一步

1. 获取 MNN .so 文件并放入 `jniLibs/arm64-v8a/`
2. 下载 Qwen3-VL-2B 模型到设备
3. 在目标设备上运行完整测试
4. 收集性能数据并优化
