/**
 * 补充配图生成器
 * 为文字较多、图片较少的章节补充配图
 */
const fs = require('fs');
const path = require('path');

// ========== 1. 项目核心价值主张图 ==========
const svg_core_value = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="850" height="400" viewBox="0 0 850 400">
  <defs>
    <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/><stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4A6FA5"/><stop offset="100%" style="stop-color:#6090C0"/>
    </linearGradient>
    <linearGradient id="privGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#52B788"/>
    </linearGradient>
    <linearGradient id="memGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#9B59B6"/><stop offset="100%" style="stop-color:#BB8FCE"/>
    </linearGradient>
    <filter id="shadowCV"><feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.15"/></filter>
  </defs>
  
  <rect width="850" height="400" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="425" y="35" text-anchor="middle" font-family="SimHei, sans-serif" font-size="20" font-weight="bold" fill="#2C3E50">拾光核心价值主张</text>
  
  <!-- 中心核心主张 -->
  <g transform="translate(425, 200)">
    <ellipse cx="0" cy="0" rx="130" ry="70" fill="url(#coreGrad)" filter="url(#shadowCV)"/>
    <text x="0" y="-15" text-anchor="middle" font-family="SimHei, sans-serif" font-size="14" fill="white" font-weight="bold">用一句话</text>
    <text x="0" y="10" text-anchor="middle" font-family="SimHei, sans-serif" font-size="14" fill="white" font-weight="bold">找到任何截图</text>
    <text x="0" y="35" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="rgba(255,255,255,0.9)">自然语言 × 语义理解 × 本地AI</text>
  </g>
  
  <!-- 左侧：技术基石 -->
  <g transform="translate(80, 120)">
    <rect x="0" y="0" width="200" height="160" rx="12" fill="url(#techGrad)" filter="url(#shadowCV)"/>
    <text x="100" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">技术基石</text>
    <line x1="20" y1="45" x2="180" y2="45" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="20" y="70" font-family="SimSun, serif" font-size="10" fill="white">• 端侧VLM语义理解</text>
    <text x="20" y="90" font-family="SimSun, serif" font-size="10" fill="white">• HNSW向量检索</text>
    <text x="20" y="110" font-family="SimSun, serif" font-size="10" fill="white">• 多层处理管道</text>
    <text x="20" y="130" font-family="SimSun, serif" font-size="10" fill="white">• INT4量化部署</text>
    <text x="20" y="150" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">TRL 7级验证</text>
  </g>
  
  <!-- 右侧：隐私保护 -->
  <g transform="translate(570, 120)">
    <rect x="0" y="0" width="200" height="160" rx="12" fill="url(#privGrad)" filter="url(#shadowCV)"/>
    <text x="100" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">隐私保护</text>
    <line x1="20" y1="45" x2="180" y2="45" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="20" y="70" font-family="SimSun, serif" font-size="10" fill="white">• 数据不出设备</text>
    <text x="20" y="90" font-family="SimSun, serif" font-size="10" fill="white">• 端云协同可选</text>
    <text x="20" y="110" font-family="SimSun, serif" font-size="10" fill="white">• AES-256加密</text>
    <text x="20" y="130" font-family="SimSun, serif" font-size="10" fill="white">• 生物识别解锁</text>
    <text x="20" y="150" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">PIPL合规架构</text>
  </g>
  
  <!-- 底部：记忆认知 -->
  <g transform="translate(325, 300)">
    <rect x="0" y="0" width="200" height="80" rx="12" fill="url(#memGrad)" filter="url(#shadowCV)"/>
    <text x="100" y="28" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">记忆认知</text>
    <text x="100" y="50" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">短期 → 长期 → 隐式</text>
    <text x="100" y="70" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">理解用户经历而非仅理解图片</text>
  </g>
  
  <!-- 连接线 -->
  <line x1="280" y1="200" x2="295" y2="200" stroke="#4A6FA5" stroke-width="2"/>
  <line x1="555" y1="200" x2="570" y2="200" stroke="#2A9D8F" stroke-width="2"/>
  <line x1="425" y1="270" x2="425" y2="300" stroke="#9B59B6" stroke-width="2"/>
</svg>`;

// ========== 2. 未来展望路线图 ==========
const svg_future_roadmap = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="380" viewBox="0 0 900 380">
  <defs>
    <linearGradient id="phase1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#52B788"/>
    </linearGradient>
    <linearGradient id="phase2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4A6FA5"/><stop offset="100%" style="stop-color:#6090C0"/>
    </linearGradient>
    <linearGradient id="phase3Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#9B59B6"/><stop offset="100%" style="stop-color:#BB8FCE"/>
    </linearGradient>
    <filter id="shadowFR"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/></filter>
  </defs>
  
  <rect width="900" height="380" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="450" y="35" text-anchor="middle" font-family="SimHei, sans-serif" font-size="20" font-weight="bold" fill="#2C3E50">拾光未来发展路线图</text>
  
  <!-- 时间线轴 -->
  <line x1="50" y1="200" x2="850" y2="200" stroke="#E0E0E0" stroke-width="3"/>
  
  <!-- 时间节点 -->
  <circle cx="150" cy="200" r="12" fill="#2A9D8F"/>
  <circle cx="450" cy="200" r="12" fill="#4A6FA5"/>
  <circle cx="750" cy="200" r="12" fill="#9B59B6"/>
  
  <!-- 阶段1：短期迭代 -->
  <g transform="translate(50, 70)">
    <rect x="0" y="0" width="200" height="110" rx="10" fill="url(#phase1Grad)" filter="url(#shadowFR)"/>
    <text x="100" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="white" font-weight="bold">短期迭代 (1-3个月)</text>
    <line x1="15" y1="35" x2="185" y2="35" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="15" y="55" font-family="SimSun, serif" font-size="9" fill="white">• MobileCLIP以图搜图</text>
    <text x="15" y="72" font-family="SimSun, serif" font-size="9" fill="white">• 智能清理建议</text>
    <text x="15" y="89" font-family="SimSun, serif" font-size="9" fill="white">• 过期二维码识别</text>
    <text x="15" y="106" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">→ 完善MVP核心体验</text>
  </g>
  <line x1="150" y1="180" x2="150" y2="188" stroke="#2A9D8F" stroke-width="2"/>
  <text x="150" y="230" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#2A9D8F">赛后</text>
  
  <!-- 阶段2：中期规划 -->
  <g transform="translate(350, 70)">
    <rect x="0" y="0" width="200" height="110" rx="10" fill="url(#phase2Grad)" filter="url(#shadowFR)"/>
    <text x="100" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="white" font-weight="bold">中期规划 (3-6个月)</text>
    <line x1="15" y1="35" x2="185" y2="35" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="15" y="55" font-family="SimSun, serif" font-size="9" fill="white">• 视频流理解</text>
    <text x="15" y="72" font-family="SimSun, serif" font-size="9" fill="white">• 多端加密同步(WebDAV)</text>
    <text x="15" y="89" font-family="SimSun, serif" font-size="9" fill="white">• 关键帧提取与检索</text>
    <text x="15" y="106" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">→ 拓展媒体类型支持</text>
  </g>
  <line x1="450" y1="180" x2="450" y2="188" stroke="#4A6FA5" stroke-width="2"/>
  <text x="450" y="230" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#4A6FA5">6个月</text>
  
  <!-- 阶段3：长期愿景 -->
  <g transform="translate(650, 70)">
    <rect x="0" y="0" width="200" height="110" rx="10" fill="url(#phase3Grad)" filter="url(#shadowFR)"/>
    <text x="100" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="white" font-weight="bold">长期愿景 (6个月+)</text>
    <line x1="15" y1="35" x2="185" y2="35" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="15" y="55" font-family="SimSun, serif" font-size="9" fill="white">• 个性化LoRA微调</text>
    <text x="15" y="72" font-family="SimSun, serif" font-size="9" fill="white">• Agentic OS融合</text>
    <text x="15" y="89" font-family="SimSun, serif" font-size="9" fill="white">• 老年防诈应用</text>
    <text x="15" y="106" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">→ 生态整合与社会价值</text>
  </g>
  <line x1="750" y1="180" x2="750" y2="188" stroke="#9B59B6" stroke-width="2"/>
  <text x="750" y="230" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#9B59B6">1年+</text>
  
  <!-- 底部说明 -->
  <g transform="translate(150, 270)">
    <rect x="0" y="0" width="600" height="80" rx="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" filter="url(#shadowFR)"/>
    <text x="300" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="#2C3E50" font-weight="bold">技术演进方向</text>
    <text x="20" y="50" font-family="SimSun, serif" font-size="10" fill="#455A64">端侧能力: 2B模型 → 4B模型 → 端侧收集+云侧LoRA训练 → 个性化专属模型</text>
    <text x="20" y="70" font-family="SimSun, serif" font-size="10" fill="#455A64">生态整合: 独立App → 厂商预装 → Agentic OS Agent → 跨设备记忆同步</text>
  </g>
</svg>`;

// ========== 3. 端云推理模式选择图 ==========
const svg_inference_mode = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
  <defs>
    <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#52B788"/>
    </linearGradient>
    <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4A6FA5"/><stop offset="100%" style="stop-color:#6090C0"/>
    </linearGradient>
    <filter id="shadowIM"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/></filter>
  </defs>
  
  <rect width="800" height="420" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="400" y="35" text-anchor="middle" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#2C3E50">端云协同推理模式决策流程</text>
  
  <!-- 决策起点 -->
  <g transform="translate(350, 70)">
    <ellipse cx="50" cy="25" rx="50" ry="25" fill="#F4A261" filter="url(#shadowIM)"/>
    <text x="50" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white" font-weight="bold">图片输入</text>
  </g>
  
  <!-- 决策菱形 -->
  <g transform="translate(350, 140)">
    <polygon points="50,0 100,40 50,80 0,40" fill="#FFF3E0" stroke="#F4A261" stroke-width="2"/>
    <text x="50" y="35" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="#E65100">隐私模式</text>
    <text x="50" y="50" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="#E65100">开启？</text>
  </g>
  <line x1="400" y1="95" x2="400" y2="140" stroke="#7F8C8D" stroke-width="2" marker-end="url(#arrowIM)"/>
  
  <!-- 左侧：端侧推理 -->
  <line x1="350" y1="180" x2="200" y2="180" stroke="#2A9D8F" stroke-width="2"/>
  <text x="275" y="170" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#2A9D8F">是</text>
  
  <g transform="translate(50, 230)">
    <rect x="0" y="0" width="300" height="150" rx="12" fill="url(#edgeGrad)" filter="url(#shadowIM)"/>
    <text x="150" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="14" fill="white" font-weight="bold">🔒 端侧推理模式</text>
    <line x1="20" y1="45" x2="280" y2="45" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="20" y="68" font-family="SimSun, serif" font-size="10" fill="white">• 模型: Qwen3-VL-2B (INT4)</text>
    <text x="20" y="88" font-family="SimSun, serif" font-size="10" fill="white">• 大小: 约1.37GB</text>
    <text x="20" y="108" font-family="SimSun, serif" font-size="10" fill="white">• 延迟: 首Token ~3s, 14 tok/s</text>
    <text x="20" y="128" font-family="SimSun, serif" font-size="10" fill="white">• 特点: 数据不出设备，完全离线可用</text>
    <text x="150" y="145" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">(团队实测验证)</text>
  </g>
  <line x1="200" y1="180" x2="200" y2="230" stroke="#2A9D8F" stroke-width="2" marker-end="url(#arrowIM)"/>
  
  <!-- 右侧：云端推理 -->
  <line x1="450" y1="180" x2="600" y2="180" stroke="#4A6FA5" stroke-width="2"/>
  <text x="525" y="170" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#4A6FA5">否</text>
  
  <g transform="translate(450, 230)">
    <rect x="0" y="0" width="300" height="150" rx="12" fill="url(#cloudGrad)" filter="url(#shadowIM)"/>
    <text x="150" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="14" fill="white" font-weight="bold">☁️ 云端增强模式</text>
    <line x1="20" y1="45" x2="280" y2="45" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="20" y="68" font-family="SimSun, serif" font-size="10" fill="white">• 模型: Qwen3-VL-235B</text>
    <text x="20" y="88" font-family="SimSun, serif" font-size="10" fill="white">• 参数量: 端侧的117倍</text>
    <text x="20" y="108" font-family="SimSun, serif" font-size="10" fill="white">• 超时: 0.8s限时，最多3次重试</text>
    <text x="20" y="128" font-family="SimSun, serif" font-size="10" fill="white">• 回退: 超时自动降级端侧</text>
    <text x="150" y="145" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">(技术方案设计)</text>
  </g>
  <line x1="600" y1="180" x2="600" y2="230" stroke="#4A6FA5" stroke-width="2" marker-end="url(#arrowIM)"/>
  
  <!-- 箭头定义 -->
  <defs>
    <marker id="arrowIM" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#7F8C8D"/>
    </marker>
  </defs>
</svg>`;

// ========== 4. 项目亮点总结图 ==========
const svg_highlights = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="850" height="320" viewBox="0 0 850 320">
  <defs>
    <linearGradient id="hl1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261"/><stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <linearGradient id="hl2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#52B788"/>
    </linearGradient>
    <linearGradient id="hl3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4A6FA5"/><stop offset="100%" style="stop-color:#6090C0"/>
    </linearGradient>
    <linearGradient id="hl4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9B59B6"/><stop offset="100%" style="stop-color:#BB8FCE"/>
    </linearGradient>
    <filter id="shadowHL"><feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.15"/></filter>
  </defs>
  
  <rect width="850" height="320" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="425" y="35" text-anchor="middle" font-family="SimHei, sans-serif" font-size="20" font-weight="bold" fill="#2C3E50">项目四大亮点</text>
  
  <!-- 亮点1 -->
  <g transform="translate(25, 70)">
    <rect x="0" y="0" width="190" height="220" rx="12" fill="url(#hl1)" filter="url(#shadowHL)"/>
    <text x="95" y="35" text-anchor="middle" font-family="SimHei, sans-serif" font-size="28" fill="white">🎯</text>
    <text x="95" y="65" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">痛点精准</text>
    <line x1="20" y1="80" x2="170" y2="80" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="95" y="105" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">82%用户有数字囤积</text>
    <text x="95" y="125" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">21.5%年轻人病理性</text>
    <text x="95" y="145" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">照片占囤积内容59%</text>
    <rect x="20" y="165" width="150" height="40" rx="6" fill="rgba(255,255,255,0.2)"/>
    <text x="95" y="190" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="white">存储易检索难的</text>
    <text x="95" y="205" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="white">核心矛盾</text>
  </g>
  
  <!-- 亮点2 -->
  <g transform="translate(230, 70)">
    <rect x="0" y="0" width="190" height="220" rx="12" fill="url(#hl2)" filter="url(#shadowHL)"/>
    <text x="95" y="35" text-anchor="middle" font-family="SimHei, sans-serif" font-size="28" fill="white">🔒</text>
    <text x="95" y="65" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">隐私优先</text>
    <line x1="20" y1="80" x2="170" y2="80" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="95" y="105" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">端侧推理数据不出端</text>
    <text x="95" y="125" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">AES-256加密存储</text>
    <text x="95" y="145" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">46.7%用户关注隐私</text>
    <rect x="20" y="165" width="150" height="40" rx="6" fill="rgba(255,255,255,0.2)"/>
    <text x="95" y="190" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="white">符合PIPL</text>
    <text x="95" y="205" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="white">数据最小化原则</text>
  </g>
  
  <!-- 亮点3 -->
  <g transform="translate(435, 70)">
    <rect x="0" y="0" width="190" height="220" rx="12" fill="url(#hl3)" filter="url(#shadowHL)"/>
    <text x="95" y="35" text-anchor="middle" font-family="SimHei, sans-serif" font-size="28" fill="white">🧠</text>
    <text x="95" y="65" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">记忆认知</text>
    <line x1="20" y1="80" x2="170" y2="80" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="95" y="105" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">Stanford论文级技术</text>
    <text x="95" y="125" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">三层记忆架构</text>
    <text x="95" y="145" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">GitHub 20.3k stars</text>
    <rect x="20" y="165" width="150" height="40" rx="6" fill="rgba(255,255,255,0.2)"/>
    <text x="95" y="190" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="white">理解「经历」</text>
    <text x="95" y="205" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="white">而非仅理解「图片」</text>
  </g>
  
  <!-- 亮点4 -->
  <g transform="translate(640, 70)">
    <rect x="0" y="0" width="190" height="220" rx="12" fill="url(#hl4)" filter="url(#shadowHL)"/>
    <text x="95" y="35" text-anchor="middle" font-family="SimHei, sans-serif" font-size="28" fill="white">📱</text>
    <text x="95" y="65" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">技术可行</text>
    <line x1="20" y1="80" x2="170" y2="80" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <text x="95" y="105" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">端侧VLM原型验证</text>
    <text x="95" y="125" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">3224ms首Token</text>
    <text x="95" y="145" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">14 tok/s解码</text>
    <rect x="20" y="165" width="150" height="40" rx="6" fill="rgba(255,255,255,0.2)"/>
    <text x="95" y="190" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="white">TRL 7级验证</text>
    <text x="95" y="205" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="white">(团队实测验证)</text>
  </g>
</svg>`;

// 写入文件
const outputDir = __dirname;
fs.writeFileSync(path.join(outputDir, 'chart_core_value.svg'), svg_core_value);
fs.writeFileSync(path.join(outputDir, 'chart_future_roadmap.svg'), svg_future_roadmap);
fs.writeFileSync(path.join(outputDir, 'chart_inference_mode.svg'), svg_inference_mode);
fs.writeFileSync(path.join(outputDir, 'chart_highlights.svg'), svg_highlights);

console.log('补充配图生成完成！');
console.log('- chart_core_value.svg (项目核心价值主张)');
console.log('- chart_future_roadmap.svg (未来发展路线图)');
console.log('- chart_inference_mode.svg (端云推理模式选择)');
console.log('- chart_highlights.svg (项目四大亮点)');
