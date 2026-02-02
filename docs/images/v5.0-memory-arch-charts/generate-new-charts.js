/**
 * 生成层次化记忆架构核心化相关图片
 */
const fs = require('fs');
const path = require('path');

// 图1: 从理解图片到理解生活 - 认知跃升图
const svg_cognitive_leap = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="gradBasic" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#B0BEC5"/>
      <stop offset="100%" style="stop-color:#78909C"/>
    </linearGradient>
    <linearGradient id="gradAdvanced" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <linearGradient id="gradArrow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2A9D8F"/>
      <stop offset="100%" style="stop-color:#264653"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="800" height="450" fill="#FAFAFA"/>
  
  <!-- 标题 -->
  <text x="400" y="35" font-family="SimHei, sans-serif" font-size="20" font-weight="bold" fill="#353535" text-anchor="middle">认知跃升：从「照片是什么」到「用户经历了什么」</text>
  
  <!-- 左侧：传统相册 -->
  <g transform="translate(50, 70)">
    <rect x="0" y="0" width="280" height="320" rx="12" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="2" filter="url(#shadow)"/>
    <rect x="0" y="0" width="280" height="45" rx="12 12 0 0" fill="url(#gradBasic)"/>
    <text x="140" y="30" font-family="SimHei, sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">传统AI相册</text>
    
    <!-- 单图理解 -->
    <g transform="translate(20, 65)">
      <rect x="0" y="0" width="240" height="55" rx="6" fill="#ECEFF1"/>
      <text x="10" y="22" font-family="SimSun, serif" font-size="13" fill="#455A64">输入：一张海滩照片</text>
      <text x="10" y="42" font-family="SimSun, serif" font-size="13" fill="#455A64">输出：沙滩、椰子树、天空</text>
    </g>
    
    <g transform="translate(20, 135)">
      <rect x="0" y="0" width="240" height="55" rx="6" fill="#ECEFF1"/>
      <text x="10" y="22" font-family="SimSun, serif" font-size="13" fill="#455A64">输入：一张酒店照片</text>
      <text x="10" y="42" font-family="SimSun, serif" font-size="13" fill="#455A64">输出：床、窗户、电视</text>
    </g>
    
    <g transform="translate(20, 205)">
      <rect x="0" y="0" width="240" height="55" rx="6" fill="#ECEFF1"/>
      <text x="10" y="22" font-family="SimSun, serif" font-size="13" fill="#455A64">输入：一张美食照片</text>
      <text x="10" y="42" font-family="SimSun, serif" font-size="13" fill="#455A64">输出：海鲜、餐厅、盘子</text>
    </g>
    
    <!-- 痛点 -->
    <rect x="20" y="275" width="240" height="35" rx="6" fill="#FFEBEE" stroke="#E53935" stroke-width="1"/>
    <text x="140" y="297" font-family="SimSun, serif" font-size="12" fill="#C62828" text-anchor="middle">❌ 无法搜索「上次去海边的照片」</text>
  </g>
  
  <!-- 中间：跃升箭头 -->
  <g transform="translate(345, 180)">
    <path d="M0,50 L80,50 L80,30 L110,55 L80,80 L80,60 L0,60 Z" fill="url(#gradArrow)"/>
    <text x="55" y="100" font-family="SimHei, sans-serif" font-size="12" fill="#2A9D8F" text-anchor="middle">层次化记忆</text>
    <text x="55" y="116" font-family="SimHei, sans-serif" font-size="12" fill="#2A9D8F" text-anchor="middle">架构</text>
  </g>
  
  <!-- 右侧：拾光 -->
  <g transform="translate(470, 70)">
    <rect x="0" y="0" width="280" height="320" rx="12" fill="#FFFFFF" stroke="#E76F51" stroke-width="2" filter="url(#shadow)"/>
    <rect x="0" y="0" width="280" height="45" rx="12 12 0 0" fill="url(#gradAdvanced)"/>
    <text x="140" y="30" font-family="SimHei, sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">拾光 · 层次化记忆</text>
    
    <!-- 三层记忆 -->
    <g transform="translate(20, 60)">
      <rect x="0" y="0" width="240" height="42" rx="6" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
      <text x="120" y="18" font-family="SimHei, sans-serif" font-size="12" fill="#2E7D32" text-anchor="middle">短期记忆（单图理解）</text>
      <text x="120" y="34" font-family="SimSun, serif" font-size="11" fill="#455A64" text-anchor="middle">沙滩+椰子树 | 酒店+床 | 海鲜+餐厅</text>
    </g>
    
    <text x="140" y="118" font-family="SimHei, sans-serif" font-size="14" fill="#2A9D8F" text-anchor="middle">↓ Reflection推断 ↓</text>
    
    <g transform="translate(20, 130)">
      <rect x="0" y="0" width="240" height="60" rx="6" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
      <text x="120" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#E65100" text-anchor="middle">长期记忆（跨图推断）</text>
      <text x="120" y="40" font-family="SimSun, serif" font-size="12" fill="#455A64" text-anchor="middle">高级事实：用户正在三亚旅行</text>
      <text x="120" y="54" font-family="SimSun, serif" font-size="10" fill="#78909C" text-anchor="middle">置信度: 0.92 | 证据: 15张照片</text>
    </g>
    
    <g transform="translate(20, 205)">
      <rect x="0" y="0" width="240" height="45" rx="6" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1"/>
      <text x="120" y="18" font-family="SimHei, sans-serif" font-size="12" fill="#6A1B9A" text-anchor="middle">隐式记忆（偏好学习）</text>
      <text x="120" y="36" font-family="SimSun, serif" font-size="11" fill="#455A64" text-anchor="middle">用户旅行时偏好高饱和度风景滤镜</text>
    </g>
    
    <!-- 优势 -->
    <rect x="20" y="265" width="240" height="45" rx="6" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
    <text x="140" y="285" font-family="SimSun, serif" font-size="12" fill="#2E7D32" text-anchor="middle">✓ 搜索「上次去海边」→ 返回50张</text>
    <text x="140" y="302" font-family="SimSun, serif" font-size="11" fill="#4CAF50" text-anchor="middle">理解「用户经历」而非「照片内容」</text>
  </g>
  
  <!-- 底部说明 -->
  <text x="400" y="425" font-family="SimSun, serif" font-size="12" fill="#78909C" text-anchor="middle">层次化记忆架构使拾光从「存储工具」进化为「生活伙伴」</text>
</svg>`;

// 图2: 三层记忆与用户检索需求映射图
const svg_memory_need_mapping = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
  <defs>
    <linearGradient id="gradNeed" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3498db"/>
      <stop offset="100%" style="stop-color:#2980b9"/>
    </linearGradient>
    <linearGradient id="gradMemory" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <filter id="shadowSmall">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.12"/>
    </filter>
  </defs>
  
  <rect width="800" height="400" fill="#FAFAFA"/>
  
  <!-- 标题 -->
  <text x="400" y="30" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#353535" text-anchor="middle">用户检索需求 → 记忆层响应映射</text>
  
  <!-- 左侧：用户需求 -->
  <g transform="translate(30, 55)">
    <rect x="0" y="0" width="340" height="300" rx="10" fill="#FFFFFF" stroke="#3498db" stroke-width="2" filter="url(#shadowSmall)"/>
    <rect x="0" y="0" width="340" height="40" rx="10 10 0 0" fill="url(#gradNeed)"/>
    <text x="170" y="26" font-family="SimHei, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">用户检索场景</text>
    
    <!-- 场景1 -->
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="310" height="70" rx="6" fill="#E3F2FD"/>
      <text x="10" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#1565C0">场景1：精确查询</text>
      <text x="10" y="40" font-family="SimSun, serif" font-size="11" fill="#455A64">「2026年1月15日的发票」</text>
      <text x="10" y="58" font-family="SimSun, serif" font-size="10" fill="#78909C">特征：有明确时间/对象，单图匹配</text>
    </g>
    
    <!-- 场景2 -->
    <g transform="translate(15, 135)">
      <rect x="0" y="0" width="310" height="70" rx="6" fill="#FFF8E1"/>
      <text x="10" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#F57F17">场景2：模糊查询</text>
      <text x="10" y="40" font-family="SimSun, serif" font-size="11" fill="#455A64">「上次去海边的照片」「旅行时拍的」</text>
      <text x="10" y="58" font-family="SimSun, serif" font-size="10" fill="#78909C">特征：跨时间跨图片，需要推断「经历」</text>
    </g>
    
    <!-- 场景3 -->
    <g transform="translate(15, 215)">
      <rect x="0" y="0" width="310" height="70" rx="6" fill="#F3E5F5"/>
      <text x="10" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#7B1FA2">场景3：偏好推荐</text>
      <text x="10" y="40" font-family="SimSun, serif" font-size="11" fill="#455A64">「推荐这张食物照片的滤镜」</text>
      <text x="10" y="58" font-family="SimSun, serif" font-size="10" fill="#78909C">特征：个性化，需要学习用户习惯</text>
    </g>
  </g>
  
  <!-- 中间：映射箭头 -->
  <g transform="translate(380, 140)">
    <path d="M0,55 L30,55 L30,35 L50,60 L30,85 L30,65 L0,65 Z" fill="#2A9D8F"/>
    <path d="M0,135 L30,135 L30,115 L50,140 L30,165 L30,145 L0,145 Z" fill="#2A9D8F"/>
    <path d="M0,215 L30,215 L30,195 L50,220 L30,245 L30,225 L0,225 Z" fill="#2A9D8F"/>
  </g>
  
  <!-- 右侧：记忆层 -->
  <g transform="translate(430, 55)">
    <rect x="0" y="0" width="340" height="300" rx="10" fill="#FFFFFF" stroke="#E76F51" stroke-width="2" filter="url(#shadowSmall)"/>
    <rect x="0" y="0" width="340" height="40" rx="10 10 0 0" fill="url(#gradMemory)"/>
    <text x="170" y="26" font-family="SimHei, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">记忆层响应</text>
    
    <!-- 短期记忆 -->
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="310" height="70" rx="6" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
      <text x="10" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#2E7D32">短期记忆（ImageMemory）</text>
      <text x="10" y="40" font-family="SimSun, serif" font-size="11" fill="#455A64">直接检索：向量相似度 + 时间过滤</text>
      <text x="10" y="58" font-family="SimSun, serif" font-size="10" fill="#4CAF50">✓ 已实现 | TRL 7级</text>
    </g>
    
    <!-- 长期记忆 -->
    <g transform="translate(15, 135)">
      <rect x="0" y="0" width="310" height="70" rx="6" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
      <text x="10" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#E65100">长期记忆（HighLevelFact）</text>
      <text x="10" y="40" font-family="SimSun, serif" font-size="11" fill="#455A64">Reflection推断 → 关联多图 → 返回事件</text>
      <text x="10" y="58" font-family="SimSun, serif" font-size="10" fill="#FF9800">⚡ 核心创新 | TRL 3级</text>
    </g>
    
    <!-- 隐式记忆 -->
    <g transform="translate(15, 215)">
      <rect x="0" y="0" width="310" height="70" rx="6" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1"/>
      <text x="10" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#6A1B9A">隐式记忆（UserPreference）</text>
      <text x="10" y="40" font-family="SimSun, serif" font-size="11" fill="#455A64">EMA偏好更新 → 场景化推荐</text>
      <text x="10" y="58" font-family="SimSun, serif" font-size="10" fill="#9C27B0">⚡ 差异化能力 | TRL 3级</text>
    </g>
  </g>
  
  <!-- 底部说明 -->
  <rect x="150" y="365" width="500" height="25" rx="4" fill="#FFF8E1" stroke="#FFB74D" stroke-width="1"/>
  <text x="400" y="382" font-family="SimSun, serif" font-size="11" fill="#E65100" text-anchor="middle">长期记忆层的Reflection机制是拾光区别于所有竞品的核心技术壁垒</text>
</svg>`;

// 图3: 创新点重排序对比图
const svg_innovation_reorder = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="380" viewBox="0 0 800 380">
  <defs>
    <linearGradient id="gradOld" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#B0BEC5"/>
      <stop offset="100%" style="stop-color:#90A4AE"/>
    </linearGradient>
    <linearGradient id="gradNew" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <filter id="shadowLight">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.1"/>
    </filter>
  </defs>
  
  <rect width="800" height="380" fill="#FAFAFA"/>
  
  <!-- 标题 -->
  <text x="400" y="30" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#353535" text-anchor="middle">技术创新点排序重构</text>
  
  <!-- 左侧：原排序 -->
  <g transform="translate(50, 55)">
    <rect x="0" y="0" width="300" height="280" rx="10" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="2" filter="url(#shadowLight)"/>
    <rect x="0" y="0" width="300" height="40" rx="10 10 0 0" fill="url(#gradOld)"/>
    <text x="150" y="26" font-family="SimHei, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">原排序（待修正）</text>
    
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="270" height="60" rx="6" fill="#FFEBEE" stroke="#E53935" stroke-width="1"/>
      <circle cx="25" cy="30" r="18" fill="#E53935"/>
      <text x="25" y="35" font-family="SimHei, sans-serif" font-size="14" fill="#FFFFFF" text-anchor="middle">1</text>
      <text x="55" y="25" font-family="SimHei, sans-serif" font-size="12" fill="#C62828">端云协同推理架构</text>
      <text x="55" y="45" font-family="SimSun, serif" font-size="10" fill="#78909C">技术难度: ⭐ | 代码量: ~50行</text>
    </g>
    
    <g transform="translate(15, 125)">
      <rect x="0" y="0" width="270" height="60" rx="6" fill="#FFF8E1"/>
      <circle cx="25" cy="30" r="18" fill="#FF9800"/>
      <text x="25" y="35" font-family="SimHei, sans-serif" font-size="14" fill="#FFFFFF" text-anchor="middle">2</text>
      <text x="55" y="25" font-family="SimHei, sans-serif" font-size="12" fill="#E65100">多层处理管道</text>
      <text x="55" y="45" font-family="SimSun, serif" font-size="10" fill="#78909C">技术难度: ⭐⭐ | 代码量: ~200行</text>
    </g>
    
    <g transform="translate(15, 195)">
      <rect x="0" y="0" width="270" height="60" rx="6" fill="#E8F5E9"/>
      <circle cx="25" cy="30" r="18" fill="#4CAF50"/>
      <text x="25" y="35" font-family="SimHei, sans-serif" font-size="14" fill="#FFFFFF" text-anchor="middle">3</text>
      <text x="55" y="25" font-family="SimHei, sans-serif" font-size="12" fill="#2E7D32">层次化记忆架构</text>
      <text x="55" y="45" font-family="SimSun, serif" font-size="10" fill="#78909C">技术难度: ⭐⭐⭐⭐ | 代码量: ~2000行</text>
    </g>
  </g>
  
  <!-- 中间：调整箭头 -->
  <g transform="translate(365, 180)">
    <path d="M0,15 L50,15 L50,0 L70,20 L50,40 L50,25 L0,25 Z" fill="#2A9D8F"/>
    <text x="35" y="60" font-family="SimSun, serif" font-size="11" fill="#2A9D8F" text-anchor="middle">重新排序</text>
  </g>
  
  <!-- 右侧：新排序 -->
  <g transform="translate(450, 55)">
    <rect x="0" y="0" width="300" height="280" rx="10" fill="#FFFFFF" stroke="#E76F51" stroke-width="2" filter="url(#shadowLight)"/>
    <rect x="0" y="0" width="300" height="40" rx="10 10 0 0" fill="url(#gradNew)"/>
    <text x="150" y="26" font-family="SimHei, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">新排序（推荐）</text>
    
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="270" height="60" rx="6" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <circle cx="25" cy="30" r="18" fill="#E76F51"/>
      <text x="25" y="35" font-family="SimHei, sans-serif" font-size="14" fill="#FFFFFF" text-anchor="middle">1</text>
      <text x="55" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#E65100" font-weight="bold">层次化记忆架构</text>
      <text x="55" y="37" font-family="SimSun, serif" font-size="10" fill="#455A64">核心认知创新 | 竞品无</text>
      <text x="55" y="52" font-family="SimSun, serif" font-size="9" fill="#4CAF50">⬆ 篇幅扩充至800字</text>
    </g>
    
    <g transform="translate(15, 125)">
      <rect x="0" y="0" width="270" height="60" rx="6" fill="#E3F2FD"/>
      <circle cx="25" cy="30" r="18" fill="#1976D2"/>
      <text x="25" y="35" font-family="SimHei, sans-serif" font-size="14" fill="#FFFFFF" text-anchor="middle">2</text>
      <text x="55" y="25" font-family="SimHei, sans-serif" font-size="12" fill="#1565C0">多层处理管道</text>
      <text x="55" y="45" font-family="SimSun, serif" font-size="10" fill="#455A64">工程架构创新 | 部分竞品有</text>
    </g>
    
    <g transform="translate(15, 195)">
      <rect x="0" y="0" width="270" height="60" rx="6" fill="#ECEFF1"/>
      <circle cx="25" cy="30" r="18" fill="#78909C"/>
      <text x="25" y="35" font-family="SimHei, sans-serif" font-size="14" fill="#FFFFFF" text-anchor="middle">3</text>
      <text x="55" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#455A64">端云协同推理架构</text>
      <text x="55" y="37" font-family="SimSun, serif" font-size="10" fill="#455A64">隐私合规创新 | 很多产品有</text>
      <text x="55" y="52" font-family="SimSun, serif" font-size="9" fill="#E53935">⬇ 篇幅精简至150字</text>
    </g>
  </g>
  
  <!-- 底部说明 -->
  <text x="400" y="355" font-family="SimSun, serif" font-size="12" fill="#78909C" text-anchor="middle">排序依据：技术难度 × 竞品差异化 × 代码复杂度</text>
</svg>`;

// 写入文件
fs.writeFileSync(path.join(__dirname, 'diagram_cognitive_leap.svg'), svg_cognitive_leap);
fs.writeFileSync(path.join(__dirname, 'diagram_memory_need_mapping.svg'), svg_memory_need_mapping);
fs.writeFileSync(path.join(__dirname, 'diagram_innovation_reorder.svg'), svg_innovation_reorder);

console.log('SVG图片生成完成!');
console.log('- diagram_cognitive_leap.svg');
console.log('- diagram_memory_need_mapping.svg');
console.log('- diagram_innovation_reorder.svg');
