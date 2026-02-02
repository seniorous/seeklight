/**
 * 拾光团队Logo v2 - 采用方案1晨曦微光配色
 * 配色：Sunset Orange #F4A261, Retro Teal #2A9D8F, 
 *       Warm Paper #FDFCF0, Charcoal #353535
 */

const fs = require('fs');
const path = require('path');

const outputDir = __dirname;

// ==================== 团队Logo A: 协作之环 ====================
const team_v2_a = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="teamRingA" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <filter id="teamGlowA">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#F4A261" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <rect width="320" height="120" fill="#FDFCF0"/>
  
  <!-- 协作之环 -->
  <g transform="translate(15, 12)">
    <!-- 外环 -->
    <circle cx="48" cy="48" r="42" fill="none" stroke="#E9C46A" stroke-width="3" opacity="0.4"/>
    <!-- 三人环绕 -->
    <circle cx="48" cy="20" r="14" fill="url(#teamRingA)" filter="url(#teamGlowA)"/>
    <circle cx="24" cy="68" r="14" fill="#2A9D8F" filter="url(#teamGlowA)"/>
    <circle cx="72" cy="68" r="14" fill="#E9C46A" filter="url(#teamGlowA)"/>
    <!-- 连接线 -->
    <line x1="48" y1="34" x2="30" y2="56" stroke="#353535" stroke-width="2" opacity="0.3"/>
    <line x1="48" y1="34" x2="66" y2="56" stroke="#353535" stroke-width="2" opacity="0.3"/>
    <line x1="38" y1="68" x2="58" y2="68" stroke="#353535" stroke-width="2" opacity="0.3"/>
    <!-- 中心光点 -->
    <circle cx="48" cy="50" r="6" fill="#FDFCF0" stroke="#F4A261" stroke-width="2"/>
  </g>
  
  <text x="115" y="50" font-family="-apple-system, sans-serif" font-size="26" font-weight="700" fill="#353535">拾光团队</text>
  <text x="115" y="78" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" fill="#2A9D8F" letter-spacing="0.5">Seeklight Team</text>
</svg>`;

// ==================== 团队Logo B: 光芒聚合 ====================
const team_v2_b = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E9C46A"/>
    </linearGradient>
    <filter id="beamGlow">
      <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#F4A261" flood-opacity="0.35"/>
    </filter>
  </defs>
  
  <rect width="320" height="120" fill="#FDFCF0"/>
  
  <!-- 光芒聚合 -->
  <g transform="translate(12, 10)">
    <!-- 中心聚合点 -->
    <circle cx="50" cy="50" r="18" fill="url(#beamGrad)" filter="url(#beamGlow)"/>
    <circle cx="50" cy="50" r="8" fill="#FDFCF0" opacity="0.6"/>
    <!-- 四道光芒 -->
    <path d="M50 10 L55 32 L50 28 L45 32 Z" fill="#F4A261" opacity="0.8"/>
    <path d="M90 50 L68 55 L72 50 L68 45 Z" fill="#2A9D8F" opacity="0.8"/>
    <path d="M50 90 L45 68 L50 72 L55 68 Z" fill="#E9C46A" opacity="0.8"/>
    <path d="M10 50 L32 45 L28 50 L32 55 Z" fill="#E76F51" opacity="0.8"/>
    <!-- 外围光点 -->
    <circle cx="22" cy="22" r="4" fill="#F4A261" opacity="0.5"/>
    <circle cx="78" cy="22" r="4" fill="#2A9D8F" opacity="0.5"/>
    <circle cx="78" cy="78" r="4" fill="#E9C46A" opacity="0.5"/>
    <circle cx="22" cy="78" r="4" fill="#E76F51" opacity="0.5"/>
  </g>
  
  <text x="115" y="50" font-family="-apple-system, sans-serif" font-size="26" font-weight="700" fill="#353535">拾光团队</text>
  <text x="115" y="78" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" fill="#2A9D8F" letter-spacing="0.5">Seeklight Team</text>
</svg>`;

// ==================== 团队Logo C: 种子萌芽 ====================
const team_v2_c = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="seedGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#2A9D8F"/>
      <stop offset="100%" style="stop-color:#F4A261"/>
    </linearGradient>
    <filter id="seedGlow">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#F4A261" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <rect width="320" height="120" fill="#FDFCF0"/>
  
  <!-- 种子萌芽 -->
  <g transform="translate(15, 8)">
    <!-- 土壤底座 -->
    <ellipse cx="48" cy="90" rx="38" ry="10" fill="#E9C46A" opacity="0.4"/>
    <!-- 主茎 -->
    <path d="M48 85 Q48 60 48 45" stroke="#2A9D8F" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- 叶片 -->
    <ellipse cx="35" cy="55" rx="12" ry="6" fill="#2A9D8F" transform="rotate(-30 35 55)" opacity="0.8"/>
    <ellipse cx="61" cy="50" rx="12" ry="6" fill="#2A9D8F" transform="rotate(30 61 50)" opacity="0.8"/>
    <!-- 光芒花苞 -->
    <circle cx="48" cy="28" r="18" fill="url(#seedGrad)" filter="url(#seedGlow)"/>
    <circle cx="48" cy="28" r="8" fill="#FDFCF0" opacity="0.5"/>
    <circle cx="44" cy="24" r="3" fill="#FDFCF0" opacity="0.8"/>
    <!-- 散落光点 -->
    <circle cx="25" cy="20" r="3" fill="#F4A261" opacity="0.5"/>
    <circle cx="72" cy="25" r="3" fill="#E9C46A" opacity="0.5"/>
    <circle cx="80" cy="45" r="2" fill="#F4A261" opacity="0.4"/>
  </g>
  
  <text x="115" y="50" font-family="-apple-system, sans-serif" font-size="26" font-weight="700" fill="#353535">拾光团队</text>
  <text x="115" y="78" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" fill="#2A9D8F" letter-spacing="0.5">Seeklight Team</text>
</svg>`;

// ==================== 团队Logo D: 星链网络 ====================
const team_v2_d = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <filter id="starGlow">
      <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="#F4A261" flood-opacity="0.4"/>
    </filter>
  </defs>
  
  <rect width="320" height="120" fill="#FDFCF0"/>
  
  <!-- 星链网络 -->
  <g transform="translate(10, 10)">
    <!-- 连接线网络 -->
    <line x1="50" y1="50" x2="20" y2="25" stroke="#E9C46A" stroke-width="2" opacity="0.5"/>
    <line x1="50" y1="50" x2="80" y2="25" stroke="#E9C46A" stroke-width="2" opacity="0.5"/>
    <line x1="50" y1="50" x2="20" y2="75" stroke="#E9C46A" stroke-width="2" opacity="0.5"/>
    <line x1="50" y1="50" x2="80" y2="75" stroke="#E9C46A" stroke-width="2" opacity="0.5"/>
    <line x1="20" y1="25" x2="80" y2="25" stroke="#E9C46A" stroke-width="1.5" opacity="0.3"/>
    <line x1="20" y1="75" x2="80" y2="75" stroke="#E9C46A" stroke-width="1.5" opacity="0.3"/>
    <line x1="20" y1="25" x2="20" y2="75" stroke="#E9C46A" stroke-width="1.5" opacity="0.3"/>
    <line x1="80" y1="25" x2="80" y2="75" stroke="#E9C46A" stroke-width="1.5" opacity="0.3"/>
    
    <!-- 中心节点 -->
    <circle cx="50" cy="50" r="14" fill="#F4A261" filter="url(#starGlow)"/>
    <circle cx="50" cy="50" r="6" fill="#FDFCF0" opacity="0.6"/>
    
    <!-- 四角节点 -->
    <circle cx="20" cy="25" r="10" fill="#2A9D8F" filter="url(#starGlow)"/>
    <circle cx="80" cy="25" r="10" fill="#E9C46A" filter="url(#starGlow)"/>
    <circle cx="20" cy="75" r="10" fill="#E76F51" filter="url(#starGlow)"/>
    <circle cx="80" cy="75" r="10" fill="#2A9D8F" filter="url(#starGlow)"/>
  </g>
  
  <text x="115" y="50" font-family="-apple-system, sans-serif" font-size="26" font-weight="700" fill="#353535">拾光团队</text>
  <text x="115" y="78" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" fill="#2A9D8F" letter-spacing="0.5">Seeklight Team</text>
</svg>`;

// 写入所有文件
const logos = [
    { name: 'team_v2_a_collab_ring.svg', content: team_v2_a },
    { name: 'team_v2_b_light_beams.svg', content: team_v2_b },
    { name: 'team_v2_c_seed_sprout.svg', content: team_v2_c },
    { name: 'team_v2_d_star_network.svg', content: team_v2_d }
];

logos.forEach(logo => {
    fs.writeFileSync(path.join(outputDir, logo.name), logo.content, 'utf8');
    console.log(`Generated: ${logo.name}`);
});

console.log('\n团队Logo v2 已生成！');
