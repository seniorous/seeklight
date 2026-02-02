/**
 * SeekLight项目计划书 - 流程图生成脚本
 * 生成至少7张专业架构图
 */
const fs = require('fs');
const path = require('path');

// 确保输出目录存在
const outputDir = path.join(__dirname, 'images');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 图1: 系统总体架构图（三层处理管道）
const diagram1_architecture = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="720" viewBox="0 0 800 720">
  <defs>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3498db"/>
      <stop offset="100%" style="stop-color:#2980b9"/>
    </linearGradient>
    <linearGradient id="layer1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#e74c3c"/>
      <stop offset="100%" style="stop-color:#c0392b"/>
    </linearGradient>
    <linearGradient id="layer2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f39c12"/>
      <stop offset="100%" style="stop-color:#e67e22"/>
    </linearGradient>
    <linearGradient id="layer3Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#27ae60"/>
      <stop offset="100%" style="stop-color:#229954"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="800" height="720" fill="#f8f9fa"/>
  
  <!-- 标题 -->
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="22" font-weight="bold" fill="#2c3e50">SeekLight 多层处理管道架构</text>
  
  <!-- 输入层 -->
  <rect x="50" y="60" width="700" height="55" rx="8" fill="url(#headerGrad)" filter="url(#shadow)"/>
  <text x="400" y="93" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="16" fill="white" font-weight="bold">图像输入（截图/相册）</text>
  
  <!-- 箭头1 -->
  <path d="M400,115 L400,140" stroke="#7f8c8d" stroke-width="3" marker-end="url(#arrowhead)"/>
  <polygon points="400,150 395,140 405,140" fill="#7f8c8d"/>
  
  <!-- Layer 1: 快速预处理 -->
  <rect x="50" y="155" width="700" height="120" rx="8" fill="#fff" stroke="#e74c3c" stroke-width="2" filter="url(#shadow)"/>
  <rect x="50" y="155" width="700" height="32" rx="8" ry="0" fill="url(#layer1Grad)"/>
  <text x="400" y="177" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">Layer 1: 快速预处理（&lt;100ms）</text>
  
  <!-- Layer 1 组件 -->
  <rect x="70" y="200" width="150" height="55" rx="5" fill="#ffeaa7"/>
  <text x="145" y="223" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">二维码识别</text>
  <text x="145" y="243" text-anchor="middle" font-family="Arial" font-size="11" fill="#636e72">(ZXing)</text>
  
  <rect x="235" y="200" width="150" height="55" rx="5" fill="#ffeaa7"/>
  <text x="310" y="223" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">场景分类</text>
  <text x="310" y="243" text-anchor="middle" font-family="Arial" font-size="11" fill="#636e72">(规则引擎)</text>
  
  <rect x="400" y="200" width="150" height="55" rx="5" fill="#ffeaa7"/>
  <text x="475" y="223" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">快速OCR</text>
  <text x="475" y="243" text-anchor="middle" font-family="Arial" font-size="11" fill="#636e72">(ML Kit)</text>
  
  <rect x="565" y="200" width="165" height="55" rx="5" fill="#ffeaa7"/>
  <text x="647" y="223" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">文本向量化</text>
  <text x="647" y="243" text-anchor="middle" font-family="Arial" font-size="11" fill="#636e72">(MiniLM)</text>
  
  <!-- 箭头2 -->
  <polygon points="400,290 395,280 405,280" fill="#7f8c8d"/>
  
  <!-- Layer 2: 结构化提取 -->
  <rect x="50" y="295" width="700" height="120" rx="8" fill="#fff" stroke="#f39c12" stroke-width="2" filter="url(#shadow)"/>
  <rect x="50" y="295" width="700" height="32" rx="8" ry="0" fill="url(#layer2Grad)"/>
  <text x="400" y="317" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">Layer 2: 结构化提取（~200ms）</text>
  
  <!-- Layer 2 组件 -->
  <rect x="70" y="340" width="150" height="55" rx="5" fill="#dfe6e9"/>
  <text x="145" y="363" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">价格提取</text>
  <text x="145" y="383" text-anchor="middle" font-family="Arial" font-size="11" fill="#636e72">¥299.00</text>
  
  <rect x="235" y="340" width="150" height="55" rx="5" fill="#dfe6e9"/>
  <text x="310" y="363" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">日期提取</text>
  <text x="310" y="383" text-anchor="middle" font-family="Arial" font-size="11" fill="#636e72">2026-01-28</text>
  
  <rect x="400" y="340" width="150" height="55" rx="5" fill="#dfe6e9"/>
  <text x="475" y="363" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">单号提取</text>
  <text x="475" y="383" text-anchor="middle" font-family="Arial" font-size="11" fill="#636e72">SF123456</text>
  
  <rect x="565" y="340" width="165" height="55" rx="5" fill="#dfe6e9"/>
  <text x="647" y="363" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">联系方式</text>
  <text x="647" y="383" text-anchor="middle" font-family="Arial" font-size="11" fill="#636e72">电话/邮箱</text>
  
  <!-- 箭头3 -->
  <polygon points="400,430 395,420 405,420" fill="#7f8c8d"/>
  
  <!-- Layer 3: 深度语义理解 -->
  <rect x="50" y="435" width="700" height="100" rx="8" fill="#fff" stroke="#27ae60" stroke-width="2" filter="url(#shadow)"/>
  <rect x="50" y="435" width="700" height="32" rx="8" ry="0" fill="url(#layer3Grad)"/>
  <text x="400" y="457" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">Layer 3: 深度语义理解（3-5s，可选）</text>
  
  <!-- Layer 3 组件 -->
  <rect x="100" y="480" width="280" height="40" rx="5" fill="#a8e6cf"/>
  <text x="240" y="505" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">端侧VLM (Qwen3-VL-2B) - 本地推理</text>
  
  <rect x="420" y="480" width="280" height="40" rx="5" fill="#88d8b0"/>
  <text x="560" y="505" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#2c3e50">云端VLM (Qwen3-VL-235B) - 高精度</text>
  
  <!-- 箭头4 -->
  <polygon points="400,550 395,540 405,540" fill="#7f8c8d"/>
  
  <!-- 存储层 -->
  <rect x="150" y="555" width="500" height="45" rx="8" fill="#9b59b6" filter="url(#shadow)"/>
  <text x="400" y="583" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">本地存储（Room + 向量数据库）</text>
  
  <!-- 箭头5 -->
  <polygon points="400,615 395,605 405,605" fill="#7f8c8d"/>
  
  <!-- 用户交互层 -->
  <rect x="100" y="620" width="600" height="45" rx="8" fill="#34495e" filter="url(#shadow)"/>
  <text x="400" y="648" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">用户交互：语义搜索 / 智能建议 / Deep Link跳转</text>
  
  <!-- 时间标注 -->
  <text x="780" y="205" text-anchor="end" font-family="Arial" font-size="10" fill="#e74c3c">&lt;100ms</text>
  <text x="780" y="345" text-anchor="end" font-family="Arial" font-size="10" fill="#f39c12">~200ms</text>
  <text x="780" y="475" text-anchor="end" font-family="Arial" font-size="10" fill="#27ae60">3-5s</text>
</svg>`;

// 图2: 技术栈组件图
const diagram2_techstack = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <filter id="shadow2" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="800" height="500" fill="#f5f6fa"/>
  
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="20" font-weight="bold" fill="#2c3e50">SeekLight 技术栈全景</text>
  
  <!-- UI层 -->
  <rect x="50" y="55" width="700" height="80" rx="10" fill="#3498db" filter="url(#shadow2)"/>
  <text x="400" y="80" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">表现层 (Presentation Layer)</text>
  <rect x="70" y="92" width="140" height="35" rx="5" fill="white"/>
  <text x="140" y="114" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">Jetpack Compose</text>
  <rect x="225" y="92" width="140" height="35" rx="5" fill="white"/>
  <text x="295" y="114" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">Material Design 3</text>
  <rect x="380" y="92" width="140" height="35" rx="5" fill="white"/>
  <text x="450" y="114" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">StateFlow</text>
  <rect x="535" y="92" width="195" height="35" rx="5" fill="white"/>
  <text x="632" y="114" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">ViewModel + Coroutines</text>
  
  <!-- AI层 -->
  <rect x="50" y="150" width="700" height="100" rx="10" fill="#9b59b6" filter="url(#shadow2)"/>
  <text x="400" y="175" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">AI推理层 (AI Inference Layer)</text>
  <rect x="70" y="192" width="165" height="45" rx="5" fill="white"/>
  <text x="152" y="210" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">Qwen3-VL-2B</text>
  <text x="152" y="226" text-anchor="middle" font-family="Arial" font-size="9" fill="#7f8c8d">(1.37GB, 端侧VLM)</text>
  <rect x="250" y="192" width="155" height="45" rx="5" fill="white"/>
  <text x="327" y="210" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">MNN Framework</text>
  <text x="327" y="226" text-anchor="middle" font-family="Arial" font-size="9" fill="#7f8c8d">(阿里开源推理框架)</text>
  <rect x="420" y="192" width="155" height="45" rx="5" fill="white"/>
  <text x="497" y="210" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">MiniLM-L6-v2</text>
  <text x="497" y="226" text-anchor="middle" font-family="Arial" font-size="9" fill="#7f8c8d">(90MB, 文本嵌入)</text>
  <rect x="590" y="192" width="140" height="45" rx="5" fill="white"/>
  <text x="660" y="210" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">ONNX Runtime</text>
  <text x="660" y="226" text-anchor="middle" font-family="Arial" font-size="9" fill="#7f8c8d">(跨平台推理)</text>
  
  <!-- 数据层 -->
  <rect x="50" y="265" width="700" height="80" rx="10" fill="#27ae60" filter="url(#shadow2)"/>
  <text x="400" y="290" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">数据层 (Data Layer)</text>
  <rect x="70" y="305" width="200" height="30" rx="5" fill="white"/>
  <text x="170" y="325" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">Room Database 2.6.1</text>
  <rect x="285" y="305" width="200" height="30" rx="5" fill="white"/>
  <text x="385" y="325" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">ImageMemory Entity</text>
  <rect x="500" y="305" width="230" height="30" rx="5" fill="white"/>
  <text x="615" y="325" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">向量索引 (384维 Float)</text>
  
  <!-- 工具层 -->
  <rect x="50" y="360" width="700" height="80" rx="10" fill="#e67e22" filter="url(#shadow2)"/>
  <text x="400" y="385" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">工具层 (Utility Layer)</text>
  <rect x="70" y="400" width="150" height="30" rx="5" fill="white"/>
  <text x="145" y="420" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">ML Kit OCR</text>
  <rect x="235" y="400" width="150" height="30" rx="5" fill="white"/>
  <text x="310" y="420" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">ZXing 4.3.0</text>
  <rect x="400" y="400" width="150" height="30" rx="5" fill="white"/>
  <text x="475" y="420" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">OkHttp 4.12</text>
  <rect x="565" y="400" width="165" height="30" rx="5" fill="white"/>
  <text x="647" y="420" text-anchor="middle" font-family="Arial" font-size="11" fill="#2c3e50">Kotlin Serialization</text>
  
  <!-- 平台层 -->
  <rect x="50" y="455" width="700" height="35" rx="10" fill="#34495e" filter="url(#shadow2)"/>
  <text x="400" y="478" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white" font-weight="bold">Android Platform: SDK 36 (Android 16) | minSdk 24 | Kotlin 2.0.21 | JVM 11</text>
</svg>`;

// 图3: 端侧VLM推理流程图
const diagram3_vlm_flow = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
  <defs>
    <filter id="shadow3" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.15"/>
    </filter>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#7f8c8d"/>
    </marker>
  </defs>
  
  <rect width="800" height="420" fill="#fafafa"/>
  
  <text x="400" y="30" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="18" font-weight="bold" fill="#2c3e50">端侧VLM推理流程</text>
  
  <!-- 输入 -->
  <rect x="50" y="60" width="120" height="80" rx="10" fill="#3498db" filter="url(#shadow3)"/>
  <text x="110" y="95" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">图像输入</text>
  <text x="110" y="115" text-anchor="middle" font-family="Arial" font-size="10" fill="white">JPEG/PNG</text>
  
  <!-- 箭头 -->
  <line x1="170" y1="100" x2="210" y2="100" stroke="#7f8c8d" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- 预处理 -->
  <rect x="220" y="60" width="120" height="80" rx="10" fill="#9b59b6" filter="url(#shadow3)"/>
  <text x="280" y="90" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">图像预处理</text>
  <text x="280" y="108" text-anchor="middle" font-family="Arial" font-size="9" fill="white">缩放至448×448</text>
  <text x="280" y="123" text-anchor="middle" font-family="Arial" font-size="9" fill="white">归一化处理</text>
  
  <!-- 箭头 -->
  <line x1="340" y1="100" x2="380" y2="100" stroke="#7f8c8d" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- 视觉编码 -->
  <rect x="390" y="60" width="140" height="80" rx="10" fill="#e74c3c" filter="url(#shadow3)"/>
  <text x="460" y="90" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">Vision Encoder</text>
  <text x="460" y="108" text-anchor="middle" font-family="Arial" font-size="9" fill="white">ViT提取视觉特征</text>
  <text x="460" y="123" text-anchor="middle" font-family="Arial" font-size="9" fill="white">~1.2s</text>
  
  <!-- 箭头 -->
  <line x1="530" y1="100" x2="570" y2="100" stroke="#7f8c8d" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- MNN推理 -->
  <rect x="580" y="60" width="160" height="80" rx="10" fill="#27ae60" filter="url(#shadow3)"/>
  <text x="660" y="90" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">MNN LLM推理</text>
  <text x="660" y="108" text-anchor="middle" font-family="Arial" font-size="9" fill="white">W4A16量化推理</text>
  <text x="660" y="123" text-anchor="middle" font-family="Arial" font-size="9" fill="white">NPU/GPU/CPU</text>
  
  <!-- 性能指标框 -->
  <rect x="50" y="170" width="690" height="100" rx="10" fill="white" stroke="#bdc3c7" stroke-width="2"/>
  <text x="395" y="195" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" font-weight="bold" fill="#2c3e50">性能指标（骁龙8 Gen3测试数据）</text>
  
  <rect x="80" y="210" width="145" height="45" rx="5" fill="#ecf0f1"/>
  <text x="152" y="230" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">首Token延迟</text>
  <text x="152" y="248" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#e74c3c">3224ms</text>
  
  <rect x="240" y="210" width="145" height="45" rx="5" fill="#ecf0f1"/>
  <text x="312" y="230" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">解码速度</text>
  <text x="312" y="248" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#27ae60">14.0 tok/s</text>
  
  <rect x="400" y="210" width="145" height="45" rx="5" fill="#ecf0f1"/>
  <text x="472" y="230" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">模型大小</text>
  <text x="472" y="248" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#3498db">1.37GB</text>
  
  <rect x="560" y="210" width="160" height="45" rx="5" fill="#ecf0f1"/>
  <text x="640" y="230" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">峰值内存</text>
  <text x="640" y="248" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#9b59b6">4.2GB</text>
  
  <!-- 输出格式 -->
  <rect x="50" y="290" width="690" height="110" rx="10" fill="#2c3e50" filter="url(#shadow3)"/>
  <text x="395" y="315" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" font-weight="bold" fill="white">输出结构化JSON Schema</text>
  
  <rect x="70" y="330" width="130" height="55" rx="5" fill="#3498db"/>
  <text x="135" y="355" text-anchor="middle" font-family="Arial" font-size="11" fill="white">summary</text>
  <text x="135" y="373" text-anchor="middle" font-family="Arial" font-size="9" fill="#dfe6e9">一句话概述</text>
  
  <rect x="215" y="330" width="130" height="55" rx="5" fill="#9b59b6"/>
  <text x="280" y="355" text-anchor="middle" font-family="Arial" font-size="11" fill="white">narrative</text>
  <text x="280" y="373" text-anchor="middle" font-family="Arial" font-size="9" fill="#dfe6e9">详细描述</text>
  
  <rect x="360" y="330" width="130" height="55" rx="5" fill="#27ae60"/>
  <text x="425" y="355" text-anchor="middle" font-family="Arial" font-size="11" fill="white">tags[]</text>
  <text x="425" y="373" text-anchor="middle" font-family="Arial" font-size="9" fill="#dfe6e9">语义标签</text>
  
  <rect x="505" y="330" width="100" height="55" rx="5" fill="#e67e22"/>
  <text x="555" y="355" text-anchor="middle" font-family="Arial" font-size="11" fill="white">ocrText</text>
  <text x="555" y="373" text-anchor="middle" font-family="Arial" font-size="9" fill="#dfe6e9">文字内容</text>
  
  <rect x="620" y="330" width="100" height="55" rx="5" fill="#e74c3c"/>
  <text x="670" y="355" text-anchor="middle" font-family="Arial" font-size="11" fill="white">colors</text>
  <text x="670" y="373" text-anchor="middle" font-family="Arial" font-size="9" fill="#dfe6e9">主色调</text>
</svg>`;

// 图4: 语义搜索流程图
const diagram4_semantic_search = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="380" viewBox="0 0 800 380">
  <defs>
    <filter id="shadow4" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.15"/>
    </filter>
    <marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#7f8c8d"/>
    </marker>
  </defs>
  
  <rect width="800" height="380" fill="#f8f9fa"/>
  
  <text x="400" y="30" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="18" font-weight="bold" fill="#2c3e50">语义向量检索流程</text>
  
  <!-- 用户输入 -->
  <rect x="50" y="60" width="140" height="70" rx="10" fill="#3498db" filter="url(#shadow4)"/>
  <text x="120" y="90" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">用户查询</text>
  <text x="120" y="110" text-anchor="middle" font-family="Arial" font-size="10" fill="#dfe6e9">"红色的裙子"</text>
  
  <line x1="190" y1="95" x2="230" y2="95" stroke="#7f8c8d" stroke-width="2" marker-end="url(#arrow4)"/>
  
  <!-- 文本嵌入 -->
  <rect x="240" y="60" width="160" height="70" rx="10" fill="#9b59b6" filter="url(#shadow4)"/>
  <text x="320" y="85" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">MiniLM嵌入</text>
  <text x="320" y="103" text-anchor="middle" font-family="Arial" font-size="10" fill="#dfe6e9">384维向量化</text>
  <text x="320" y="118" text-anchor="middle" font-family="Arial" font-size="9" fill="#f1c40f">~50ms</text>
  
  <line x1="400" y1="95" x2="440" y2="95" stroke="#7f8c8d" stroke-width="2" marker-end="url(#arrow4)"/>
  
  <!-- 相似度计算 -->
  <rect x="450" y="60" width="150" height="70" rx="10" fill="#e67e22" filter="url(#shadow4)"/>
  <text x="525" y="85" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">余弦相似度</text>
  <text x="525" y="103" text-anchor="middle" font-family="Arial" font-size="10" fill="#dfe6e9">cos(query, doc)</text>
  <text x="525" y="118" text-anchor="middle" font-family="Arial" font-size="9" fill="#f1c40f">Top-K排序</text>
  
  <line x1="600" y1="95" x2="640" y2="95" stroke="#7f8c8d" stroke-width="2" marker-end="url(#arrow4)"/>
  
  <!-- 结果返回 -->
  <rect x="650" y="60" width="100" height="70" rx="10" fill="#27ae60" filter="url(#shadow4)"/>
  <text x="700" y="90" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">搜索结果</text>
  <text x="700" y="110" text-anchor="middle" font-family="Arial" font-size="10" fill="#dfe6e9">图片列表</text>
  
  <!-- 数据库连接 -->
  <rect x="450" y="160" width="150" height="60" rx="10" fill="#34495e" filter="url(#shadow4)"/>
  <text x="525" y="185" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">向量数据库</text>
  <text x="525" y="203" text-anchor="middle" font-family="Arial" font-size="10" fill="#dfe6e9">Room + Float[]</text>
  
  <line x1="525" y1="130" x2="525" y2="155" stroke="#7f8c8d" stroke-width="2" marker-end="url(#arrow4)"/>
  
  <!-- 公式框 -->
  <rect x="50" y="250" width="700" height="110" rx="10" fill="white" stroke="#bdc3c7" stroke-width="2"/>
  <text x="400" y="280" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" font-weight="bold" fill="#2c3e50">余弦相似度计算公式</text>
  
  <text x="400" y="320" text-anchor="middle" font-family="Times New Roman" font-size="18" fill="#2c3e50">similarity(A, B) = (A · B) / (||A|| × ||B||)</text>
  
  <text x="400" y="350" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#7f8c8d">其中 A = 查询向量，B = 文档向量，均为384维浮点数组</text>
</svg>`;

// 图5: 隐私保护架构图
const diagram5_privacy = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <filter id="shadow5" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="800" height="450" fill="#f5f6fa"/>
  
  <text x="400" y="30" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="18" font-weight="bold" fill="#2c3e50">SeekLight 隐私保护架构</text>
  
  <!-- 用户设备框 -->
  <rect x="50" y="55" width="500" height="280" rx="15" fill="none" stroke="#27ae60" stroke-width="3" stroke-dasharray="10,5"/>
  <text x="300" y="80" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" font-weight="bold" fill="#27ae60">用户设备 - 数据不出端</text>
  
  <!-- 设备内组件 -->
  <rect x="80" y="100" width="130" height="80" rx="10" fill="#3498db" filter="url(#shadow5)"/>
  <text x="145" y="135" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">图片存储</text>
  <text x="145" y="155" text-anchor="middle" font-family="Arial" font-size="10" fill="#dfe6e9">(本地文件系统)</text>
  
  <rect x="235" y="100" width="130" height="80" rx="10" fill="#9b59b6" filter="url(#shadow5)"/>
  <text x="300" y="135" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">AI推理引擎</text>
  <text x="300" y="155" text-anchor="middle" font-family="Arial" font-size="10" fill="#dfe6e9">(NPU本地计算)</text>
  
  <rect x="390" y="100" width="130" height="80" rx="10" fill="#e67e22" filter="url(#shadow5)"/>
  <text x="455" y="135" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">向量数据库</text>
  <text x="455" y="155" text-anchor="middle" font-family="Arial" font-size="10" fill="#dfe6e9">(Room加密存储)</text>
  
  <!-- 安全标识 -->
  <rect x="80" y="200" width="440" height="50" rx="8" fill="#2ecc71" filter="url(#shadow5)"/>
  <text x="300" y="230" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" fill="white" font-weight="bold">核心数据本地处理：图片、AI模型、向量索引 100% 本地存储</text>
  
  <!-- 隔离线 -->
  <rect x="80" y="265" width="440" height="50" rx="8" fill="#f39c12" filter="url(#shadow5)"/>
  <text x="300" y="295" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">可选云端服务（仅传输查询文本，图片不上传）</text>
  
  <!-- 云端服务（可选） -->
  <rect x="600" y="120" width="160" height="200" rx="15" fill="none" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="680" y="145" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#e74c3c">云端VLM（可选）</text>
  
  <rect x="620" y="160" width="120" height="60" rx="8" fill="#e74c3c" filter="url(#shadow5)"/>
  <text x="680" y="185" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="white">Qwen-VL-235B</text>
  <text x="680" y="205" text-anchor="middle" font-family="Arial" font-size="9" fill="#dfe6e9">高精度推理</text>
  
  <rect x="620" y="235" width="120" height="60" rx="8" fill="#c0392b" filter="url(#shadow5)"/>
  <text x="680" y="260" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="white">阿里云DashScope</text>
  <text x="680" y="278" text-anchor="middle" font-family="Arial" font-size="9" fill="#dfe6e9">API服务</text>
  
  <!-- 连接线（可选） -->
  <path d="M520,290 C560,290 560,220 600,220" stroke="#f39c12" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
  <text x="565" y="250" text-anchor="middle" font-family="Arial" font-size="9" fill="#f39c12">仅文本</text>
  
  <!-- PIPL合规说明 -->
  <rect x="50" y="355" width="700" height="80" rx="10" fill="#34495e" filter="url(#shadow5)"/>
  <text x="400" y="380" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" font-weight="bold" fill="white">符合《个人信息保护法》(PIPL) 合规要求</text>
  <text x="400" y="405" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#bdc3c7">✓ 数据最小化原则 ✓ 本地处理优先 ✓ 无跨境数据传输 ✓ 用户完全控制</text>
  <text x="400" y="425" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#95a5a6">身份证、银行卡、聊天记录等敏感信息完全在设备端处理，杜绝云端泄露风险</text>
</svg>`;

// 图6: 项目排期甘特图
const diagram6_gantt = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
  <defs>
    <filter id="shadow6" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="1" dy="1" stdDeviation="1" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="800" height="400" fill="#fafafa"/>
  
  <text x="400" y="30" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="18" font-weight="bold" fill="#2c3e50">SeekLight 项目排期规划</text>
  
  <!-- 时间轴标题 -->
  <text x="320" y="60" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">Week 1</text>
  <text x="420" y="60" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">Week 2</text>
  <text x="520" y="60" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">Week 3</text>
  <text x="620" y="60" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">Week 4</text>
  <text x="720" y="60" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">Week 5</text>
  
  <!-- 网格线 -->
  <line x1="270" y1="70" x2="270" y2="350" stroke="#ecf0f1" stroke-width="1"/>
  <line x1="370" y1="70" x2="370" y2="350" stroke="#ecf0f1" stroke-width="1"/>
  <line x1="470" y1="70" x2="470" y2="350" stroke="#ecf0f1" stroke-width="1"/>
  <line x1="570" y1="70" x2="570" y2="350" stroke="#ecf0f1" stroke-width="1"/>
  <line x1="670" y1="70" x2="670" y2="350" stroke="#ecf0f1" stroke-width="1"/>
  <line x1="770" y1="70" x2="770" y2="350" stroke="#ecf0f1" stroke-width="1"/>
  
  <!-- 已完成阶段 -->
  <text x="130" y="95" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">Phase 0-4（已完成）</text>
  <rect x="50" y="105" width="160" height="30" rx="5" fill="#27ae60" filter="url(#shadow6)"/>
  <text x="130" y="125" text-anchor="middle" font-family="Arial" font-size="10" fill="white">端侧VLM + 语义搜索 ✓</text>
  
  <!-- Phase 5 -->
  <text x="130" y="160" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">Phase 5: 快速识别</text>
  <rect x="270" y="145" width="100" height="30" rx="5" fill="#3498db" filter="url(#shadow6)"/>
  <text x="320" y="165" text-anchor="middle" font-family="Arial" font-size="10" fill="white">ML Kit + ZXing</text>
  
  <!-- Phase 6 -->
  <text x="130" y="205" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">Phase 6: 结构化提取</text>
  <rect x="370" y="190" width="100" height="30" rx="5" fill="#9b59b6" filter="url(#shadow6)"/>
  <text x="420" y="210" text-anchor="middle" font-family="Arial" font-size="10" fill="white">价格/日期/单号</text>
  
  <!-- Phase 7 -->
  <text x="130" y="250" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">Phase 7: 截图监听</text>
  <rect x="470" y="235" width="100" height="30" rx="5" fill="#e67e22" filter="url(#shadow6)"/>
  <text x="520" y="255" text-anchor="middle" font-family="Arial" font-size="10" fill="white">服务 + 悬浮窗</text>
  
  <!-- Phase 8 -->
  <text x="130" y="295" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">Phase 8: 跨应用流转</text>
  <rect x="570" y="280" width="100" height="30" rx="5" fill="#e74c3c" filter="url(#shadow6)"/>
  <text x="620" y="300" text-anchor="middle" font-family="Arial" font-size="10" fill="white">Deep Link</text>
  
  <!-- 提交节点 -->
  <text x="130" y="340" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">参赛提交</text>
  <circle cx="720" cy="335" r="15" fill="#f1c40f" filter="url(#shadow6)"/>
  <text x="720" y="340" text-anchor="middle" font-family="Arial" font-size="10" fill="#2c3e50">★</text>
  
  <!-- 图例 -->
  <rect x="50" y="365" width="15" height="15" rx="3" fill="#27ae60"/>
  <text x="70" y="377" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">已完成</text>
  <rect x="130" y="365" width="15" height="15" rx="3" fill="#3498db"/>
  <text x="150" y="377" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">进行中</text>
  <rect x="210" y="365" width="15" height="15" rx="3" fill="#e67e22"/>
  <text x="230" y="377" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">规划中</text>
</svg>`;

// 图7: 市场竞品分析图
const diagram7_competition = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <filter id="shadow7" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="800" height="450" fill="#f8f9fa"/>
  
  <text x="400" y="30" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="18" font-weight="bold" fill="#2c3e50">竞品对比与市场定位</text>
  
  <!-- 坐标轴 -->
  <line x1="100" y1="380" x2="700" y2="380" stroke="#bdc3c7" stroke-width="2"/>
  <line x1="100" y1="380" x2="100" y2="80" stroke="#bdc3c7" stroke-width="2"/>
  
  <!-- 轴标签 -->
  <text x="400" y="415" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#7f8c8d">覆盖范围（品牌限定 → 全品牌）</text>
  <text x="50" y="230" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="#7f8c8d" transform="rotate(-90, 50, 230)">智能程度（手动 → AI自动）</text>
  
  <!-- 竞品气泡 -->
  <!-- 荣耀 MagicOS -->
  <circle cx="200" cy="150" r="40" fill="#e74c3c" opacity="0.8" filter="url(#shadow7)"/>
  <text x="200" y="145" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="white">荣耀</text>
  <text x="200" y="160" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="white">MagicOS</text>
  
  <!-- OPPO ColorOS -->
  <circle cx="250" cy="220" r="35" fill="#e67e22" opacity="0.8" filter="url(#shadow7)"/>
  <text x="250" y="215" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="white">OPPO</text>
  <text x="250" y="230" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="white">ColorOS</text>
  
  <!-- 华为 HarmonyOS -->
  <circle cx="180" cy="180" r="45" fill="#9b59b6" opacity="0.8" filter="url(#shadow7)"/>
  <text x="180" y="175" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="white">华为</text>
  <text x="180" y="192" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="white">HarmonyOS</text>
  
  <!-- Cubox/Flomo -->
  <circle cx="450" cy="300" r="30" fill="#3498db" opacity="0.8" filter="url(#shadow7)"/>
  <text x="450" y="295" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="white">Cubox</text>
  <text x="450" y="310" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="white">Flomo</text>
  
  <!-- SeekLight（突出显示） -->
  <circle cx="580" cy="130" r="55" fill="#27ae60" opacity="0.9" filter="url(#shadow7)"/>
  <text x="580" y="120" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="14" font-weight="bold" fill="white">SeekLight</text>
  <text x="580" y="140" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="white">寻光</text>
  
  <!-- 差异化标注 -->
  <rect x="500" y="60" width="200" height="45" rx="5" fill="white" stroke="#27ae60" stroke-width="2"/>
  <text x="600" y="80" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#27ae60">✓ 跨品牌通用</text>
  <text x="600" y="95" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#27ae60">✓ 端侧AI + 被动智能</text>
  
  <!-- 象限标注 -->
  <text x="150" y="100" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#95a5a6">品牌限定</text>
  <text x="150" y="115" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#95a5a6">系统级AI</text>
  
  <text x="650" y="100" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#27ae60" font-weight="bold">全品牌覆盖</text>
  <text x="650" y="115" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#27ae60" font-weight="bold">端侧AI</text>
  
  <text x="150" y="350" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#95a5a6">品牌限定</text>
  <text x="150" y="365" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#95a5a6">手动整理</text>
  
  <text x="650" y="350" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#95a5a6">全品牌覆盖</text>
  <text x="650" y="365" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="11" fill="#95a5a6">手动整理</text>
</svg>`;

// 图8: 用户场景痛点图
const diagram8_user_pain = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
  <defs>
    <filter id="shadow8" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="800" height="400" fill="#f5f6fa"/>
  
  <text x="400" y="30" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="18" font-weight="bold" fill="#2c3e50">目标用户场景与痛点分析</text>
  
  <!-- 用户群体1: 大学生 -->
  <rect x="50" y="60" width="220" height="150" rx="10" fill="white" stroke="#3498db" stroke-width="2" filter="url(#shadow8)"/>
  <rect x="50" y="60" width="220" height="35" rx="10" ry="0" fill="#3498db"/>
  <text x="160" y="83" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="13" fill="white" font-weight="bold">大学生群体</text>
  
  <text x="70" y="115" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">痛点：</text>
  <text x="70" y="135" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">• 奖学金通知截图找不到</text>
  <text x="70" y="155" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">• 课程PPT截图无法检索</text>
  <text x="70" y="175" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">• 社团活动二维码过期</text>
  <text x="70" y="195" font-family="Microsoft YaHei, Arial" font-size="10" fill="#27ae60" font-weight="bold">→ 自然语言搜索"期末重点"</text>
  
  <!-- 用户群体2: 职场新人 -->
  <rect x="290" y="60" width="220" height="150" rx="10" fill="white" stroke="#e67e22" stroke-width="2" filter="url(#shadow8)"/>
  <rect x="290" y="60" width="220" height="35" rx="10" ry="0" fill="#e67e22"/>
  <text x="400" y="83" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="13" fill="white" font-weight="bold">职场新人</text>
  
  <text x="310" y="115" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">痛点：</text>
  <text x="310" y="135" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">• 双十一多平台比价混乱</text>
  <text x="310" y="155" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">• 工作聊天记录难以留存</text>
  <text x="310" y="175" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">• 快递单号手动复制麻烦</text>
  <text x="310" y="195" font-family="Microsoft YaHei, Arial" font-size="10" fill="#27ae60" font-weight="bold">→ 一键比价+自动提取单号</text>
  
  <!-- 用户群体3: 商务人士 -->
  <rect x="530" y="60" width="220" height="150" rx="10" fill="white" stroke="#9b59b6" stroke-width="2" filter="url(#shadow8)"/>
  <rect x="530" y="60" width="220" height="35" rx="10" ry="0" fill="#9b59b6"/>
  <text x="640" y="83" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="13" fill="white" font-weight="bold">商务人士</text>
  
  <text x="550" y="115" font-family="Microsoft YaHei, Arial" font-size="11" fill="#2c3e50">痛点：</text>
  <text x="550" y="135" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">• 机场安检翻找登机牌</text>
  <text x="550" y="155" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">• 票据报销整理耗时</text>
  <text x="550" y="175" font-family="Microsoft YaHei, Arial" font-size="10" fill="#7f8c8d">• 会议二维码时效性焦虑</text>
  <text x="550" y="195" font-family="Microsoft YaHei, Arial" font-size="10" fill="#27ae60" font-weight="bold">→ 二维码智能置顶+过期归档</text>
  
  <!-- 核心价值 -->
  <rect x="100" y="240" width="600" height="140" rx="15" fill="#2c3e50" filter="url(#shadow8)"/>
  <text x="400" y="275" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="16" font-weight="bold" fill="white">SeekLight 核心价值主张</text>
  
  <rect x="130" y="295" width="160" height="65" rx="8" fill="#27ae60"/>
  <text x="210" y="320" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">被动智能</text>
  <text x="210" y="345" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#dfe6e9">截图即分析</text>
  <text x="210" y="360" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#dfe6e9">无需手动整理</text>
  
  <rect x="320" y="295" width="160" height="65" rx="8" fill="#3498db"/>
  <text x="400" y="320" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">语义检索</text>
  <text x="400" y="345" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#dfe6e9">自然语言搜索</text>
  <text x="400" y="360" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#dfe6e9">"找那张红裙子"</text>
  
  <rect x="510" y="295" width="160" height="65" rx="8" fill="#9b59b6"/>
  <text x="590" y="320" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="12" fill="white">隐私优先</text>
  <text x="590" y="345" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#dfe6e9">数据不出端</text>
  <text x="590" y="360" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="10" fill="#dfe6e9">完全本地处理</text>
</svg>`;

// 保存所有SVG文件
const diagrams = [
    { name: 'diagram1_architecture.svg', content: diagram1_architecture },
    { name: 'diagram2_techstack.svg', content: diagram2_techstack },
    { name: 'diagram3_vlm_flow.svg', content: diagram3_vlm_flow },
    { name: 'diagram4_semantic_search.svg', content: diagram4_semantic_search },
    { name: 'diagram5_privacy.svg', content: diagram5_privacy },
    { name: 'diagram6_gantt.svg', content: diagram6_gantt },
    { name: 'diagram7_competition.svg', content: diagram7_competition },
    { name: 'diagram8_user_pain.svg', content: diagram8_user_pain }
];

diagrams.forEach(d => {
    fs.writeFileSync(path.join(outputDir, d.name), d.content, 'utf8');
    console.log(`Created: ${d.name}`);
});

console.log(`\nAll ${diagrams.length} diagrams saved to: ${outputDir}`);
console.log('Next step: Convert SVG to PNG using sharp or browser rendering');
