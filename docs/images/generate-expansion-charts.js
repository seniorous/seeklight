const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'v3.0-expansion-charts');

// 配色方案 - 专业蓝灰色系
const colors = {
    primary: '#2c5282',
    secondary: '#4a6fa5',
    tertiary: '#6b8cae',
    quaternary: '#8ba7c7',
    accent: '#e07c4a',
    light: '#edf2f7',
    dark: '#1a365d',
    text: '#2d3748',
    textLight: '#4a5568',
    grid: '#cbd5e0',
    white: '#ffffff'
};

// ========== 图1: AI应用市场用户规模柱状图 ==========
const chart1_market = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="550" viewBox="0 0 900 550">
  <defs>
    <linearGradient id="bar1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2c5282"/>
      <stop offset="100%" style="stop-color:#1a365d"/>
    </linearGradient>
    <linearGradient id="bar2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4a6fa5"/>
      <stop offset="100%" style="stop-color:#2c5282"/>
    </linearGradient>
    <linearGradient id="bar3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6b8cae"/>
      <stop offset="100%" style="stop-color:#4a6fa5"/>
    </linearGradient>
    <linearGradient id="bar4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#e07c4a"/>
      <stop offset="100%" style="stop-color:#c45a2a"/>
    </linearGradient>
    <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="900" height="550" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">2025年中国移动端AI应用用户规模</text>
  <text x="450" y="65" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.textLight}">数据来源：QuestMobile《2025年中国AI终端生态发展研究报告》</text>
  
  <!-- Y轴 -->
  <line x1="120" y1="100" x2="120" y2="450" stroke="${colors.grid}" stroke-width="1"/>
  <text x="30" y="280" text-anchor="middle" font-family="SimSun" font-size="14" fill="${colors.text}" transform="rotate(-90, 30, 280)">用户规模（亿）</text>
  
  <!-- Y轴刻度 -->
  <line x1="115" y1="450" x2="850" y2="450" stroke="${colors.grid}" stroke-width="1"/>
  <line x1="115" y1="380" x2="850" y2="380" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
  <line x1="115" y1="310" x2="850" y2="310" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
  <line x1="115" y1="240" x2="850" y2="240" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
  <line x1="115" y1="170" x2="850" y2="170" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
  <line x1="115" y1="100" x2="850" y2="100" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
  
  <text x="105" y="455" text-anchor="end" font-family="Arial" font-size="12" fill="${colors.textLight}">0</text>
  <text x="105" y="385" text-anchor="end" font-family="Arial" font-size="12" fill="${colors.textLight}">2</text>
  <text x="105" y="315" text-anchor="end" font-family="Arial" font-size="12" fill="${colors.textLight}">4</text>
  <text x="105" y="245" text-anchor="end" font-family="Arial" font-size="12" fill="${colors.textLight}">6</text>
  <text x="105" y="175" text-anchor="end" font-family="Arial" font-size="12" fill="${colors.textLight}">8</text>
  
  <!-- 柱状图 - 6.45亿 移动端AI整体 -->
  <rect x="160" y="${450 - 6.45 * 35}" width="120" height="${6.45 * 35}" fill="url(#bar1)" rx="4" filter="url(#shadow1)"/>
  <text x="220" y="${450 - 6.45 * 35 - 10}" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.dark}">6.45亿</text>
  <text x="220" y="475" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.text}">移动端AI</text>
  <text x="220" y="492" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.text}">整体规模</text>
  
  <!-- 柱状图 - 6.22亿 In-App AI -->
  <rect x="320" y="${450 - 6.22 * 35}" width="120" height="${6.22 * 35}" fill="url(#bar2)" rx="4" filter="url(#shadow1)"/>
  <text x="380" y="${450 - 6.22 * 35 - 10}" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.dark}">6.22亿</text>
  <text x="380" y="475" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.text}">应用内嵌AI</text>
  <text x="380" y="492" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.text}">(In-App AI)</text>
  
  <!-- 柱状图 - 5.29亿 手机厂商AI -->
  <rect x="480" y="${450 - 5.29 * 35}" width="120" height="${5.29 * 35}" fill="url(#bar3)" rx="4" filter="url(#shadow1)"/>
  <text x="540" y="${450 - 5.29 * 35 - 10}" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.dark}">5.29亿</text>
  <text x="540" y="475" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.text}">手机厂商</text>
  <text x="540" y="492" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.text}">AI助手</text>
  
  <!-- 柱状图 - 2.77亿 原生APP -->
  <rect x="640" y="${450 - 2.77 * 35}" width="120" height="${2.77 * 35}" fill="url(#bar2)" rx="4" filter="url(#shadow1)"/>
  <text x="700" y="${450 - 2.77 * 35 - 10}" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.dark}">2.77亿</text>
  <text x="700" y="475" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.text}">AI原生APP</text>
  <text x="700" y="492" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.text}">用户规模</text>
  
  <!-- 高亮标注 - AI信息检索 -->
  <rect x="770" y="140" width="110" height="100" fill="${colors.light}" rx="8" stroke="${colors.accent}" stroke-width="2"/>
  <text x="825" y="165" text-anchor="middle" font-family="SimHei" font-size="12" font-weight="bold" fill="${colors.accent}">AI信息检索</text>
  <text x="825" y="190" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold" fill="${colors.accent}">7353万</text>
  <text x="825" y="215" text-anchor="middle" font-family="SimSun" font-size="11" fill="${colors.text}">环比增速</text>
  <text x="825" y="232" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#22c55e">+39%</text>
</svg>`;

// ========== 图2: 数字囤积内容类型饼图 ==========
const chart2_hoarding = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="550" viewBox="0 0 900 550">
  <defs>
    <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.12"/>
    </filter>
  </defs>
  
  <rect width="900" height="550" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">数字囤积内容类型分布</text>
  <text x="450" y="65" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.textLight}">数据来源：新华日报《你电子囤物吗》专题调查 [6]</text>
  
  <!-- 饼图区域 - 使用条形图代替更清晰 -->
  <g transform="translate(80, 100)">
    <!-- 照片 59% -->
    <rect x="0" y="0" width="${590 * 0.7}" height="45" fill="#2c5282" rx="4" filter="url(#shadow2)"/>
    <text x="${590 * 0.7 + 15}" y="30" font-family="Arial" font-size="18" font-weight="bold" fill="#2c5282">59.0%</text>
    <text x="-10" y="30" text-anchor="end" font-family="SimHei" font-size="14" fill="${colors.text}">照片</text>
    
    <!-- 聊天记录 49.3% -->
    <rect x="0" y="60" width="${493 * 0.7}" height="45" fill="#4a6fa5" rx="4" filter="url(#shadow2)"/>
    <text x="${493 * 0.7 + 15}" y="90" font-family="Arial" font-size="18" font-weight="bold" fill="#4a6fa5">49.3%</text>
    <text x="-10" y="90" text-anchor="end" font-family="SimHei" font-size="14" fill="${colors.text}">聊天记录</text>
    
    <!-- 音视频 46.1% -->
    <rect x="0" y="120" width="${461 * 0.7}" height="45" fill="#6b8cae" rx="4" filter="url(#shadow2)"/>
    <text x="${461 * 0.7 + 15}" y="150" font-family="Arial" font-size="18" font-weight="bold" fill="#6b8cae">46.1%</text>
    <text x="-10" y="150" text-anchor="end" font-family="SimHei" font-size="14" fill="${colors.text}">音视频</text>
    
    <!-- 自我提升资源 44% -->
    <rect x="0" y="180" width="${440 * 0.7}" height="45" fill="#8ba7c7" rx="4" filter="url(#shadow2)"/>
    <text x="${440 * 0.7 + 15}" y="210" font-family="Arial" font-size="18" font-weight="bold" fill="#8ba7c7">44.0%</text>
    <text x="-10" y="210" text-anchor="end" font-family="SimHei" font-size="14" fill="${colors.text}">自我提升资源</text>
    
    <!-- 公众号文章 37.1% -->
    <rect x="0" y="240" width="${371 * 0.7}" height="45" fill="#a8c0d8" rx="4" filter="url(#shadow2)"/>
    <text x="${371 * 0.7 + 15}" y="270" font-family="Arial" font-size="18" font-weight="bold" fill="#7a9bbf">37.1%</text>
    <text x="-10" y="270" text-anchor="end" font-family="SimHei" font-size="14" fill="${colors.text}">公众号文章</text>
    
    <!-- 影视剧 36% -->
    <rect x="0" y="300" width="${360 * 0.7}" height="45" fill="#c5d5e5" rx="4" filter="url(#shadow2)"/>
    <text x="${360 * 0.7 + 15}" y="330" font-family="Arial" font-size="18" font-weight="bold" fill="#7a9bbf">36.0%</text>
    <text x="-10" y="330" text-anchor="end" font-family="SimHei" font-size="14" fill="${colors.text}">影视剧</text>
  </g>
  
  <!-- 右侧核心洞察 -->
  <g transform="translate(620, 130)">
    <rect x="0" y="0" width="250" height="280" fill="${colors.light}" rx="12" stroke="${colors.primary}" stroke-width="2"/>
    <text x="125" y="35" text-anchor="middle" font-family="SimHei" font-size="16" font-weight="bold" fill="${colors.dark}">核心洞察</text>
    <line x1="20" y1="50" x2="230" y2="50" stroke="${colors.grid}" stroke-width="1"/>
    
    <text x="125" y="85" text-anchor="middle" font-family="Arial" font-size="36" font-weight="bold" fill="${colors.accent}">82%</text>
    <text x="125" y="110" text-anchor="middle" font-family="SimSun" font-size="13" fill="${colors.text}">受访者有数字囤积习惯</text>
    
    <text x="125" y="155" text-anchor="middle" font-family="Arial" font-size="36" font-weight="bold" fill="${colors.primary}">59%</text>
    <text x="125" y="180" text-anchor="middle" font-family="SimSun" font-size="13" fill="${colors.text}">照片是首要囤积内容</text>
    
    <rect x="20" y="200" width="210" height="60" fill="${colors.white}" rx="6"/>
    <text x="125" y="225" text-anchor="middle" font-family="SimHei" font-size="12" fill="${colors.accent}">→ 截图管理是核心痛点</text>
    <text x="125" y="248" text-anchor="middle" font-family="SimHei" font-size="12" fill="${colors.accent}">→ 拾光精准命中需求</text>
  </g>
</svg>`;

// ========== 图3: 心理动机分析图 ==========
const chart3_psychology = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500">
  <defs>
    <linearGradient id="psychGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2c5282"/>
      <stop offset="100%" style="stop-color:#4a6fa5"/>
    </linearGradient>
  </defs>
  
  <rect width="900" height="500" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">数字囤积行为心理动机分析</text>
  <text x="450" y="65" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.textLight}">数据来源：新华日报专题调查 [6]</text>
  
  <!-- 心理动机图标和数据 -->
  <g transform="translate(100, 100)">
    <!-- 心理安慰 53.3% -->
    <circle cx="50" cy="50" r="40" fill="${colors.light}" stroke="${colors.primary}" stroke-width="2"/>
    <text x="50" y="45" text-anchor="middle" font-family="SimHei" font-size="24">🧠</text>
    <text x="50" y="68" text-anchor="middle" font-family="SimHei" font-size="10" fill="${colors.text}">心理</text>
    <text x="130" y="40" font-family="SimHei" font-size="15" font-weight="bold" fill="${colors.dark}">心理安慰</text>
    <text x="130" y="60" font-family="SimSun" font-size="12" fill="${colors.textLight}">「存上就尽在掌握中」</text>
    <rect x="130" y="70" width="${533 * 0.55}" height="20" fill="url(#psychGrad)" rx="10"/>
    <text x="${130 + 533 * 0.55 + 15}" y="85" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.primary}">53.3%</text>
    
    <!-- 留住时光 52.4% -->
    <circle cx="50" cy="150" r="40" fill="${colors.light}" stroke="${colors.secondary}" stroke-width="2"/>
    <text x="50" y="145" text-anchor="middle" font-family="SimHei" font-size="24">⏳</text>
    <text x="50" y="168" text-anchor="middle" font-family="SimHei" font-size="10" fill="${colors.text}">时光</text>
    <text x="130" y="140" font-family="SimHei" font-size="15" font-weight="bold" fill="${colors.dark}">保留过去</text>
    <text x="130" y="160" font-family="SimSun" font-size="12" fill="${colors.textLight}">希望留住时光与记忆</text>
    <rect x="130" y="170" width="${524 * 0.55}" height="20" fill="${colors.secondary}" rx="10"/>
    <text x="${130 + 524 * 0.55 + 15}" y="185" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.secondary}">52.4%</text>
    
    <!-- 安全感 50% -->
    <circle cx="50" cy="250" r="40" fill="${colors.light}" stroke="${colors.tertiary}" stroke-width="2"/>
    <text x="50" y="245" text-anchor="middle" font-family="SimHei" font-size="24">🛡️</text>
    <text x="50" y="268" text-anchor="middle" font-family="SimHei" font-size="10" fill="${colors.text}">安全</text>
    <text x="130" y="240" font-family="SimHei" font-size="15" font-weight="bold" fill="${colors.dark}">追求安全感</text>
    <text x="130" y="260" font-family="SimSun" font-size="12" fill="${colors.textLight}">担心以后可能用到</text>
    <rect x="130" y="270" width="${500 * 0.55}" height="20" fill="${colors.tertiary}" rx="10"/>
    <text x="${130 + 500 * 0.55 + 15}" y="285" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.tertiary}">50.0%</text>
    
    <!-- 满足感 42.2% -->
    <circle cx="50" cy="350" r="40" fill="${colors.light}" stroke="${colors.quaternary}" stroke-width="2"/>
    <text x="50" y="345" text-anchor="middle" font-family="SimHei" font-size="24">✨</text>
    <text x="50" y="368" text-anchor="middle" font-family="SimHei" font-size="10" fill="${colors.text}">满足</text>
    <text x="130" y="340" font-family="SimHei" font-size="15" font-weight="bold" fill="${colors.dark}">自我满足感</text>
    <text x="130" y="360" font-family="SimSun" font-size="12" fill="${colors.textLight}">获得控制感与成就感</text>
    <rect x="130" y="370" width="${422 * 0.55}" height="20" fill="${colors.quaternary}" rx="10"/>
    <text x="${130 + 422 * 0.55 + 15}" y="385" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.quaternary}">42.2%</text>
  </g>
  
  <!-- 右侧结论 -->
  <g transform="translate(580, 120)">
    <rect x="0" y="0" width="280" height="260" fill="#fef3e7" rx="12" stroke="${colors.accent}" stroke-width="2"/>
    <text x="140" y="35" text-anchor="middle" font-family="SimHei" font-size="16" font-weight="bold" fill="${colors.accent}">💡 产品启示</text>
    <line x1="20" y1="55" x2="260" y2="55" stroke="${colors.accent}" stroke-width="1" stroke-opacity="0.3"/>
    
    <text x="20" y="90" font-family="SimSun" font-size="13" fill="${colors.text}">用户的囤积行为源于</text>
    <text x="20" y="110" font-family="SimHei" font-size="14" font-weight="bold" fill="${colors.dark}">深层心理需求而非懒惰</text>
    
    <line x1="20" y1="130" x2="260" y2="130" stroke="${colors.grid}" stroke-width="1"/>
    
    <text x="20" y="155" font-family="SimSun" font-size="13" fill="${colors.text}">「一键清理」无法解决问题</text>
    <text x="20" y="180" font-family="SimHei" font-size="14" font-weight="bold" fill="${colors.dark}">用户需要的是：</text>
    <text x="30" y="205" font-family="SimSun" font-size="13" fill="${colors.accent}">✓ 保留信息的安全感</text>
    <text x="30" y="228" font-family="SimSun" font-size="13" fill="${colors.accent}">✓ 快速检索的便利性</text>
    
    <text x="140" y="250" text-anchor="middle" font-family="SimHei" font-size="12" fill="${colors.primary}">→ 拾光=保留+检索</text>
  </g>
</svg>`;

// ========== 图4: 竞品功能对比表 ==========
const chart4_comparison = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520">
  <rect width="900" height="520" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">智能相册竞品功能对比矩阵</text>
  
  <!-- 表格 -->
  <g transform="translate(50, 70)">
    <!-- 表头 -->
    <rect x="0" y="0" width="200" height="50" fill="${colors.primary}"/>
    <rect x="200" y="0" width="200" height="50" fill="${colors.primary}"/>
    <rect x="400" y="0" width="200" height="50" fill="${colors.primary}"/>
    <rect x="600" y="0" width="200" height="50" fill="${colors.accent}"/>
    
    <text x="100" y="32" text-anchor="middle" font-family="SimHei" font-size="15" font-weight="bold" fill="white">功能维度</text>
    <text x="300" y="32" text-anchor="middle" font-family="SimHei" font-size="15" font-weight="bold" fill="white">Google Photos</text>
    <text x="500" y="32" text-anchor="middle" font-family="SimHei" font-size="15" font-weight="bold" fill="white">Apple Photos</text>
    <text x="700" y="32" text-anchor="middle" font-family="SimHei" font-size="15" font-weight="bold" fill="white">拾光 (本项目)</text>
    
    <!-- 行1: AI搜索能力 -->
    <rect x="0" y="50" width="200" height="45" fill="${colors.light}"/>
    <rect x="200" y="50" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="400" y="50" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="600" y="50" width="200" height="45" fill="#fef9f3" stroke="${colors.accent}"/>
    
    <text x="100" y="78" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.dark}">AI语义搜索</text>
    <text x="300" y="78" text-anchor="middle" font-family="SimHei" font-size="13" fill="#22c55e">★★★★★ 强大</text>
    <text x="500" y="78" text-anchor="middle" font-family="SimHei" font-size="13" fill="#eab308">★★★☆☆ 基础</text>
    <text x="700" y="78" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.accent}">★★★★☆ 专注截图</text>
    
    <!-- 行2: 隐私保护 -->
    <rect x="0" y="95" width="200" height="45" fill="${colors.light}"/>
    <rect x="200" y="95" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="400" y="95" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="600" y="95" width="200" height="45" fill="#fef9f3" stroke="${colors.accent}"/>
    
    <text x="100" y="123" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.dark}">隐私保护</text>
    <text x="300" y="123" text-anchor="middle" font-family="SimHei" font-size="13" fill="#ef4444">★★☆☆☆ 云端依赖</text>
    <text x="500" y="123" text-anchor="middle" font-family="SimHei" font-size="13" fill="#22c55e">★★★★★ 本地优先</text>
    <text x="700" y="123" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.accent}">★★★★★ 端云可选</text>
    
    <!-- 行3: 中国市场合规 -->
    <rect x="0" y="140" width="200" height="45" fill="${colors.light}"/>
    <rect x="200" y="140" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="400" y="140" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="600" y="140" width="200" height="45" fill="#fef9f3" stroke="${colors.accent}"/>
    
    <text x="100" y="168" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.dark}">PIPL合规</text>
    <text x="300" y="168" text-anchor="middle" font-family="SimHei" font-size="13" fill="#ef4444">✗ 不可用</text>
    <text x="500" y="168" text-anchor="middle" font-family="SimHei" font-size="13" fill="#22c55e">✓ 合规</text>
    <text x="700" y="168" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.accent}">✓ 完全合规</text>
    
    <!-- 行4: Android支持 -->
    <rect x="0" y="185" width="200" height="45" fill="${colors.light}"/>
    <rect x="200" y="185" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="400" y="185" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="600" y="185" width="200" height="45" fill="#fef9f3" stroke="${colors.accent}"/>
    
    <text x="100" y="213" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.dark}">Android支持</text>
    <text x="300" y="213" text-anchor="middle" font-family="SimHei" font-size="13" fill="#22c55e">✓ 支持</text>
    <text x="500" y="213" text-anchor="middle" font-family="SimHei" font-size="13" fill="#ef4444">✗ 仅iOS</text>
    <text x="700" y="213" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.accent}">✓ 首选平台</text>
    
    <!-- 行5: 换机数据延续 -->
    <rect x="0" y="230" width="200" height="45" fill="${colors.light}"/>
    <rect x="200" y="230" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="400" y="230" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="600" y="230" width="200" height="45" fill="#fef9f3" stroke="${colors.accent}"/>
    
    <text x="100" y="258" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.dark}">跨品牌延续</text>
    <text x="300" y="258" text-anchor="middle" font-family="SimHei" font-size="13" fill="#eab308">△ 需Google账号</text>
    <text x="500" y="258" text-anchor="middle" font-family="SimHei" font-size="13" fill="#ef4444">✗ 品牌锁定</text>
    <text x="700" y="258" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.accent}">✓ 完全跨品牌</text>
    
    <!-- 行6: 层次化记忆 -->
    <rect x="0" y="275" width="200" height="45" fill="${colors.light}"/>
    <rect x="200" y="275" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="400" y="275" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="600" y="275" width="200" height="45" fill="#fef9f3" stroke="${colors.accent}"/>
    
    <text x="100" y="303" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.dark}">层次化记忆</text>
    <text x="300" y="303" text-anchor="middle" font-family="SimHei" font-size="13" fill="#ef4444">✗ 无</text>
    <text x="500" y="303" text-anchor="middle" font-family="SimHei" font-size="13" fill="#ef4444">✗ 无</text>
    <text x="700" y="303" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.accent}">✓ 独创功能</text>
    
    <!-- 行7: 截图OCR -->
    <rect x="0" y="320" width="200" height="45" fill="${colors.light}"/>
    <rect x="200" y="320" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="400" y="320" width="200" height="45" fill="${colors.white}" stroke="${colors.grid}"/>
    <rect x="600" y="320" width="200" height="45" fill="#fef9f3" stroke="${colors.accent}"/>
    
    <text x="100" y="348" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.dark}">截图文字识别</text>
    <text x="300" y="348" text-anchor="middle" font-family="SimHei" font-size="13" fill="#eab308">△ 通用OCR</text>
    <text x="500" y="348" text-anchor="middle" font-family="SimHei" font-size="13" fill="#eab308">△ 通用OCR</text>
    <text x="700" y="348" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.accent}">★ VLM深度理解</text>
  </g>
  
  <!-- 底部说明 -->
  <g transform="translate(50, 450)">
    <rect x="0" y="0" width="800" height="50" fill="${colors.light}" rx="8"/>
    <text x="400" y="20" text-anchor="middle" font-family="SimHei" font-size="13" fill="${colors.dark}">竞争优势总结：</text>
    <text x="400" y="40" text-anchor="middle" font-family="SimSun" font-size="12" fill="${colors.text}">拾光在PIPL合规、跨品牌支持、层次化记忆三个维度形成独特竞争壁垒，填补市场空白</text>
  </g>
</svg>`;

// ========== 图5: 余弦相似度公式可视化 ==========
const chart5_cosine = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${colors.primary}"/>
    </marker>
  </defs>
  
  <rect width="900" height="500" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="35" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">语义向量余弦相似度计算</text>
  <text x="450" y="58" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.textLight}">Cosine Similarity - 语义搜索的核心算法</text>
  
  <!-- 公式展示区 -->
  <rect x="50" y="80" width="800" height="100" fill="${colors.light}" rx="10"/>
  <text x="450" y="120" text-anchor="middle" font-family="Times New Roman, SimSun" font-size="22" fill="${colors.dark}">
    sim(v, q) = 
  </text>
  <text x="560" y="105" text-anchor="middle" font-family="Times New Roman" font-size="18" fill="${colors.dark}">v · q</text>
  <line x1="520" y1="115" x2="680" y2="115" stroke="${colors.dark}" stroke-width="2"/>
  <text x="600" y="145" text-anchor="middle" font-family="Times New Roman" font-size="18" fill="${colors.dark}">||v|| × ||q||</text>
  
  <text x="750" y="120" text-anchor="middle" font-family="Times New Roman" font-size="18" fill="${colors.dark}">∈ [-1, 1]</text>
  
  <!-- 向量图示 -->
  <g transform="translate(100, 220)">
    <text x="150" y="-20" text-anchor="middle" font-family="SimHei" font-size="16" font-weight="bold" fill="${colors.dark}">向量空间示意图</text>
    
    <!-- 坐标系 -->
    <line x1="0" y1="200" x2="300" y2="200" stroke="${colors.grid}" stroke-width="2"/>
    <line x1="0" y1="200" x2="0" y2="0" stroke="${colors.grid}" stroke-width="2"/>
    <text x="310" y="205" font-family="Arial" font-size="12" fill="${colors.textLight}">维度1</text>
    <text x="-5" y="-10" font-family="Arial" font-size="12" fill="${colors.textLight}">维度2</text>
    
    <!-- 向量v (图片向量) -->
    <line x1="0" y1="200" x2="250" y2="80" stroke="${colors.primary}" stroke-width="3" marker-end="url(#arrowhead)"/>
    <text x="260" y="75" font-family="Times New Roman" font-size="18" font-weight="bold" fill="${colors.primary}">v</text>
    <text x="270" y="95" font-family="SimSun" font-size="11" fill="${colors.primary}">(图片向量)</text>
    
    <!-- 向量q (查询向量) -->
    <line x1="0" y1="200" x2="200" y2="40" stroke="${colors.accent}" stroke-width="3" marker-end="url(#arrowhead)"/>
    <text x="210" y="35" font-family="Times New Roman" font-size="18" font-weight="bold" fill="${colors.accent}">q</text>
    <text x="220" y="55" font-family="SimSun" font-size="11" fill="${colors.accent}">(查询向量)</text>
    
    <!-- 夹角θ -->
    <path d="M 60 170 A 50 50 0 0 1 45 155" fill="none" stroke="${colors.tertiary}" stroke-width="2"/>
    <text x="75" y="150" font-family="Times New Roman" font-size="14" fill="${colors.tertiary}">θ</text>
    
    <!-- 说明 -->
    <text x="150" y="250" text-anchor="middle" font-family="SimSun" font-size="12" fill="${colors.text}">sim = cos(θ)，夹角越小相似度越高</text>
  </g>
  
  <!-- 计算示例 -->
  <g transform="translate(480, 200)">
    <rect x="0" y="0" width="370" height="250" fill="${colors.light}" rx="10"/>
    <text x="185" y="30" text-anchor="middle" font-family="SimHei" font-size="15" font-weight="bold" fill="${colors.dark}">计算示例</text>
    
    <text x="20" y="65" font-family="SimSun" font-size="13" fill="${colors.text}">图片向量 v = [0.8, 0.3, 0.5, ...]</text>
    <text x="20" y="90" font-family="SimSun" font-size="13" fill="${colors.text}">查询向量 q = [0.7, 0.4, 0.6, ...]</text>
    
    <line x1="20" y1="105" x2="350" y2="105" stroke="${colors.grid}" stroke-width="1"/>
    
    <text x="20" y="130" font-family="SimSun" font-size="13" fill="${colors.text}">点积: v·q = 0.8×0.7 + 0.3×0.4 + ...</text>
    <text x="20" y="155" font-family="SimSun" font-size="13" fill="${colors.text}">模长: ||v|| = √(0.8² + 0.3² + ...)</text>
    
    <line x1="20" y1="175" x2="350" y2="175" stroke="${colors.grid}" stroke-width="1"/>
    
    <text x="20" y="200" font-family="SimHei" font-size="14" fill="${colors.dark}">结果解读:</text>
    <rect x="20" y="210" width="100" height="25" fill="#dcfce7" rx="5"/>
    <text x="70" y="228" text-anchor="middle" font-family="Arial" font-size="12" fill="#16a34a">sim ≈ 0.95</text>
    <text x="130" y="228" font-family="SimSun" font-size="12" fill="${colors.text}">→ 高度相关，优先返回</text>
  </g>
</svg>`;

// ========== 图6: 存储压缩对比图 ==========
const chart6_compression = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="480" viewBox="0 0 900 480">
  <defs>
    <linearGradient id="compressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ef4444"/>
      <stop offset="100%" style="stop-color:#f87171"/>
    </linearGradient>
    <linearGradient id="pqGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#22c55e"/>
      <stop offset="100%" style="stop-color:#4ade80"/>
    </linearGradient>
  </defs>
  
  <rect width="900" height="480" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="35" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">乘积量化(PQ)存储压缩效果</text>
  <text x="450" y="58" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.textLight}">Product Quantization - 向量索引压缩技术</text>
  
  <!-- 公式区域 -->
  <g transform="translate(50, 80)">
    <rect x="0" y="0" width="380" height="120" fill="${colors.light}" rx="8"/>
    <text x="190" y="25" text-anchor="middle" font-family="SimHei" font-size="14" font-weight="bold" fill="${colors.dark}">原始存储公式</text>
    <text x="190" y="55" text-anchor="middle" font-family="Times New Roman" font-size="16" fill="${colors.text}">S = n × d × sizeof(float32)</text>
    <text x="190" y="80" text-anchor="middle" font-family="Times New Roman" font-size="16" fill="${colors.text}">= n × 384 × 4 bytes</text>
    <text x="190" y="105" text-anchor="middle" font-family="SimSun" font-size="12" fill="${colors.textLight}">n=图片数, d=384维向量</text>
    
    <rect x="420" y="0" width="380" height="120" fill="#dcfce7" rx="8"/>
    <text x="610" y="25" text-anchor="middle" font-family="SimHei" font-size="14" font-weight="bold" fill="#16a34a">PQ压缩公式</text>
    <text x="610" y="55" text-anchor="middle" font-family="Times New Roman" font-size="16" fill="${colors.text}">S_PQ = n × m × ⌈log₂(k)⌉ bits</text>
    <text x="610" y="80" text-anchor="middle" font-family="Times New Roman" font-size="16" fill="${colors.text}">= n × 48 × 8 bits = n × 48 bytes</text>
    <text x="610" y="105" text-anchor="middle" font-family="SimSun" font-size="12" fill="${colors.textLight}">m=48子空间, k=256聚类中心</text>
  </g>
  
  <!-- 对比柱状图 -->
  <g transform="translate(100, 230)">
    <text x="350" y="-15" text-anchor="middle" font-family="SimHei" font-size="16" font-weight="bold" fill="${colors.dark}">10,000张图片索引存储对比</text>
    
    <!-- 原始 -->
    <rect x="100" y="20" width="200" height="60" fill="url(#compressGrad)" rx="6"/>
    <text x="200" y="58" text-anchor="middle" font-family="SimHei" font-size="16" font-weight="bold" fill="white">15.36 MB</text>
    <text x="50" y="55" text-anchor="end" font-family="SimHei" font-size="14" fill="${colors.text}">原始存储</text>
    
    <!-- 压缩后 -->
    <rect x="100" y="100" width="${200 * 0.03125}" height="60" fill="url(#pqGrad)" rx="6"/>
    <text x="${100 + 200 * 0.03125 + 15}" y="138" font-family="SimHei" font-size="16" font-weight="bold" fill="#16a34a">0.48 MB</text>
    <text x="50" y="135" text-anchor="end" font-family="SimHei" font-size="14" fill="${colors.text}">PQ压缩后</text>
    
    <!-- 压缩率标注 -->
    <g transform="translate(400, 50)">
      <rect x="0" y="0" width="280" height="120" fill="${colors.light}" rx="10"/>
      <text x="140" y="35" text-anchor="middle" font-family="SimHei" font-size="15" font-weight="bold" fill="${colors.dark}">压缩效果</text>
      
      <text x="140" y="70" text-anchor="middle" font-family="Arial" font-size="32" font-weight="bold" fill="${colors.accent}">32×</text>
      <text x="140" y="95" text-anchor="middle" font-family="SimSun" font-size="13" fill="${colors.text}">压缩比 (3.125%)</text>
      <text x="140" y="115" text-anchor="middle" font-family="SimSun" font-size="12" fill="#16a34a">检索精度保持 &gt;95%</text>
    </g>
  </g>
  
  <!-- 底部规模说明 -->
  <g transform="translate(50, 400)">
    <rect x="0" y="0" width="800" height="60" fill="${colors.light}" rx="8"/>
    <text x="400" y="25" text-anchor="middle" font-family="SimHei" font-size="14" font-weight="bold" fill="${colors.dark}">大规模相册场景计算</text>
    <text x="200" y="48" text-anchor="middle" font-family="SimSun" font-size="13" fill="${colors.text}">100,000张图片 → 原始: 153.6 MB</text>
    <text x="600" y="48" text-anchor="middle" font-family="SimSun" font-size="13" fill="#16a34a">PQ压缩后: 仅 4.8 MB ✓</text>
  </g>
</svg>`;

// ========== 图7: GenAI手机市场趋势预测 ==========
const chart7_trend = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500">
  <defs>
    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2c5282;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#2c5282;stop-opacity:0.1"/>
    </linearGradient>
  </defs>
  
  <rect width="900" height="500" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="35" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">全球生成式AI智能手机市场占比预测</text>
  <text x="450" y="58" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.textLight}">数据来源：IDC《Worldwide AI Smartphone Forecast, 2025–2029》[4][5]</text>
  
  <!-- 坐标系 -->
  <g transform="translate(100, 90)">
    <!-- Y轴 -->
    <line x1="0" y1="0" x2="0" y2="320" stroke="${colors.grid}" stroke-width="2"/>
    <text x="-50" y="160" text-anchor="middle" font-family="SimSun" font-size="13" fill="${colors.text}" transform="rotate(-90, -50, 160)">市场占比 (%)</text>
    
    <!-- Y轴刻度 -->
    <line x1="-5" y1="320" x2="700" y2="320" stroke="${colors.grid}" stroke-width="1"/>
    <line x1="-5" y1="256" x2="700" y2="256" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="-5" y1="192" x2="700" y2="192" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="-5" y1="128" x2="700" y2="128" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="-5" y1="64" x2="700" y2="64" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="-5" y1="0" x2="700" y2="0" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5,5"/>
    
    <text x="-15" y="324" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.textLight}">0%</text>
    <text x="-15" y="260" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.textLight}">20%</text>
    <text x="-15" y="196" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.textLight}">40%</text>
    <text x="-15" y="132" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.textLight}">60%</text>
    <text x="-15" y="68" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.textLight}">80%</text>
    <text x="-15" y="4" text-anchor="end" font-family="Arial" font-size="11" fill="${colors.textLight}">100%</text>
    
    <!-- X轴刻度 -->
    <text x="70" y="345" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.text}">2024</text>
    <text x="210" y="345" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.text}">2025</text>
    <text x="350" y="345" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.text}">2026</text>
    <text x="490" y="345" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.text}">2027</text>
    <text x="630" y="345" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.text}">2028-29</text>
    
    <!-- 趋势线和面积 -->
    <!-- 数据点: 2024: ~18%, 2025: ~35%, 2026: ~50%, 2027: ~60%, 2029: 70.6% -->
    <path d="M 70 ${320 - 18*3.2} L 210 ${320 - 35*3.2} L 350 ${320 - 50*3.2} L 490 ${320 - 60*3.2} L 630 ${320 - 70.6*3.2} L 630 320 L 70 320 Z" fill="url(#areaGrad)"/>
    <polyline points="70,${320 - 18*3.2} 210,${320 - 35*3.2} 350,${320 - 50*3.2} 490,${320 - 60*3.2} 630,${320 - 70.6*3.2}" fill="none" stroke="${colors.primary}" stroke-width="3"/>
    
    <!-- 数据点 -->
    <circle cx="70" cy="${320 - 18*3.2}" r="6" fill="${colors.white}" stroke="${colors.primary}" stroke-width="2"/>
    <circle cx="210" cy="${320 - 35*3.2}" r="6" fill="${colors.white}" stroke="${colors.primary}" stroke-width="2"/>
    <circle cx="350" cy="${320 - 50*3.2}" r="8" fill="${colors.accent}" stroke="${colors.white}" stroke-width="2"/>
    <circle cx="490" cy="${320 - 60*3.2}" r="6" fill="${colors.white}" stroke="${colors.primary}" stroke-width="2"/>
    <circle cx="630" cy="${320 - 70.6*3.2}" r="6" fill="${colors.white}" stroke="${colors.primary}" stroke-width="2"/>
    
    <!-- 数据标签 -->
    <text x="70" y="${320 - 18*3.2 - 15}" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="${colors.primary}">18%</text>
    <text x="210" y="${320 - 35*3.2 - 15}" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="${colors.primary}">35%</text>
    
    <!-- 2026关键节点标注 -->
    <rect x="300" y="${320 - 50*3.2 - 55}" width="100" height="45" fill="#fef3e7" rx="6" stroke="${colors.accent}" stroke-width="2"/>
    <text x="350" y="${320 - 50*3.2 - 35}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="${colors.accent}">~50%</text>
    <text x="350" y="${320 - 50*3.2 - 18}" text-anchor="middle" font-family="SimHei" font-size="10" fill="${colors.accent}">中端机型普及年</text>
    
    <text x="490" y="${320 - 60*3.2 - 15}" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="${colors.primary}">60%</text>
    <text x="630" y="${320 - 70.6*3.2 - 15}" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="${colors.primary}">70.6%</text>
    
    <!-- 增长率标注 -->
    <text x="140" y="${320 - 26*3.2}" font-family="SimSun" font-size="11" fill="#22c55e">+73.1% YoY</text>
  </g>
  
  <!-- 右侧说明 -->
  <g transform="translate(720, 120)">
    <rect x="0" y="0" width="160" height="180" fill="${colors.light}" rx="8"/>
    <text x="80" y="25" text-anchor="middle" font-family="SimHei" font-size="13" font-weight="bold" fill="${colors.dark}">关键洞察</text>
    
    <circle cx="20" cy="55" r="8" fill="${colors.accent}"/>
    <text x="35" y="60" font-family="SimSun" font-size="11" fill="${colors.text}">2026年是关键</text>
    <text x="35" y="75" font-family="SimSun" font-size="11" fill="${colors.text}">转折点</text>
    
    <circle cx="20" cy="105" r="8" fill="${colors.primary}"/>
    <text x="35" y="110" font-family="SimSun" font-size="11" fill="${colors.text}">中端机型开始</text>
    <text x="35" y="125" font-family="SimSun" font-size="11" fill="${colors.text}">搭载GenAI</text>
    
    <circle cx="20" cy="155" r="8" fill="#22c55e"/>
    <text x="35" y="160" font-family="SimSun" font-size="11" fill="${colors.text}">拾光4GB门槛</text>
    <text x="35" y="175" font-family="SimSun" font-size="11" fill="${colors.text}">完美契合</text>
  </g>
</svg>`;

// ========== 图8: 置信度计算示意图 ==========
const chart8_confidence = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500">
  <defs>
    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${colors.primary}"/>
    </marker>
  </defs>
  
  <rect width="900" height="500" fill="${colors.white}"/>
  
  <!-- 标题 -->
  <text x="450" y="35" text-anchor="middle" font-family="SimHei, Arial" font-size="22" font-weight="bold" fill="${colors.dark}">高级事实置信度计算机制</text>
  <text x="450" y="58" text-anchor="middle" font-family="SimSun, Arial" font-size="14" fill="${colors.textLight}">Reflection机制推断结果验证</text>
  
  <!-- 公式 -->
  <rect x="150" y="75" width="600" height="70" fill="${colors.light}" rx="10"/>
  <text x="450" y="115" text-anchor="middle" font-family="Times New Roman, SimSun" font-size="20" fill="${colors.dark}">Confidence(f) = 1 - ∏(1 - wᵢ · sᵢ)</text>
  <text x="450" y="138" text-anchor="middle" font-family="SimSun" font-size="12" fill="${colors.textLight}">wᵢ = 证据权重（时间衰减+来源可靠性）  sᵢ = 支持强度（VLM语义相关性分数）</text>
  
  <!-- 计算示例流程 -->
  <g transform="translate(50, 170)">
    <text x="400" y="0" text-anchor="middle" font-family="SimHei" font-size="16" font-weight="bold" fill="${colors.dark}">示例：推断「用户正在旅游」</text>
    
    <!-- 证据1 -->
    <rect x="0" y="30" width="180" height="90" fill="${colors.white}" rx="8" stroke="${colors.primary}" stroke-width="2"/>
    <text x="90" y="55" text-anchor="middle" font-family="SimHei" font-size="13" font-weight="bold" fill="${colors.dark}">证据1: 景点照片</text>
    <text x="90" y="80" text-anchor="middle" font-family="SimSun" font-size="11" fill="${colors.text}">w₁ = 0.9 (今天拍摄)</text>
    <text x="90" y="100" text-anchor="middle" font-family="SimSun" font-size="11" fill="${colors.text}">s₁ = 0.85 (高相关)</text>
    <text x="90" y="115" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="${colors.primary}">贡献: 0.765</text>
    
    <!-- 证据2 -->
    <rect x="220" y="30" width="180" height="90" fill="${colors.white}" rx="8" stroke="${colors.secondary}" stroke-width="2"/>
    <text x="310" y="55" text-anchor="middle" font-family="SimHei" font-size="13" font-weight="bold" fill="${colors.dark}">证据2: 机票截图</text>
    <text x="310" y="80" text-anchor="middle" font-family="SimSun" font-size="11" fill="${colors.text}">w₂ = 0.7 (3天前)</text>
    <text x="310" y="100" text-anchor="middle" font-family="SimSun" font-size="11" fill="${colors.text}">s₂ = 0.95 (高相关)</text>
    <text x="310" y="115" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="${colors.secondary}">贡献: 0.665</text>
    
    <!-- 证据3 -->
    <rect x="440" y="30" width="180" height="90" fill="${colors.white}" rx="8" stroke="${colors.tertiary}" stroke-width="2"/>
    <text x="530" y="55" text-anchor="middle" font-family="SimHei" font-size="13" font-weight="bold" fill="${colors.dark}">证据3: 酒店照片</text>
    <text x="530" y="80" text-anchor="middle" font-family="SimSun" font-size="11" fill="${colors.text}">w₃ = 0.8 (昨天拍)</text>
    <text x="530" y="100" text-anchor="middle" font-family="SimSun" font-size="11" fill="${colors.text}">s₃ = 0.75 (中相关)</text>
    <text x="530" y="115" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="${colors.tertiary}">贡献: 0.6</text>
    
    <!-- 箭头汇聚 -->
    <line x1="90" y1="125" x2="400" y2="180" stroke="${colors.grid}" stroke-width="2" marker-end="url(#arrow2)"/>
    <line x1="310" y1="125" x2="400" y2="180" stroke="${colors.grid}" stroke-width="2" marker-end="url(#arrow2)"/>
    <line x1="530" y1="125" x2="400" y2="180" stroke="${colors.grid}" stroke-width="2" marker-end="url(#arrow2)"/>
    
    <!-- 计算结果 -->
    <rect x="280" y="190" width="240" height="100" fill="#dcfce7" rx="10" stroke="#22c55e" stroke-width="2"/>
    <text x="400" y="220" text-anchor="middle" font-family="SimHei" font-size="14" font-weight="bold" fill="#16a34a">计算过程</text>
    <text x="400" y="245" text-anchor="middle" font-family="Times New Roman" font-size="13" fill="${colors.text}">1-(1-0.765)(1-0.665)(1-0.6)</text>
    <text x="400" y="270" text-anchor="middle" font-family="Times New Roman" font-size="13" fill="${colors.text}">= 1 - 0.235×0.335×0.4 = 0.969</text>
    <text x="400" y="285" text-anchor="middle" font-family="Arial" font-size="12" fill="#16a34a">Confidence = 96.9% ✓ 高置信</text>
  </g>
  
  <!-- 阈值说明 -->
  <g transform="translate(680, 200)">
    <rect x="0" y="0" width="180" height="150" fill="${colors.light}" rx="8"/>
    <text x="90" y="25" text-anchor="middle" font-family="SimHei" font-size="13" font-weight="bold" fill="${colors.dark}">置信度阈值</text>
    
    <rect x="15" y="40" width="150" height="30" fill="#dcfce7" rx="4"/>
    <text x="90" y="60" text-anchor="middle" font-family="SimSun" font-size="12" fill="#16a34a">≥ 0.6 → 确认事实</text>
    
    <rect x="15" y="80" width="150" height="30" fill="#fef3c7" rx="4"/>
    <text x="90" y="100" text-anchor="middle" font-family="SimSun" font-size="12" fill="#d97706">0.4-0.6 → 待验证</text>
    
    <rect x="15" y="120" width="150" height="25" fill="#fee2e2" rx="4"/>
    <text x="90" y="138" text-anchor="middle" font-family="SimSun" font-size="12" fill="#dc2626">&lt; 0.4 → 丢弃</text>
  </g>
</svg>`;

// 写入所有SVG文件
const charts = [
    { name: 'chart01_ai_market_scale.svg', content: chart1_market },
    { name: 'chart02_hoarding_content.svg', content: chart2_hoarding },
    { name: 'chart03_psychology_motivation.svg', content: chart3_psychology },
    { name: 'chart04_competitor_comparison.svg', content: chart4_comparison },
    { name: 'chart05_cosine_similarity.svg', content: chart5_cosine },
    { name: 'chart06_pq_compression.svg', content: chart6_compression },
    { name: 'chart07_genai_trend.svg', content: chart7_trend },
    { name: 'chart08_confidence_calc.svg', content: chart8_confidence }
];

charts.forEach(chart => {
    const filePath = path.join(outputDir, chart.name);
    fs.writeFileSync(filePath, chart.content, 'utf8');
    console.log(`Generated: ${chart.name}`);
});

console.log('\\n所有SVG图表生成完成！');
console.log('下一步: 运行 node convert-expansion-charts.js 转换为PNG');
