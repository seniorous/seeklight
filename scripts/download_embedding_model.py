#!/usr/bin/env python3
"""
下载 Text Embedding 模型 (all-MiniLM-L6-v2 ONNX)

用于 SeekLight 语义搜索功能
"""

import os
import sys
import urllib.request
import hashlib
from pathlib import Path

# 模型配置
MODEL_CONFIG = {
    "name": "all-MiniLM-L6-v2",
    "files": [
        {
            "filename": "model.onnx",
            "url": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/onnx/model.onnx",
            "size_mb": 90,
        },
        {
            "filename": "tokenizer.json",
            "url": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/tokenizer.json",
            "size_mb": 1,
        },
        {
            "filename": "vocab.txt",
            "url": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/vocab.txt",
            "size_mb": 1,
        },
    ],
}

# 输出目录
OUTPUT_DIR = Path(__file__).parent.parent / "app" / "src" / "main" / "assets" / "models" / "minilm-l6-v2"


def download_file(url: str, filepath: Path, expected_size_mb: int = None) -> bool:
    """下载文件并显示进度"""
    print(f"\n[Download] {filepath.name}")
    print(f"   URL: {url}")
    
    if filepath.exists():
        print(f"   [OK] File exists, skip")
        return True
    
    try:
        # 创建目录
        filepath.parent.mkdir(parents=True, exist_ok=True)
        
        # 下载
        def progress_hook(count, block_size, total_size):
            if total_size > 0:
                percent = min(100, count * block_size * 100 // total_size)
                downloaded_mb = count * block_size / (1024 * 1024)
                total_mb = total_size / (1024 * 1024)
                sys.stdout.write(f"\r   Progress: {percent}% ({downloaded_mb:.1f}/{total_mb:.1f} MB)")
                sys.stdout.flush()
        
        urllib.request.urlretrieve(url, filepath, reporthook=progress_hook)
        print(f"\n   [OK] Downloaded: {filepath.stat().st_size / (1024*1024):.1f} MB")
        return True
        
    except Exception as e:
        print(f"\n   [ERROR] Download failed: {e}")
        if filepath.exists():
            filepath.unlink()
        return False


def main():
    print("=" * 60)
    print("SeekLight Embedding Model Downloader")
    print("=" * 60)
    print(f"Model: {MODEL_CONFIG['name']}")
    print(f"Output: {OUTPUT_DIR}")
    
    # 下载所有文件
    success = True
    for file_info in MODEL_CONFIG["files"]:
        filepath = OUTPUT_DIR / file_info["filename"]
        if not download_file(file_info["url"], filepath, file_info.get("size_mb")):
            success = False
    
    print("\n" + "=" * 60)
    if success:
        print("[SUCCESS] All files downloaded!")
        print(f"\nModel directory: {OUTPUT_DIR}")
        print("\nFiles:")
        for f in OUTPUT_DIR.iterdir():
            print(f"  - {f.name} ({f.stat().st_size / (1024*1024):.1f} MB)")
    else:
        print("[FAILED] Some files failed to download, please retry")
        sys.exit(1)


if __name__ == "__main__":
    main()
