/**
 * 拾光项目Logo设计 v4 - 融合版
 * 配色：晨曦微光（暖橙 #F4A261, 复古青 #2A9D8F, 暖纸白 #FDFCF0）
 * 构图：通透呼吸（毛玻璃胶囊、发光球体、圆角设计）
 */

const fs = require('fs');
const path = require('path');

const outputDir = __dirname;

// ==================== 融合版A: 暖光胶囊 ====================
const logo_v4_a = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="warmGlowA" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <filter id="softWarmGlow">
      <feDropShadow dx="0" dy="3" stdDeviation="8" flood-color="#F4A261" flood-opacity="0.35"/>
    </filter>
  </defs>
  
  <!-- 暖白背景 -->
  <rect width="320" height="120" fill="#FDFCF0"/>
  
  <!-- 毛玻璃胶囊 + 暖光球 -->
  <g transform="translate(18, 12)">
    <!-- 胶囊容器 -->
    <rect x="0" y="0" width="82" height="96" rx="26" fill="#FFFFFF" filter="url(#softWarmGlow)"/>
    <!-- 暖光球 -->
    <circle cx="41" cy="40" r="26" fill="url(#warmGlowA)"/>
    <circle cx="41" cy="40" r="14" fill="#FDFCF0" opacity="0.4"/>
    <circle cx="34" cy="33" r="5" fill="#FDFCF0" opacity="0.7"/>
    <!-- 青色点缀 -->
    <circle cx="65" cy="22" r="4" fill="#2A9D8F" opacity="0.6"/>
  </g>
  
  <!-- 精简文字 -->
  <text x="115" y="55" font-family="-apple-system, 'SF Pro Rounded', sans-serif" font-size="40" font-weight="700" fill="#353535">拾光</text>
  <text x="115" y="85" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" fill="#2A9D8F" letter-spacing="1">Seeklight</text>
</svg>`;

// ==================== 融合版B: 日落棱镜 ====================
const logo_v4_b = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="sunsetPrism" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E9C46A"/>
      <stop offset="50%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <filter id="prismGlow">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#F4A261" flood-opacity="0.4"/>
    </filter>
  </defs>
  
  <!-- 暖白背景 -->
  <rect width="320" height="120" fill="#FDFCF0"/>
  
  <!-- 棱镜光球 -->
  <g transform="translate(15, 10)">
    <!-- 外环 -->
    <circle cx="50" cy="50" r="46" fill="none" stroke="#E9C46A" stroke-width="2" opacity="0.5"/>
    <!-- 发光球体 -->
    <circle cx="50" cy="50" r="34" fill="url(#sunsetPrism)" filter="url(#prismGlow)"/>
    <circle cx="50" cy="50" r="18" fill="#FDFCF0" opacity="0.3"/>
    <circle cx="42" cy="42" r="6" fill="#FDFCF0" opacity="0.7"/>
    <!-- 光芒散射 -->
    <circle cx="80" cy="28" r="5" fill="#2A9D8F" opacity="0.5"/>
    <circle cx="88" cy="50" r="3" fill="#E76F51" opacity="0.4"/>
    <circle cx="78" cy="75" r="4" fill="#E9C46A" opacity="0.5"/>
  </g>
  
  <!-- 精简文字 -->
  <text x="118" y="55" font-family="-apple-system, 'SF Pro Rounded', sans-serif" font-size="40" font-weight="700" fill="#353535">拾光</text>
  <text x="118" y="85" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" fill="#2A9D8F" letter-spacing="1">Seeklight</text>
</svg>`;

// ==================== 融合版C: 记忆气泡 ====================
const logo_v4_c = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="bubbleWarm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E9C46A"/>
    </linearGradient>
    <filter id="bubbleGlow">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#F4A261" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- 暖白背景 -->
  <rect width="320" height="120" fill="#FDFCF0"/>
  
  <!-- 气泡群 -->
  <g transform="translate(12, 8)">
    <!-- 主气泡 -->
    <circle cx="52" cy="52" r="44" fill="#FFFFFF" filter="url(#bubbleGlow)"/>
    <circle cx="52" cy="45" r="28" fill="url(#bubbleWarm)"/>
    <circle cx="52" cy="45" r="12" fill="#FDFCF0" opacity="0.5"/>
    <circle cx="44" cy="38" r="5" fill="#FDFCF0" opacity="0.8"/>
    <!-- 小气泡 -->
    <circle cx="85" cy="25" r="10" fill="#FFFFFF" filter="url(#bubbleGlow)"/>
    <circle cx="85" cy="25" r="5" fill="#2A9D8F" opacity="0.6"/>
    <circle cx="78" cy="80" r="7" fill="#FFFFFF" filter="url(#bubbleGlow)"/>
    <circle cx="78" cy="80" r="3" fill="#E76F51" opacity="0.5"/>
  </g>
  
  <!-- 精简文字 -->
  <text x="115" y="55" font-family="-apple-system, 'SF Pro Rounded', sans-serif" font-size="40" font-weight="700" fill="#353535">拾光</text>
  <text x="115" y="85" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" fill="#2A9D8F" letter-spacing="1">Seeklight</text>
</svg>`;

// 写入所有文件
const logos = [
    { name: 'logo_v4_a_warm_capsule.svg', content: logo_v4_a },
    { name: 'logo_v4_b_sunset_prism.svg', content: logo_v4_b },
    { name: 'logo_v4_c_memory_bubble.svg', content: logo_v4_c }
];

logos.forEach(logo => {
    fs.writeFileSync(path.join(outputDir, logo.name), logo.content, 'utf8');
    console.log(`Generated: ${logo.name}`);
});

console.log('\nv4 融合版Logo已生成！');
