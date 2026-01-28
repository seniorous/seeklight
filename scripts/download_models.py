#!/usr/bin/env python3
"""
Qwen3-VL-2B-Instruct 模型下载脚本

支持下载三种格式的模型：
- MNN: Android 端侧推理（主要）
- GGUF: llama.cpp 兼容格式
- FP8: 高精度备用

使用方法:
    python download_models.py --all          # 下载所有格式
    python download_models.py --mnn          # 只下载 MNN 格式
    python download_models.py --gguf         # 只下载 GGUF 格式
    python download_models.py --fp8          # 只下载 FP8 格式
    python download_models.py --mnn --gguf   # 下载 MNN 和 GGUF
"""

import argparse
import os
import sys
from pathlib import Path

try:
    from huggingface_hub import snapshot_download, hf_hub_download
    from tqdm import tqdm
except ImportError:
    print("错误: 请先安装依赖")
    print("运行: pip install -r requirements.txt")
    sys.exit(1)


# 模型配置
MODELS = {
    "mnn": {
        "repo_id": "taobao-mnn/Qwen3-VL-2B-Instruct-MNN",
        "local_dir": "qwen3-vl-2b-instruct-mnn",
        "description": "MNN 格式 - Android 端侧推理（推荐）",
        "size": "~1.5GB"
    },
    "gguf": {
        "repo_id": "Qwen/Qwen3-VL-2B-Instruct-GGUF",
        "local_dir": "qwen3-vl-2b-instruct-gguf",
        "description": "GGUF Q8_0 格式 - llama.cpp 兼容",
        "size": "~1.8GB",
        # 只下载 Q8_0 和视觉编码器
        "allow_patterns": [
            "*q8_0*.gguf",
            "*Q8_0*.gguf", 
            "*mmproj*.gguf",
            "*.json",
            "*.md"
        ]
    },
    "fp8": {
        "repo_id": "Qwen/Qwen3-VL-2B-Instruct-FP8",
        "local_dir": "qwen3-vl-2b-instruct-fp8",
        "description": "FP8 格式 - 高精度备用",
        "size": "~2.5GB"
    }
}

# 默认模型存储路径
DEFAULT_MODELS_DIR = Path(__file__).parent.parent / "models"


def download_model(model_type: str, models_dir: Path, force: bool = False) -> bool:
    """
    下载指定类型的模型
    
    Args:
        model_type: 模型类型 (mnn/gguf/fp8)
        models_dir: 模型存储目录
        force: 是否强制重新下载
    
    Returns:
        是否下载成功
    """
    if model_type not in MODELS:
        print(f"错误: 未知的模型类型 '{model_type}'")
        return False
    
    config = MODELS[model_type]
    local_dir = models_dir / config["local_dir"]
    
    # 检查是否已存在
    if local_dir.exists() and not force:
        print(f"模型已存在: {local_dir}")
        print(f"使用 --force 强制重新下载")
        return True
    
    print(f"\n{'='*60}")
    print(f"下载模型: {config['description']}")
    print(f"仓库: {config['repo_id']}")
    print(f"大小: {config['size']}")
    print(f"目标: {local_dir}")
    print(f"{'='*60}\n")
    
    try:
        # 确保目录存在
        models_dir.mkdir(parents=True, exist_ok=True)
        
        # 下载参数
        download_kwargs = {
            "repo_id": config["repo_id"],
            "local_dir": str(local_dir),
            "local_dir_use_symlinks": False,
            "resume_download": True,  # 支持断点续传
        }
        
        # GGUF 只下载特定文件
        if "allow_patterns" in config:
            download_kwargs["allow_patterns"] = config["allow_patterns"]
        
        # 执行下载
        snapshot_download(**download_kwargs)
        
        print(f"\n下载完成: {local_dir}")
        return True
        
    except KeyboardInterrupt:
        print("\n下载已取消")
        return False
    except Exception as e:
        print(f"\n下载失败: {e}")
        return False


def list_models():
    """列出可用的模型"""
    print("\n可用的模型格式:")
    print("-" * 60)
    for model_type, config in MODELS.items():
        print(f"  --{model_type:6} : {config['description']}")
        print(f"           仓库: {config['repo_id']}")
        print(f"           大小: {config['size']}")
        print()


def check_existing_models(models_dir: Path):
    """检查已下载的模型"""
    print(f"\n检查已下载的模型 ({models_dir}):")
    print("-" * 60)
    
    for model_type, config in MODELS.items():
        local_dir = models_dir / config["local_dir"]
        if local_dir.exists():
            # 计算目录大小
            size = sum(f.stat().st_size for f in local_dir.rglob("*") if f.is_file())
            size_gb = size / (1024**3)
            print(f"  [已下载] {model_type:6} : {local_dir.name} ({size_gb:.2f} GB)")
        else:
            print(f"  [未下载] {model_type:6}")
    print()


def main():
    parser = argparse.ArgumentParser(
        description="Qwen3-VL-2B-Instruct 模型下载工具",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
    python download_models.py --all          # 下载所有格式
    python download_models.py --mnn          # 只下载 MNN 格式（推荐）
    python download_models.py --gguf         # 只下载 GGUF 格式
    python download_models.py --mnn --gguf   # 下载多个格式
    python download_models.py --list         # 列出可用模型
    python download_models.py --check        # 检查已下载的模型
        """
    )
    
    parser.add_argument("--all", action="store_true", help="下载所有格式的模型")
    parser.add_argument("--mnn", action="store_true", help="下载 MNN 格式（Android 端侧）")
    parser.add_argument("--gguf", action="store_true", help="下载 GGUF Q8_0 格式")
    parser.add_argument("--fp8", action="store_true", help="下载 FP8 格式")
    parser.add_argument("--models-dir", type=Path, default=DEFAULT_MODELS_DIR,
                        help=f"模型存储目录 (默认: {DEFAULT_MODELS_DIR})")
    parser.add_argument("--force", action="store_true", help="强制重新下载")
    parser.add_argument("--list", action="store_true", help="列出可用的模型格式")
    parser.add_argument("--check", action="store_true", help="检查已下载的模型")
    
    args = parser.parse_args()
    
    # 列出模型
    if args.list:
        list_models()
        return
    
    # 检查已下载的模型
    if args.check:
        check_existing_models(args.models_dir)
        return
    
    # 确定要下载的模型
    models_to_download = []
    
    if args.all:
        models_to_download = list(MODELS.keys())
    else:
        if args.mnn:
            models_to_download.append("mnn")
        if args.gguf:
            models_to_download.append("gguf")
        if args.fp8:
            models_to_download.append("fp8")
    
    # 没有指定任何模型
    if not models_to_download:
        print("错误: 请指定要下载的模型格式")
        print("使用 --help 查看帮助")
        list_models()
        return
    
    print(f"模型存储目录: {args.models_dir}")
    print(f"将下载以下模型: {', '.join(models_to_download)}")
    
    # 下载模型
    success_count = 0
    for model_type in models_to_download:
        if download_model(model_type, args.models_dir, args.force):
            success_count += 1
    
    print(f"\n{'='*60}")
    print(f"下载完成: {success_count}/{len(models_to_download)} 个模型")
    print(f"{'='*60}")
    
    # 显示已下载的模型
    check_existing_models(args.models_dir)


if __name__ == "__main__":
    main()
