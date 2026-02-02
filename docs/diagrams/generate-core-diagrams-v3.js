/**
 * 拾光项目 - 核心流程图生成器 v3
 * 修复：1.加深字体颜色 2.增大文本框防止溢出
 */
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'images-v2');

// ========== 图1: 数据流图 (修复版) ==========
const diagram_dataflow = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="750" viewBox="0 0 1000 750">
  <defs>
    <!-- 深色配色方案 -->
    <linearGradient id="df_user" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3d5a80"/><stop offset="100%" style="stop-color:#2c4a6e"/>
    </linearGradient>
    <linearGradient id="df_process" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4a6fa5"/><stop offset="100%" style="stop-color:#3a5f95"/>
    </linearGradient>
    <linearGradient id="df_data" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5a85b5"/><stop offset="100%" style="stop-color:#4a75a5"/>
    </linearGradient>
    <linearGradient id="df_store" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3d7a6a"/><stop offset="100%" style="stop-color:#2d6a5a"/>
    </linearGradient>
    <linearGradient id="df_memory" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2d6a5a"/><stop offset="100%" style="stop-color:#1d5a4a"/>
    </linearGradient>
    <filter id="shadowDF"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/></filter>
    <marker id="arrowDF" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#2c4a6e"/>
    </marker>
  </defs>
  <rect width="1000" height="750" fill="#ffffff"/>
  
  <!-- 标题区 -->
  <rect x="0" y="0" width="1000" height="75" fill="#f0f4f8"/>
  <text x="500" y="35" text-anchor="middle" font-family="SimHei" font-size="24" font-weight="bold" fill="#1a2a3a">拾光系统数据流图</text>
  <text x="500" y="58" text-anchor="middle" font-family="SimSun" font-size="13" fill="#3a4a5a">Data Flow Diagram - 端云协同处理流程</text>
  <line x1="100" y1="73" x2="900" y2="73" stroke="#c0d0e0" stroke-width="1"/>
  
  <!-- 左侧：外部实体（用户） -->
  <rect x="40" y="290" width="100" height="110" rx="8" fill="url(#df_user)" filter="url(#shadowDF)"/>
  <text x="90" y="335" text-anchor="middle" font-family="SimHei" font-size="16" fill="white" font-weight="bold">用户</text>
  <text x="90" y="358" text-anchor="middle" font-family="Arial" font-size="11" fill="white">User</text>
  <text x="90" y="382" text-anchor="middle" font-family="SimSun" font-size="10" fill="rgba(255,255,255,0.9)">外部实体</text>
  
  <!-- 数据输入流：截图/照片 -->
  <rect x="180" y="165" width="130" height="55" rx="27" fill="url(#df_data)" filter="url(#shadowDF)"/>
  <text x="245" y="198" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">截图/照片</text>
  
  <!-- 数据输入流：查询请求 -->
  <rect x="180" y="465" width="130" height="55" rx="27" fill="url(#df_data)" filter="url(#shadowDF)"/>
  <text x="245" y="498" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">查询请求</text>
  
  <!-- 处理过程1：截图监听 -->
  <circle cx="400" cy="192" r="55" fill="url(#df_process)" filter="url(#shadowDF)"/>
  <text x="400" y="185" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">截图</text>
  <text x="400" y="205" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">监听</text>
  <text x="400" y="235" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.9)">P1</text>
  
  <!-- 处理过程2：多层处理管道 -->
  <circle cx="580" cy="192" r="65" fill="url(#df_process)" filter="url(#shadowDF)"/>
  <text x="580" y="175" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">多层处理</text>
  <text x="580" y="195" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">管道</text>
  <text x="580" y="218" text-anchor="middle" font-family="Arial" font-size="10" fill="white">L1→L2→L3</text>
  <text x="580" y="245" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.9)">P2</text>
  
  <!-- 处理过程3：语义搜索 -->
  <circle cx="400" cy="492" r="55" fill="url(#df_process)" filter="url(#shadowDF)"/>
  <text x="400" y="485" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">语义</text>
  <text x="400" y="505" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">搜索</text>
  <text x="400" y="535" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.9)">P3</text>
  
  <!-- 数据存储1：向量数据库 -->
  <path d="M720,120 L830,120 L830,230 L720,230 Z M720,120 Q775,145 830,120 M720,230 Q775,205 830,230" fill="url(#df_store)" filter="url(#shadowDF)"/>
  <text x="775" y="165" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">向量</text>
  <text x="775" y="185" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">数据库</text>
  <text x="775" y="215" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.9)">D1</text>
  
  <!-- ★★★ 核心卖点：层次化记忆系统 ★★★ -->
  <rect x="690" y="270" width="290" height="270" rx="12" fill="#f5f8f5" stroke="#2d6a5a" stroke-width="2" filter="url(#shadowDF)"/>
  <rect x="690" y="270" width="290" height="40" rx="12" fill="url(#df_memory)"/>
  <text x="835" y="296" text-anchor="middle" font-family="SimHei" font-size="15" fill="white" font-weight="bold">⭐ 层次化记忆系统（核心卖点）</text>
  
  <!-- 短期记忆 -->
  <rect x="710" y="325" width="250" height="55" rx="6" fill="#e5f0e8" stroke="#3d7a6a" stroke-width="1.5"/>
  <text x="835" y="348" text-anchor="middle" font-family="SimHei" font-size="12" fill="#1a3a2a" font-weight="bold">第一层：短期记忆 (ImageMemory)</text>
  <text x="835" y="368" text-anchor="middle" font-family="SimSun" font-size="10" fill="#2a4a3a">单图即时描述 · VLM语义 · OCR文字</text>
  
  <!-- 长期记忆 -->
  <rect x="710" y="390" width="250" height="55" rx="6" fill="#d5e8db" stroke="#2d6a5a" stroke-width="1.5"/>
  <text x="835" y="413" text-anchor="middle" font-family="SimHei" font-size="12" fill="#1a3a2a" font-weight="bold">第二层：长期记忆 (HighLevelFact)</text>
  <text x="835" y="433" text-anchor="middle" font-family="SimSun" font-size="10" fill="#2a4a3a">Reflection推断 · 高级事实 · 跨图洞察</text>
  
  <!-- 隐式记忆 -->
  <rect x="710" y="455" width="250" height="55" rx="6" fill="#c5e0d0" stroke="#1d5a4a" stroke-width="1.5"/>
  <text x="835" y="478" text-anchor="middle" font-family="SimHei" font-size="12" fill="#1a3a2a" font-weight="bold">第三层：隐式记忆 (UserPreference)</text>
  <text x="835" y="498" text-anchor="middle" font-family="SimSun" font-size="10" fill="#2a4a3a">行为偏好 · 场景修图参数 · 无声学习</text>
  
  <text x="835" y="528" text-anchor="middle" font-family="SimSun" font-size="9" fill="#4a5a4a">D2 - 借鉴Stanford Generative Agents</text>
  
  <!-- 输出数据流：搜索结果 -->
  <rect x="180" y="585" width="130" height="55" rx="27" fill="url(#df_data)" filter="url(#shadowDF)"/>
  <text x="245" y="618" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">搜索结果</text>
  
  <!-- 数据流连接线 -->
  <!-- 用户→截图 -->
  <path d="M140,310 L170,210" stroke="#2c4a6e" stroke-width="2.5" fill="none" marker-end="url(#arrowDF)"/>
  <text x="135" y="255" font-family="SimSun" font-size="10" fill="#2c4a6e" font-weight="bold">拍摄/截图</text>
  
  <!-- 用户→查询 -->
  <path d="M140,380 L170,475" stroke="#2c4a6e" stroke-width="2.5" fill="none" marker-end="url(#arrowDF)"/>
  <text x="135" y="435" font-family="SimSun" font-size="10" fill="#2c4a6e" font-weight="bold">输入查询</text>
  
  <!-- 截图→截图监听 -->
  <line x1="310" y1="192" x2="340" y2="192" stroke="#3a5f95" stroke-width="2.5" marker-end="url(#arrowDF)"/>
  
  <!-- 截图监听→多层处理 -->
  <line x1="455" y1="192" x2="510" y2="192" stroke="#3a5f95" stroke-width="2.5" marker-end="url(#arrowDF)"/>
  <text x="475" y="180" font-family="SimSun" font-size="10" fill="#3a5f95" font-weight="bold">图片数据</text>
  
  <!-- 多层处理→向量数据库 -->
  <line x1="645" y1="170" x2="715" y2="170" stroke="#2d6a5a" stroke-width="2.5" marker-end="url(#arrowDF)"/>
  <text x="670" y="158" font-family="SimSun" font-size="10" fill="#2d6a5a" font-weight="bold">语义向量</text>
  
  <!-- 多层处理→层次记忆 -->
  <path d="M620,245 Q660,290 690,330" stroke="#2d6a5a" stroke-width="2.5" fill="none" marker-end="url(#arrowDF)"/>
  <text x="635" y="285" font-family="SimSun" font-size="10" fill="#2d6a5a" font-weight="bold">结构化数据</text>
  
  <!-- 查询→语义搜索 -->
  <line x1="310" y1="492" x2="340" y2="492" stroke="#3a5f95" stroke-width="2.5" marker-end="url(#arrowDF)"/>
  
  <!-- 向量数据库→语义搜索 -->
  <path d="M720,205 Q560,300 455,465" stroke="#4a8575" stroke-width="2" fill="none" stroke-dasharray="8,4" marker-end="url(#arrowDF)"/>
  <text x="590" y="330" font-family="SimSun" font-size="10" fill="#2d6a5a" font-weight="bold">向量匹配</text>
  
  <!-- 层次记忆→语义搜索 -->
  <path d="M690,440 Q540,475 455,492" stroke="#4a8575" stroke-width="2" fill="none" stroke-dasharray="8,4" marker-end="url(#arrowDF)"/>
  <text x="560" y="475" font-family="SimSun" font-size="10" fill="#2d6a5a" font-weight="bold">上下文增强</text>
  
  <!-- 语义搜索→结果 -->
  <path d="M365,540 L275,580" stroke="#3a5f95" stroke-width="2.5" fill="none" marker-end="url(#arrowDF)"/>
  
  <!-- 结果→用户 -->
  <path d="M180,612 Q100,520 100,405" stroke="#2c4a6e" stroke-width="2.5" fill="none" marker-end="url(#arrowDF)"/>
  <text x="105" y="520" font-family="SimSun" font-size="10" fill="#2c4a6e" font-weight="bold">返回结果</text>
  
  <!-- 底部图例 -->
  <rect x="50" y="660" width="900" height="75" rx="8" fill="#f5f8fa" stroke="#c0d0e0"/>
  <text x="500" y="682" text-anchor="middle" font-family="SimHei" font-size="12" font-weight="bold" fill="#1a2a3a">图例说明</text>
  
  <rect x="85" y="698" width="28" height="22" rx="4" fill="url(#df_user)"/>
  <text x="125" y="714" font-family="SimSun" font-size="11" fill="#2a3a4a">外部实体</text>
  
  <circle cx="215" cy="709" r="14" fill="url(#df_process)"/>
  <text x="245" y="714" font-family="SimSun" font-size="11" fill="#2a3a4a">处理过程</text>
  
  <rect x="310" y="698" width="28" height="22" rx="11" fill="url(#df_data)"/>
  <text x="350" y="714" font-family="SimSun" font-size="11" fill="#2a3a4a">数据流</text>
  
  <path d="M430,698 L458,698 L458,720 L430,720 Z M430,698 Q444,705 458,698" fill="url(#df_store)"/>
  <text x="475" y="714" font-family="SimSun" font-size="11" fill="#2a3a4a">数据存储</text>
  
  <line x1="560" y1="709" x2="605" y2="709" stroke="#2c4a6e" stroke-width="2.5" marker-end="url(#arrowDF)"/>
  <text x="625" y="714" font-family="SimSun" font-size="11" fill="#2a3a4a">数据流向</text>
  
  <line x1="715" y1="709" x2="760" y2="709" stroke="#4a8575" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="780" y="714" font-family="SimSun" font-size="11" fill="#2a3a4a">查询流向</text>
  
  <rect x="860" y="698" width="28" height="22" rx="4" fill="#e5f0e8" stroke="#2d6a5a"/>
  <text x="900" y="714" font-family="SimSun" font-size="11" fill="#2a3a4a">核心模块</text>
</svg>`;

// ========== 图2: 技术架构图 (修复版) ==========
const diagram_techarch = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="850" viewBox="0 0 1000 850">
  <defs>
    <!-- 深色配色 -->
    <linearGradient id="ta_l1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3d5a80"/><stop offset="100%" style="stop-color:#2c4a70"/>
    </linearGradient>
    <linearGradient id="ta_l2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4a6fa5"/><stop offset="100%" style="stop-color:#3a5f95"/>
    </linearGradient>
    <linearGradient id="ta_l3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#5580b0"/><stop offset="100%" style="stop-color:#4570a0"/>
    </linearGradient>
    <linearGradient id="ta_l4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6090c0"/><stop offset="100%" style="stop-color:#5080b0"/>
    </linearGradient>
    <linearGradient id="ta_cloud" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#7090a8"/><stop offset="100%" style="stop-color:#608098"/>
    </linearGradient>
    <linearGradient id="ta_device" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3d7a6a"/><stop offset="100%" style="stop-color:#2d6a5a"/>
    </linearGradient>
    <linearGradient id="ta_memory" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2d6a5a"/><stop offset="100%" style="stop-color:#1d5a4a"/>
    </linearGradient>
    <filter id="shadowTA"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.12"/></filter>
  </defs>
  <rect width="1000" height="850" fill="#ffffff"/>
  
  <!-- 标题区 -->
  <rect x="0" y="0" width="1000" height="75" fill="#f0f4f8"/>
  <text x="500" y="35" text-anchor="middle" font-family="SimHei" font-size="24" font-weight="bold" fill="#1a2a3a">拾光技术架构图</text>
  <text x="500" y="58" text-anchor="middle" font-family="SimSun" font-size="13" fill="#3a4a5a">Technical Architecture - 端云协同四层架构 + 层次化记忆系统</text>
  <line x1="100" y1="73" x2="900" y2="73" stroke="#c0d0e0" stroke-width="1"/>
  
  <!-- 云端服务区（右上角） -->
  <rect x="720" y="90" width="260" height="155" rx="10" fill="#f8fafb" stroke="#7090a8" stroke-width="2" stroke-dasharray="8,4" filter="url(#shadowTA)"/>
  <text x="850" y="115" text-anchor="middle" font-family="SimHei" font-size="14" font-weight="bold" fill="#4a6080">☁️ 云端服务（可选）</text>
  <rect x="745" y="130" width="210" height="50" rx="6" fill="url(#ta_cloud)"/>
  <text x="850" y="160" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">Qwen3-VL-235B</text>
  <text x="850" y="198" text-anchor="middle" font-family="SimSun" font-size="10" fill="#3a5070">SiliconFlow API · 235B参数</text>
  <rect x="745" y="210" width="210" height="28" rx="4" fill="#e8f0f5"/>
  <text x="850" y="228" text-anchor="middle" font-family="SimSun" font-size="10" fill="#3a5070">用户主动开启 · 117×能力提升</text>
  
  <!-- Layer 1: 用户界面层 -->
  <rect x="40" y="90" width="660" height="95" rx="10" fill="url(#ta_l1)" filter="url(#shadowTA)"/>
  <text x="65" y="118" font-family="SimHei" font-size="15" fill="white" font-weight="bold">用户界面层 (Presentation Layer)</text>
  
  <rect x="65" y="132" width="130" height="42" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="130" y="158" text-anchor="middle" font-family="SimSun" font-size="11" fill="white" font-weight="bold">自然语言搜索</text>
  
  <rect x="210" y="132" width="130" height="42" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="275" y="158" text-anchor="middle" font-family="SimSun" font-size="11" fill="white" font-weight="bold">相册浏览</text>
  
  <rect x="355" y="132" width="130" height="42" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="420" y="158" text-anchor="middle" font-family="SimSun" font-size="11" fill="white" font-weight="bold">隐私保险箱</text>
  
  <rect x="500" y="132" width="130" height="42" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="565" y="158" text-anchor="middle" font-family="SimSun" font-size="11" fill="white" font-weight="bold">跨应用跳转</text>
  
  <text x="660" y="173" text-anchor="end" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">Jetpack Compose | MD3</text>
  
  <!-- Layer 2: 智能处理层 -->
  <rect x="40" y="200" width="660" height="165" rx="10" fill="url(#ta_l2)" filter="url(#shadowTA)"/>
  <text x="65" y="228" font-family="SimHei" font-size="15" fill="white" font-weight="bold">智能处理层 (Intelligence Layer)</text>
  
  <!-- 多层处理管道 -->
  <rect x="65" y="245" width="615" height="105" rx="8" fill="rgba(255,255,255,0.15)"/>
  <text x="372" y="270" text-anchor="middle" font-family="SimHei" font-size="12" fill="white" font-weight="bold">多层处理管道 (Multi-Layer Pipeline)</text>
  
  <rect x="90" y="285" width="180" height="55" rx="5" fill="#3d7a6a"/>
  <text x="180" y="308" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">Layer 1: 快速预处理</text>
  <text x="180" y="328" text-anchor="middle" font-family="Arial" font-size="10" fill="white">ZXing · ML Kit · &lt;500ms</text>
  
  <text x="285" y="315" font-family="Arial" font-size="18" fill="white" font-weight="bold">→</text>
  
  <rect x="305" y="285" width="180" height="55" rx="5" fill="#4a8a6a"/>
  <text x="395" y="308" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">Layer 2: 结构化提取</text>
  <text x="395" y="328" text-anchor="middle" font-family="Arial" font-size="10" fill="white">正则引擎 · 场景分类</text>
  
  <text x="500" y="315" font-family="Arial" font-size="18" fill="white" font-weight="bold">→</text>
  
  <rect x="520" y="285" width="150" height="55" rx="5" fill="#3d5a80"/>
  <text x="595" y="308" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">Layer 3: 深度理解</text>
  <text x="595" y="328" text-anchor="middle" font-family="Arial" font-size="10" fill="white">VLM推理 · 3-5s</text>
  
  <!-- Layer 3: 数据存储层 -->
  <rect x="40" y="380" width="660" height="100" rx="10" fill="url(#ta_l3)" filter="url(#shadowTA)"/>
  <text x="65" y="408" font-family="SimHei" font-size="15" fill="white" font-weight="bold">数据存储层 (Data Layer)</text>
  
  <rect x="65" y="425" width="140" height="45" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="135" y="445" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">向量数据库</text>
  <text x="135" y="462" text-anchor="middle" font-family="Arial" font-size="9" fill="white">MiniLM · 384维</text>
  
  <rect x="220" y="425" width="140" height="45" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="290" y="445" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">结构化数据</text>
  <text x="290" y="462" text-anchor="middle" font-family="Arial" font-size="9" fill="white">SQLite + Room</text>
  
  <rect x="375" y="425" width="140" height="45" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="445" y="445" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">加密存储</text>
  <text x="445" y="462" text-anchor="middle" font-family="Arial" font-size="9" fill="white">EncryptedFile API</text>
  
  <rect x="530" y="425" width="160" height="45" rx="5" fill="rgba(255,255,255,0.32)" stroke="rgba(255,255,255,0.5)"/>
  <text x="610" y="445" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">→ 层次化记忆 ⭐</text>
  <text x="610" y="462" text-anchor="middle" font-family="Arial" font-size="9" fill="white">见右侧详细架构</text>
  
  <!-- Layer 4: 系统服务层 -->
  <rect x="40" y="495" width="660" height="85" rx="10" fill="url(#ta_l4)" filter="url(#shadowTA)"/>
  <text x="65" y="523" font-family="SimHei" font-size="15" fill="white" font-weight="bold">系统服务层 (Platform Layer)</text>
  
  <rect x="65" y="540" width="145" height="32" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="137" y="561" text-anchor="middle" font-family="SimSun" font-size="10" fill="white" font-weight="bold">截图监听服务</text>
  
  <rect x="225" y="540" width="145" height="32" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="297" y="561" text-anchor="middle" font-family="SimSun" font-size="10" fill="white" font-weight="bold">后台推理服务</text>
  
  <rect x="385" y="540" width="145" height="32" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="457" y="561" text-anchor="middle" font-family="SimSun" font-size="10" fill="white" font-weight="bold">权限管理</text>
  
  <rect x="545" y="540" width="145" height="32" rx="5" fill="rgba(255,255,255,0.22)"/>
  <text x="617" y="561" text-anchor="middle" font-family="SimSun" font-size="10" fill="white" font-weight="bold">Deep Link路由</text>
  
  <!-- 端侧VLM模块 -->
  <rect x="720" y="265" width="260" height="110" rx="10" fill="#f5f8f5" stroke="#3d7a6a" stroke-width="2" filter="url(#shadowTA)"/>
  <text x="850" y="293" text-anchor="middle" font-family="SimHei" font-size="14" font-weight="bold" fill="#2d5a4a">📱 端侧VLM（默认）</text>
  <rect x="745" y="308" width="210" height="50" rx="6" fill="url(#ta_device)"/>
  <text x="850" y="338" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">Qwen3-VL-2B</text>
  <text x="850" y="368" text-anchor="middle" font-family="SimSun" font-size="10" fill="#2d5a4a">MNN Framework · INT4量化 · 1.37GB</text>
  
  <!-- ★★★ 核心卖点：层次化记忆架构 ★★★ -->
  <rect x="720" y="395" width="260" height="220" rx="10" fill="#f5f8f5" stroke="#2d6a5a" stroke-width="2" filter="url(#shadowTA)"/>
  <rect x="720" y="395" width="260" height="38" rx="10" fill="url(#ta_memory)"/>
  <text x="850" y="420" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">⭐ 层次化记忆架构</text>
  
  <!-- 三层金字塔 -->
  <polygon points="850,450 915,520 785,520" fill="#c5e0d0" stroke="#3d7a6a" stroke-width="1.5"/>
  <text x="850" y="495" text-anchor="middle" font-family="SimHei" font-size="10" fill="#1a3a2a" font-weight="bold">隐式记忆</text>
  <text x="850" y="510" text-anchor="middle" font-family="SimSun" font-size="8" fill="#2a4a3a">偏好学习</text>
  
  <polygon points="850,465 940,555 760,555" fill="#a5d0c0" stroke="#2d6a5a" stroke-width="1.5"/>
  <text x="850" y="540" text-anchor="middle" font-family="SimHei" font-size="10" fill="#1a3a2a" font-weight="bold">长期记忆</text>
  
  <polygon points="850,480 965,590 735,590" fill="#85c0a8" stroke="#1d5a4a" stroke-width="1.5"/>
  <text x="850" y="575" text-anchor="middle" font-family="SimHei" font-size="10" fill="white" font-weight="bold">短期记忆</text>
  
  <text x="850" y="607" text-anchor="middle" font-family="SimSun" font-size="9" fill="#3a5a4a">Stanford Generative Agents Reflection</text>
  
  <!-- 连接线 -->
  <line x1="700" y1="315" x2="720" y2="315" stroke="#7090a8" stroke-width="2" stroke-dasharray="5,3"/>
  <line x1="700" y1="345" x2="720" y2="345" stroke="#3d7a6a" stroke-width="2"/>
  
  <!-- 底部技术栈 -->
  <rect x="40" y="600" width="940" height="50" rx="8" fill="#f5f8fa" stroke="#c0d0e0"/>
  <text x="500" y="630" text-anchor="middle" font-family="SimSun" font-size="12" fill="#2a3a4a">
    <tspan font-family="SimHei" fill="#1a2a3a" font-weight="bold">技术栈：</tspan>
    Kotlin · Jetpack Compose · MNN · SQLite/Room · ZXing · Google ML Kit · MiniLM-L6-v2 · Qwen3-VL
  </text>
  
  <!-- 底部核心卖点说明 -->
  <rect x="40" y="665" width="940" height="95" rx="10" fill="#f0f5f2" stroke="#a0c0b0"/>
  <text x="500" y="692" text-anchor="middle" font-family="SimHei" font-size="14" fill="#1a3a2a" font-weight="bold">层次化记忆系统 - 核心差异化卖点</text>
  <text x="500" y="718" text-anchor="middle" font-family="SimSun" font-size="11" fill="#2a4a3a">短期记忆：单图即时描述（VLM语义 + OCR文字 + 场景标签）→ 记住"照片是什么"</text>
  <text x="500" y="738" text-anchor="middle" font-family="SimSun" font-size="11" fill="#2a4a3a">长期记忆：Reflection高级事实推断（跨图洞察）→ 理解"用户经历了什么"（如：用户正在旅行）</text>
  <text x="500" y="758" text-anchor="middle" font-family="SimSun" font-size="11" fill="#2a4a3a">隐式记忆：场景化偏好无声学习（修图参数自动适应）→ 实现"无声的个性化"</text>
</svg>`;

// ========== 图3: 总流程图 (修复版) ==========
const diagram_overall = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="750" viewBox="0 0 1000 750">
  <defs>
    <!-- 深色配色 -->
    <linearGradient id="of_step" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3d5a80"/><stop offset="100%" style="stop-color:#2c4a70"/>
    </linearGradient>
    <linearGradient id="of_mem" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2d6a5a"/><stop offset="100%" style="stop-color:#1d5a4a"/>
    </linearGradient>
    <filter id="shadowOF"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/></filter>
    <marker id="arrowOF" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#2c4a70"/>
    </marker>
  </defs>
  <rect width="1000" height="750" fill="#ffffff"/>
  
  <!-- 标题区 -->
  <rect x="0" y="0" width="1000" height="75" fill="#f0f4f8"/>
  <text x="500" y="35" text-anchor="middle" font-family="SimHei" font-size="24" font-weight="bold" fill="#1a2a3a">拾光系统总流程图</text>
  <text x="500" y="58" text-anchor="middle" font-family="SimSun" font-size="13" fill="#3a4a5a">Overall Process Flow - 从截图到检索的完整链路（含层次化记忆）</text>
  <line x1="100" y1="73" x2="900" y2="73" stroke="#c0d0e0" stroke-width="1"/>
  
  <!-- 主流程线 -->
  <line x1="90" y1="235" x2="920" y2="235" stroke="#d0dae5" stroke-width="4"/>
  
  <!-- Step 1: 用户截图 -->
  <rect x="70" y="125" width="115" height="220" rx="10" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="127" y="175" text-anchor="middle" font-family="Arial" font-size="32" fill="white">📸</text>
  <text x="127" y="215" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">用户截图</text>
  <text x="127" y="238" text-anchor="middle" font-family="Arial" font-size="11" fill="white">Screenshot</text>
  <rect x="82" y="255" width="90" height="35" rx="5" fill="rgba(255,255,255,0.2)"/>
  <text x="127" y="278" text-anchor="middle" font-family="SimSun" font-size="10" fill="white" font-weight="bold">触发监听</text>
  <text x="127" y="330" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">①</text>
  
  <!-- 箭头1 -->
  <line x1="190" y1="235" x2="220" y2="235" stroke="#2c4a70" stroke-width="3" marker-end="url(#arrowOF)"/>
  
  <!-- Step 2: 截图监听 -->
  <rect x="225" y="125" width="115" height="220" rx="10" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="282" y="175" text-anchor="middle" font-family="Arial" font-size="32" fill="white">👁️</text>
  <text x="282" y="215" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">截图监听</text>
  <text x="282" y="238" text-anchor="middle" font-family="Arial" font-size="11" fill="white">Detection</text>
  <rect x="237" y="255" width="90" height="35" rx="5" fill="rgba(255,255,255,0.2)"/>
  <text x="282" y="278" text-anchor="middle" font-family="SimSun" font-size="10" fill="white" font-weight="bold">Screenshot API</text>
  <text x="282" y="330" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">②</text>
  
  <!-- 箭头2 -->
  <line x1="345" y1="235" x2="375" y2="235" stroke="#2c4a70" stroke-width="3" marker-end="url(#arrowOF)"/>
  
  <!-- Step 3: 多层处理 -->
  <rect x="380" y="125" width="115" height="220" rx="10" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="437" y="175" text-anchor="middle" font-family="Arial" font-size="32" fill="white">⚙️</text>
  <text x="437" y="215" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">多层处理</text>
  <text x="437" y="238" text-anchor="middle" font-family="Arial" font-size="11" fill="white">Pipeline</text>
  <rect x="392" y="255" width="90" height="55" rx="5" fill="rgba(255,255,255,0.2)"/>
  <text x="437" y="275" text-anchor="middle" font-family="SimSun" font-size="9" fill="white" font-weight="bold">L1: &lt;500ms</text>
  <text x="437" y="290" text-anchor="middle" font-family="SimSun" font-size="9" fill="white" font-weight="bold">L2: 结构化</text>
  <text x="437" y="305" text-anchor="middle" font-family="SimSun" font-size="9" fill="white" font-weight="bold">L3: VLM 3-5s</text>
  <text x="437" y="330" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">③</text>
  
  <!-- 箭头3 -->
  <line x1="500" y1="235" x2="530" y2="235" stroke="#2c4a70" stroke-width="3" marker-end="url(#arrowOF)"/>
  
  <!-- Step 4: 向量存储 -->
  <rect x="535" y="125" width="115" height="220" rx="10" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="592" y="175" text-anchor="middle" font-family="Arial" font-size="32" fill="white">💾</text>
  <text x="592" y="215" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">向量存储</text>
  <text x="592" y="238" text-anchor="middle" font-family="Arial" font-size="11" fill="white">Embedding</text>
  <rect x="547" y="255" width="90" height="35" rx="5" fill="rgba(255,255,255,0.2)"/>
  <text x="592" y="278" text-anchor="middle" font-family="SimSun" font-size="10" fill="white" font-weight="bold">384维向量</text>
  <text x="592" y="330" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">④</text>
  
  <!-- 分支箭头到记忆系统 -->
  <path d="M650,235 L695,235 L695,405" stroke="#2d6a5a" stroke-width="2.5" fill="none" marker-end="url(#arrowOF)"/>
  
  <!-- ★★★ 核心卖点：层次化记忆系统 ★★★ -->
  <rect x="580" y="420" width="290" height="200" rx="12" fill="#f5f8f5" stroke="#2d6a5a" stroke-width="2" filter="url(#shadowOF)"/>
  <rect x="580" y="420" width="290" height="40" rx="12" fill="url(#of_mem)"/>
  <text x="725" y="446" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">⭐ 层次化记忆系统</text>
  
  <rect x="600" y="475" width="250" height="40" rx="5" fill="#e5f0e8" stroke="#3d7a6a" stroke-width="1.5"/>
  <text x="725" y="493" text-anchor="middle" font-family="SimHei" font-size="11" fill="#1a3a2a" font-weight="bold">短期记忆 (ImageMemory)</text>
  <text x="725" y="508" text-anchor="middle" font-family="SimSun" font-size="9" fill="#2a4a3a">单图描述 → "照片是什么"</text>
  
  <rect x="600" y="525" width="250" height="40" rx="5" fill="#d5e8db" stroke="#2d6a5a" stroke-width="1.5"/>
  <text x="725" y="543" text-anchor="middle" font-family="SimHei" font-size="11" fill="#1a3a2a" font-weight="bold">长期记忆 (HighLevelFact)</text>
  <text x="725" y="558" text-anchor="middle" font-family="SimSun" font-size="9" fill="#2a4a3a">Reflection推断 → "用户经历了什么"</text>
  
  <rect x="600" y="575" width="250" height="40" rx="5" fill="#c5e0d0" stroke="#1d5a4a" stroke-width="1.5"/>
  <text x="725" y="593" text-anchor="middle" font-family="SimHei" font-size="11" fill="#1a3a2a" font-weight="bold">隐式记忆 (UserPreference)</text>
  <text x="725" y="608" text-anchor="middle" font-family="SimSun" font-size="9" fill="#2a4a3a">偏好学习 → "无声的个性化"</text>
  
  <!-- 记忆到搜索的箭头 -->
  <path d="M580,520 L420,520 L420,475" stroke="#2d6a5a" stroke-width="2" fill="none" stroke-dasharray="6,4" marker-end="url(#arrowOF)"/>
  <text x="485" y="510" font-family="SimSun" font-size="10" fill="#2d6a5a" font-weight="bold">上下文增强</text>
  
  <!-- 下方搜索流程 -->
  <!-- Step 5: 语义搜索 -->
  <rect x="380" y="430" width="115" height="130" rx="10" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="437" y="480" text-anchor="middle" font-family="Arial" font-size="32" fill="white">🔍</text>
  <text x="437" y="520" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">语义搜索</text>
  <text x="437" y="543" text-anchor="middle" font-family="Arial" font-size="11" fill="white">Search</text>
  <text x="437" y="553" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">⑤</text>
  
  <!-- 箭头5 -->
  <line x1="375" y1="495" x2="275" y2="495" stroke="#2c4a70" stroke-width="3" marker-end="url(#arrowOF)"/>
  
  <!-- Step 6: 返回结果 -->
  <rect x="155" y="430" width="115" height="130" rx="10" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="212" y="480" text-anchor="middle" font-family="Arial" font-size="32" fill="white">✅</text>
  <text x="212" y="520" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">精准定位</text>
  <text x="212" y="543" text-anchor="middle" font-family="Arial" font-size="11" fill="white">Results</text>
  <text x="212" y="553" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">⑥</text>
  
  <!-- 用户查询入口 -->
  <rect x="50" y="430" width="95" height="130" rx="10" fill="#e8f0f5" stroke="#a0b8d0" stroke-width="2" filter="url(#shadowOF)"/>
  <text x="97" y="480" text-anchor="middle" font-family="Arial" font-size="28" fill="#3d5a80">💬</text>
  <text x="97" y="512" text-anchor="middle" font-family="SimHei" font-size="12" fill="#2c4a70" font-weight="bold">自然语言</text>
  <text x="97" y="532" text-anchor="middle" font-family="Arial" font-size="10" fill="#4a6a8a">Query</text>
  
  <!-- 查询箭头 -->
  <line x1="145" y1="495" x2="375" y2="495" stroke="#6090c0" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="260" y="483" text-anchor="middle" font-family="SimSun" font-size="10" fill="#3a5a7a" font-weight="bold">「上周的咖啡发票」</text>
  
  <!-- 端云协同标注 -->
  <rect x="690" y="135" width="175" height="55" rx="8" fill="#f5f8fa" stroke="#6090c0" stroke-width="1.5"/>
  <text x="777" y="158" text-anchor="middle" font-family="SimHei" font-size="11" fill="#3a5a80" font-weight="bold">端云协同推理</text>
  <text x="777" y="178" text-anchor="middle" font-family="SimSun" font-size="10" fill="#4a6a8a">2B端侧(默认) ↔ 235B云端</text>
  
  <!-- 隐私标注 -->
  <rect x="875" y="135" width="105" height="55" rx="8" fill="#f5f8f5" stroke="#3d7a6a" stroke-width="1.5"/>
  <text x="927" y="158" text-anchor="middle" font-family="SimHei" font-size="11" fill="#2d5a4a" font-weight="bold">🔒 隐私优先</text>
  <text x="927" y="178" text-anchor="middle" font-family="SimSun" font-size="10" fill="#3a5a4a">数据不出端</text>
  
  <!-- 底部流程说明 -->
  <rect x="50" y="640" width="900" height="90" rx="10" fill="#f5f8fa" stroke="#c0d0e0"/>
  <text x="500" y="668" text-anchor="middle" font-family="SimHei" font-size="13" fill="#1a2a3a" font-weight="bold">完整处理链路</text>
  <text x="500" y="695" text-anchor="middle" font-family="SimSun" font-size="12" fill="#2a3a4a">
    ① 截图触发 → ② 实时监听 → ③ 分层处理 → ④ 向量入库 → ⑤ 语义检索 → ⑥ 精准返回
  </text>
  <text x="500" y="720" text-anchor="middle" font-family="SimSun" font-size="11" fill="#3a4a5a">
    核心差异化：层次化记忆系统实现从"照片是什么"到"用户经历了什么"的认知跃升
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

console.log('\n修复内容：');
console.log('1. 加深字体颜色（白色更亮，深色文字使用#1a2a3a等深色）');
console.log('2. 增大文本框尺寸，防止文字溢出');
console.log('3. 增加字体粗细（font-weight: bold）');
