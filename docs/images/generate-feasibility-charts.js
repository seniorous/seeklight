/**
 * 功能实现可行性分析配图生成
 * 用于辅助理解功能与技术之间的对应关系
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'v4.0-feasibility-charts');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 专业配色方案（蓝灰色系，与Word协调）
const colors = {
    primary: '#2563EB',      // 主蓝色
    secondary: '#3B82F6',    // 次蓝色
    accent: '#10B981',       // 强调绿色
    warning: '#F59E0B',      // 警示橙色
    dark: '#1E293B',         // 深色文字
    medium: '#475569',       // 中等文字
    light: '#94A3B8',        // 浅色文字
    bg1: '#F1F5F9',          // 背景1
    bg2: '#E2E8F0',          // 背景2
    white: '#FFFFFF',
    success: '#22C55E',      // 成功绿
    high: '#059669',         // 高可行性
    medium_risk: '#D97706',  // 中等
    border: '#CBD5E1'
};

// ===== 图1: 功能-技术映射关系图 =====
const chart1_mapping = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
  <defs>
    <linearGradient id="funcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#34D399;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="900" height="600" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">功能需求与技术实现映射关系</text>
  <text x="450" y="65" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.medium}">Function-Technology Mapping for Feasibility Analysis</text>
  
  <!-- 左侧：功能层 -->
  <text x="150" y="100" text-anchor="middle" font-family="SimHei, Arial" font-size="16" font-weight="bold" fill="${colors.primary}">功能层（用户可感知）</text>
  
  <!-- 功能框 -->
  <rect x="30" y="120" width="240" height="50" rx="8" fill="url(#funcGrad)" filter="url(#shadow1)"/>
  <text x="150" y="150" text-anchor="middle" font-family="SimHei, Arial" font-size="14" font-weight="bold" fill="${colors.white}">多模态语义搜索</text>
  
  <rect x="30" y="185" width="240" height="50" rx="8" fill="url(#funcGrad)" filter="url(#shadow1)"/>
  <text x="150" y="215" text-anchor="middle" font-family="SimHei, Arial" font-size="14" font-weight="bold" fill="${colors.white}">快速内容识别</text>
  
  <rect x="30" y="250" width="240" height="50" rx="8" fill="url(#funcGrad)" filter="url(#shadow1)"/>
  <text x="150" y="280" text-anchor="middle" font-family="SimHei, Arial" font-size="14" font-weight="bold" fill="${colors.white}">结构化信息提取</text>
  
  <rect x="30" y="315" width="240" height="50" rx="8" fill="url(#funcGrad)" filter="url(#shadow1)"/>
  <text x="150" y="345" text-anchor="middle" font-family="SimHei, Arial" font-size="14" font-weight="bold" fill="${colors.white}">跨应用智能跳转</text>
  
  <rect x="30" y="380" width="240" height="50" rx="8" fill="url(#funcGrad)" filter="url(#shadow1)"/>
  <text x="150" y="410" text-anchor="middle" font-family="SimHei, Arial" font-size="14" font-weight="bold" fill="${colors.white}">隐私保险箱</text>
  
  <!-- 右侧：技术层 -->
  <text x="750" y="100" text-anchor="middle" font-family="SimHei, Arial" font-size="16" font-weight="bold" fill="${colors.accent}">技术层（底层支撑）</text>
  
  <!-- 技术框 -->
  <rect x="630" y="115" width="240" height="40" rx="6" fill="url(#techGrad)" filter="url(#shadow1)"/>
  <text x="750" y="140" text-anchor="middle" font-family="SimSun, Arial" font-size="12" font-weight="bold" fill="${colors.white}">Qwen3-VL-2B 视觉理解</text>
  
  <rect x="630" y="165" width="240" height="40" rx="6" fill="url(#techGrad)" filter="url(#shadow1)"/>
  <text x="750" y="190" text-anchor="middle" font-family="SimSun, Arial" font-size="12" font-weight="bold" fill="${colors.white}">MiniLM-L6-v2 语义向量化</text>
  
  <rect x="630" y="215" width="240" height="40" rx="6" fill="url(#techGrad)" filter="url(#shadow1)"/>
  <text x="750" y="240" text-anchor="middle" font-family="SimSun, Arial" font-size="12" font-weight="bold" fill="${colors.white}">HNSW/ObjectBox 向量检索</text>
  
  <rect x="630" y="265" width="240" height="40" rx="6" fill="url(#techGrad)" filter="url(#shadow1)"/>
  <text x="750" y="290" text-anchor="middle" font-family="SimSun, Arial" font-size="12" font-weight="bold" fill="${colors.white}">ZXing 二维码识别</text>
  
  <rect x="630" y="315" width="240" height="40" rx="6" fill="url(#techGrad)" filter="url(#shadow1)"/>
  <text x="750" y="340" text-anchor="middle" font-family="SimSun, Arial" font-size="12" font-weight="bold" fill="${colors.white}">Google ML Kit OCR</text>
  
  <rect x="630" y="365" width="240" height="40" rx="6" fill="url(#techGrad)" filter="url(#shadow1)"/>
  <text x="750" y="390" text-anchor="middle" font-family="SimSun, Arial" font-size="12" font-weight="bold" fill="${colors.white}">Android Deep Link</text>
  
  <rect x="630" y="415" width="240" height="40" rx="6" fill="url(#techGrad)" filter="url(#shadow1)"/>
  <text x="750" y="440" text-anchor="middle" font-family="SimSun, Arial" font-size="12" font-weight="bold" fill="${colors.white}">EncryptedFile + BiometricPrompt</text>
  
  <!-- 连接线 -->
  <!-- 多模态语义搜索 → VLM, MiniLM, HNSW -->
  <path d="M270,145 Q450,135 630,135" stroke="${colors.primary}" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>
  <path d="M270,145 Q450,175 630,185" stroke="${colors.primary}" stroke-width="2" fill="none"/>
  <path d="M270,145 Q450,215 630,235" stroke="${colors.primary}" stroke-width="2" fill="none"/>
  
  <!-- 快速内容识别 → ZXing, ML Kit -->
  <path d="M270,210 Q450,250 630,285" stroke="${colors.secondary}" stroke-width="2" fill="none"/>
  <path d="M270,210 Q450,285 630,335" stroke="${colors.secondary}" stroke-width="2" fill="none"/>
  
  <!-- 结构化信息提取 → ML Kit (复用) -->
  <path d="M270,275 Q450,305 630,335" stroke="${colors.light}" stroke-width="1.5" fill="none" stroke-dasharray="5,3"/>
  
  <!-- 跨应用智能跳转 → Deep Link -->
  <path d="M270,340 Q450,365 630,385" stroke="${colors.accent}" stroke-width="2" fill="none"/>
  
  <!-- 隐私保险箱 → Encrypted + Biometric -->
  <path d="M270,405 Q450,425 630,435" stroke="${colors.warning}" stroke-width="2" fill="none"/>
  
  <!-- 箭头定义 -->
  <defs>
    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="${colors.primary}"/>
    </marker>
  </defs>
  
  <!-- 图例 -->
  <rect x="300" y="480" width="300" height="100" rx="8" fill="${colors.bg1}" stroke="${colors.border}"/>
  <text x="450" y="505" text-anchor="middle" font-family="SimHei, Arial" font-size="13" font-weight="bold" fill="${colors.dark}">映射关系说明</text>
  <line x1="320" y1="525" x2="360" y2="525" stroke="${colors.primary}" stroke-width="2"/>
  <text x="370" y="530" font-family="SimSun, Arial" font-size="11" fill="${colors.medium}">主要依赖（必需）</text>
  <line x1="320" y1="550" x2="360" y2="550" stroke="${colors.light}" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="370" y="555" font-family="SimSun, Arial" font-size="11" fill="${colors.medium}">复用关系（共享组件）</text>
</svg>`;

// ===== 图2: 快速内容识别时序图（500ms约束）=====
const chart2_timing = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500">
  <defs>
    <linearGradient id="timeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.bg1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.bg2};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="900" height="500" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="35" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">快速内容识别时序分析</text>
  <text x="450" y="58" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.medium}">500ms 约束下的组件时间分配</text>
  
  <!-- 时间轴背景 -->
  <rect x="80" y="90" width="740" height="280" rx="8" fill="url(#timeGrad)"/>
  
  <!-- 时间刻度（0-500ms） -->
  <line x1="100" y1="350" x2="800" y2="350" stroke="${colors.dark}" stroke-width="2"/>
  <text x="100" y="375" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.dark}">0ms</text>
  <text x="240" y="375" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.dark}">100ms</text>
  <text x="380" y="375" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.dark}">200ms</text>
  <text x="520" y="375" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.dark}">300ms</text>
  <text x="660" y="375" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.dark}">400ms</text>
  <text x="800" y="375" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.dark}">500ms</text>
  
  <!-- 刻度线 -->
  <line x1="100" y1="345" x2="100" y2="355" stroke="${colors.dark}" stroke-width="2"/>
  <line x1="240" y1="345" x2="240" y2="355" stroke="${colors.dark}" stroke-width="2"/>
  <line x1="380" y1="345" x2="380" y2="355" stroke="${colors.dark}" stroke-width="2"/>
  <line x1="520" y1="345" x2="520" y2="355" stroke="${colors.dark}" stroke-width="2"/>
  <line x1="660" y1="345" x2="660" y2="355" stroke="${colors.dark}" stroke-width="2"/>
  <line x1="800" y1="345" x2="800" y2="355" stroke="${colors.dark}" stroke-width="2"/>
  
  <!-- 组件1: ZXing二维码识别 (0-75ms) -->
  <rect x="100" y="110" width="105" height="50" rx="6" fill="${colors.accent}"/>
  <text x="152" y="130" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.white}">ZXing</text>
  <text x="152" y="148" text-anchor="middle" font-family="Arial" font-size="11" fill="${colors.white}">~75ms</text>
  
  <!-- 组件2: 场景分类规则引擎 (75-125ms) -->
  <rect x="205" y="110" width="70" height="50" rx="6" fill="${colors.warning}"/>
  <text x="240" y="130" text-anchor="middle" font-family="SimHei, Arial" font-size="11" font-weight="bold" fill="${colors.white}">规则引擎</text>
  <text x="240" y="148" text-anchor="middle" font-family="Arial" font-size="11" fill="${colors.white}">~50ms</text>
  
  <!-- 组件3: Google ML Kit OCR (并行, 0-200ms) -->
  <rect x="100" y="180" width="280" height="50" rx="6" fill="${colors.primary}"/>
  <text x="240" y="200" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.white}">Google ML Kit Text Recognition</text>
  <text x="240" y="218" text-anchor="middle" font-family="Arial" font-size="11" fill="${colors.white}">~200ms (并行执行)</text>
  
  <!-- 组件4: 结构化提取 (200-325ms) -->
  <rect x="380" y="180" width="175" height="50" rx="6" fill="${colors.secondary}"/>
  <text x="467" y="200" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.white}">正则表达式提取</text>
  <text x="467" y="218" text-anchor="middle" font-family="Arial" font-size="11" fill="${colors.white}">~125ms</text>
  
  <!-- 总耗时标记 -->
  <rect x="100" y="260" width="455" height="40" rx="6" fill="${colors.bg2}" stroke="${colors.success}" stroke-width="3"/>
  <text x="327" y="285" text-anchor="middle" font-family="SimHei, Arial" font-size="14" font-weight="bold" fill="${colors.success}">实际总耗时 ≈ 325ms（满足500ms约束）</text>
  
  <!-- 500ms红线 -->
  <line x1="800" y1="100" x2="800" y2="320" stroke="#EF4444" stroke-width="3" stroke-dasharray="8,4"/>
  <text x="815" y="210" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="#EF4444" transform="rotate(90,815,210)">约束边界</text>
  
  <!-- 性能余量标注 -->
  <rect x="555" y="260" width="245" height="40" rx="6" fill="${colors.bg1}" stroke="${colors.border}"/>
  <text x="677" y="285" text-anchor="middle" font-family="SimHei, Arial" font-size="13" fill="${colors.accent}">性能余量: 175ms (35%)</text>
  
  <!-- 底部说明 -->
  <rect x="100" y="400" width="700" height="80" rx="8" fill="${colors.bg1}"/>
  <text x="450" y="425" text-anchor="middle" font-family="SimHei, Arial" font-size="13" font-weight="bold" fill="${colors.dark}">关键设计要点</text>
  <text x="120" y="450" font-family="SimSun, Arial" font-size="12" fill="${colors.medium}">• ZXing与ML Kit并行执行，取最长耗时(200ms)作为Layer 1总耗时</text>
  <text x="120" y="470" font-family="SimSun, Arial" font-size="12" fill="${colors.medium}">• 35%性能余量确保在低端设备上仍能满足约束，避免极端情况下的用户等待</text>
</svg>`;

// ===== 图3: 技术成熟度阶梯图 =====
const chart3_trl = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="550" viewBox="0 0 900 550">
  <defs>
    <linearGradient id="trl9" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#10B981;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="trl8" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0D9488;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#14B8A6;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="trl7" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0891B2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#22D3EE;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="900" height="550" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">功能依赖技术的成熟度分布</text>
  <text x="450" y="65" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.medium}">Technology Readiness Level (TRL) Distribution by Function</text>
  
  <!-- TRL等级背景区域 -->
  <rect x="60" y="90" width="780" height="380" fill="${colors.bg1}" rx="8"/>
  
  <!-- TRL等级刻度 (Y轴: TRL 1-9) -->
  <text x="45" y="130" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.dark}">TRL 9</text>
  <text x="45" y="170" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.dark}">TRL 8</text>
  <text x="45" y="210" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.dark}">TRL 7</text>
  <text x="45" y="250" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.dark}">TRL 6</text>
  <text x="45" y="290" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.dark}">TRL 5</text>
  <text x="45" y="330" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.dark}">TRL 4</text>
  <text x="45" y="370" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.dark}">TRL 3</text>
  <text x="45" y="410" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.dark}">TRL 2</text>
  <text x="45" y="450" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.dark}">TRL 1</text>
  
  <!-- 水平网格线 -->
  <line x1="60" y1="125" x2="840" y2="125" stroke="${colors.border}" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="60" y1="165" x2="840" y2="165" stroke="${colors.border}" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="60" y1="205" x2="840" y2="205" stroke="${colors.border}" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="60" y1="285" x2="840" y2="285" stroke="${colors.border}" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="60" y1="365" x2="840" y2="365" stroke="${colors.border}" stroke-width="1" stroke-dasharray="3,3"/>
  
  <!-- TRL 7基准线（本项目最低可接受成熟度）-->
  <line x1="60" y1="205" x2="840" y2="205" stroke="${colors.warning}" stroke-width="2"/>
  <text x="845" y="210" font-family="SimSun, Arial" font-size="10" fill="${colors.warning}">基准线</text>
  
  <!-- 功能1: 多模态语义搜索 -->
  <g transform="translate(100, 0)">
    <rect x="0" y="125" width="80" height="335" fill="url(#trl9)" opacity="0.3"/>
    <rect x="10" y="125" width="60" height="80" rx="4" fill="url(#trl9)"/>
    <text x="40" y="160" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.white}">MiniLM</text>
    <text x="40" y="175" text-anchor="middle" font-family="SimSun, Arial" font-size="9" fill="${colors.white}">TRL 9</text>
    
    <rect x="10" y="165" width="60" height="40" rx="4" fill="url(#trl8)"/>
    <text x="40" y="188" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.white}">HNSW</text>
    
    <rect x="10" y="205" width="60" height="80" rx="4" fill="url(#trl7)"/>
    <text x="40" y="240" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.white}">VLM</text>
    <text x="40" y="255" text-anchor="middle" font-family="SimSun, Arial" font-size="9" fill="${colors.white}">TRL 7</text>
    
    <text x="40" y="480" text-anchor="middle" font-family="SimHei, Arial" font-size="11" fill="${colors.dark}">语义搜索</text>
  </g>
  
  <!-- 功能2: 快速内容识别 -->
  <g transform="translate(240, 0)">
    <rect x="0" y="125" width="80" height="335" fill="url(#trl9)" opacity="0.3"/>
    <rect x="10" y="125" width="60" height="80" rx="4" fill="url(#trl9)"/>
    <text x="40" y="155" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.white}">ML Kit</text>
    <text x="40" y="170" text-anchor="middle" font-family="SimSun, Arial" font-size="9" fill="${colors.white}">TRL 9</text>
    
    <rect x="10" y="125" width="60" height="40" rx="4" fill="url(#trl9)"/>
    <text x="40" y="150" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.white}">ZXing</text>
    
    <text x="40" y="480" text-anchor="middle" font-family="SimHei, Arial" font-size="11" fill="${colors.dark}">快速识别</text>
  </g>
  
  <!-- 功能3: 结构化提取 -->
  <g transform="translate(380, 0)">
    <rect x="0" y="125" width="80" height="335" fill="url(#trl9)" opacity="0.3"/>
    <rect x="10" y="125" width="60" height="80" rx="4" fill="url(#trl9)"/>
    <text x="40" y="155" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.white}">正则引擎</text>
    <text x="40" y="170" text-anchor="middle" font-family="SimSun, Arial" font-size="9" fill="${colors.white}">TRL 9</text>
    
    <text x="40" y="480" text-anchor="middle" font-family="SimHei, Arial" font-size="11" fill="${colors.dark}">结构化提取</text>
  </g>
  
  <!-- 功能4: 智能跳转 -->
  <g transform="translate(520, 0)">
    <rect x="0" y="125" width="80" height="335" fill="url(#trl9)" opacity="0.3"/>
    <rect x="10" y="125" width="60" height="80" rx="4" fill="url(#trl9)"/>
    <text x="40" y="155" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.white}">Deep Link</text>
    <text x="40" y="170" text-anchor="middle" font-family="SimSun, Arial" font-size="9" fill="${colors.white}">TRL 9</text>
    
    <text x="40" y="480" text-anchor="middle" font-family="SimHei, Arial" font-size="11" fill="${colors.dark}">智能跳转</text>
  </g>
  
  <!-- 功能5: 隐私保险箱 -->
  <g transform="translate(660, 0)">
    <rect x="0" y="125" width="80" height="335" fill="url(#trl9)" opacity="0.3"/>
    <rect x="10" y="125" width="60" height="40" rx="4" fill="url(#trl9)"/>
    <text x="40" y="150" text-anchor="middle" font-family="SimSun, Arial" font-size="9" fill="${colors.white}">Biometric</text>
    
    <rect x="10" y="165" width="60" height="40" rx="4" fill="url(#trl8)"/>
    <text x="40" y="190" text-anchor="middle" font-family="SimSun, Arial" font-size="9" fill="${colors.white}">EncryptedFile</text>
    
    <text x="40" y="480" text-anchor="middle" font-family="SimHei, Arial" font-size="11" fill="${colors.dark}">隐私保险箱</text>
  </g>
  
  <!-- 图例 -->
  <rect x="100" y="495" width="700" height="45" rx="6" fill="${colors.bg2}"/>
  <rect x="120" y="510" width="20" height="15" fill="url(#trl9)"/>
  <text x="145" y="522" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">TRL 9 (成熟技术)</text>
  <rect x="280" y="510" width="20" height="15" fill="url(#trl8)"/>
  <text x="305" y="522" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">TRL 8 (系统验证)</text>
  <rect x="440" y="510" width="20" height="15" fill="url(#trl7)"/>
  <text x="465" y="522" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">TRL 7 (原型验证)</text>
  <rect x="600" y="510" width="20" height="15" fill="${colors.warning}"/>
  <text x="625" y="522" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">最低可接受成熟度</text>
</svg>`;

// ===== 图4: 功能可行性评估矩阵 =====
const chart4_matrix = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500">
  <!-- 背景 -->
  <rect width="900" height="500" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="35" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">功能可行性综合评估矩阵</text>
  <text x="450" y="58" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.medium}">需求-能力-风险三维度分析</text>
  
  <!-- 表格 -->
  <!-- 表头 -->
  <rect x="50" y="80" width="140" height="50" fill="${colors.primary}"/>
  <text x="120" y="110" text-anchor="middle" font-family="SimHei, Arial" font-size="13" font-weight="bold" fill="${colors.white}">核心功能</text>
  
  <rect x="190" y="80" width="180" height="50" fill="${colors.primary}"/>
  <text x="280" y="110" text-anchor="middle" font-family="SimHei, Arial" font-size="13" font-weight="bold" fill="${colors.white}">关键技术挑战</text>
  
  <rect x="370" y="80" width="200" height="50" fill="${colors.primary}"/>
  <text x="470" y="110" text-anchor="middle" font-family="SimHei, Arial" font-size="13" font-weight="bold" fill="${colors.white}">技术方案</text>
  
  <rect x="570" y="80" width="120" height="50" fill="${colors.primary}"/>
  <text x="630" y="110" text-anchor="middle" font-family="SimHei, Arial" font-size="13" font-weight="bold" fill="${colors.white}">可行性</text>
  
  <rect x="690" y="80" width="160" height="50" fill="${colors.primary}"/>
  <text x="770" y="110" text-anchor="middle" font-family="SimHei, Arial" font-size="13" font-weight="bold" fill="${colors.white}">主要风险</text>
  
  <!-- 行1: 多模态语义搜索 -->
  <rect x="50" y="130" width="140" height="60" fill="${colors.bg1}" stroke="${colors.border}"/>
  <text x="120" y="155" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.dark}">多模态</text>
  <text x="120" y="175" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.dark}">语义搜索</text>
  
  <rect x="190" y="130" width="180" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="280" y="155" text-anchor="middle" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">视觉理解+向量化</text>
  <text x="280" y="175" text-anchor="middle" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">+高效检索协同</text>
  
  <rect x="370" y="130" width="200" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="470" y="150" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.dark}">VLM + MiniLM-L6-v2</text>
  <text x="470" y="170" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.dark}">+ HNSW(ObjectBox)</text>
  
  <rect x="570" y="130" width="120" height="60" fill="#DCFCE7" stroke="${colors.border}"/>
  <text x="630" y="165" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.high}">高度可行</text>
  
  <rect x="690" y="130" width="160" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="770" y="165" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.medium}">VLM推理延迟</text>
  
  <!-- 行2: 快速内容识别 -->
  <rect x="50" y="190" width="140" height="60" fill="${colors.bg1}" stroke="${colors.border}"/>
  <text x="120" y="215" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.dark}">快速</text>
  <text x="120" y="235" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.dark}">内容识别</text>
  
  <rect x="190" y="190" width="180" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="280" y="215" text-anchor="middle" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">500ms时间约束</text>
  <text x="280" y="235" text-anchor="middle" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">多组件并行协调</text>
  
  <rect x="370" y="190" width="200" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="470" y="210" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.dark}">ZXing(75ms)</text>
  <text x="470" y="230" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.dark}">+ ML Kit(200ms)</text>
  
  <rect x="570" y="190" width="120" height="60" fill="#DCFCE7" stroke="${colors.border}"/>
  <text x="630" y="225" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.high}">高度可行</text>
  
  <rect x="690" y="190" width="160" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="770" y="215" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.medium}">ML Kit依赖</text>
  <text x="770" y="235" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.medium}">Google Play服务</text>
  
  <!-- 行3: 跨应用智能跳转 -->
  <rect x="50" y="250" width="140" height="60" fill="${colors.bg1}" stroke="${colors.border}"/>
  <text x="120" y="275" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.dark}">跨应用</text>
  <text x="120" y="295" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.dark}">智能跳转</text>
  
  <rect x="190" y="250" width="180" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="280" y="275" text-anchor="middle" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">协议兼容性</text>
  <text x="280" y="295" text-anchor="middle" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">App生态覆盖</text>
  
  <rect x="370" y="250" width="200" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="470" y="275" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.dark}">Android Deep Link</text>
  <text x="470" y="295" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.dark}">+ 协议映射表</text>
  
  <rect x="570" y="250" width="120" height="60" fill="#BBF7D0" stroke="${colors.border}"/>
  <text x="630" y="285" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.high}">完全可行</text>
  
  <rect x="690" y="250" width="160" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="770" y="285" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.medium}">无重大风险</text>
  
  <!-- 行4: 隐私保险箱 -->
  <rect x="50" y="310" width="140" height="60" fill="${colors.bg1}" stroke="${colors.border}"/>
  <text x="120" y="345" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.dark}">隐私保险箱</text>
  
  <rect x="190" y="310" width="180" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="280" y="335" text-anchor="middle" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">敏感检测+加密</text>
  <text x="280" y="355" text-anchor="middle" font-family="SimSun, Arial" font-size="11" fill="${colors.dark}">+生物识别</text>
  
  <rect x="370" y="310" width="200" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="470" y="335" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.dark}">EncryptedFile API</text>
  <text x="470" y="355" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.dark}">+ BiometricPrompt</text>
  
  <rect x="570" y="310" width="120" height="60" fill="#DCFCE7" stroke="${colors.border}"/>
  <text x="630" y="345" text-anchor="middle" font-family="SimHei, Arial" font-size="12" font-weight="bold" fill="${colors.high}">高度可行</text>
  
  <rect x="690" y="310" width="160" height="60" fill="${colors.white}" stroke="${colors.border}"/>
  <text x="770" y="335" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.medium}">敏感内容检测</text>
  <text x="770" y="355" text-anchor="middle" font-family="SimSun, Arial" font-size="10" fill="${colors.medium}">准确率不确定</text>
  
  <!-- 综合评估 -->
  <rect x="50" y="390" width="800" height="90" rx="8" fill="${colors.bg1}" stroke="${colors.success}" stroke-width="2"/>
  <text x="450" y="420" text-anchor="middle" font-family="SimHei, Arial" font-size="16" font-weight="bold" fill="${colors.success}">综合评估结论</text>
  <text x="450" y="450" text-anchor="middle" font-family="SimSun, Arial" font-size="13" fill="${colors.dark}">所有核心功能的技术可行性均达到"可行"以上等级，不存在需要基础研究突破的技术瓶颈。</text>
  <text x="450" y="470" text-anchor="middle" font-family="SimSun, Arial" font-size="13" fill="${colors.dark}">主要风险点均为可控的工程挑战，已设计相应降级方案予以应对。</text>
</svg>`;

// 写入文件
const charts = [
    { name: 'chart_func_tech_mapping.svg', content: chart1_mapping },
    { name: 'chart_timing_analysis.svg', content: chart2_timing },
    { name: 'chart_trl_distribution.svg', content: chart3_trl },
    { name: 'chart_feasibility_matrix.svg', content: chart4_matrix }
];

charts.forEach(chart => {
    const filePath = path.join(outputDir, chart.name);
    fs.writeFileSync(filePath, chart.content, 'utf8');
    console.log(`Generated: ${chart.name}`);
});

console.log(`\nAll charts saved to: ${outputDir}`);
