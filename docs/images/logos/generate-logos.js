/**
 * 拾光项目Logo与团队Logo设计
 * 配色：暖心记忆主题
 */

const fs = require('fs');
const path = require('path');

const outputDir = __dirname;

// 暖心记忆配色方案
const colors = {
    amber: '#F59E0B',       // 主色：琥珀橙
    gold: '#FBBF24',        // 辅色：暖金
    cream: '#FEF3C7',       // 淡奶油
    warmWhite: '#FFFBEB',   // 暖白
    deepAmber: '#D97706',   // 深琥珀
    brown: '#92400E',       // 暖棕
    coral: '#FB923C',       // 珊瑚橙
    rose: '#FDA4AF',        // 柔粉
    blue: '#60A5FA',        // 科技蓝
    deepBlue: '#3B82F6',    // 深蓝
    white: '#FFFFFF',
    dark: '#1C1917'         // 暖黑
};

// ==================== 项目Logo方案 ====================

// 方案A: 光晕叠层 - 多层光线叠加形成温暖光晕
const logoA_lightLayers = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <defs>
    <linearGradient id="gradA1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.gold}" />
      <stop offset="100%" style="stop-color:${colors.amber}" />
    </linearGradient>
    <linearGradient id="gradA2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.coral}" />
      <stop offset="100%" style="stop-color:${colors.gold}" />
    </linearGradient>
    <filter id="glowA" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  
  <rect width="400" height="200" fill="${colors.warmWhite}"/>
  
  <!-- 光晕图标 -->
  <g transform="translate(50, 50)">
    <!-- 外层光环 -->
    <circle cx="50" cy="50" r="45" fill="none" stroke="${colors.cream}" stroke-width="8" opacity="0.6"/>
    <!-- 中层光环 -->
    <circle cx="50" cy="50" r="35" fill="none" stroke="${colors.gold}" stroke-width="6" opacity="0.8"/>
    <!-- 内层光环 -->
    <circle cx="50" cy="50" r="25" fill="url(#gradA1)" filter="url(#glowA)"/>
    <!-- 光芒射线 -->
    <g stroke="${colors.amber}" stroke-width="2" opacity="0.7">
      <line x1="50" y1="5" x2="50" y2="-5"/>
      <line x1="50" y1="95" x2="50" y2="105"/>
      <line x1="5" y1="50" x2="-5" y2="50"/>
      <line x1="95" y1="50" x2="105" y2="50"/>
      <line x1="18" y1="18" x2="11" y2="11"/>
      <line x1="82" y1="82" x2="89" y2="89"/>
      <line x1="82" y1="18" x2="89" y2="11"/>
      <line x1="18" y1="82" x2="11" y2="89"/>
    </g>
    <!-- 中心点 -->
    <circle cx="50" cy="50" r="8" fill="${colors.white}"/>
  </g>
  
  <!-- 文字 -->
  <text x="170" y="85" font-family="SimHei, Microsoft YaHei" font-size="48" font-weight="bold" fill="${colors.brown}">拾光</text>
  <text x="170" y="120" font-family="Arial, sans-serif" font-size="20" fill="${colors.deepAmber}" letter-spacing="2">SeekLight</text>
  <text x="170" y="145" font-family="SimSun" font-size="12" fill="${colors.brown}" opacity="0.6">拾起时光 · 珍藏记忆</text>
</svg>`;

// 方案B: 相框记忆 - 相框内嵌光点，象征照片中的美好瞬间
const logoB_photoFrame = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <defs>
    <linearGradient id="gradB1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.amber}" />
      <stop offset="100%" style="stop-color:${colors.deepAmber}" />
    </linearGradient>
    <linearGradient id="gradB2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.gold}" />
      <stop offset="100%" style="stop-color:${colors.coral}" />
    </linearGradient>
  </defs>
  
  <rect width="400" height="200" fill="${colors.warmWhite}"/>
  
  <!-- 相框图标 -->
  <g transform="translate(45, 40)">
    <!-- 外框 -->
    <rect x="0" y="0" width="100" height="120" rx="8" fill="none" stroke="url(#gradB1)" stroke-width="6"/>
    <!-- 内框 -->
    <rect x="12" y="12" width="76" height="96" rx="4" fill="${colors.cream}"/>
    <!-- 光点群 -->
    <circle cx="35" cy="45" r="12" fill="${colors.gold}" opacity="0.9"/>
    <circle cx="65" cy="55" r="8" fill="${colors.amber}" opacity="0.8"/>
    <circle cx="45" cy="75" r="6" fill="${colors.coral}" opacity="0.7"/>
    <circle cx="70" cy="85" r="4" fill="${colors.rose}" opacity="0.6"/>
    <!-- 山形剪影（照片意象） -->
    <path d="M12 95 L40 65 L55 80 L75 55 L88 95 Z" fill="${colors.deepAmber}" opacity="0.3"/>
  </g>
  
  <!-- 文字 -->
  <text x="170" y="85" font-family="SimHei, Microsoft YaHei" font-size="48" font-weight="bold" fill="${colors.brown}">拾光</text>
  <text x="170" y="120" font-family="Arial, sans-serif" font-size="20" fill="${colors.deepAmber}" letter-spacing="2">SeekLight</text>
  <text x="170" y="145" font-family="SimSun" font-size="12" fill="${colors.brown}" opacity="0.6">智能相册 · 记忆伙伴</text>
</svg>`;

// 方案C: 时光流转 - 流动的光带，象征记忆的流转与拾取
const logoC_timeFlow = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <defs>
    <linearGradient id="gradC1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.coral}" />
      <stop offset="50%" style="stop-color:${colors.amber}" />
      <stop offset="100%" style="stop-color:${colors.gold}" />
    </linearGradient>
    <linearGradient id="gradC2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.gold}" />
      <stop offset="100%" style="stop-color:${colors.cream}" />
    </linearGradient>
  </defs>
  
  <rect width="400" height="200" fill="${colors.warmWhite}"/>
  
  <!-- 流动光带图标 -->
  <g transform="translate(40, 35)">
    <!-- 光带1 -->
    <path d="M10 65 Q35 20 60 50 Q85 80 110 45" stroke="url(#gradC1)" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.9"/>
    <!-- 光带2 -->
    <path d="M5 90 Q30 55 55 75 Q80 95 105 70" stroke="url(#gradC2)" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.7"/>
    <!-- 光带3 -->
    <path d="M15 110 Q40 85 65 100 Q90 115 115 95" stroke="${colors.cream}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5"/>
    <!-- 光点 -->
    <circle cx="60" cy="50" r="10" fill="${colors.amber}"/>
    <circle cx="60" cy="50" r="5" fill="${colors.white}"/>
  </g>
  
  <!-- 文字 -->
  <text x="170" y="85" font-family="SimHei, Microsoft YaHei" font-size="48" font-weight="bold" fill="${colors.brown}">拾光</text>
  <text x="170" y="120" font-family="Arial, sans-serif" font-size="20" fill="${colors.deepAmber}" letter-spacing="2">SeekLight</text>
  <text x="170" y="145" font-family="SimSun" font-size="12" fill="${colors.brown}" opacity="0.6">时光流转 · 温暖相伴</text>
</svg>`;

// 方案D: 简约光字 - "光"字艺术化处理，融入光芒元素
const logoD_lightChar = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <defs>
    <linearGradient id="gradD1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.gold}" />
      <stop offset="100%" style="stop-color:${colors.deepAmber}" />
    </linearGradient>
    <filter id="glowD" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  
  <rect width="400" height="200" fill="${colors.warmWhite}"/>
  
  <!-- 简约"光"字图标 -->
  <g transform="translate(50, 40)">
    <!-- 圆形底板 -->
    <circle cx="50" cy="60" r="55" fill="${colors.cream}"/>
    <circle cx="50" cy="60" r="45" fill="${colors.white}"/>
    <!-- 艺术化"光"字 -->
    <text x="50" y="80" font-family="KaiTi, STKaiti, SimSun" font-size="60" font-weight="bold" fill="url(#gradD1)" text-anchor="middle" filter="url(#glowD)">光</text>
    <!-- 光芒装饰 -->
    <circle cx="75" cy="35" r="4" fill="${colors.amber}" opacity="0.8"/>
    <circle cx="85" cy="50" r="3" fill="${colors.gold}" opacity="0.6"/>
    <circle cx="25" cy="40" r="3" fill="${colors.coral}" opacity="0.7"/>
  </g>
  
  <!-- 文字 -->
  <text x="170" y="75" font-family="SimHei, Microsoft YaHei" font-size="36" font-weight="bold" fill="${colors.brown}">拾光</text>
  <text x="170" y="105" font-family="Arial, sans-serif" font-size="16" fill="${colors.deepAmber}" letter-spacing="1">SeekLight</text>
  <text x="170" y="135" font-family="SimSun" font-size="11" fill="${colors.brown}" opacity="0.6">AI智能相册 · 隐私优先</text>
</svg>`;

// ==================== 团队Logo方案 ====================

// 团队方案1: 三人协作 - 三个人形图标组成光芒形状
const teamLogo1 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
  <defs>
    <linearGradient id="teamGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.amber}" />
      <stop offset="100%" style="stop-color:${colors.deepAmber}" />
    </linearGradient>
  </defs>
  
  <rect width="300" height="200" fill="${colors.warmWhite}"/>
  
  <!-- 三人协作图标 -->
  <g transform="translate(30, 40)">
    <!-- 中心圆 -->
    <circle cx="60" cy="60" r="50" fill="${colors.cream}"/>
    
    <!-- 三个人形 -->
    <!-- 人1（顶部） -->
    <g transform="translate(60, 20)" fill="${colors.amber}">
      <circle cx="0" cy="0" r="8"/>
      <path d="M-10 12 Q0 25 10 12" stroke="${colors.amber}" stroke-width="4" fill="none"/>
    </g>
    <!-- 人2（左下） -->
    <g transform="translate(25, 85)" fill="${colors.gold}">
      <circle cx="0" cy="0" r="8"/>
      <path d="M-10 12 Q0 25 10 12" stroke="${colors.gold}" stroke-width="4" fill="none"/>
    </g>
    <!-- 人3（右下） -->
    <g transform="translate(95, 85)" fill="${colors.coral}">
      <circle cx="0" cy="0" r="8"/>
      <path d="M-10 12 Q0 25 10 12" stroke="${colors.coral}" stroke-width="4" fill="none"/>
    </g>
    
    <!-- 连接线（协作） -->
    <line x1="60" y1="35" x2="35" y2="75" stroke="${colors.deepAmber}" stroke-width="2" opacity="0.5"/>
    <line x1="60" y1="35" x2="85" y2="75" stroke="${colors.deepAmber}" stroke-width="2" opacity="0.5"/>
    <line x1="35" y1="75" x2="85" y2="75" stroke="${colors.deepAmber}" stroke-width="2" opacity="0.5"/>
    
    <!-- 中心光点 -->
    <circle cx="60" cy="60" r="6" fill="${colors.white}"/>
  </g>
  
  <!-- 文字 -->
  <text x="155" y="80" font-family="SimHei" font-size="24" font-weight="bold" fill="${colors.brown}">拾光团队</text>
  <text x="155" y="110" font-family="Arial" font-size="14" fill="${colors.deepAmber}">SeekLight Team</text>
  <text x="155" y="135" font-family="SimSun" font-size="10" fill="${colors.brown}" opacity="0.6">算法 · 工程 · 产品</text>
</svg>`;

// 团队方案2: 光芒齿轮 - 齿轮+光芒，象征技术与创新
const teamLogo2 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
  <defs>
    <linearGradient id="teamGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.blue}" />
      <stop offset="100%" style="stop-color:${colors.deepBlue}" />
    </linearGradient>
  </defs>
  
  <rect width="300" height="200" fill="${colors.warmWhite}"/>
  
  <!-- 光芒齿轮图标 -->
  <g transform="translate(30, 35)">
    <!-- 外层光芒 -->
    <g stroke="${colors.gold}" stroke-width="3" opacity="0.6">
      <line x1="60" y1="5" x2="60" y2="15"/>
      <line x1="60" y1="105" x2="60" y2="115"/>
      <line x1="5" y1="60" x2="15" y2="60"/>
      <line x1="105" y1="60" x2="115" y2="60"/>
    </g>
    
    <!-- 齿轮 -->
    <circle cx="60" cy="60" r="40" fill="none" stroke="${colors.amber}" stroke-width="8"/>
    <!-- 齿轮齿 -->
    <g fill="${colors.amber}">
      <rect x="55" y="15" width="10" height="12" rx="2"/>
      <rect x="55" y="93" width="10" height="12" rx="2"/>
      <rect x="15" y="55" width="12" height="10" rx="2"/>
      <rect x="93" y="55" width="12" height="10" rx="2"/>
      <rect x="25" y="25" width="10" height="10" rx="2" transform="rotate(45 30 30)"/>
      <rect x="85" y="25" width="10" height="10" rx="2" transform="rotate(45 90 30)"/>
      <rect x="25" y="85" width="10" height="10" rx="2" transform="rotate(45 30 90)"/>
      <rect x="85" y="85" width="10" height="10" rx="2" transform="rotate(45 90 90)"/>
    </g>
    
    <!-- 内部 -->
    <circle cx="60" cy="60" r="25" fill="${colors.cream}"/>
    <circle cx="60" cy="60" r="15" fill="url(#teamGrad2)"/>
    <circle cx="60" cy="60" r="5" fill="${colors.white}"/>
  </g>
  
  <!-- 文字 -->
  <text x="155" y="80" font-family="SimHei" font-size="24" font-weight="bold" fill="${colors.brown}">拾光团队</text>
  <text x="155" y="110" font-family="Arial" font-size="14" fill="${colors.deepAmber}">SeekLight Team</text>
  <text x="155" y="135" font-family="SimSun" font-size="10" fill="${colors.brown}" opacity="0.6">技术驱动 · 创新未来</text>
</svg>`;

// 团队方案3: 记忆拼图 - 三块拼图组成整体，象征团队协作
const teamLogo3 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
  <rect width="300" height="200" fill="${colors.warmWhite}"/>
  
  <!-- 拼图图标 -->
  <g transform="translate(25, 35)">
    <!-- 拼图块1（左上） -->
    <path d="M10 10 L45 10 Q45 25 55 25 Q65 25 65 10 L100 10 L100 45 Q85 45 85 55 Q85 65 100 65 L100 60 L55 60 Q55 45 45 45 Q35 45 35 60 L10 60 Z" 
          fill="${colors.amber}" opacity="0.9"/>
    
    <!-- 拼图块2（右上） -->
    <path d="M65 10 L100 10 L100 45 Q85 45 85 55 Q85 65 100 65 L100 100 L65 100 Q65 85 55 85 Q45 85 45 100 L45 60 Q60 60 60 50 Q60 40 45 40 L45 10 Z" 
          fill="${colors.gold}" opacity="0.9" transform="translate(10, 0)"/>
    
    <!-- 拼图块3（下方） -->
    <path d="M10 65 L45 65 Q45 80 55 80 Q65 80 65 65 L100 65 L100 110 L10 110 Z" 
          fill="${colors.coral}" opacity="0.9"/>
    
    <!-- 中心装饰 -->
    <circle cx="55" cy="55" r="8" fill="${colors.white}"/>
    <circle cx="55" cy="55" r="4" fill="${colors.deepAmber}"/>
  </g>
  
  <!-- 文字 -->
  <text x="150" y="80" font-family="SimHei" font-size="24" font-weight="bold" fill="${colors.brown}">拾光团队</text>
  <text x="150" y="110" font-family="Arial" font-size="14" fill="${colors.deepAmber}">SeekLight Team</text>
  <text x="150" y="135" font-family="SimSun" font-size="10" fill="${colors.brown}" opacity="0.6">携手共进 · 拼出精彩</text>
</svg>`;

// 写入所有文件
const logos = [
    { name: 'project_logo_A_lightlayers.svg', content: logoA_lightLayers },
    { name: 'project_logo_B_photoframe.svg', content: logoB_photoFrame },
    { name: 'project_logo_C_timeflow.svg', content: logoC_timeFlow },
    { name: 'project_logo_D_lightchar.svg', content: logoD_lightChar },
    { name: 'team_logo_1_collaboration.svg', content: teamLogo1 },
    { name: 'team_logo_2_innovation.svg', content: teamLogo2 },
    { name: 'team_logo_3_puzzle.svg', content: teamLogo3 }
];

logos.forEach(logo => {
    fs.writeFileSync(path.join(outputDir, logo.name), logo.content, 'utf8');
    console.log(`Generated: ${logo.name}`);
});

console.log('\nLogo设计文件已生成！');
