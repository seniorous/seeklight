/**
 * 拾光项目Logo设计 v3 - 精简优化版
 * 基于晨曦微光和通透呼吸风格
 */

const fs = require('fs');
const path = require('path');

const outputDir = __dirname;

// ==================== 精简版1A: 晨曦微光 - 极简宝丽来 ====================
const logo_v3_1a = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="sunGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E9C46A"/>
    </linearGradient>
  </defs>
  
  <rect width="320" height="120" fill="#FDFCF0"/>
  
  <!-- 简约宝丽来图标 -->
  <g transform="translate(25, 15)">
    <rect x="0" y="0" width="70" height="85" rx="2" fill="#FFFFFF" filter="drop-shadow(1px 2px 3px rgba(53,53,53,0.12))"/>
    <rect x="6" y="6" width="58" height="58" fill="#F5F0E6"/>
    <circle cx="35" cy="32" r="18" fill="url(#sunGrad1)"/>
    <circle cx="35" cy="32" r="8" fill="#FDFCF0" opacity="0.5"/>
  </g>
  
  <!-- 精简文字 -->
  <text x="115" y="55" font-family="Georgia, serif" font-size="38" font-weight="400" fill="#353535">拾光</text>
  <text x="115" y="82" font-family="Georgia, serif" font-size="14" font-style="italic" fill="#2A9D8F" letter-spacing="2">Seeklight</text>
</svg>`;

// ==================== 精简版1B: 晨曦微光 - 光环印记 ====================
const logo_v3_1b = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
  </defs>
  
  <rect width="320" height="120" fill="#FDFCF0"/>
  
  <!-- 光环印记图标 -->
  <g transform="translate(25, 15)">
    <circle cx="45" cy="45" r="42" fill="none" stroke="#E9C46A" stroke-width="2" opacity="0.4"/>
    <circle cx="45" cy="45" r="32" fill="none" stroke="#F4A261" stroke-width="3" opacity="0.6"/>
    <circle cx="45" cy="45" r="20" fill="url(#warmGrad)"/>
    <circle cx="45" cy="45" r="8" fill="#FDFCF0"/>
    <!-- 光芒 -->
    <g stroke="#F4A261" stroke-width="2" opacity="0.5">
      <line x1="45" y1="0" x2="45" y2="8"/>
      <line x1="45" y1="82" x2="45" y2="90"/>
      <line x1="0" y1="45" x2="8" y2="45"/>
      <line x1="82" y1="45" x2="90" y2="45"/>
    </g>
  </g>
  
  <!-- 精简文字 -->
  <text x="130" y="55" font-family="Georgia, serif" font-size="38" font-weight="400" fill="#353535">拾光</text>
  <text x="130" y="82" font-family="Georgia, serif" font-size="14" font-style="italic" fill="#2A9D8F" letter-spacing="2">Seeklight</text>
</svg>`;

// ==================== 精简版5A: 通透呼吸 - 发光胶囊 ====================
const logo_v3_5a = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="blurple1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5856D6"/>
      <stop offset="100%" style="stop-color:#AF52DE"/>
    </linearGradient>
    <filter id="glow1">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#5856D6" flood-opacity="0.35"/>
    </filter>
  </defs>
  
  <rect width="320" height="120" fill="#F2F2F7"/>
  
  <!-- 发光胶囊图标 -->
  <g transform="translate(20, 15)">
    <rect x="0" y="0" width="80" height="90" rx="24" fill="#FFFFFF" filter="url(#glow1)"/>
    <circle cx="40" cy="38" r="22" fill="url(#blurple1)"/>
    <circle cx="40" cy="38" r="10" fill="#FFFFFF" opacity="0.4"/>
    <circle cx="34" cy="32" r="4" fill="#FFFFFF" opacity="0.7"/>
  </g>
  
  <!-- 精简文字 -->
  <text x="115" y="55" font-family="-apple-system, 'SF Pro Rounded', sans-serif" font-size="38" font-weight="700" fill="#1C1C1E">拾光</text>
  <text x="115" y="82" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="url(#blurple1)" letter-spacing="1">Seeklight</text>
</svg>`;

// ==================== 精简版5B: 通透呼吸 - 棱镜光球 ====================
const logo_v3_5b = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="prismGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5856D6"/>
      <stop offset="50%" style="stop-color:#FF2D55"/>
      <stop offset="100%" style="stop-color:#FF9500"/>
    </linearGradient>
    <filter id="softGlow">
      <feDropShadow dx="0" dy="3" stdDeviation="8" flood-color="#5856D6" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <rect width="320" height="120" fill="#F2F2F7"/>
  
  <!-- 棱镜光球图标 -->
  <g transform="translate(20, 12)">
    <!-- 外环 -->
    <circle cx="48" cy="48" r="44" fill="none" stroke="#E5E5EA" stroke-width="2"/>
    <!-- 内部发光球 -->
    <circle cx="48" cy="48" r="32" fill="url(#prismGrad2)" filter="url(#softGlow)"/>
    <circle cx="48" cy="48" r="18" fill="#FFFFFF" opacity="0.25"/>
    <circle cx="40" cy="40" r="6" fill="#FFFFFF" opacity="0.6"/>
    <!-- 光芒点 -->
    <circle cx="75" cy="25" r="4" fill="#FF2D55" opacity="0.6"/>
    <circle cx="82" cy="48" r="3" fill="#5856D6" opacity="0.5"/>
  </g>
  
  <!-- 精简文字 -->
  <text x="118" y="55" font-family="-apple-system, 'SF Pro Rounded', sans-serif" font-size="38" font-weight="700" fill="#1C1C1E">拾光</text>
  <text x="118" y="82" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="url(#prismGrad2)" letter-spacing="1">Seeklight</text>
</svg>`;

// 写入所有文件
const logos = [
    { name: 'logo_v3_1a_polaroid.svg', content: logo_v3_1a },
    { name: 'logo_v3_1b_sunring.svg', content: logo_v3_1b },
    { name: 'logo_v3_5a_capsule.svg', content: logo_v3_5a },
    { name: 'logo_v3_5b_prism.svg', content: logo_v3_5b }
];

logos.forEach(logo => {
    fs.writeFileSync(path.join(outputDir, logo.name), logo.content, 'utf8');
    console.log(`Generated: ${logo.name}`);
});

console.log('\nv3 精简版Logo已生成！');
