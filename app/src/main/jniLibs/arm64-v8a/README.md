# MNN Native Libraries

此目录存放 MNN 推理引擎的原生库文件。

## 所需文件

```
arm64-v8a/
├── libMNN.so              # MNN 核心库
├── libMNN_Express.so      # MNN Express API
├── libllm.so              # LLM 推理库
└── libmnnllm.so           # MNN LLM 封装库 (可选)
```

## 获取方式

### 方式一：从官方 APK 提取（推荐）

1. 下载 MNN Chat APK: https://meta.alicdn.com/data/mnn/mnn_chat_0_7_5.apk
2. 将 APK 重命名为 .zip 并解压
3. 进入 `lib/arm64-v8a/` 目录
4. 复制所有 `.so` 文件到此目录

### 方式二：从源码编译

```bash
# 克隆 MNN 仓库
git clone https://github.com/alibaba/MNN.git
cd MNN

# 编译 Android 库
cd project/android
mkdir build_64
cd build_64

# 编译命令（启用 LLM 和 OpenCL 支持）
../build_64.sh "-DMNN_LOW_MEMORY=true \
    -DMNN_CPU_WEIGHT_DEQUANT_GEMM=true \
    -DMNN_BUILD_LLM=true \
    -DMNN_SUPPORT_TRANSFORMER_FUSE=true \
    -DMNN_ARM82=true \
    -DMNN_OPENCL=true \
    -DLLM_SUPPORT_VISION=true"

make install
```

编译完成后，so 文件位于 `build_64/` 目录。

### 方式三：使用预编译发布

访问 MNN GitHub Releases 下载预编译库：
https://github.com/alibaba/MNN/releases

## 文件大小参考

| 文件 | 大小 |
|------|------|
| libMNN.so | ~10-15 MB |
| libMNN_Express.so | ~2-5 MB |
| libllm.so | ~5-10 MB |

## 注意事项

1. 仅支持 arm64-v8a 架构（64位）
2. 确保所有 so 文件版本一致
3. so 文件已加入 .gitignore，不会提交到版本控制
