/**
 * 拾光项目Logo设计 v2 - 基于5种UI风格
 */

const fs = require('fs');
const path = require('path');

const outputDir = __dirname;

// ==================== Scheme 1: The Golden Hour (晨曦微光) ====================
// Nostalgic, Editorial, Warm, Kinfolk Magazine style
const logo1_goldenHour = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180">
  <defs>
    <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <filter id="paperTexture">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
      <feDiffuseLighting in="noise" lighting-color="#FDFCF0" surfaceScale="2">
        <feDistantLight azimuth="45" elevation="60"/>
      </feDiffuseLighting>
    </filter>
  </defs>
  
  <!-- Paper-like Background -->
  <rect width="400" height="180" fill="#FDFCF0"/>
  <rect width="400" height="180" fill="#F5F0E1" opacity="0.3"/>
  
  <!-- Polaroid Frame Icon -->
  <g transform="translate(35, 25)">
    <!-- Outer frame with shadow -->
    <rect x="0" y="0" width="100" height="120" rx="3" fill="#FFFFFF" filter="drop-shadow(2px 3px 4px rgba(53,53,53,0.15))"/>
    <!-- Photo area -->
    <rect x="8" y="8" width="84" height="84" fill="#E8E4DA"/>
    <!-- Sun/Light element inside -->
    <circle cx="50" cy="45" r="25" fill="url(#sunsetGrad)"/>
    <circle cx="50" cy="45" r="15" fill="#FDFCF0" opacity="0.4"/>
    <!-- Mountain silhouette -->
    <path d="M8 75 L30 55 L50 70 L75 45 L92 75 L92 92 L8 92 Z" fill="#353535" opacity="0.2"/>
    <!-- Polaroid bottom space -->
    <rect x="8" y="92" width="84" height="20" fill="#FFFFFF"/>
  </g>
  
  <!-- Typography - Editorial Style -->
  <g transform="translate(155, 55)">
    <text x="0" y="0" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="400" fill="#353535" letter-spacing="2">拾光</text>
    <text x="0" y="35" font-family="Georgia, serif" font-size="16" font-style="italic" fill="#2A9D8F" letter-spacing="3">Shi Guang</text>
    <line x1="0" y1="50" x2="120" y2="50" stroke="#F4A261" stroke-width="2"/>
    <text x="0" y="72" font-family="Georgia, serif" font-size="11" fill="#353535" opacity="0.6" letter-spacing="1">Pick Up Light · 拾起时光</text>
  </g>
</svg>`;

// ==================== Scheme 2: The AI Prism (棱镜光谱) ====================
// Modern Tech, Fluid, Holographic
const logo2_aiPrism = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180">
  <defs>
    <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7F5AF0"/>
      <stop offset="50%" style="stop-color:#2CB67D"/>
      <stop offset="100%" style="stop-color:#007AFF"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#7F5AF0;stop-opacity:0.3"/>
      <stop offset="50%" style="stop-color:#2CB67D;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#007AFF;stop-opacity:0.3"/>
    </linearGradient>
    <filter id="glassBlur">
      <feGaussianBlur stdDeviation="1"/>
    </filter>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  
  <!-- Clean Background -->
  <rect width="400" height="180" fill="#FFFFFE"/>
  
  <!-- Prism Icon -->
  <g transform="translate(40, 30)">
    <!-- Outer glow ring -->
    <circle cx="55" cy="60" r="55" fill="none" stroke="url(#glowGrad)" stroke-width="3"/>
    <!-- Glass prism triangle -->
    <path d="M55 15 L95 95 L15 95 Z" fill="none" stroke="url(#prismGrad)" stroke-width="3" stroke-linejoin="round"/>
    <!-- Light refraction rays -->
    <g stroke-width="2" stroke-linecap="round" opacity="0.8">
      <line x1="55" y1="55" x2="20" y2="35" stroke="#7F5AF0"/>
      <line x1="55" y1="55" x2="15" y2="55" stroke="#2CB67D"/>
      <line x1="55" y1="55" x2="25" y2="80" stroke="#007AFF"/>
    </g>
    <!-- Center light source -->
    <circle cx="55" cy="55" r="12" fill="url(#prismGrad)" filter="url(#glow)"/>
    <circle cx="55" cy="55" r="5" fill="#FFFFFF"/>
  </g>
  
  <!-- Modern Typography -->
  <g transform="translate(160, 50)">
    <text x="0" y="0" font-family="Inter, 'SF Pro Display', -apple-system, sans-serif" font-size="38" font-weight="600" fill="#16161A">拾光</text>
    <text x="0" y="32" font-family="Inter, sans-serif" font-size="15" font-weight="500" fill="url(#prismGrad)" letter-spacing="4">SEEKLIGHT</text>
    <text x="0" y="60" font-family="Inter, sans-serif" font-size="11" fill="#94A1B2" letter-spacing="1">AI-Powered Semantic Photo Search</text>
  </g>
  
  <!-- Gradient border accent -->
  <rect x="0" y="175" width="400" height="5" fill="url(#prismGrad)"/>
</svg>`;

// ==================== Scheme 3: The Gallery (静谧画廊) ====================
// Brutalist, High-Fashion, Minimalist
const logo3_gallery = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180">
  <!-- Gallery Grey Background -->
  <rect width="400" height="180" fill="#F5F5F7"/>
  
  <!-- Strict Grid Icon -->
  <g transform="translate(30, 25)">
    <!-- Mathematical grid frame -->
    <rect x="0" y="0" width="110" height="130" fill="none" stroke="#000000" stroke-width="2"/>
    <!-- Inner divisions -->
    <line x1="55" y1="0" x2="55" y2="130" stroke="#000000" stroke-width="1"/>
    <line x1="0" y1="43" x2="110" y2="43" stroke="#000000" stroke-width="1"/>
    <line x1="0" y1="86" x2="110" y2="86" stroke="#000000" stroke-width="1"/>
    <!-- Red accent dot (sparingly) -->
    <circle cx="82" cy="22" r="8" fill="#FF3B30"/>
    <!-- Abstract light symbol -->
    <g fill="#000000">
      <rect x="15" y="55" width="25" height="25"/>
      <rect x="70" y="55" width="25" height="3"/>
      <rect x="70" y="63" width="25" height="3"/>
      <rect x="70" y="71" width="25" height="3"/>
      <rect x="15" y="98" width="80" height="20" fill="none" stroke="#000000" stroke-width="1"/>
    </g>
  </g>
  
  <!-- Massive Typography -->
  <g transform="translate(160, 40)">
    <text x="0" y="0" font-family="Helvetica Neue, Arial, sans-serif" font-size="56" font-weight="700" fill="#000000" letter-spacing="-2">拾光</text>
    <text x="0" y="45" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" font-weight="400" fill="#000000" letter-spacing="8">SEEKLIGHT</text>
    <line x1="0" y1="60" x2="180" y2="60" stroke="#000000" stroke-width="1"/>
    <text x="0" y="82" font-family="Helvetica Neue, Arial, sans-serif" font-size="10" font-weight="300" fill="#666666" letter-spacing="2">SMART PHOTO ALBUM</text>
  </g>
</svg>`;

// ==================== Scheme 4: The Developer's Obsidian (深空聚焦) ====================
// Linear/Vercel Aesthetic, Dark Mode Native
const logo4_obsidian = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180">
  <defs>
    <linearGradient id="cosmicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5E6AD2"/>
      <stop offset="100%" style="stop-color:#8B5CF6"/>
    </linearGradient>
    <filter id="innerGlow">
      <feFlood flood-color="#5E6AD2" flood-opacity="0.3"/>
      <feComposite in2="SourceAlpha" operator="in"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="SourceAlpha" operator="in"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  
  <!-- Rich Dark Background -->
  <rect width="400" height="180" fill="#0F1115"/>
  
  <!-- Command Palette Style Icon -->
  <g transform="translate(30, 30)">
    <!-- Outer border with subtle glow -->
    <rect x="0" y="0" width="110" height="120" rx="8" fill="none" stroke="#FFFFFF1A" stroke-width="1"/>
    <!-- Inner glow area -->
    <rect x="5" y="5" width="100" height="110" rx="6" fill="#1A1D23" filter="url(#innerGlow)"/>
    <!-- CMD+K style prompt -->
    <rect x="12" y="15" width="86" height="28" rx="4" fill="#0F1115" stroke="#FFFFFF1A" stroke-width="1"/>
    <text x="22" y="34" font-family="'JetBrains Mono', 'SF Mono', monospace" font-size="11" fill="#9CA3AF">⌘K search...</text>
    <!-- Code-style tags -->
    <g font-family="'JetBrains Mono', monospace" font-size="9">
      <rect x="12" y="52" width="40" height="18" rx="3" fill="#5E6AD21A" stroke="#5E6AD2" stroke-width="1"/>
      <text x="18" y="64" fill="#5E6AD2">photo</text>
      <rect x="58" y="52" width="40" height="18" rx="3" fill="#2CB67D1A" stroke="#2CB67D" stroke-width="1"/>
      <text x="64" y="64" fill="#2CB67D">2024</text>
    </g>
    <!-- Semantic dots -->
    <g fill="#5E6AD2">
      <circle cx="25" cy="90" r="4"/>
      <circle cx="45" cy="95" r="3" opacity="0.7"/>
      <circle cx="65" cy="88" r="5"/>
      <circle cx="85" cy="93" r="3" opacity="0.5"/>
    </g>
  </g>
  
  <!-- Developer Typography -->
  <g transform="translate(160, 45)">
    <text x="0" y="0" font-family="Inter, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#FFFFFF">拾光</text>
    <text x="0" y="30" font-family="'JetBrains Mono', monospace" font-size="13" fill="url(#cosmicGrad)" letter-spacing="2">seeklight</text>
    <text x="0" y="55" font-family="Inter, sans-serif" font-size="10" fill="#6B7280" letter-spacing="1">Semantic Search · AI-Native · Privacy First</text>
    <!-- Version badge -->
    <rect x="0" y="70" width="45" height="16" rx="3" fill="#5E6AD21A" stroke="#5E6AD240" stroke-width="1"/>
    <text x="8" y="82" font-family="'JetBrains Mono', monospace" font-size="9" fill="#5E6AD2">v1.0</text>
  </g>
</svg>`;

// ==================== Scheme 5: Luminous Air (通透呼吸) ====================
// Apple/Airbnb Modernism, Accessible, Friendly
const logo5_luminousAir = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180">
  <defs>
    <linearGradient id="blurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5856D6"/>
      <stop offset="100%" style="stop-color:#FF2D55"/>
    </linearGradient>
    <filter id="softShadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#5856D6" flood-opacity="0.25"/>
    </filter>
    <filter id="frostedGlass">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
    </filter>
  </defs>
  
  <!-- Adaptive Light Background -->
  <rect width="400" height="180" fill="#F2F2F7"/>
  
  <!-- Floating Capsule Icon -->
  <g transform="translate(30, 25)">
    <!-- Frosted glass base -->
    <rect x="0" y="0" width="115" height="130" rx="28" fill="#FFFFFF" opacity="0.9" filter="url(#softShadow)"/>
    <!-- Inner translucent layer -->
    <rect x="8" y="8" width="99" height="114" rx="22" fill="#F2F2F7" opacity="0.6"/>
    
    <!-- Light orb -->
    <circle cx="57" cy="50" r="28" fill="url(#blurpleGrad)" filter="url(#softShadow)"/>
    <circle cx="57" cy="50" r="15" fill="#FFFFFF" opacity="0.4"/>
    <circle cx="50" cy="43" r="5" fill="#FFFFFF" opacity="0.8"/>
    
    <!-- Pill-shaped search hint -->
    <rect x="15" y="95" width="85" height="26" rx="13" fill="url(#blurpleGrad)" opacity="0.15"/>
    <text x="57" y="112" font-family="'SF Pro Rounded', -apple-system, sans-serif" font-size="10" fill="#5856D6" text-anchor="middle" font-weight="500">Search memories</text>
  </g>
  
  <!-- Friendly Typography -->
  <g transform="translate(165, 45)">
    <text x="0" y="0" font-family="'SF Pro Rounded', -apple-system, sans-serif" font-size="42" font-weight="700" fill="#1C1C1E">拾光</text>
    <text x="0" y="35" font-family="'SF Pro Rounded', sans-serif" font-size="16" font-weight="600" fill="url(#blurpleGrad)" letter-spacing="1">Seeklight</text>
    <text x="0" y="62" font-family="'SF Pro Text', sans-serif" font-size="12" fill="#8E8E93" letter-spacing="0.5">Your memories, beautifully organized</text>
    
    <!-- Pill button accent -->
    <rect x="0" y="78" width="100" height="32" rx="16" fill="url(#blurpleGrad)" filter="url(#softShadow)"/>
    <text x="50" y="99" font-family="'SF Pro Text', sans-serif" font-size="12" font-weight="600" fill="#FFFFFF" text-anchor="middle">Get Started</text>
  </g>
</svg>`;

// 写入所有文件
const logos = [
    { name: 'logo_v2_1_golden_hour.svg', content: logo1_goldenHour },
    { name: 'logo_v2_2_ai_prism.svg', content: logo2_aiPrism },
    { name: 'logo_v2_3_gallery.svg', content: logo3_gallery },
    { name: 'logo_v2_4_obsidian.svg', content: logo4_obsidian },
    { name: 'logo_v2_5_luminous_air.svg', content: logo5_luminousAir }
];

logos.forEach(logo => {
    fs.writeFileSync(path.join(outputDir, logo.name), logo.content, 'utf8');
    console.log(`Generated: ${logo.name}`);
});

console.log('\nv2 Logo设计文件已生成！');
