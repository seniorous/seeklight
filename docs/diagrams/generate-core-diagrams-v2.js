/**
 * 拾光项目 - 核心流程图生成器 v2
 * 改进：1.解决元素重叠 2.柔和配色 3.突出层次化记忆
 */
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'images-v2');

// ========== 图1: 数据流图 (优化版) ==========
const diagram_dataflow = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="950" height="720" viewBox="0 0 950 720">
  <defs>
    <!-- 柔和配色方案 -->
    <linearGradient id="df_user" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5b7fa3"/><stop offset="100%" style="stop-color:#4a6b8a"/>
    </linearGradient>
    <linearGradient id="df_process" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6b8cae"/><stop offset="100%" style="stop-color:#5a7a9c"/>
    </linearGradient>
    <linearGradient id="df_data" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7fa3c4"/><stop offset="100%" style="stop-color:#6b92b5"/>
    </linearGradient>
    <linearGradient id="df_store" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8eb4d0"/><stop offset="100%" style="stop-color:#7aa3c2"/>
    </linearGradient>
    <linearGradient id="df_memory" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#a4c4dc"/><stop offset="100%" style="stop-color:#8fb5ce"/>
    </linearGradient>
    <filter id="shadowDF"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.12"/></filter>
    <marker id="arrowDF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#5b7fa3"/>
    </marker>
  </defs>
  <rect width="950" height="720" fill="#fafbfc"/>
  
  <!-- 标题区 -->
  <rect x="0" y="0" width="950" height="70" fill="#f5f7f9"/>
  <text x="475" y="32" text-anchor="middle" font-family="SimHei" font-size="22" font-weight="bold" fill="#2c3e50">拾光系统数据流图</text>
  <text x="475" y="55" text-anchor="middle" font-family="SimSun" font-size="12" fill="#7f8c8d">Data Flow Diagram - 端云协同处理流程</text>
  <line x1="100" y1="68" x2="850" y2="68" stroke="#e0e5e9" stroke-width="1"/>
  
  <!-- 左侧：外部实体（用户） -->
  <rect x="40" y="280" width="90" height="100" rx="6" fill="url(#df_user)" filter="url(#shadowDF)"/>
  <text x="85" y="320" text-anchor="middle" font-family="SimHei" font-size="14" fill="white" font-weight="bold">用户</text>
  <text x="85" y="345" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.85)">User</text>
  <text x="85" y="365" text-anchor="middle" font-family="SimSun" font-size="9" fill="rgba(255,255,255,0.7)">外部实体</text>
  
  <!-- 数据输入流：截图/照片 -->
  <rect x="170" y="160" width="110" height="50" rx="25" fill="url(#df_data)" filter="url(#shadowDF)"/>
  <text x="225" y="190" text-anchor="middle" font-family="SimHei" font-size="12" fill="white">截图/照片</text>
  
  <!-- 数据输入流：查询请求 -->
  <rect x="170" y="440" width="110" height="50" rx="25" fill="url(#df_data)" filter="url(#shadowDF)"/>
  <text x="225" y="470" text-anchor="middle" font-family="SimHei" font-size="12" fill="white">查询请求</text>
  
  <!-- 处理过程1：截图监听 -->
  <circle cx="370" cy="185" r="45" fill="url(#df_process)" filter="url(#shadowDF)"/>
  <text x="370" y="180" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">截图</text>
  <text x="370" y="196" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">监听</text>
  <text x="370" y="220" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)">P1</text>
  
  <!-- 处理过程2：多层处理管道 -->
  <circle cx="540" cy="185" r="55" fill="url(#df_process)" filter="url(#shadowDF)"/>
  <text x="540" y="170" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">多层处理</text>
  <text x="540" y="188" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">管道</text>
  <text x="540" y="206" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">L1→L2→L3</text>
  <text x="540" y="230" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)">P2</text>
  
  <!-- 处理过程3：语义搜索 -->
  <circle cx="370" cy="465" r="45" fill="url(#df_process)" filter="url(#shadowDF)"/>
  <text x="370" y="460" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">语义</text>
  <text x="370" y="478" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">搜索</text>
  <text x="370" y="500" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)">P3</text>
  
  <!-- 数据存储1：向量数据库 -->
  <path d="M700,120 L800,120 L800,220 L700,220 Z M700,120 Q750,140 800,120 M700,220 Q750,200 800,220" fill="url(#df_store)" filter="url(#shadowDF)"/>
  <text x="750" y="160" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">向量</text>
  <text x="750" y="178" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">数据库</text>
  <text x="750" y="205" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)">D1</text>
  
  <!-- ★★★ 核心卖点：层次化记忆系统 ★★★ -->
  <rect x="660" y="270" width="270" height="240" rx="10" fill="#f0f4f8" stroke="#b8c9d9" stroke-width="2" filter="url(#shadowDF)"/>
  <rect x="660" y="270" width="270" height="35" rx="10" fill="url(#df_memory)"/>
  <text x="795" y="293" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">⭐ 层次化记忆系统 (核心卖点)</text>
  
  <!-- 短期记忆 -->
  <rect x="680" y="320" width="230" height="50" rx="6" fill="#e8f4f8" stroke="#7fa3c4" stroke-width="1"/>
  <text x="795" y="340" text-anchor="middle" font-family="SimHei" font-size="11" fill="#4a6b8a" font-weight="bold">第一层：短期记忆 (ImageMemory)</text>
  <text x="795" y="358" text-anchor="middle" font-family="SimSun" font-size="9" fill="#6b8cae">单图即时描述 | VLM语义 | OCR文字</text>
  
  <!-- 长期记忆 -->
  <rect x="680" y="380" width="230" height="50" rx="6" fill="#dbeef8" stroke="#6b92b5" stroke-width="1"/>
  <text x="795" y="400" text-anchor="middle" font-family="SimHei" font-size="11" fill="#4a6b8a" font-weight="bold">第二层：长期记忆 (HighLevelFact)</text>
  <text x="795" y="418" text-anchor="middle" font-family="SimSun" font-size="9" fill="#6b8cae">Reflection推断 | 高级事实 | 跨图洞察</text>
  
  <!-- 隐式记忆 -->
  <rect x="680" y="440" width="230" height="50" rx="6" fill="#cee6f5" stroke="#5a7a9c" stroke-width="1"/>
  <text x="795" y="460" text-anchor="middle" font-family="SimHei" font-size="11" fill="#4a6b8a" font-weight="bold">第三层：隐式记忆 (UserPreference)</text>
  <text x="795" y="478" text-anchor="middle" font-family="SimSun" font-size="9" fill="#6b8cae">行为偏好 | 场景修图参数 | 无声学习</text>
  
  <text x="795" y="500" text-anchor="middle" font-family="Arial" font-size="9" fill="#7f8c8d">D2 - 借鉴Stanford Generative Agents</text>
  
  <!-- 输出数据流：搜索结果 -->
  <rect x="170" y="560" width="110" height="50" rx="25" fill="url(#df_data)" filter="url(#shadowDF)"/>
  <text x="225" y="590" text-anchor="middle" font-family="SimHei" font-size="12" fill="white">搜索结果</text>
  
  <!-- 数据流连接线 -->
  <!-- 用户→截图 -->
  <path d="M130,300 L160,210" stroke="#5b7fa3" stroke-width="2" fill="none" marker-end="url(#arrowDF)"/>
  <text x="130" y="250" font-family="SimSun" font-size="9" fill="#5b7fa3">拍摄/截图</text>
  
  <!-- 用户→查询 -->
  <path d="M130,360 L160,450" stroke="#5b7fa3" stroke-width="2" fill="none" marker-end="url(#arrowDF)"/>
  <text x="130" y="410" font-family="SimSun" font-size="9" fill="#5b7fa3">输入查询</text>
  
  <!-- 截图→截图监听 -->
  <line x1="280" y1="185" x2="320" y2="185" stroke="#6b8cae" stroke-width="2" marker-end="url(#arrowDF)"/>
  
  <!-- 截图监听→多层处理 -->
  <line x1="415" y1="185" x2="480" y2="185" stroke="#6b8cae" stroke-width="2" marker-end="url(#arrowDF)"/>
  <text x="445" y="175" font-family="SimSun" font-size="9" fill="#6b8cae">图片数据</text>
  
  <!-- 多层处理→向量数据库 -->
  <line x1="595" y1="165" x2="695" y2="165" stroke="#7fa3c4" stroke-width="2" marker-end="url(#arrowDF)"/>
  <text x="640" y="155" font-family="SimSun" font-size="9" fill="#7fa3c4">语义向量</text>
  
  <!-- 多层处理→层次记忆 -->
  <path d="M580,225 Q620,280 660,320" stroke="#7fa3c4" stroke-width="2" fill="none" marker-end="url(#arrowDF)"/>
  <text x="600" y="275" font-family="SimSun" font-size="9" fill="#7fa3c4">结构化数据</text>
  
  <!-- 查询→语义搜索 -->
  <line x1="280" y1="465" x2="320" y2="465" stroke="#6b8cae" stroke-width="2" marker-end="url(#arrowDF)"/>
  
  <!-- 向量数据库→语义搜索 -->
  <path d="M700,195 Q550,280 415,440" stroke="#8eb4d0" stroke-width="2" fill="none" stroke-dasharray="6,3" marker-end="url(#arrowDF)"/>
  <text x="560" y="310" font-family="SimSun" font-size="9" fill="#8eb4d0">向量匹配</text>
  
  <!-- 层次记忆→语义搜索 -->
  <path d="M660,420 Q520,450 415,465" stroke="#8eb4d0" stroke-width="2" fill="none" stroke-dasharray="6,3" marker-end="url(#arrowDF)"/>
  <text x="530" y="455" font-family="SimSun" font-size="9" fill="#8eb4d0">上下文增强</text>
  
  <!-- 语义搜索→结果 -->
  <path d="M345,505 L255,555" stroke="#6b8cae" stroke-width="2" fill="none" marker-end="url(#arrowDF)"/>
  
  <!-- 结果→用户 -->
  <path d="M170,585 Q100,500 100,385" stroke="#5b7fa3" stroke-width="2" fill="none" marker-end="url(#arrowDF)"/>
  <text x="105" y="500" font-family="SimSun" font-size="9" fill="#5b7fa3">返回结果</text>
  
  <!-- 底部图例 -->
  <rect x="50" y="630" width="850" height="75" rx="8" fill="#f5f7f9" stroke="#e0e5e9"/>
  <text x="475" y="652" text-anchor="middle" font-family="SimHei" font-size="11" font-weight="bold" fill="#4a5568">图例说明</text>
  
  <rect x="80" y="665" width="24" height="18" rx="3" fill="url(#df_user)"/>
  <text x="115" y="678" font-family="SimSun" font-size="10" fill="#5a6a7a">外部实体</text>
  
  <circle cx="200" cy="674" r="12" fill="url(#df_process)"/>
  <text x="225" y="678" font-family="SimSun" font-size="10" fill="#5a6a7a">处理过程</text>
  
  <rect x="290" y="665" width="24" height="18" rx="9" fill="url(#df_data)"/>
  <text x="325" y="678" font-family="SimSun" font-size="10" fill="#5a6a7a">数据流</text>
  
  <path d="M400,665 L424,665 L424,683 L400,683 Z M400,665 Q412,670 424,665" fill="url(#df_store)"/>
  <text x="440" y="678" font-family="SimSun" font-size="10" fill="#5a6a7a">数据存储</text>
  
  <line x1="520" y1="674" x2="560" y2="674" stroke="#5b7fa3" stroke-width="2" marker-end="url(#arrowDF)"/>
  <text x="575" y="678" font-family="SimSun" font-size="10" fill="#5a6a7a">数据流向</text>
  
  <line x1="660" y1="674" x2="700" y2="674" stroke="#8eb4d0" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="715" y="678" font-family="SimSun" font-size="10" fill="#5a6a7a">查询流向</text>
  
  <rect x="790" y="665" width="24" height="18" rx="3" fill="#f0f4f8" stroke="#b8c9d9"/>
  <text x="825" y="678" font-family="SimSun" font-size="10" fill="#5a6a7a">核心模块</text>
</svg>`;

// ========== 图2: 技术架构图 (优化版) ==========
const diagram_techarch = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="950" height="800" viewBox="0 0 950 800">
  <defs>
    <!-- 柔和蓝灰配色 -->
    <linearGradient id="ta_l1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#5a7a9c"/><stop offset="100%" style="stop-color:#4a6a8c"/>
    </linearGradient>
    <linearGradient id="ta_l2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6b8cae"/><stop offset="100%" style="stop-color:#5b7c9e"/>
    </linearGradient>
    <linearGradient id="ta_l3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#7fa3c4"/><stop offset="100%" style="stop-color:#6f93b4"/>
    </linearGradient>
    <linearGradient id="ta_l4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#8eb4d0"/><stop offset="100%" style="stop-color:#7ea4c0"/>
    </linearGradient>
    <linearGradient id="ta_cloud" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#9cb8cc"/><stop offset="100%" style="stop-color:#8ca8bc"/>
    </linearGradient>
    <linearGradient id="ta_device" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6b9080"/><stop offset="100%" style="stop-color:#5b8070"/>
    </linearGradient>
    <filter id="shadowTA"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.1"/></filter>
  </defs>
  <rect width="950" height="800" fill="#fafbfc"/>
  
  <!-- 标题区 -->
  <rect x="0" y="0" width="950" height="70" fill="#f5f7f9"/>
  <text x="475" y="32" text-anchor="middle" font-family="SimHei" font-size="22" font-weight="bold" fill="#2c3e50">拾光技术架构图</text>
  <text x="475" y="55" text-anchor="middle" font-family="SimSun" font-size="12" fill="#7f8c8d">Technical Architecture - 端云协同四层架构 + 层次化记忆系统</text>
  <line x1="100" y1="68" x2="850" y2="68" stroke="#e0e5e9" stroke-width="1"/>
  
  <!-- 云端服务区（右上角） -->
  <rect x="700" y="85" width="230" height="145" rx="10" fill="#f8fafb" stroke="#9cb8cc" stroke-width="1.5" stroke-dasharray="6,3" filter="url(#shadowTA)"/>
  <text x="815" y="108" text-anchor="middle" font-family="SimHei" font-size="12" font-weight="bold" fill="#6b8cae">☁️ 云端服务（可选）</text>
  <rect x="720" y="120" width="190" height="45" rx="6" fill="url(#ta_cloud)"/>
  <text x="815" y="147" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">Qwen3-VL-235B</text>
  <text x="815" y="180" text-anchor="middle" font-family="SimSun" font-size="9" fill="#6b8cae">SiliconFlow API | 235B参数</text>
  <rect x="720" y="195" width="190" height="25" rx="4" fill="#e8f0f5"/>
  <text x="815" y="212" text-anchor="middle" font-family="SimSun" font-size="9" fill="#5a7a9c">用户主动开启 · 117×能力提升</text>
  
  <!-- Layer 1: 用户界面层 -->
  <rect x="40" y="85" width="640" height="85" rx="8" fill="url(#ta_l1)" filter="url(#shadowTA)"/>
  <text x="60" y="110" font-family="SimHei" font-size="14" fill="white" font-weight="bold">用户界面层 (Presentation Layer)</text>
  
  <rect x="60" y="120" width="100" height="40" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="110" y="145" text-anchor="middle" font-family="SimSun" font-size="10" fill="white">自然语言搜索</text>
  
  <rect x="175" y="120" width="100" height="40" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="225" y="145" text-anchor="middle" font-family="SimSun" font-size="10" fill="white">相册浏览</text>
  
  <rect x="290" y="120" width="100" height="40" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="340" y="145" text-anchor="middle" font-family="SimSun" font-size="10" fill="white">隐私保险箱</text>
  
  <rect x="405" y="120" width="100" height="40" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="455" y="145" text-anchor="middle" font-family="SimSun" font-size="10" fill="white">跨应用跳转</text>
  
  <text x="640" y="155" text-anchor="end" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.65)">Jetpack Compose | MD3</text>
  
  <!-- Layer 2: 智能处理层 -->
  <rect x="40" y="185" width="640" height="150" rx="8" fill="url(#ta_l2)" filter="url(#shadowTA)"/>
  <text x="60" y="210" font-family="SimHei" font-size="14" fill="white" font-weight="bold">智能处理层 (Intelligence Layer)</text>
  
  <!-- 多层处理管道 -->
  <rect x="60" y="225" width="600" height="95" rx="6" fill="rgba(255,255,255,0.12)"/>
  <text x="360" y="248" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">多层处理管道 (Multi-Layer Pipeline)</text>
  
  <rect x="80" y="260" width="170" height="50" rx="4" fill="#6b9080"/>
  <text x="165" y="282" text-anchor="middle" font-family="SimHei" font-size="10" fill="white" font-weight="bold">Layer 1: 快速预处理</text>
  <text x="165" y="298" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.85)">ZXing | ML Kit | &lt;500ms</text>
  
  <text x="265" y="290" font-family="Arial" font-size="16" fill="white">→</text>
  
  <rect x="280" y="260" width="170" height="50" rx="4" fill="#7a9a8a"/>
  <text x="365" y="282" text-anchor="middle" font-family="SimHei" font-size="10" fill="white" font-weight="bold">Layer 2: 结构化提取</text>
  <text x="365" y="298" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.85)">正则引擎 | 场景分类</text>
  
  <text x="465" y="290" font-family="Arial" font-size="16" fill="white">→</text>
  
  <rect x="480" y="260" width="170" height="50" rx="4" fill="#5a7a9c"/>
  <text x="565" y="282" text-anchor="middle" font-family="SimHei" font-size="10" fill="white" font-weight="bold">Layer 3: 深度理解</text>
  <text x="565" y="298" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.85)">VLM推理 | 3-5s</text>
  
  <!-- Layer 3: 数据存储层 -->
  <rect x="40" y="350" width="640" height="90" rx="8" fill="url(#ta_l3)" filter="url(#shadowTA)"/>
  <text x="60" y="375" font-family="SimHei" font-size="14" fill="white" font-weight="bold">数据存储层 (Data Layer)</text>
  
  <rect x="60" y="390" width="130" height="40" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="125" y="407" text-anchor="middle" font-family="SimHei" font-size="10" fill="white" font-weight="bold">向量数据库</text>
  <text x="125" y="422" text-anchor="middle" font-family="Arial" font-size="8" fill="rgba(255,255,255,0.8)">MiniLM | 384维</text>
  
  <rect x="205" y="390" width="130" height="40" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="270" y="407" text-anchor="middle" font-family="SimHei" font-size="10" fill="white" font-weight="bold">结构化数据</text>
  <text x="270" y="422" text-anchor="middle" font-family="Arial" font-size="8" fill="rgba(255,255,255,0.8)">SQLite + Room</text>
  
  <rect x="350" y="390" width="130" height="40" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="415" y="407" text-anchor="middle" font-family="SimHei" font-size="10" fill="white" font-weight="bold">加密存储</text>
  <text x="415" y="422" text-anchor="middle" font-family="Arial" font-size="8" fill="rgba(255,255,255,0.8)">EncryptedFile API</text>
  
  <rect x="495" y="390" width="175" height="40" rx="4" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.3)"/>
  <text x="583" y="407" text-anchor="middle" font-family="SimHei" font-size="10" fill="white" font-weight="bold">→ 层次化记忆 ⭐</text>
  <text x="583" y="422" text-anchor="middle" font-family="Arial" font-size="8" fill="rgba(255,255,255,0.8)">见右侧详细架构</text>
  
  <!-- Layer 4: 系统服务层 -->
  <rect x="40" y="455" width="640" height="75" rx="8" fill="url(#ta_l4)" filter="url(#shadowTA)"/>
  <text x="60" y="480" font-family="SimHei" font-size="14" fill="white" font-weight="bold">系统服务层 (Platform Layer)</text>
  
  <rect x="60" y="495" width="130" height="28" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="125" y="514" text-anchor="middle" font-family="SimSun" font-size="9" fill="white">截图监听服务</text>
  
  <rect x="205" y="495" width="130" height="28" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="270" y="514" text-anchor="middle" font-family="SimSun" font-size="9" fill="white">后台推理服务</text>
  
  <rect x="350" y="495" width="130" height="28" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="415" y="514" text-anchor="middle" font-family="SimSun" font-size="9" fill="white">权限管理</text>
  
  <rect x="495" y="495" width="130" height="28" rx="4" fill="rgba(255,255,255,0.18)"/>
  <text x="560" y="514" text-anchor="middle" font-family="SimSun" font-size="9" fill="white">Deep Link路由</text>
  
  <!-- 端侧VLM模块 -->
  <rect x="700" y="250" width="230" height="100" rx="10" fill="#f5f8f6" stroke="#6b9080" stroke-width="1.5" filter="url(#shadowTA)"/>
  <text x="815" y="275" text-anchor="middle" font-family="SimHei" font-size="12" font-weight="bold" fill="#5b8070">📱 端侧VLM（默认）</text>
  <rect x="720" y="290" width="190" height="45" rx="6" fill="url(#ta_device)"/>
  <text x="815" y="317" text-anchor="middle" font-family="SimHei" font-size="11" fill="white" font-weight="bold">Qwen3-VL-2B</text>
  <text x="815" y="345" text-anchor="middle" font-family="SimSun" font-size="9" fill="#5b8070">MNN Framework | INT4量化 | 1.37GB</text>
  
  <!-- ★★★ 核心卖点：层次化记忆架构 ★★★ -->
  <rect x="700" y="370" width="230" height="195" rx="10" fill="#f5f8fa" stroke="#5a7a9c" stroke-width="2" filter="url(#shadowTA)"/>
  <rect x="700" y="370" width="230" height="32" rx="10" fill="#5a7a9c"/>
  <text x="815" y="392" text-anchor="middle" font-family="SimHei" font-size="12" fill="white" font-weight="bold">⭐ 层次化记忆架构</text>
  
  <!-- 三层金字塔 -->
  <polygon points="815,420 870,480 760,480" fill="#c8d8e8" stroke="#8eb4d0"/>
  <text x="815" y="460" text-anchor="middle" font-family="SimHei" font-size="9" fill="#4a6a8c" font-weight="bold">隐式记忆</text>
  <text x="815" y="472" text-anchor="middle" font-family="Arial" font-size="7" fill="#6b8cae">偏好学习</text>
  
  <polygon points="815,430 890,510 740,510" fill="#a8c8e0" stroke="#7fa3c4"/>
  <text x="815" y="498" text-anchor="middle" font-family="SimHei" font-size="9" fill="#4a6a8c" font-weight="bold">长期记忆</text>
  
  <polygon points="815,440 910,540 720,540" fill="#88b8d8" stroke="#6b92b5"/>
  <text x="815" y="528" text-anchor="middle" font-family="SimHei" font-size="9" fill="white" font-weight="bold">短期记忆</text>
  
  <text x="815" y="555" text-anchor="middle" font-family="SimSun" font-size="8" fill="#7f8c8d">Stanford Generative Agents Reflection</text>
  
  <!-- 连接线 -->
  <line x1="680" y1="290" x2="700" y2="290" stroke="#9cb8cc" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="680" y1="320" x2="700" y2="320" stroke="#6b9080" stroke-width="1.5"/>
  
  <!-- 底部技术栈 -->
  <rect x="40" y="550" width="890" height="45" rx="6" fill="#f5f7f9" stroke="#e0e5e9"/>
  <text x="475" y="577" text-anchor="middle" font-family="SimSun" font-size="11" fill="#5a6a7a">
    <tspan font-family="SimHei" fill="#4a5568">技术栈：</tspan>
    Kotlin · Jetpack Compose · MNN · SQLite/Room · ZXing · Google ML Kit · MiniLM-L6-v2 · Qwen3-VL
  </text>
  
  <!-- 底部核心卖点说明 -->
  <rect x="40" y="610" width="890" height="80" rx="8" fill="#f0f4f8" stroke="#b8c9d9"/>
  <text x="475" y="635" text-anchor="middle" font-family="SimHei" font-size="13" fill="#3a4a5a" font-weight="bold">层次化记忆系统 - 核心差异化卖点</text>
  <text x="475" y="658" text-anchor="middle" font-family="SimSun" font-size="10" fill="#5a6a7a">短期记忆：单图即时描述（VLM语义 + OCR文字 + 场景标签）→ 记住"照片是什么"</text>
  <text x="475" y="675" text-anchor="middle" font-family="SimSun" font-size="10" fill="#5a6a7a">长期记忆：Reflection高级事实推断（跨图洞察）→ 理解"用户经历了什么"（如：用户正在旅行）</text>
  <text x="475" y="692" text-anchor="middle" font-family="SimSun" font-size="10" fill="#5a6a7a">隐式记忆：场景化偏好无声学习（修图参数自动适应）→ 实现"无声的个性化"</text>
</svg>`;

// ========== 图3: 总流程图 (优化版) ==========
const diagram_overall = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="950" height="700" viewBox="0 0 950 700">
  <defs>
    <!-- 柔和蓝灰配色 -->
    <linearGradient id="of_step" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#5a7a9c"/><stop offset="100%" style="stop-color:#4a6a8c"/>
    </linearGradient>
    <linearGradient id="of_mem" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6b9080"/><stop offset="100%" style="stop-color:#5b8070"/>
    </linearGradient>
    <filter id="shadowOF"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.12"/></filter>
    <marker id="arrowOF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#5a7a9c"/>
    </marker>
  </defs>
  <rect width="950" height="700" fill="#fafbfc"/>
  
  <!-- 标题区 -->
  <rect x="0" y="0" width="950" height="70" fill="#f5f7f9"/>
  <text x="475" y="32" text-anchor="middle" font-family="SimHei" font-size="22" font-weight="bold" fill="#2c3e50">拾光系统总流程图</text>
  <text x="475" y="55" text-anchor="middle" font-family="SimSun" font-size="12" fill="#7f8c8d">Overall Process Flow - 从截图到检索的完整链路（含层次化记忆）</text>
  <line x1="100" y1="68" x2="850" y2="68" stroke="#e0e5e9" stroke-width="1"/>
  
  <!-- 主流程线 -->
  <line x1="80" y1="220" x2="870" y2="220" stroke="#d0dae5" stroke-width="3"/>
  
  <!-- Step 1: 用户截图 -->
  <rect x="60" y="120" width="100" height="200" rx="8" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="110" y="165" text-anchor="middle" font-family="Arial" font-size="28" fill="white">📸</text>
  <text x="110" y="200" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">用户截图</text>
  <text x="110" y="220" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Screenshot</text>
  <rect x="70" y="240" width="80" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
  <text x="110" y="260" text-anchor="middle" font-family="SimSun" font-size="9" fill="rgba(255,255,255,0.9)">触发监听</text>
  <text x="110" y="305" text-anchor="middle" font-family="SimHei" font-size="11" fill="white">①</text>
  
  <!-- 箭头1 -->
  <line x1="165" y1="220" x2="195" y2="220" stroke="#5a7a9c" stroke-width="2" marker-end="url(#arrowOF)"/>
  
  <!-- Step 2: 截图监听 -->
  <rect x="200" y="120" width="100" height="200" rx="8" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="250" y="165" text-anchor="middle" font-family="Arial" font-size="28" fill="white">👁️</text>
  <text x="250" y="200" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">截图监听</text>
  <text x="250" y="220" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Detection</text>
  <rect x="210" y="240" width="80" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
  <text x="250" y="260" text-anchor="middle" font-family="SimSun" font-size="9" fill="rgba(255,255,255,0.9)">Screenshot API</text>
  <text x="250" y="305" text-anchor="middle" font-family="SimHei" font-size="11" fill="white">②</text>
  
  <!-- 箭头2 -->
  <line x1="305" y1="220" x2="335" y2="220" stroke="#5a7a9c" stroke-width="2" marker-end="url(#arrowOF)"/>
  
  <!-- Step 3: 多层处理 -->
  <rect x="340" y="120" width="100" height="200" rx="8" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="390" y="165" text-anchor="middle" font-family="Arial" font-size="28" fill="white">⚙️</text>
  <text x="390" y="200" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">多层处理</text>
  <text x="390" y="220" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Pipeline</text>
  <rect x="350" y="240" width="80" height="50" rx="4" fill="rgba(255,255,255,0.15)"/>
  <text x="390" y="258" text-anchor="middle" font-family="SimSun" font-size="8" fill="rgba(255,255,255,0.9)">L1: &lt;500ms</text>
  <text x="390" y="272" text-anchor="middle" font-family="SimSun" font-size="8" fill="rgba(255,255,255,0.9)">L2: 结构化</text>
  <text x="390" y="286" text-anchor="middle" font-family="SimSun" font-size="8" fill="rgba(255,255,255,0.9)">L3: VLM 3-5s</text>
  <text x="390" y="305" text-anchor="middle" font-family="SimHei" font-size="11" fill="white">③</text>
  
  <!-- 箭头3 -->
  <line x1="445" y1="220" x2="475" y2="220" stroke="#5a7a9c" stroke-width="2" marker-end="url(#arrowOF)"/>
  
  <!-- Step 4: 向量存储 -->
  <rect x="480" y="120" width="100" height="200" rx="8" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="530" y="165" text-anchor="middle" font-family="Arial" font-size="28" fill="white">💾</text>
  <text x="530" y="200" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">向量存储</text>
  <text x="530" y="220" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Embedding</text>
  <rect x="490" y="240" width="80" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
  <text x="530" y="260" text-anchor="middle" font-family="SimSun" font-size="9" fill="rgba(255,255,255,0.9)">384维向量</text>
  <text x="530" y="305" text-anchor="middle" font-family="SimHei" font-size="11" fill="white">④</text>
  
  <!-- 分支箭头到记忆系统 -->
  <path d="M580,220 L620,220 L620,380" stroke="#6b9080" stroke-width="2" fill="none" marker-end="url(#arrowOF)"/>
  
  <!-- ★★★ 核心卖点：层次化记忆系统 ★★★ -->
  <rect x="520" y="395" width="260" height="180" rx="10" fill="#f5f8f6" stroke="#6b9080" stroke-width="2" filter="url(#shadowOF)"/>
  <rect x="520" y="395" width="260" height="35" rx="10" fill="url(#of_mem)"/>
  <text x="650" y="418" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">⭐ 层次化记忆系统</text>
  
  <rect x="535" y="445" width="230" height="35" rx="4" fill="#e8f4f0" stroke="#8eb4a0"/>
  <text x="650" y="460" text-anchor="middle" font-family="SimHei" font-size="10" fill="#4a6a5c" font-weight="bold">短期记忆 (ImageMemory)</text>
  <text x="650" y="475" text-anchor="middle" font-family="SimSun" font-size="8" fill="#6b8c7e">单图描述 → "照片是什么"</text>
  
  <rect x="535" y="490" width="230" height="35" rx="4" fill="#dbeee8" stroke="#7fa390"/>
  <text x="650" y="505" text-anchor="middle" font-family="SimHei" font-size="10" fill="#4a6a5c" font-weight="bold">长期记忆 (HighLevelFact)</text>
  <text x="650" y="520" text-anchor="middle" font-family="SimSun" font-size="8" fill="#6b8c7e">Reflection推断 → "用户经历了什么"</text>
  
  <rect x="535" y="535" width="230" height="35" rx="4" fill="#cee6de" stroke="#6b9080"/>
  <text x="650" y="550" text-anchor="middle" font-family="SimHei" font-size="10" fill="#4a6a5c" font-weight="bold">隐式记忆 (UserPreference)</text>
  <text x="650" y="565" text-anchor="middle" font-family="SimSun" font-size="8" fill="#6b8c7e">偏好学习 → "无声的个性化"</text>
  
  <!-- 记忆到搜索的箭头 -->
  <path d="M520,485 L380,485 L380,440" stroke="#6b9080" stroke-width="2" fill="none" stroke-dasharray="5,3" marker-end="url(#arrowOF)"/>
  <text x="430" y="475" font-family="SimSun" font-size="9" fill="#6b9080">上下文增强</text>
  
  <!-- 下方搜索流程 -->
  <!-- Step 5: 语义搜索 -->
  <rect x="340" y="400" width="100" height="120" rx="8" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="390" y="445" text-anchor="middle" font-family="Arial" font-size="28" fill="white">🔍</text>
  <text x="390" y="480" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">语义搜索</text>
  <text x="390" y="500" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Search</text>
  <text x="390" y="508" text-anchor="middle" font-family="SimHei" font-size="11" fill="white">⑤</text>
  
  <!-- 箭头5 -->
  <line x1="335" y1="460" x2="245" y2="460" stroke="#5a7a9c" stroke-width="2" marker-end="url(#arrowOF)"/>
  
  <!-- Step 6: 返回结果 -->
  <rect x="140" y="400" width="100" height="120" rx="8" fill="url(#of_step)" filter="url(#shadowOF)"/>
  <text x="190" y="445" text-anchor="middle" font-family="Arial" font-size="28" fill="white">✅</text>
  <text x="190" y="480" text-anchor="middle" font-family="SimHei" font-size="13" fill="white" font-weight="bold">精准定位</text>
  <text x="190" y="500" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.8)">Results</text>
  <text x="190" y="508" text-anchor="middle" font-family="SimHei" font-size="11" fill="white">⑥</text>
  
  <!-- 用户查询入口 -->
  <rect x="50" y="400" width="80" height="120" rx="8" fill="#e8eef3" stroke="#b8c9d9" filter="url(#shadowOF)"/>
  <text x="90" y="445" text-anchor="middle" font-family="Arial" font-size="24" fill="#5a7a9c">💬</text>
  <text x="90" y="475" text-anchor="middle" font-family="SimHei" font-size="11" fill="#5a7a9c" font-weight="bold">自然语言</text>
  <text x="90" y="495" text-anchor="middle" font-family="Arial" font-size="9" fill="#7f8c8d">Query</text>
  
  <!-- 查询箭头 -->
  <line x1="130" y1="460" x2="335" y2="460" stroke="#8eb4d0" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="230" y="450" text-anchor="middle" font-family="SimSun" font-size="9" fill="#7f8c8d">「上周的咖啡发票」</text>
  
  <!-- 端云协同标注 -->
  <rect x="620" y="130" width="160" height="50" rx="6" fill="#f5f8f6" stroke="#8eb4d0"/>
  <text x="700" y="150" text-anchor="middle" font-family="SimHei" font-size="10" fill="#5a7a9c" font-weight="bold">端云协同推理</text>
  <text x="700" y="168" text-anchor="middle" font-family="SimSun" font-size="9" fill="#7f8c8d">2B端侧(默认) ↔ 235B云端</text>
  
  <!-- 隐私标注 -->
  <rect x="800" y="130" width="130" height="50" rx="6" fill="#f5f8f6" stroke="#6b9080"/>
  <text x="865" y="150" text-anchor="middle" font-family="SimHei" font-size="10" fill="#5b8070" font-weight="bold">🔒 隐私优先</text>
  <text x="865" y="168" text-anchor="middle" font-family="SimSun" font-size="9" fill="#7f8c8d">数据不出端</text>
  
  <!-- 底部流程说明 -->
  <rect x="50" y="600" width="850" height="80" rx="8" fill="#f5f7f9" stroke="#e0e5e9"/>
  <text x="475" y="625" text-anchor="middle" font-family="SimHei" font-size="12" fill="#4a5568" font-weight="bold">完整处理链路</text>
  <text x="475" y="650" text-anchor="middle" font-family="SimSun" font-size="11" fill="#5a6a7a">
    ① 截图触发 → ② 实时监听 → ③ 分层处理 → ④ 向量入库 → ⑤ 语义检索 → ⑥ 精准返回
  </text>
  <text x="475" y="672" text-anchor="middle" font-family="SimSun" font-size="10" fill="#7f8c8d">
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

console.log(`\n共生成 ${diagrams.length} 张优化版核心流程图`);
console.log('改进内容：');
console.log('1. 元素间距增大，解决重叠问题');
console.log('2. 采用柔和蓝灰配色，与Word文档协调');
console.log('3. 突出层次化记忆架构（短期→长期→隐式）作为核心卖点');
