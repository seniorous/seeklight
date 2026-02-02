/**
 * 拾光项目计划书 - 多样化图表生成脚本
 * 生成10+张不同类型的专业图表
 */
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'images-v2');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 图1: 系统分层架构图（金字塔式）
const diagram1_layered = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="550" viewBox="0 0 800 550">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f093fb"/>
      <stop offset="100%" style="stop-color:#f5576c"/>
    </linearGradient>
    <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4facfe"/>
      <stop offset="100%" style="stop-color:#00f2fe"/>
    </linearGradient>
    <linearGradient id="g4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#43e97b"/>
      <stop offset="100%" style="stop-color:#38f9d7"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="3" dy="3" stdDeviation="4" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="800" height="550" fill="#f8fafc"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="#1e293b">拾光系统分层架构</text>
  
  <!-- 用户界面层 -->
  <path d="M200,70 L600,70 L550,150 L250,150 Z" fill="url(#g1)" filter="url(#shadow)"/>
  <text x="400" y="115" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">用户界面层</text>
  <text x="400" y="138" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.9)">自然语言搜索 | 相册浏览 | 隐私保险箱</text>
  
  <!-- 智能处理层 -->
  <path d="M250,160 L550,160 L500,240 L300,240 Z" fill="url(#g2)" filter="url(#shadow)"/>
  <text x="400" y="205" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">智能处理层</text>
  <text x="400" y="228" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.9)">多层处理管道 | VLM推理 | 语义向量化</text>
  
  <!-- 数据存储层 -->
  <path d="M300,250 L500,250 L450,330 L350,330 Z" fill="url(#g3)" filter="url(#shadow)"/>
  <text x="400" y="295" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">数据存储层</text>
  <text x="400" y="318" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.9)">向量数据库 | 层次化记忆</text>
  
  <!-- 系统服务层 -->
  <path d="M350,340 L450,340 L420,400 L380,400 Z" fill="url(#g4)" filter="url(#shadow)"/>
  <text x="400" y="375" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">系统服务</text>
  
  <!-- 右侧技术栈 -->
  <rect x="620" y="70" width="160" height="330" rx="10" fill="white" stroke="#e2e8f0" stroke-width="2" filter="url(#shadow)"/>
  <text x="700" y="95" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" font-weight="bold" fill="#334155">核心技术栈</text>
  <line x1="630" y1="105" x2="770" y2="105" stroke="#e2e8f0" stroke-width="1"/>
  <text x="700" y="130" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">Qwen3-VL-2B/235B</text>
  <text x="700" y="160" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">MNN Framework</text>
  <text x="700" y="190" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">MiniLM-L6-v2</text>
  <text x="700" y="220" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">Google ML Kit</text>
  <text x="700" y="250" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">ZXing</text>
  <text x="700" y="280" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">SQLite + Room</text>
  <text x="700" y="310" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">Android Jetpack</text>
  <text x="700" y="340" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">Kotlin Coroutines</text>
  <text x="700" y="370" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">EncryptedFile API</text>
  
  <!-- 左侧特性 -->
  <rect x="20" y="70" width="160" height="330" rx="10" fill="white" stroke="#e2e8f0" stroke-width="2" filter="url(#shadow)"/>
  <text x="100" y="95" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" font-weight="bold" fill="#334155">核心特性</text>
  <line x1="30" y1="105" x2="170" y2="105" stroke="#e2e8f0" stroke-width="1"/>
  <circle cx="45" cy="130" r="8" fill="#667eea"/><text x="55" y="134" font-family="Microsoft YaHei" font-size="11" fill="#334155">隐私优先</text>
  <circle cx="45" cy="160" r="8" fill="#f5576c"/><text x="55" y="164" font-family="Microsoft YaHei" font-size="11" fill="#334155">端云协同</text>
  <circle cx="45" cy="190" r="8" fill="#4facfe"/><text x="55" y="194" font-family="Microsoft YaHei" font-size="11" fill="#334155">语义搜索</text>
  <circle cx="45" cy="220" r="8" fill="#43e97b"/><text x="55" y="224" font-family="Microsoft YaHei" font-size="11" fill="#334155">智能记忆</text>
  <circle cx="45" cy="250" r="8" fill="#fbbf24"/><text x="55" y="254" font-family="Microsoft YaHei" font-size="11" fill="#334155">快速响应</text>
  <circle cx="45" cy="280" r="8" fill="#a78bfa"/><text x="55" y="284" font-family="Microsoft YaHei" font-size="11" fill="#334155">跨品牌</text>
  <circle cx="45" cy="310" r="8" fill="#fb7185"/><text x="55" y="314" font-family="Microsoft YaHei" font-size="11" fill="#334155">个性化</text>
  <circle cx="45" cy="340" r="8" fill="#22d3ee"/><text x="55" y="344" font-family="Microsoft YaHei" font-size="11" fill="#334155">安全加密</text>
  
  <!-- 底部说明 -->
  <rect x="100" y="430" width="600" height="100" rx="10" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
  <text x="400" y="460" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="#475569">端侧默认模式：Qwen3-VL-2B（2B参数）→ 本地推理 → 数据不出端</text>
  <text x="400" y="490" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="#475569">云端增强模式：Qwen3-VL-235B（235B参数）→ API调用 → 117倍能力提升</text>
  <text x="400" y="515" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#94a3b8">用户可在隐私保护与强大能力之间自由切换</text>
</svg>`;

// 图2: SWOT分析矩阵
const diagram2_swot = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <filter id="shadow2"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/></filter>
  </defs>
  <rect width="800" height="600" fill="#fafafa"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="#1e293b">SWOT 战略分析矩阵</text>
  
  <!-- S - 优势 -->
  <rect x="50" y="60" width="340" height="250" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="2" filter="url(#shadow2)"/>
  <rect x="50" y="60" width="340" height="40" rx="12" fill="#16a34a"/>
  <text x="220" y="87" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">S 优势 (Strengths)</text>
  <text x="70" y="125" font-family="Microsoft YaHei" font-size="12" fill="#166534">● 端云协同架构，117倍能力跃升</text>
  <text x="70" y="150" font-family="Microsoft YaHei" font-size="12" fill="#166534">● 隐私优先设计，数据不出端</text>
  <text x="70" y="175" font-family="Microsoft YaHei" font-size="12" fill="#166534">● 500ms快速响应，用户体验优</text>
  <text x="70" y="200" font-family="Microsoft YaHei" font-size="12" fill="#166534">● 跨品牌通用，不绑定厂商</text>
  <text x="70" y="225" font-family="Microsoft YaHei" font-size="12" fill="#166534">● 层次化记忆，理解用户生活</text>
  <text x="70" y="250" font-family="Microsoft YaHei" font-size="12" fill="#166534">● 隐式偏好学习，无声个性化</text>
  <text x="70" y="275" font-family="Microsoft YaHei" font-size="12" fill="#166534">● MVP已验证，技术可行性高</text>
  
  <!-- W - 劣势 -->
  <rect x="410" y="60" width="340" height="250" rx="12" fill="#fef9c3" stroke="#ca8a04" stroke-width="2" filter="url(#shadow2)"/>
  <rect x="410" y="60" width="340" height="40" rx="12" fill="#ca8a04"/>
  <text x="580" y="87" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">W 劣势 (Weaknesses)</text>
  <text x="430" y="125" font-family="Microsoft YaHei" font-size="12" fill="#854d0e">● 端侧VLM需≥4GB RAM</text>
  <text x="430" y="150" font-family="Microsoft YaHei" font-size="12" fill="#854d0e">● 当前仅覆盖中高端机型</text>
  <text x="430" y="175" font-family="Microsoft YaHei" font-size="12" fill="#854d0e">● 云端API存在持续运营成本</text>
  <text x="430" y="200" font-family="Microsoft YaHei" font-size="12" fill="#854d0e">● 首Token延迟约3秒，需优化</text>
  <text x="430" y="225" font-family="Microsoft YaHei" font-size="12" fill="#854d0e">● 品牌知名度尚待建立</text>
  <text x="430" y="250" font-family="Microsoft YaHei" font-size="12" fill="#854d0e">● 团队规模小，资源有限</text>
  
  <!-- O - 机会 -->
  <rect x="50" y="330" width="340" height="250" rx="12" fill="#dbeafe" stroke="#2563eb" stroke-width="2" filter="url(#shadow2)"/>
  <rect x="50" y="330" width="340" height="40" rx="12" fill="#2563eb"/>
  <text x="220" y="357" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">O 机会 (Opportunities)</text>
  <text x="70" y="395" font-family="Microsoft YaHei" font-size="12" fill="#1e40af">● 2028年AI手机占70%市场份额</text>
  <text x="70" y="420" font-family="Microsoft YaHei" font-size="12" fill="#1e40af">● Edge AI硬件市场CAGR 17.6%</text>
  <text x="70" y="445" font-family="Microsoft YaHei" font-size="12" fill="#1e40af">● PIPL合规红利，端侧处理受鼓励</text>
  <text x="70" y="470" font-family="Microsoft YaHei" font-size="12" fill="#1e40af">● 手机厂商布局Agent生态</text>
  <text x="70" y="495" font-family="Microsoft YaHei" font-size="12" fill="#1e40af">● 跨品牌市场空白待填补</text>
  <text x="70" y="520" font-family="Microsoft YaHei" font-size="12" fill="#1e40af">● 大学生数字囤积痛点明确</text>
  <text x="70" y="545" font-family="Microsoft YaHei" font-size="12" fill="#1e40af">● 端侧AI算力快速普及</text>
  
  <!-- T - 威胁 -->
  <rect x="410" y="330" width="340" height="250" rx="12" fill="#fee2e2" stroke="#dc2626" stroke-width="2" filter="url(#shadow2)"/>
  <rect x="410" y="330" width="340" height="40" rx="12" fill="#dc2626"/>
  <text x="580" y="357" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">T 威胁 (Threats)</text>
  <text x="430" y="395" font-family="Microsoft YaHei" font-size="12" fill="#991b1b">● Android/iOS原生相册可能集成</text>
  <text x="430" y="420" font-family="Microsoft YaHei" font-size="12" fill="#991b1b">● 系统级权限和预装优势</text>
  <text x="430" y="445" font-family="Microsoft YaHei" font-size="12" fill="#991b1b">● 厂商方案持续迭代升级</text>
  <text x="430" y="470" font-family="Microsoft YaHei" font-size="12" fill="#991b1b">● 大厂资源和品牌优势</text>
  <text x="430" y="495" font-family="Microsoft YaHei" font-size="12" fill="#991b1b">● 用户隐私意识提升的双刃剑</text>
  <text x="430" y="520" font-family="Microsoft YaHei" font-size="12" fill="#991b1b">● 云端API服务稳定性风险</text>
</svg>`;

// 图3: 技术成熟度雷达图
const diagram3_radar = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <filter id="shadow3"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="#1e293b">技术成熟度评估 (TRL)</text>
  
  <!-- 雷达图背景 -->
  <g transform="translate(300, 320)">
    <!-- 同心圆 -->
    <circle cx="0" cy="0" r="200" fill="none" stroke="#e2e8f0" stroke-width="1"/>
    <circle cx="0" cy="0" r="160" fill="none" stroke="#e2e8f0" stroke-width="1"/>
    <circle cx="0" cy="0" r="120" fill="none" stroke="#e2e8f0" stroke-width="1"/>
    <circle cx="0" cy="0" r="80" fill="none" stroke="#e2e8f0" stroke-width="1"/>
    <circle cx="0" cy="0" r="40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
    
    <!-- 轴线 -->
    <line x1="0" y1="-200" x2="0" y2="200" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="-173" y1="-100" x2="173" y2="100" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="-173" y1="100" x2="173" y2="-100" stroke="#cbd5e1" stroke-width="1"/>
    
    <!-- TRL数据多边形 - 端侧VLM(TRL7), 端云协同(TRL5), 多层管道(TRL4), 层次记忆(TRL3), 偏好学习(TRL3) -->
    <polygon points="0,-200 138,-100 86,162 -86,162 -138,-100" fill="rgba(99,102,241,0.3)" stroke="#6366f1" stroke-width="3"/>
    
    <!-- 数据点 -->
    <circle cx="0" cy="-200" r="8" fill="#6366f1"/><text x="0" y="-215" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#1e293b" font-weight="bold">端侧VLM</text><text x="0" y="-232" text-anchor="middle" font-family="Arial" font-size="11" fill="#6366f1">TRL 7</text>
    <circle cx="138" cy="-100" r="8" fill="#6366f1"/><text x="175" y="-95" font-family="Microsoft YaHei" font-size="12" fill="#1e293b" font-weight="bold">端云协同</text><text x="175" y="-78" font-family="Arial" font-size="11" fill="#6366f1">TRL 5</text>
    <circle cx="86" cy="162" r="8" fill="#6366f1"/><text x="120" y="185" font-family="Microsoft YaHei" font-size="12" fill="#1e293b" font-weight="bold">多层管道</text><text x="120" y="202" font-family="Arial" font-size="11" fill="#6366f1">TRL 4</text>
    <circle cx="-86" cy="162" r="8" fill="#6366f1"/><text x="-120" y="185" text-anchor="end" font-family="Microsoft YaHei" font-size="12" fill="#1e293b" font-weight="bold">层次记忆</text><text x="-120" y="202" text-anchor="end" font-family="Arial" font-size="11" fill="#6366f1">TRL 3</text>
    <circle cx="-138" cy="-100" r="8" fill="#6366f1"/><text x="-175" y="-95" text-anchor="end" font-family="Microsoft YaHei" font-size="12" fill="#1e293b" font-weight="bold">偏好学习</text><text x="-175" y="-78" text-anchor="end" font-family="Arial" font-size="11" fill="#6366f1">TRL 3</text>
    
    <!-- 刻度标签 -->
    <text x="25" y="-35" font-family="Arial" font-size="10" fill="#94a3b8">TRL2</text>
    <text x="25" y="-75" font-family="Arial" font-size="10" fill="#94a3b8">TRL4</text>
    <text x="25" y="-115" font-family="Arial" font-size="10" fill="#94a3b8">TRL6</text>
    <text x="25" y="-155" font-family="Arial" font-size="10" fill="#94a3b8">TRL8</text>
  </g>
  
  <!-- 右侧图例 -->
  <rect x="560" y="80" width="220" height="450" rx="10" fill="white" stroke="#e2e8f0" stroke-width="1" filter="url(#shadow3)"/>
  <text x="670" y="110" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" font-weight="bold" fill="#1e293b">TRL 等级说明</text>
  <line x1="570" y1="125" x2="770" y2="125" stroke="#e2e8f0"/>
  
  <rect x="575" y="140" width="20" height="20" rx="3" fill="#22c55e"/>
  <text x="605" y="155" font-family="Microsoft YaHei" font-size="11" fill="#334155">TRL 7-9: 已验证/部署</text>
  <rect x="575" y="175" width="20" height="20" rx="3" fill="#3b82f6"/>
  <text x="605" y="190" font-family="Microsoft YaHei" font-size="11" fill="#334155">TRL 5-6: 组件验证</text>
  <rect x="575" y="210" width="20" height="20" rx="3" fill="#f59e0b"/>
  <text x="605" y="225" font-family="Microsoft YaHei" font-size="11" fill="#334155">TRL 3-4: 概念验证</text>
  <rect x="575" y="245" width="20" height="20" rx="3" fill="#ef4444"/>
  <text x="605" y="260" font-family="Microsoft YaHei" font-size="11" fill="#334155">TRL 1-2: 基础研究</text>
  
  <line x1="570" y1="285" x2="770" y2="285" stroke="#e2e8f0"/>
  <text x="670" y="310" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" font-weight="bold" fill="#1e293b">项目技术评估</text>
  
  <text x="580" y="340" font-family="Microsoft YaHei" font-size="11" fill="#334155">端侧VLM部署</text>
  <rect x="580" y="350" width="180" height="12" rx="2" fill="#e2e8f0"/><rect x="580" y="350" width="180" height="12" rx="2" fill="#22c55e"/>
  <text x="765" y="360" text-anchor="end" font-family="Arial" font-size="10" fill="white" font-weight="bold">TRL7</text>
  
  <text x="580" y="385" font-family="Microsoft YaHei" font-size="11" fill="#334155">端云协同推理</text>
  <rect x="580" y="395" width="180" height="12" rx="2" fill="#e2e8f0"/><rect x="580" y="395" width="128" height="12" rx="2" fill="#3b82f6"/>
  <text x="703" y="405" text-anchor="end" font-family="Arial" font-size="10" fill="white" font-weight="bold">TRL5</text>
  
  <text x="580" y="430" font-family="Microsoft YaHei" font-size="11" fill="#334155">多层处理管道</text>
  <rect x="580" y="440" width="180" height="12" rx="2" fill="#e2e8f0"/><rect x="580" y="440" width="102" height="12" rx="2" fill="#f59e0b"/>
  <text x="677" y="450" text-anchor="end" font-family="Arial" font-size="10" fill="white" font-weight="bold">TRL4</text>
  
  <text x="580" y="475" font-family="Microsoft YaHei" font-size="11" fill="#334155">层次化记忆</text>
  <rect x="580" y="485" width="180" height="12" rx="2" fill="#e2e8f0"/><rect x="580" y="485" width="77" height="12" rx="2" fill="#f59e0b"/>
  <text x="652" y="495" text-anchor="end" font-family="Arial" font-size="10" fill="white" font-weight="bold">TRL3</text>
</svg>`;

// 图4: 竞品对比矩阵（象限图）
const diagram4_competition = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <filter id="shadow4"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="800" height="600" fill="#fafafa"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="#1e293b">市场竞争格局 - 能力隐私象限</text>
  
  <!-- 坐标轴 -->
  <line x1="100" y1="530" x2="700" y2="530" stroke="#94a3b8" stroke-width="2"/>
  <line x1="100" y1="530" x2="100" y2="80" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="700,530 690,525 690,535" fill="#94a3b8"/>
  <polygon points="100,80 95,90 105,90" fill="#94a3b8"/>
  <text x="400" y="565" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="#64748b">AI 能力</text>
  <text x="55" y="305" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="#64748b" transform="rotate(-90, 55, 305)">隐私保护</text>
  
  <!-- 象限背景 -->
  <rect x="100" y="80" width="300" height="225" fill="#dcfce7" opacity="0.5"/>
  <rect x="400" y="80" width="300" height="225" fill="#fef3c7" opacity="0.5"/>
  <rect x="100" y="305" width="300" height="225" fill="#fee2e2" opacity="0.5"/>
  <rect x="400" y="305" width="300" height="225" fill="#dbeafe" opacity="0.5"/>
  
  <!-- 象限标签 -->
  <text x="250" y="110" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#166534" font-weight="bold">高隐私 / 低能力</text>
  <text x="550" y="110" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#854d0e" font-weight="bold">高隐私 / 高能力</text>
  <text x="250" y="520" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#991b1b" font-weight="bold">低隐私 / 低能力</text>
  <text x="550" y="520" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#1e40af" font-weight="bold">低隐私 / 高能力</text>
  
  <!-- 竞品标记 -->
  <!-- 纯端侧方案 -->
  <circle cx="220" cy="180" r="35" fill="#22c55e" filter="url(#shadow4)"/>
  <text x="220" y="175" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">荣耀</text>
  <text x="220" y="192" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="white">任意门</text>
  
  <circle cx="300" cy="200" r="30" fill="#22c55e" filter="url(#shadow4)"/>
  <text x="300" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">OPPO</text>
  <text x="300" y="210" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="white">AI相册</text>
  
  <!-- 纯云端方案 -->
  <circle cx="580" cy="420" r="40" fill="#3b82f6" filter="url(#shadow4)"/>
  <text x="580" y="415" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">Google</text>
  <text x="580" y="432" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="white">Photos</text>
  
  <circle cx="500" cy="380" r="35" fill="#3b82f6" filter="url(#shadow4)"/>
  <text x="500" y="375" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white" font-weight="bold">百度</text>
  <text x="500" y="392" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="white">网盘</text>
  
  <!-- 拾光 - 差异化定位 -->
  <circle cx="550" cy="160" r="50" fill="#8b5cf6" filter="url(#shadow4)" stroke="#fbbf24" stroke-width="4"/>
  <text x="550" y="150" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">拾光</text>
  <text x="550" y="172" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="white">端云协同</text>
  
  <!-- 图例 -->
  <rect x="620" y="50" width="170" height="120" rx="8" fill="white" stroke="#e2e8f0" stroke-width="1" filter="url(#shadow4)"/>
  <text x="705" y="75" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#334155">图例</text>
  <circle cx="640" cy="100" r="8" fill="#22c55e"/><text x="655" y="104" font-family="Microsoft YaHei" font-size="11" fill="#334155">纯端侧方案</text>
  <circle cx="640" cy="125" r="8" fill="#3b82f6"/><text x="655" y="129" font-family="Microsoft YaHei" font-size="11" fill="#334155">纯云端方案</text>
  <circle cx="640" cy="150" r="8" fill="#8b5cf6" stroke="#fbbf24" stroke-width="2"/><text x="655" y="154" font-family="Microsoft YaHei" font-size="11" fill="#334155">拾光（差异化）</text>
</svg>`;

// 图5: 记忆层次金字塔
const diagram5_memory = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="550" viewBox="0 0 800 550">
  <defs>
    <linearGradient id="mem1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#fbbf24"/><stop offset="100%" style="stop-color:#f59e0b"/>
    </linearGradient>
    <linearGradient id="mem2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6"/><stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
    <linearGradient id="mem3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/><stop offset="100%" style="stop-color:#2563eb"/>
    </linearGradient>
    <filter id="shadow5"><feDropShadow dx="3" dy="3" stdDeviation="4" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="800" height="550" fill="#f8fafc"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="#1e293b">层次化记忆架构</text>
  <text x="400" y="58" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="#64748b">借鉴 Stanford Generative Agents Reflection 机制</text>
  
  <!-- 金字塔层级 -->
  <path d="M300,90 L500,90 L580,200 L220,200 Z" fill="url(#mem1)" filter="url(#shadow5)"/>
  <text x="400" y="140" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">第三层：隐式记忆</text>
  <text x="400" y="165" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="rgba(255,255,255,0.9)">UserPreference | 行为偏好</text>
  <text x="400" y="185" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.8)">场景化修图偏好 · 隐式反馈学习</text>
  
  <path d="M220,210 L580,210 L660,350 L140,350 Z" fill="url(#mem2)" filter="url(#shadow5)"/>
  <text x="400" y="265" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">第二层：长期记忆</text>
  <text x="400" y="290" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="rgba(255,255,255,0.9)">HighLevelFact | 高级事实推断</text>
  <text x="400" y="315" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.8)">Reflection机制 · 跨图片洞察 · 生活事件理解</text>
  <text x="400" y="338" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.7)">例：「用户正在三亚旅行」「用户在准备考试」</text>
  
  <path d="M140,360 L660,360 L740,510 L60,510 Z" fill="url(#mem3)" filter="url(#shadow5)"/>
  <text x="400" y="415" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">第一层：短期记忆</text>
  <text x="400" y="440" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="rgba(255,255,255,0.9)">ImageMemory | 单图即时描述</text>
  <text x="400" y="465" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.8)">VLM语义描述 · OCR文字内容 · 场景分类标签 · 结构化信息</text>
  <text x="400" y="490" text-anchor="middle" font-family="Arial" font-size="10" fill="rgba(255,255,255,0.7)">例：「星巴克美式咖啡，¥32，2026-01-28，微信支付」</text>
  
  <!-- 右侧Reflection流程 -->
  <rect x="680" y="90" width="110" height="420" rx="8" fill="white" stroke="#e2e8f0" filter="url(#shadow5)"/>
  <text x="735" y="115" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#334155">Reflection</text>
  <text x="735" y="133" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#64748b">触发机制</text>
  <line x1="690" y1="145" x2="780" y2="145" stroke="#e2e8f0"/>
  
  <text x="735" y="170" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#334155">事件驱动</text>
  <text x="735" y="190" text-anchor="middle" font-family="Arial" font-size="9" fill="#64748b">导入50+图片</text>
  <text x="735" y="210" text-anchor="middle" font-family="Arial" font-size="9" fill="#64748b">地理位置变化</text>
  <text x="735" y="230" text-anchor="middle" font-family="Arial" font-size="9" fill="#64748b">相似场景聚集</text>
  
  <line x1="690" y1="250" x2="780" y2="250" stroke="#e2e8f0"/>
  <text x="735" y="275" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#334155">定时触发</text>
  <text x="735" y="295" text-anchor="middle" font-family="Arial" font-size="9" fill="#64748b">每日睡眠时段</text>
  <text x="735" y="315" text-anchor="middle" font-family="Arial" font-size="9" fill="#64748b">后台静默执行</text>
  
  <line x1="690" y1="335" x2="780" y2="335" stroke="#e2e8f0"/>
  <text x="735" y="360" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#334155">隐私设计</text>
  <text x="735" y="380" text-anchor="middle" font-family="Arial" font-size="9" fill="#64748b">本地加密存储</text>
  <text x="735" y="400" text-anchor="middle" font-family="Arial" font-size="9" fill="#64748b">端侧VLM推理</text>
  <text x="735" y="420" text-anchor="middle" font-family="Arial" font-size="9" fill="#64748b">数据不出端</text>
  <text x="735" y="440" text-anchor="middle" font-family="Arial" font-size="9" fill="#64748b">用户可删除</text>
</svg>`;

// 图6: 开发时间线（甘特图风格）
const diagram6_timeline = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="ph1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#22c55e"/><stop offset="100%" style="stop-color:#16a34a"/>
    </linearGradient>
    <linearGradient id="ph2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6"/><stop offset="100%" style="stop-color:#2563eb"/>
    </linearGradient>
    <linearGradient id="ph3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8b5cf6"/><stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
    <linearGradient id="ph4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f59e0b"/><stop offset="100%" style="stop-color:#d97706"/>
    </linearGradient>
    <linearGradient id="ph5" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ec4899"/><stop offset="100%" style="stop-color:#db2777"/>
    </linearGradient>
    <linearGradient id="ph6" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#64748b"/><stop offset="100%" style="stop-color:#475569"/>
    </linearGradient>
    <filter id="shadow6"><feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.15"/></filter>
  </defs>
  <rect width="800" height="500" fill="#fafafa"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="#1e293b">项目开发时间线（2026年2月-5月）</text>
  
  <!-- 时间轴 -->
  <line x1="150" y1="80" x2="750" y2="80" stroke="#cbd5e1" stroke-width="2"/>
  <text x="187" y="70" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">1月</text>
  <text x="287" y="70" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">2月</text>
  <text x="387" y="70" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">3月</text>
  <text x="487" y="70" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">4月</text>
  <text x="587" y="70" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748b">5月</text>
  
  <!-- 月份分隔线 -->
  <line x1="237" y1="80" x2="237" y2="420" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="5,5"/>
  <line x1="337" y1="80" x2="337" y2="420" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="5,5"/>
  <line x1="437" y1="80" x2="437" y2="420" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="5,5"/>
  <line x1="537" y1="80" x2="537" y2="420" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="5,5"/>
  
  <!-- Phase 1: MVP（已完成） -->
  <text x="30" y="125" font-family="Microsoft YaHei" font-size="12" fill="#334155" font-weight="bold">Phase 1</text>
  <text x="30" y="142" font-family="Microsoft YaHei" font-size="10" fill="#64748b">MVP</text>
  <rect x="150" y="110" width="87" height="40" rx="6" fill="url(#ph1)" filter="url(#shadow6)"/>
  <text x="193" y="135" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="white">已完成 ✓</text>
  
  <!-- Phase 2: 快速识别 -->
  <text x="30" y="185" font-family="Microsoft YaHei" font-size="12" fill="#334155" font-weight="bold">Phase 2</text>
  <text x="30" y="202" font-family="Microsoft YaHei" font-size="10" fill="#64748b">快速识别</text>
  <rect x="237" y="170" width="50" height="40" rx="6" fill="url(#ph2)" filter="url(#shadow6)"/>
  <text x="262" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="9" fill="white">OCR</text>
  
  <!-- Phase 3: 智能感知 -->
  <text x="30" y="245" font-family="Microsoft YaHei" font-size="12" fill="#334155" font-weight="bold">Phase 3</text>
  <text x="30" y="262" font-family="Microsoft YaHei" font-size="10" fill="#64748b">智能感知</text>
  <rect x="287" y="230" width="50" height="40" rx="6" fill="url(#ph3)" filter="url(#shadow6)"/>
  <text x="312" y="255" text-anchor="middle" font-family="Microsoft YaHei" font-size="9" fill="white">监听</text>
  
  <!-- Phase 4: 记忆系统 -->
  <text x="30" y="305" font-family="Microsoft YaHei" font-size="12" fill="#334155" font-weight="bold">Phase 4</text>
  <text x="30" y="322" font-family="Microsoft YaHei" font-size="10" fill="#64748b">记忆系统</text>
  <rect x="337" y="290" width="66" height="40" rx="6" fill="url(#ph4)" filter="url(#shadow6)"/>
  <text x="370" y="315" text-anchor="middle" font-family="Microsoft YaHei" font-size="9" fill="white">Reflection</text>
  
  <!-- Phase 5: 体验优化 -->
  <text x="30" y="365" font-family="Microsoft YaHei" font-size="12" fill="#334155" font-weight="bold">Phase 5</text>
  <text x="30" y="382" font-family="Microsoft YaHei" font-size="10" fill="#64748b">体验优化</text>
  <rect x="403" y="350" width="66" height="40" rx="6" fill="url(#ph5)" filter="url(#shadow6)"/>
  <text x="436" y="375" text-anchor="middle" font-family="Microsoft YaHei" font-size="9" fill="white">UI/UX</text>
  
  <!-- Phase 6: 提交准备 -->
  <text x="30" y="425" font-family="Microsoft YaHei" font-size="12" fill="#334155" font-weight="bold">提交</text>
  <text x="30" y="442" font-family="Microsoft YaHei" font-size="10" fill="#64748b">材料准备</text>
  <rect x="469" y="410" width="68" height="40" rx="6" fill="url(#ph6)" filter="url(#shadow6)"/>
  <text x="503" y="435" text-anchor="middle" font-family="Microsoft YaHei" font-size="9" fill="white">文档视频</text>
  
  <!-- 里程碑 -->
  <polygon points="287,95 282,80 292,80" fill="#ef4444"/>
  <text x="287" y="108" text-anchor="middle" font-family="Arial" font-size="9" fill="#ef4444" font-weight="bold">M1</text>
  
  <polygon points="337,95 332,80 342,80" fill="#ef4444"/>
  <text x="337" y="108" text-anchor="middle" font-family="Arial" font-size="9" fill="#ef4444" font-weight="bold">M2</text>
  
  <polygon points="403,95 398,80 408,80" fill="#ef4444"/>
  <text x="403" y="108" text-anchor="middle" font-family="Arial" font-size="9" fill="#ef4444" font-weight="bold">M3</text>
  
  <polygon points="469,95 464,80 474,80" fill="#ef4444"/>
  <text x="469" y="108" text-anchor="middle" font-family="Arial" font-size="9" fill="#ef4444" font-weight="bold">M4</text>
  
  <polygon points="537,95 532,80 542,80" fill="#ef4444"/>
  <text x="537" y="108" text-anchor="middle" font-family="Arial" font-size="9" fill="#ef4444" font-weight="bold">M5</text>
  
  <!-- 图例 -->
  <rect x="600" y="120" width="180" height="180" rx="8" fill="white" stroke="#e2e8f0" filter="url(#shadow6)"/>
  <text x="690" y="145" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#334155">里程碑说明</text>
  <text x="620" y="170" font-family="Arial" font-size="10" fill="#ef4444" font-weight="bold">M1</text><text x="640" y="170" font-family="Microsoft YaHei" font-size="10" fill="#64748b">2/14 快速识别</text>
  <text x="620" y="195" font-family="Arial" font-size="10" fill="#ef4444" font-weight="bold">M2</text><text x="640" y="195" font-family="Microsoft YaHei" font-size="10" fill="#64748b">2/28 智能感知</text>
  <text x="620" y="220" font-family="Arial" font-size="10" fill="#ef4444" font-weight="bold">M3</text><text x="640" y="220" font-family="Microsoft YaHei" font-size="10" fill="#64748b">3/21 记忆系统</text>
  <text x="620" y="245" font-family="Arial" font-size="10" fill="#ef4444" font-weight="bold">M4</text><text x="640" y="245" font-family="Microsoft YaHei" font-size="10" fill="#64748b">4/11 版本冻结</text>
  <text x="620" y="270" font-family="Arial" font-size="10" fill="#ef4444" font-weight="bold">M5</text><text x="640" y="270" font-family="Microsoft YaHei" font-size="10" fill="#64748b">4/30 材料提交</text>
</svg>`;

// 图7: 商业模式画布
const diagram7_business = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="550" viewBox="0 0 800 550">
  <defs>
    <filter id="shadow7"><feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.1"/></filter>
  </defs>
  <rect width="800" height="550" fill="#f8fafc"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="#1e293b">Freemium 商业模式</text>
  
  <!-- 免费版 -->
  <rect x="50" y="60" width="340" height="220" rx="12" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" filter="url(#shadow7)"/>
  <rect x="50" y="60" width="340" height="45" rx="12" fill="#3b82f6"/>
  <text x="220" y="90" text-anchor="middle" font-family="Microsoft YaHei" font-size="18" fill="white" font-weight="bold">免费版</text>
  <text x="70" y="130" font-family="Microsoft YaHei" font-size="13" fill="#1e40af">✓ 端侧语义搜索（完整AI能力）</text>
  <text x="70" y="155" font-family="Microsoft YaHei" font-size="13" fill="#1e40af">✓ 智能分类与场景识别</text>
  <text x="70" y="180" font-family="Microsoft YaHei" font-size="13" fill="#1e40af">✓ 快速OCR与二维码识别</text>
  <text x="70" y="205" font-family="Microsoft YaHei" font-size="13" fill="#1e40af">✓ 隐私保险箱基础功能</text>
  <text x="70" y="230" font-family="Microsoft YaHei" font-size="13" fill="#1e40af">✓ 结构化信息提取</text>
  <text x="220" y="265" text-anchor="middle" font-family="Microsoft YaHei" font-size="20" fill="#1e40af" font-weight="bold">¥0</text>
  
  <!-- 专业版 -->
  <rect x="410" y="60" width="340" height="220" rx="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" filter="url(#shadow7)"/>
  <rect x="410" y="60" width="340" height="45" rx="12" fill="#f59e0b"/>
  <text x="580" y="90" text-anchor="middle" font-family="Microsoft YaHei" font-size="18" fill="white" font-weight="bold">专业版</text>
  <text x="430" y="130" font-family="Microsoft YaHei" font-size="13" fill="#92400e">✓ 包含免费版全部功能</text>
  <text x="430" y="155" font-family="Microsoft YaHei" font-size="13" fill="#92400e">✓ 云端增强模式（235B模型）</text>
  <text x="430" y="180" font-family="Microsoft YaHei" font-size="13" fill="#92400e">✓ 批量导入与高级处理</text>
  <text x="430" y="205" font-family="Microsoft YaHei" font-size="13" fill="#92400e">✓ 多端加密同步</text>
  <text x="430" y="230" font-family="Microsoft YaHei" font-size="13" fill="#92400e">✓ 优先技术支持</text>
  <text x="580" y="265" text-anchor="middle" font-family="Microsoft YaHei" font-size="20" fill="#92400e" font-weight="bold">¥68/年</text>
  
  <!-- 核心逻辑 -->
  <rect x="50" y="300" width="700" height="230" rx="12" fill="white" stroke="#e2e8f0" stroke-width="1" filter="url(#shadow7)"/>
  <text x="400" y="330" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" font-weight="bold" fill="#334155">商业模式核心逻辑</text>
  <line x1="100" y1="345" x2="700" y2="345" stroke="#e2e8f0"/>
  
  <rect x="70" y="365" width="200" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e"/>
  <text x="170" y="395" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#166534">价值主张</text>
  <text x="170" y="420" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#15803d">为「更强能力」付费</text>
  
  <text x="295" y="400" font-family="Arial" font-size="20" fill="#94a3b8">→</text>
  
  <rect x="320" y="365" width="160" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="400" y="395" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#1e40af">成本结构</text>
  <text x="400" y="420" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#2563eb">云端API调用费用</text>
  
  <text x="505" y="400" font-family="Arial" font-size="20" fill="#94a3b8">→</text>
  
  <rect x="530" y="365" width="200" height="70" rx="8" fill="#fefce8" stroke="#eab308"/>
  <text x="630" y="395" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#854d0e">收入来源</text>
  <text x="630" y="420" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#a16207">订阅收入覆盖成本</text>
  
  <text x="400" y="480" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="#64748b">「付费的本质是为更强的理解能力买单，而非为被锁定的基础功能买单」</text>
  <text x="400" y="510" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#94a3b8">避免将核心功能置于付费墙之后 → 建立用户信任 → 促进口碑传播</text>
</svg>`;

// 图8: 用户旅程图
const diagram8_journey = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <filter id="shadow8"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/></filter>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8"/>
    </marker>
  </defs>
  <rect width="800" height="450" fill="#f8fafc"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="#1e293b">用户使用旅程图</text>
  
  <!-- 时间线 -->
  <line x1="80" y1="100" x2="720" y2="100" stroke="#cbd5e1" stroke-width="3" marker-end="url(#arrow)"/>
  
  <!-- 阶段节点 -->
  <circle cx="120" cy="100" r="25" fill="#3b82f6" filter="url(#shadow8)"/>
  <text x="120" y="105" text-anchor="middle" font-family="Arial" font-size="14" fill="white" font-weight="bold">1</text>
  <text x="120" y="145" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#334155">截图</text>
  
  <circle cx="260" cy="100" r="25" fill="#8b5cf6" filter="url(#shadow8)"/>
  <text x="260" y="105" text-anchor="middle" font-family="Arial" font-size="14" fill="white" font-weight="bold">2</text>
  <text x="260" y="145" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#334155">监听识别</text>
  
  <circle cx="400" cy="100" r="25" fill="#ec4899" filter="url(#shadow8)"/>
  <text x="400" y="105" text-anchor="middle" font-family="Arial" font-size="14" fill="white" font-weight="bold">3</text>
  <text x="400" y="145" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#334155">智能建议</text>
  
  <circle cx="540" cy="100" r="25" fill="#f59e0b" filter="url(#shadow8)"/>
  <text x="540" y="105" text-anchor="middle" font-family="Arial" font-size="14" fill="white" font-weight="bold">4</text>
  <text x="540" y="145" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#334155">语义搜索</text>
  
  <circle cx="680" cy="100" r="25" fill="#22c55e" filter="url(#shadow8)"/>
  <text x="680" y="105" text-anchor="middle" font-family="Arial" font-size="14" fill="white" font-weight="bold">5</text>
  <text x="680" y="145" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" font-weight="bold" fill="#334155">精准定位</text>
  
  <!-- 详情卡片 -->
  <rect x="60" y="170" width="120" height="120" rx="8" fill="white" stroke="#3b82f6" stroke-width="2" filter="url(#shadow8)"/>
  <text x="120" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">用户截图保存</text>
  <text x="120" y="215" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">商品/票据/聊天</text>
  <text x="120" y="245" text-anchor="middle" font-family="Arial" font-size="10" fill="#3b82f6">触发</text>
  <text x="120" y="265" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#3b82f6">Screenshot API</text>
  
  <rect x="200" y="170" width="120" height="120" rx="8" fill="white" stroke="#8b5cf6" stroke-width="2" filter="url(#shadow8)"/>
  <text x="260" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">500ms内完成</text>
  <text x="260" y="215" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">OCR+场景分类</text>
  <text x="260" y="245" text-anchor="middle" font-family="Arial" font-size="10" fill="#8b5cf6">Layer 1-2</text>
  <text x="260" y="265" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#8b5cf6">快速预处理</text>
  
  <rect x="340" y="170" width="120" height="120" rx="8" fill="white" stroke="#ec4899" stroke-width="2" filter="url(#shadow8)"/>
  <text x="400" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">悬浮窗提示</text>
  <text x="400" y="215" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">「去淘宝搜索」</text>
  <text x="400" y="245" text-anchor="middle" font-family="Arial" font-size="10" fill="#ec4899">Deep Link</text>
  <text x="400" y="265" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#ec4899">跨应用跳转</text>
  
  <rect x="480" y="170" width="120" height="120" rx="8" fill="white" stroke="#f59e0b" stroke-width="2" filter="url(#shadow8)"/>
  <text x="540" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">自然语言输入</text>
  <text x="540" y="215" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">「上周咖啡发票」</text>
  <text x="540" y="245" text-anchor="middle" font-family="Arial" font-size="10" fill="#f59e0b">VLM + 向量</text>
  <text x="540" y="265" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#f59e0b">语义匹配</text>
  
  <rect x="620" y="170" width="120" height="120" rx="8" fill="white" stroke="#22c55e" stroke-width="2" filter="url(#shadow8)"/>
  <text x="680" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">精准定位图片</text>
  <text x="680" y="215" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#64748b">一键找到目标</text>
  <text x="680" y="245" text-anchor="middle" font-family="Arial" font-size="10" fill="#22c55e">用一句话</text>
  <text x="680" y="265" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#22c55e">找到任何截图</text>
  
  <!-- 用户情感曲线 -->
  <text x="60" y="330" font-family="Microsoft YaHei" font-size="12" fill="#64748b">用户情感</text>
  <line x1="120" y1="350" x2="680" y2="350" stroke="#e2e8f0" stroke-width="1"/>
  <path d="M120,370 Q190,390 260,355 Q330,320 400,340 Q470,360 540,330 Q610,300 680,310" fill="none" stroke="#22c55e" stroke-width="3"/>
  <circle cx="120" cy="370" r="5" fill="#ef4444"/><text x="120" y="400" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#64748b">困扰</text>
  <circle cx="260" cy="355" r="5" fill="#f59e0b"/>
  <circle cx="400" cy="340" r="5" fill="#3b82f6"/>
  <circle cx="540" cy="330" r="5" fill="#8b5cf6"/>
  <circle cx="680" cy="310" r="5" fill="#22c55e"/><text x="680" y="400" text-anchor="middle" font-family="Microsoft YaHei" font-size="10" fill="#64748b">满意</text>
  
  <text x="400" y="430" text-anchor="middle" font-family="Microsoft YaHei" font-size="13" fill="#64748b">核心价值主张：「用一句话，找到任何截图」</text>
</svg>`;

// 图9: 性能指标仪表盘
const diagram9_metrics = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <filter id="shadow9"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/></filter>
  </defs>
  <rect width="800" height="500" fill="#1e293b"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="white">核心性能指标仪表盘</text>
  
  <!-- 仪表盘1: 首Token延迟 -->
  <g transform="translate(130, 180)">
    <circle cx="0" cy="0" r="80" fill="#334155" stroke="#475569" stroke-width="3"/>
    <path d="M-70,-35 A80,80 0 0,1 70,-35" fill="none" stroke="#22c55e" stroke-width="12" stroke-linecap="round"/>
    <text x="0" y="-10" text-anchor="middle" font-family="Arial" font-size="28" fill="white" font-weight="bold">3.2s</text>
    <text x="0" y="15" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#94a3b8">首Token延迟</text>
    <text x="0" y="35" text-anchor="middle" font-family="Arial" font-size="10" fill="#22c55e">端侧 Qwen3-VL-2B</text>
  </g>
  
  <!-- 仪表盘2: 解码速度 -->
  <g transform="translate(310, 180)">
    <circle cx="0" cy="0" r="80" fill="#334155" stroke="#475569" stroke-width="3"/>
    <path d="M-70,-35 A80,80 0 0,1 70,-35" fill="none" stroke="#3b82f6" stroke-width="12" stroke-linecap="round"/>
    <text x="0" y="-10" text-anchor="middle" font-family="Arial" font-size="28" fill="white" font-weight="bold">14.0</text>
    <text x="0" y="15" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#94a3b8">tokens/s</text>
    <text x="0" y="35" text-anchor="middle" font-family="Arial" font-size="10" fill="#3b82f6">解码速度</text>
  </g>
  
  <!-- 仪表盘3: 快速预处理 -->
  <g transform="translate(490, 180)">
    <circle cx="0" cy="0" r="80" fill="#334155" stroke="#475569" stroke-width="3"/>
    <path d="M-70,-35 A80,80 0 0,1 70,-35" fill="none" stroke="#f59e0b" stroke-width="12" stroke-linecap="round"/>
    <text x="0" y="-10" text-anchor="middle" font-family="Arial" font-size="28" fill="white" font-weight="bold">&lt;500</text>
    <text x="0" y="15" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#94a3b8">ms</text>
    <text x="0" y="35" text-anchor="middle" font-family="Arial" font-size="10" fill="#f59e0b">快速预处理</text>
  </g>
  
  <!-- 仪表盘4: 能力倍数 -->
  <g transform="translate(670, 180)">
    <circle cx="0" cy="0" r="80" fill="#334155" stroke="#475569" stroke-width="3"/>
    <path d="M-70,-35 A80,80 0 0,1 70,-35" fill="none" stroke="#8b5cf6" stroke-width="12" stroke-linecap="round"/>
    <text x="0" y="-10" text-anchor="middle" font-family="Arial" font-size="28" fill="white" font-weight="bold">117×</text>
    <text x="0" y="15" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#94a3b8">能力跃升</text>
    <text x="0" y="35" text-anchor="middle" font-family="Arial" font-size="10" fill="#8b5cf6">云端增强</text>
  </g>
  
  <!-- 底部数据卡片 -->
  <rect x="50" y="300" width="160" height="100" rx="10" fill="#334155" filter="url(#shadow9)"/>
  <text x="130" y="335" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#94a3b8">模型大小</text>
  <text x="130" y="365" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">1.37GB</text>
  <text x="130" y="385" text-anchor="middle" font-family="Arial" font-size="10" fill="#22c55e">INT4量化</text>
  
  <rect x="230" y="300" width="160" height="100" rx="10" fill="#334155" filter="url(#shadow9)"/>
  <text x="310" y="335" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#94a3b8">内存要求</text>
  <text x="310" y="365" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">≥4GB</text>
  <text x="310" y="385" text-anchor="middle" font-family="Arial" font-size="10" fill="#3b82f6">RAM</text>
  
  <rect x="410" y="300" width="160" height="100" rx="10" fill="#334155" filter="url(#shadow9)"/>
  <text x="490" y="335" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#94a3b8">向量维度</text>
  <text x="490" y="365" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">384</text>
  <text x="490" y="385" text-anchor="middle" font-family="Arial" font-size="10" fill="#f59e0b">MiniLM-L6-v2</text>
  
  <rect x="590" y="300" width="160" height="100" rx="10" fill="#334155" filter="url(#shadow9)"/>
  <text x="670" y="335" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#94a3b8">OCR延迟</text>
  <text x="670" y="365" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">&lt;200ms</text>
  <text x="670" y="385" text-anchor="middle" font-family="Arial" font-size="10" fill="#8b5cf6">ML Kit</text>
  
  <!-- 底部状态 -->
  <rect x="50" y="420" width="700" height="60" rx="10" fill="#334155"/>
  <text x="85" y="455" font-family="Microsoft YaHei" font-size="12" fill="#94a3b8">技术状态：</text>
  <circle cx="180" cy="450" r="8" fill="#22c55e"/><text x="195" y="455" font-family="Microsoft YaHei" font-size="11" fill="white">VLM推理 已完成</text>
  <circle cx="330" cy="450" r="8" fill="#22c55e"/><text x="345" y="455" font-family="Microsoft YaHei" font-size="11" fill="white">语义搜索 已完成</text>
  <circle cx="480" cy="450" r="8" fill="#f59e0b"/><text x="495" y="455" font-family="Microsoft YaHei" font-size="11" fill="white">快速OCR 规划中</text>
  <circle cx="630" cy="450" r="8" fill="#f59e0b"/><text x="645" y="455" font-family="Microsoft YaHei" font-size="11" fill="white">Reflection 规划中</text>
</svg>`;

// 图10: 隐私保护架构
const diagram10_privacy = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <filter id="shadow10"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/></filter>
    <linearGradient id="shield" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e"/><stop offset="100%" style="stop-color:#16a34a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="#f0fdf4"/>
  <text x="400" y="35" text-anchor="middle" font-family="Microsoft YaHei" font-size="22" font-weight="bold" fill="#166534">隐私保护双闭环架构</text>
  
  <!-- 中心盾牌 -->
  <path d="M400,80 L460,100 L460,180 Q460,240 400,270 Q340,240 340,180 L340,100 Z" fill="url(#shield)" filter="url(#shadow10)"/>
  <text x="400" y="160" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">隐私</text>
  <text x="400" y="185" text-anchor="middle" font-family="Microsoft YaHei" font-size="16" fill="white" font-weight="bold">优先</text>
  
  <!-- 左侧：端侧推理闭环 -->
  <rect x="50" y="100" width="230" height="300" rx="15" fill="white" stroke="#22c55e" stroke-width="2" filter="url(#shadow10)"/>
  <rect x="50" y="100" width="230" height="45" rx="15" fill="#22c55e"/>
  <text x="165" y="130" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">闭环一：数据不出端</text>
  
  <rect x="70" y="165" width="190" height="50" rx="8" fill="#dcfce7"/>
  <text x="165" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#166534">端侧VLM推理 (Qwen3-VL-2B)</text>
  
  <text x="165" y="240" text-anchor="middle" font-family="Arial" font-size="20" fill="#22c55e">↓</text>
  
  <rect x="70" y="255" width="190" height="50" rx="8" fill="#dcfce7"/>
  <text x="165" y="285" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#166534">本地向量数据库存储</text>
  
  <text x="165" y="330" text-anchor="middle" font-family="Arial" font-size="20" fill="#22c55e">↓</text>
  
  <rect x="70" y="345" width="190" height="40" rx="8" fill="#bbf7d0"/>
  <text x="165" y="370" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#166534">网络完全隔离</text>
  
  <!-- 右侧：隐私保险箱闭环 -->
  <rect x="520" y="100" width="230" height="300" rx="15" fill="white" stroke="#3b82f6" stroke-width="2" filter="url(#shadow10)"/>
  <rect x="520" y="100" width="230" height="45" rx="15" fill="#3b82f6"/>
  <text x="635" y="130" text-anchor="middle" font-family="Microsoft YaHei" font-size="14" fill="white" font-weight="bold">闭环二：数据不被看见</text>
  
  <rect x="540" y="165" width="190" height="50" rx="8" fill="#dbeafe"/>
  <text x="635" y="195" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#1e40af">敏感内容自动检测</text>
  
  <text x="635" y="240" text-anchor="middle" font-family="Arial" font-size="20" fill="#3b82f6">↓</text>
  
  <rect x="540" y="255" width="190" height="50" rx="8" fill="#dbeafe"/>
  <text x="635" y="285" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#1e40af">EncryptedFile API 加密</text>
  
  <text x="635" y="330" text-anchor="middle" font-family="Arial" font-size="20" fill="#3b82f6">↓</text>
  
  <rect x="540" y="345" width="190" height="40" rx="8" fill="#bfdbfe"/>
  <text x="635" y="370" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#1e40af">生物识别解锁</text>
  
  <!-- 底部合规说明 -->
  <rect x="100" y="430" width="600" height="50" rx="10" fill="white" stroke="#e2e8f0" filter="url(#shadow10)"/>
  <text x="400" y="455" text-anchor="middle" font-family="Microsoft YaHei" font-size="12" fill="#64748b">符合《个人信息保护法》数据最小化原则 · 用户对数据流向拥有完全控制权</text>
  <text x="400" y="472" text-anchor="middle" font-family="Microsoft YaHei" font-size="11" fill="#94a3b8">借鉴 Apple Photos 差分隐私实践</text>
</svg>`;

// 写入SVG文件
const diagrams = [
    { name: 'diagram01_layered_arch.svg', content: diagram1_layered },
    { name: 'diagram02_swot.svg', content: diagram2_swot },
    { name: 'diagram03_radar_trl.svg', content: diagram3_radar },
    { name: 'diagram04_competition.svg', content: diagram4_competition },
    { name: 'diagram05_memory.svg', content: diagram5_memory },
    { name: 'diagram06_timeline.svg', content: diagram6_timeline },
    { name: 'diagram07_business.svg', content: diagram7_business },
    { name: 'diagram08_journey.svg', content: diagram8_journey },
    { name: 'diagram09_metrics.svg', content: diagram9_metrics },
    { name: 'diagram10_privacy.svg', content: diagram10_privacy }
];

diagrams.forEach(d => {
    fs.writeFileSync(path.join(outputDir, d.name), d.content);
    console.log(`Generated: ${d.name}`);
});

console.log(`\n共生成 ${diagrams.length} 张图表，保存在 ${outputDir}`);
console.log('请使用浏览器打开SVG文件并导出为PNG格式');
