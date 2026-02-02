/**
 * 拾光项目 - 核心流程图生成器
 * 1. 数据流图 (Data Flow Diagram)
 * 2. 技术架构图 (Technical Architecture Diagram)  
 * 3. 总流程图 (Overall Process Flow)
 */
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'images-v2');

// ========== 图1: 数据流图 (Data Flow Diagram) ==========
const diagram_dataflow = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
  <defs>
    <linearGradient id="df1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/><stop offset="100%" style="stop-color:#1d4ed8"/>
    </linearGradient>
    <linearGradient id="df2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6"/><stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
    <linearGradient id="df3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e"/><stop offset="100%" style="stop-color:#16a34a"/>
    </linearGradient>
    <linearGradient id="df4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b"/><stop offset="100%" style="stop-color:#d97706"/>
    </linearGradient>
    <linearGradient id="df5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899"/><stop offset="100%" style="stop-color:#db2777"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="3" dy="3" stdDeviation="4" flood-opacity="0.2"/></filter>
    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
    </marker>
    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/>
    </marker>
    <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
    </marker>
  </defs>
  <rect width="900" height="700" fill="#f8fafc"/>
  
  <!-- 标题 -->
  <text x="450" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="24" font-weight="bold" fill="#1e293b">拾光系统数据流图</text>
  <text x="450" y="58" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="#64748b">Data Flow Diagram - 端云协同处理流程</text>
  
  <!-- 外部实体：用户 -->
  <rect x="30" y="280" width="100" height="80" rx="8" fill="url(#df1)" filter="url(#shadow)"/>
  <text x="80" y="315" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">用户</text>
  <text x="80" y="335" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.9)">User</text>
  
  <!-- 数据输入：截图/照片 -->
  <rect x="180" y="180" width="130" height="60" rx="30" fill="url(#df3)" filter="url(#shadow)"/>
  <text x="245" y="215" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="white" font-weight="bold">截图/照片</text>
  
  <!-- 数据输入：查询请求 -->
  <rect x="180" y="400" width="130" height="60" rx="30" fill="url(#df3)" filter="url(#shadow)"/>
  <text x="245" y="435" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="white" font-weight="bold">查询请求</text>
  
  <!-- 处理过程1：截图监听 -->
  <circle cx="400" y="210" r="50" fill="url(#df2)" filter="url(#shadow)"/>
  <text x="400" y="205" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">截图</text>
  <text x="400" y="222" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">监听</text>
  <text x="400" y="250" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">P1</text>
  
  <!-- 处理过程2：多层处理管道 -->
  <circle cx="580" cy="210" r="60" fill="url(#df4)" filter="url(#shadow)"/>
  <text x="580" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">多层处理</text>
  <text x="580" y="212" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">管道</text>
  <text x="580" y="230" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">L1→L2→L3</text>
  <text x="580" y="260" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">P2</text>
  
  <!-- 处理过程3：语义搜索 -->
  <circle cx="400" cy="430" r="50" fill="url(#df2)" filter="url(#shadow)"/>
  <text x="400" y="425" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">语义</text>
  <text x="400" y="442" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">搜索</text>
  <text x="400" y="470" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">P3</text>
  
  <!-- 数据存储：向量数据库 -->
  <path d="M720,160 L820,160 L820,260 L720,260 Z M720,160 Q770,180 820,160 M720,260 Q770,240 820,260" fill="url(#df5)" filter="url(#shadow)"/>
  <text x="770" y="200" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">向量</text>
  <text x="770" y="218" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">数据库</text>
  <text x="770" y="250" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">D1</text>
  
  <!-- 数据存储：层次化记忆 -->
  <path d="M720,320 L820,320 L820,420 L720,420 Z M720,320 Q770,340 820,320 M720,420 Q770,400 820,420" fill="url(#df5)" filter="url(#shadow)"/>
  <text x="770" y="355" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">层次化</text>
  <text x="770" y="373" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">记忆</text>
  <text x="770" y="405" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">D2</text>
  
  <!-- 输出：搜索结果 -->
  <rect x="180" y="530" width="130" height="60" rx="30" fill="url(#df3)" filter="url(#shadow)"/>
  <text x="245" y="565" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="white" font-weight="bold">搜索结果</text>
  
  <!-- 数据流箭头 -->
  <!-- 用户→截图 -->
  <line x1="130" y1="300" x2="175" y2="230" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)"/>
  <text x="140" y="255" font-family="Microsoft YaHei" font-size="10" fill="#3b82f6">拍摄/截图</text>
  
  <!-- 用户→查询 -->
  <line x1="130" y1="340" x2="175" y2="420" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)"/>
  <text x="140" y="390" font-family="Microsoft YaHei" font-size="10" fill="#3b82f6">输入查询</text>
  
  <!-- 截图→截图监听 -->
  <line x1="310" y1="210" x2="345" y2="210" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowGreen)"/>
  
  <!-- 截图监听→多层处理 -->
  <line x1="450" y1="210" x2="515" y2="210" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrowPurple)"/>
  <text x="475" y="200" font-family="Microsoft YaHei" font-size="9" fill="#8b5cf6">图片数据</text>
  
  <!-- 多层处理→向量数据库 -->
  <line x1="640" y1="195" x2="715" y2="195" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowOrange)"/>
  <text x="665" y="185" font-family="Microsoft YaHei" font-size="9" fill="#f59e0b">语义向量</text>
  
  <!-- 多层处理→层次记忆 -->
  <line x1="625" y1="255" x2="715" y2="340" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowOrange)"/>
  <text x="650" y="300" font-family="Microsoft YaHei" font-size="9" fill="#f59e0b">结构化数据</text>
  
  <!-- 查询→语义搜索 -->
  <line x1="310" y1="430" x2="345" y2="430" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowGreen)"/>
  
  <!-- 向量数据库→语义搜索 -->
  <line x1="720" y1="230" x2="445" y2="405" stroke="#ec4899" stroke-width="2" marker-end="url(#arrowPurple)" stroke-dasharray="5,3"/>
  <text x="600" y="310" font-family="Microsoft YaHei" font-size="9" fill="#ec4899">向量匹配</text>
  
  <!-- 层次记忆→语义搜索 -->
  <line x1="720" y1="390" x2="445" y2="445" stroke="#ec4899" stroke-width="2" marker-end="url(#arrowPurple)" stroke-dasharray="5,3"/>
  <text x="600" y="430" font-family="Microsoft YaHei" font-size="9" fill="#ec4899">上下文增强</text>
  
  <!-- 语义搜索→结果 -->
  <line x1="375" y1="475" x2="270" y2="530" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrowPurple)"/>
  
  <!-- 结果→用户 -->
  <line x1="180" y1="560" x2="105" y2="365" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)"/>
  <text x="120" y="480" font-family="Microsoft YaHei" font-size="10" fill="#3b82f6">返回结果</text>
  
  <!-- 图例 -->
  <rect x="50" y="600" width="800" height="80" rx="10" fill="white" stroke="#e2e8f0"/>
  <text x="450" y="625" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#334155">图例说明</text>
  
  <rect x="80" y="645" width="30" height="20" rx="3" fill="url(#df1)"/>
  <text x="120" y="660" font-family="Microsoft YaHei" font-size="10" fill="#64748b">外部实体</text>
  
  <ellipse cx="215" cy="655" rx="20" ry="15" fill="url(#df2)"/>
  <text x="245" y="660" font-family="Microsoft YaHei" font-size="10" fill="#64748b">处理过程</text>
  
  <rect x="310" y="645" width="30" height="20" rx="10" fill="url(#df3)"/>
  <text x="350" y="660" font-family="Microsoft YaHei" font-size="10" fill="#64748b">数据流</text>
  
  <path d="M420,645 L450,645 L450,665 L420,665 Z M420,645 Q435,650 450,645" fill="url(#df5)"/>
  <text x="465" y="660" font-family="Microsoft YaHei" font-size="10" fill="#64748b">数据存储</text>
  
  <line x1="540" y1="655" x2="580" y2="655" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)"/>
  <text x="595" y="660" font-family="Microsoft YaHei" font-size="10" fill="#64748b">数据流向</text>
  
  <line x1="680" y1="655" x2="720" y2="655" stroke="#ec4899" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="735" y="660" font-family="Microsoft YaHei" font-size="10" fill="#64748b">查询流向</text>
</svg>`;

// ========== 图2: 技术架构图 (Technical Architecture) ==========
const diagram_techarch = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="750" viewBox="0 0 900 750">
  <defs>
    <linearGradient id="ta1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1"/><stop offset="100%" style="stop-color:#4f46e5"/>
    </linearGradient>
    <linearGradient id="ta2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6"/><stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
    <linearGradient id="ta3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4"/><stop offset="100%" style="stop-color:#0891b2"/>
    </linearGradient>
    <linearGradient id="ta4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e"/><stop offset="100%" style="stop-color:#16a34a"/>
    </linearGradient>
    <linearGradient id="ta5" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b"/><stop offset="100%" style="stop-color:#d97706"/>
    </linearGradient>
    <linearGradient id="cloud" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899"/><stop offset="100%" style="stop-color:#db2777"/>
    </linearGradient>
    <filter id="shadowTA"><feDropShadow dx="3" dy="3" stdDeviation="5" flood-opacity="0.15"/></filter>
  </defs>
  <rect width="900" height="750" fill="#f1f5f9"/>
  
  <!-- 标题 -->
  <text x="450" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="24" font-weight="bold" fill="#1e293b">拾光技术架构图</text>
  <text x="450" y="58" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="#64748b">Technical Architecture - 端云协同四层架构</text>
  
  <!-- 云端服务区（右上角） -->
  <rect x="680" y="80" width="200" height="200" rx="15" fill="white" stroke="#ec4899" stroke-width="2" stroke-dasharray="8,4" filter="url(#shadowTA)"/>
  <text x="780" y="110" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" font-weight="bold" fill="#db2777">☁️ 云端服务</text>
  <rect x="700" y="125" width="160" height="50" rx="8" fill="url(#cloud)"/>
  <text x="780" y="155" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">Qwen3-VL-235B</text>
  <text x="780" y="190" text-anchor="middle" font-family="Arial" font-size="10" fill="#64748b">SiliconFlow API</text>
  <text x="780" y="210" text-anchor="middle" font-family="Arial" font-size="10" fill="#64748b">235B参数 | 117×能力</text>
  <rect x="700" y="230" width="160" height="35" rx="6" fill="#fce7f3"/>
  <text x="780" y="252" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#db2777">用户主动开启 | 知情同意</text>
  
  <!-- Layer 1: 用户界面层 -->
  <rect x="40" y="80" width="620" height="100" rx="12" fill="url(#ta1)" filter="url(#shadowTA)"/>
  <text x="60" y="110" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">用户界面层 (Presentation Layer)</text>
  
  <rect x="60" y="125" width="120" height="45" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="120" y="152" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white">自然语言搜索</text>
  
  <rect x="195" y="125" width="120" height="45" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="255" y="152" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white">智能相册浏览</text>
  
  <rect x="330" y="125" width="120" height="45" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="390" y="152" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white">隐私保险箱</text>
  
  <rect x="465" y="125" width="120" height="45" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="525" y="152" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white">跨应用跳转</text>
  
  <text x="620" y="165" text-anchor="end" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.7)">Jetpack Compose | Material Design 3</text>
  
  <!-- Layer 2: 智能处理层 -->
  <rect x="40" y="200" width="620" height="200" rx="12" fill="url(#ta2)" filter="url(#shadowTA)"/>
  <text x="60" y="230" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">智能处理层 (Intelligence Layer)</text>
  
  <!-- 多层处理管道 -->
  <rect x="60" y="250" width="580" height="130" rx="8" fill="rgba(255,255,255,0.15)"/>
  <text x="350" y="275" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="white" font-weight="bold">多层处理管道 (Multi-Layer Pipeline)</text>
  
  <rect x="80" y="295" width="160" height="70" rx="6" fill="#22c55e"/>
  <text x="160" y="320" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">Layer 1: 快速预处理</text>
  <text x="160" y="340" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">ZXing | ML Kit OCR</text>
  <text x="160" y="355" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">&lt;500ms</text>
  
  <text x="255" y="330" font-family="Arial" font-size="18" fill="white">→</text>
  
  <rect x="270" y="295" width="160" height="70" rx="6" fill="#f59e0b"/>
  <text x="350" y="320" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">Layer 2: 结构化提取</text>
  <text x="350" y="340" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">正则引擎 | 场景分类</text>
  <text x="350" y="355" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">&lt;200ms</text>
  
  <text x="445" y="330" font-family="Arial" font-size="18" fill="white">→</text>
  
  <rect x="460" y="295" width="160" height="70" rx="6" fill="#6366f1"/>
  <text x="540" y="320" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">Layer 3: 深度理解</text>
  <text x="540" y="340" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">VLM推理 | 向量化</text>
  <text x="540" y="355" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">3-5s (按需触发)</text>
  
  <!-- Layer 3: 数据存储层 -->
  <rect x="40" y="420" width="620" height="130" rx="12" fill="url(#ta3)" filter="url(#shadowTA)"/>
  <text x="60" y="450" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">数据存储层 (Data Layer)</text>
  
  <rect x="60" y="470" width="140" height="65" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="130" y="495" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">向量数据库</text>
  <text x="130" y="515" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">384维语义向量</text>
  <text x="130" y="528" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">MiniLM-L6-v2</text>
  
  <rect x="215" y="470" width="140" height="65" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="285" y="495" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">层次化记忆</text>
  <text x="285" y="515" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">短期→长期→隐式</text>
  <text x="285" y="528" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">Reflection机制</text>
  
  <rect x="370" y="470" width="140" height="65" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="440" y="495" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">结构化数据</text>
  <text x="440" y="515" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">SQLite + Room</text>
  <text x="440" y="528" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">价格/日期/单号</text>
  
  <rect x="525" y="470" width="120" height="65" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="585" y="495" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">加密存储</text>
  <text x="585" y="515" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">EncryptedFile</text>
  <text x="585" y="528" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.9)">隐私保险箱</text>
  
  <!-- Layer 4: 系统服务层 -->
  <rect x="40" y="570" width="620" height="100" rx="12" fill="url(#ta4)" filter="url(#shadowTA)"/>
  <text x="60" y="600" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">系统服务层 (Platform Layer)</text>
  
  <rect x="60" y="615" width="130" height="45" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="125" y="642" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="white">截图监听服务</text>
  
  <rect x="205" y="615" width="130" height="45" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="270" y="642" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="white">后台推理服务</text>
  
  <rect x="350" y="615" width="130" height="45" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="415" y="642" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="white">权限管理服务</text>
  
  <rect x="495" y="615" width="150" height="45" rx="6" fill="rgba(255,255,255,0.2)"/>
  <text x="570" y="642" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="white">Deep Link路由</text>
  
  <!-- 端侧VLM (左侧) -->
  <rect x="680" y="300" width="200" height="130" rx="15" fill="white" stroke="#22c55e" stroke-width="2" filter="url(#shadowTA)"/>
  <text x="780" y="330" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" font-weight="bold" fill="#16a34a">📱 端侧VLM</text>
  <rect x="700" y="345" width="160" height="50" rx="8" fill="url(#ta4)"/>
  <text x="780" y="375" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="white" font-weight="bold">Qwen3-VL-2B</text>
  <text x="780" y="410" text-anchor="middle" font-family="Arial" font-size="10" fill="#64748b">MNN Framework | INT4</text>
  
  <!-- 连接线 -->
  <line x1="640" y1="330" x2="678" y2="330" stroke="#ec4899" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="655" y="320" font-family="Microsoft YaHei" font-size="9" fill="#ec4899">增强</text>
  
  <line x1="640" y1="365" x2="678" y2="365" stroke="#22c55e" stroke-width="2"/>
  <text x="655" y="385" font-family="Microsoft YaHei" font-size="9" fill="#22c55e">默认</text>
  
  <!-- 底部技术栈说明 -->
  <rect x="40" y="690" width="840" height="50" rx="8" fill="white" stroke="#e2e8f0"/>
  <text x="450" y="720" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#64748b">
    <tspan font-weight="bold" fill="#334155">技术栈：</tspan>
    Kotlin | Jetpack Compose | MNN | SQLite/Room | ZXing | Google ML Kit | MiniLM-L6-v2 | Qwen3-VL
  </text>
</svg>`;

// ========== 图3: 总流程图 (Overall Process Flow) ==========
const diagram_overall = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650">
  <defs>
    <linearGradient id="of1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6"/><stop offset="100%" style="stop-color:#1d4ed8"/>
    </linearGradient>
    <linearGradient id="of2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#22c55e"/><stop offset="100%" style="stop-color:#16a34a"/>
    </linearGradient>
    <linearGradient id="of3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f59e0b"/><stop offset="100%" style="stop-color:#d97706"/>
    </linearGradient>
    <linearGradient id="of4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8b5cf6"/><stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
    <linearGradient id="of5" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ec4899"/><stop offset="100%" style="stop-color:#db2777"/>
    </linearGradient>
    <linearGradient id="of6" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#06b6d4"/><stop offset="100%" style="stop-color:#0891b2"/>
    </linearGradient>
    <filter id="shadowOF"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.2"/></filter>
    <marker id="arrowWhite" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="white"/>
    </marker>
    <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect width="900" height="650" fill="#0f172a"/>
  
  <!-- 标题 -->
  <text x="450" y="40" text-anchor="middle" font-family="Microsoft YaHei" font-size="24" font-weight="bold" fill="white">拾光系统总流程图</text>
  <text x="450" y="65" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="#94a3b8">Overall Process Flow - 从截图到检索的完整链路</text>
  
  <!-- 主流程线（底部装饰） -->
  <line x1="50" y1="350" x2="850" y2="350" stroke="#334155" stroke-width="4"/>
  
  <!-- Step 1: 用户截图 -->
  <g transform="translate(80, 200)">
    <rect x="-50" y="-80" width="100" height="160" rx="12" fill="url(#of1)" filter="url(#shadowOF)"/>
    <text x="0" y="-50" text-anchor="middle" font-family="Arial" font-size="30" fill="white">📸</text>
    <text x="0" y="-15" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">用户截图</text>
    <text x="0" y="10" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Screenshot</text>
    <line x1="0" y1="25" x2="0" y2="45" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="0" y="60" text-anchor="middle" font-family="Microsoft YaHei" font-size="9" fill="rgba(255,255,255,0.7)">触发监听</text>
  </g>
  
  <!-- 箭头1 -->
  <line x1="135" y1="200" x2="175" y2="200" stroke="white" stroke-width="3" marker-end="url(#arrowWhite)"/>
  
  <!-- Step 2: 截图监听 -->
  <g transform="translate(230, 200)">
    <rect x="-50" y="-80" width="100" height="160" rx="12" fill="url(#of2)" filter="url(#shadowOF)"/>
    <text x="0" y="-50" text-anchor="middle" font-family="Arial" font-size="30" fill="white">👁️</text>
    <text x="0" y="-15" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">截图监听</text>
    <text x="0" y="10" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Detection</text>
    <line x1="0" y1="25" x2="0" y2="45" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="0" y="60" text-anchor="middle" font-family="Microsoft YaHei" font-size="9" fill="rgba(255,255,255,0.7)">Screenshot API</text>
  </g>
  
  <!-- 箭头2 -->
  <line x1="285" y1="200" x2="325" y2="200" stroke="white" stroke-width="3" marker-end="url(#arrowWhite)"/>
  
  <!-- Step 3: 多层处理 -->
  <g transform="translate(380, 200)">
    <rect x="-50" y="-80" width="100" height="160" rx="12" fill="url(#of3)" filter="url(#shadowOF)"/>
    <text x="0" y="-50" text-anchor="middle" font-family="Arial" font-size="30" fill="white">⚙️</text>
    <text x="0" y="-15" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">多层处理</text>
    <text x="0" y="10" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Pipeline</text>
    <line x1="0" y1="25" x2="0" y2="45" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="0" y="57" text-anchor="middle" font-family="Microsoft YaHei" font-size="8" fill="rgba(255,255,255,0.7)">L1: OCR &lt;500ms</text>
    <text x="0" y="72" text-anchor="middle" font-family="Microsoft YaHei" font-size="8" fill="rgba(255,255,255,0.7)">L3: VLM 3-5s</text>
  </g>
  
  <!-- 箭头3 -->
  <line x1="435" y1="200" x2="475" y2="200" stroke="white" stroke-width="3" marker-end="url(#arrowWhite)"/>
  
  <!-- Step 4: 向量化存储 -->
  <g transform="translate(530, 200)">
    <rect x="-50" y="-80" width="100" height="160" rx="12" fill="url(#of4)" filter="url(#shadowOF)"/>
    <text x="0" y="-50" text-anchor="middle" font-family="Arial" font-size="30" fill="white">💾</text>
    <text x="0" y="-15" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">向量存储</text>
    <text x="0" y="10" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Embedding</text>
    <line x1="0" y1="25" x2="0" y2="45" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="0" y="60" text-anchor="middle" font-family="Microsoft YaHei" font-size="9" fill="rgba(255,255,255,0.7)">384维向量</text>
  </g>
  
  <!-- 向下箭头到搜索 -->
  <path d="M530,285 L530,350 L680,350 L680,430" stroke="#64748b" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
  
  <!-- Step 5: 语义搜索 (下方) -->
  <g transform="translate(680, 490)">
    <rect x="-50" y="-55" width="100" height="110" rx="12" fill="url(#of5)" filter="url(#shadowOF)"/>
    <text x="0" y="-25" text-anchor="middle" font-family="Arial" font-size="30" fill="white">🔍</text>
    <text x="0" y="10" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">语义搜索</text>
    <text x="0" y="32" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Semantic Search</text>
  </g>
  
  <!-- 箭头5 -->
  <line x1="735" y1="490" x2="775" y2="490" stroke="white" stroke-width="3" marker-end="url(#arrowWhite)"/>
  
  <!-- Step 6: 返回结果 -->
  <g transform="translate(830, 490)">
    <rect x="-50" y="-55" width="100" height="110" rx="12" fill="url(#of6)" filter="url(#shadowOF)"/>
    <text x="0" y="-25" text-anchor="middle" font-family="Arial" font-size="30" fill="white">✅</text>
    <text x="0" y="10" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">精准定位</text>
    <text x="0" y="32" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Results</text>
  </g>
  
  <!-- 用户查询入口 (下方左侧) -->
  <g transform="translate(80, 490)">
    <rect x="-50" y="-55" width="100" height="110" rx="12" fill="#334155" stroke="#64748b" stroke-width="2" filter="url(#shadowOF)"/>
    <text x="0" y="-25" text-anchor="middle" font-family="Arial" font-size="30" fill="white">💬</text>
    <text x="0" y="10" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">自然语言</text>
    <text x="0" y="32" text-anchor="middle" font-family="Arial" font-size="10" fill="#94a3b8">Query Input</text>
  </g>
  
  <!-- 查询箭头 -->
  <line x1="135" y1="490" x2="625" y2="490" stroke="#64748b" stroke-width="2" marker-end="url(#arrowGray)"/>
  <text x="380" y="475" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#94a3b8">「上周的咖啡发票」</text>
  
  <!-- 端云协同标注 -->
  <rect x="330" y="90" width="200" height="60" rx="10" fill="#1e293b" stroke="#475569"/>
  <text x="430" y="115" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#94a3b8">端云协同推理</text>
  <text x="430" y="135" text-anchor="middle" font-family="Arial" font-size="10" fill="#22c55e">2B端侧(默认) ↔ 235B云端(增强)</text>
  
  <!-- 隐私标注 -->
  <rect x="600" y="90" width="150" height="60" rx="10" fill="#1e293b" stroke="#22c55e"/>
  <text x="675" y="115" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#22c55e">🔒 隐私优先</text>
  <text x="675" y="135" text-anchor="middle" font-family="Arial" font-size="10" fill="#94a3b8">数据不出端</text>
  
  <!-- 底部流程说明 -->
  <rect x="50" y="580" width="800" height="50" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="450" y="610" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#94a3b8">
    <tspan fill="#3b82f6">截图触发</tspan> → <tspan fill="#22c55e">实时监听</tspan> → <tspan fill="#f59e0b">分层处理</tspan> → <tspan fill="#8b5cf6">向量入库</tspan> → <tspan fill="#ec4899">语义检索</tspan> → <tspan fill="#06b6d4">精准返回</tspan>
  </text>
</svg>`;

// 写入文件
const diagrams = [
    { name: 'diagram_core_dataflow.svg', content: diagram_dataflow },
    { name: 'diagram_core_techarch.svg', content: diagram_techarch },
    { name: 'diagram_core_overall.svg', content: diagram_overall }
];

diagrams.forEach(d => {
    fs.writeFileSync(path.join(outputDir, d.name), d.content);
    console.log(`Generated: ${d.name}`);
});

console.log(`\n共生成 ${diagrams.length} 张核心流程图`);
