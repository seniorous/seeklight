/**
 * 层次化记忆架构可行性分析图表生成脚本
 * 生成SVG图表用于Word文档
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'v5.0-memory-arch-charts');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 专业蓝灰配色方案
const colors = {
    primary: '#2563EB',      // 主色蓝
    secondary: '#3B82F6',    // 次蓝
    accent: '#60A5FA',       // 亮蓝
    success: '#10B981',      // 绿色
    warning: '#F59E0B',      // 橙色
    danger: '#EF4444',       // 红色
    gray: '#6B7280',         // 灰色
    lightGray: '#E5E7EB',    // 浅灰
    darkText: '#1F2937',     // 深色文字
    lightText: '#6B7280',    // 浅色文字
    background: '#F9FAFB',   // 背景
    white: '#FFFFFF',
    purple: '#8B5CF6',       // 紫色
    teal: '#14B8A6'          // 青色
};

// 图表1: 层次化记忆架构三层体系图
const chart1_memory_layers = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650">
  <defs>
    <linearGradient id="shortMemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="longMemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.secondary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="implicitMemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.purple};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="900" height="650" fill="${colors.background}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" font-family="SimHei, Microsoft YaHei" font-size="22" font-weight="bold" fill="${colors.darkText}" text-anchor="middle">层次化记忆架构三层体系</text>
  
  <!-- 第一层：短期记忆 -->
  <g transform="translate(50, 80)">
    <rect x="0" y="0" width="800" height="150" rx="12" fill="url(#shortMemGrad)" filter="url(#shadow1)"/>
    <text x="400" y="30" font-family="SimHei" font-size="18" font-weight="bold" fill="${colors.white}" text-anchor="middle">短期记忆层 (ImageMemory) - TRL 7</text>
    
    <!-- 数据结构示意 -->
    <rect x="20" y="50" width="230" height="85" rx="6" fill="${colors.white}" opacity="0.95"/>
    <text x="135" y="72" font-family="Consolas" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">数据模型</text>
    <text x="30" y="90" font-family="Consolas" font-size="10" fill="${colors.gray}">imageId: String (PK)</text>
    <text x="30" y="104" font-family="Consolas" font-size="10" fill="${colors.gray}">description: String</text>
    <text x="30" y="118" font-family="Consolas" font-size="10" fill="${colors.gray}">embedding: Float[384]</text>
    <text x="30" y="132" font-family="Consolas" font-size="10" fill="${colors.gray}">sceneType: String</text>
    
    <!-- 技术栈 -->
    <rect x="270" y="50" width="230" height="85" rx="6" fill="${colors.white}" opacity="0.95"/>
    <text x="385" y="72" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">技术实现</text>
    <text x="280" y="90" font-family="SimSun" font-size="10" fill="${colors.gray}">• Room + SQLite 结构化存储</text>
    <text x="280" y="106" font-family="SimSun" font-size="10" fill="${colors.gray}">• ObjectBox 4.0 HNSW索引</text>
    <text x="280" y="122" font-family="SimSun" font-size="10" fill="${colors.gray}">• MiniLM-L6-v2 语义向量化</text>
    
    <!-- 性能指标 -->
    <rect x="520" y="50" width="260" height="85" rx="6" fill="${colors.white}" opacity="0.95"/>
    <text x="650" y="72" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">性能指标</text>
    <text x="530" y="90" font-family="SimSun" font-size="10" fill="${colors.gray}">• 向量化延迟: 50-100ms/张</text>
    <text x="530" y="106" font-family="SimSun" font-size="10" fill="${colors.gray}">• 检索延迟: &lt;10ms (10万级)</text>
    <text x="530" y="122" font-family="SimSun" font-size="10" fill="${colors.success}">✓ 成熟技术，可直接复用</text>
  </g>
  
  <!-- 箭头1 -->
  <path d="M450,235 L450,260" stroke="${colors.primary}" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
  <text x="470" y="252" font-family="SimSun" font-size="11" fill="${colors.primary}">Reflection触发</text>
  
  <!-- 第二层：长期记忆 -->
  <g transform="translate(50, 270)">
    <rect x="0" y="0" width="800" height="170" rx="12" fill="url(#longMemGrad)" filter="url(#shadow1)"/>
    <text x="400" y="30" font-family="SimHei" font-size="18" font-weight="bold" fill="${colors.white}" text-anchor="middle">长期记忆层 (HighLevelFact) - TRL 4</text>
    
    <!-- 开源参考 -->
    <rect x="20" y="50" width="250" height="105" rx="6" fill="${colors.white}" opacity="0.95"/>
    <text x="145" y="72" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">开源实现参考</text>
    <text x="30" y="92" font-family="SimSun" font-size="10" fill="${colors.gray}">• generative_agents (20.3k⭐)</text>
    <text x="30" y="108" font-family="SimSun" font-size="10" fill="${colors.gray}">• LangChain GenerativeAgent</text>
    <text x="30" y="124" font-family="SimSun" font-size="10" fill="${colors.gray}">• MNN-LLM Tokenizer</text>
    <text x="30" y="140" font-family="SimSun" font-size="10" fill="${colors.gray}">• Native-LLM-for-Android</text>
    
    <!-- 核心算法 -->
    <rect x="285" y="50" width="230" height="105" rx="6" fill="${colors.white}" opacity="0.95"/>
    <text x="400" y="72" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">Reflection核心逻辑</text>
    <text x="295" y="92" font-family="Consolas" font-size="9" fill="${colors.gray}">if (images>=50 || gps>50km</text>
    <text x="295" y="106" font-family="Consolas" font-size="9" fill="${colors.gray}">    || sceneEntropy&lt;0.5):</text>
    <text x="295" y="120" font-family="Consolas" font-size="9" fill="${colors.gray}">  fact = vlm.reflect(memories)</text>
    <text x="295" y="134" font-family="Consolas" font-size="9" fill="${colors.gray}">  fact.conf = calcConfidence()</text>
    <text x="295" y="148" font-family="Consolas" font-size="9" fill="${colors.gray}">  if fact.conf > 0.6: save()</text>
    
    <!-- 性能基准 -->
    <rect x="530" y="50" width="250" height="105" rx="6" fill="${colors.white}" opacity="0.95"/>
    <text x="655" y="72" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">移动端VLM性能基准</text>
    <text x="540" y="92" font-family="SimSun" font-size="9" fill="${colors.gray}">• Qwen3-VL-2B (q4f32): 15 tok/s</text>
    <text x="540" y="108" font-family="SimSun" font-size="9" fill="${colors.gray}">• 单次Reflection: 45-60s估算</text>
    <text x="540" y="124" font-family="SimSun" font-size="9" fill="${colors.gray}">• 触发时机: 充电+息屏空闲</text>
    <text x="540" y="140" font-family="SimSun" font-size="9" fill="${colors.warning}">⚠ 需原型验证实际性能</text>
  </g>
  
  <!-- 箭头2 -->
  <path d="M450,445 L450,470" stroke="${colors.purple}" stroke-width="3" fill="none"/>
  <text x="470" y="462" font-family="SimSun" font-size="11" fill="${colors.purple}">行为观察</text>
  
  <!-- 第三层：隐式记忆 -->
  <g transform="translate(50, 480)">
    <rect x="0" y="0" width="800" height="150" rx="12" fill="url(#implicitMemGrad)" filter="url(#shadow1)"/>
    <text x="400" y="30" font-family="SimHei" font-size="18" font-weight="bold" fill="${colors.white}" text-anchor="middle">隐式记忆层 (UserPreference) - TRL 3</text>
    
    <!-- 数据结构 -->
    <rect x="20" y="50" width="250" height="85" rx="6" fill="${colors.white}" opacity="0.95"/>
    <text x="145" y="72" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">偏好数据模型</text>
    <text x="30" y="90" font-family="Consolas" font-size="10" fill="${colors.gray}">sceneType: String (PK)</text>
    <text x="30" y="106" font-family="Consolas" font-size="10" fill="${colors.gray}">filterPref: Float[] (EMA)</text>
    <text x="30" y="122" font-family="Consolas" font-size="10" fill="${colors.gray}">brightnessAvg, contrastAvg</text>
    
    <!-- EMA算法 -->
    <rect x="285" y="50" width="230" height="85" rx="6" fill="${colors.white}" opacity="0.95"/>
    <text x="400" y="72" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">EMA偏好更新</text>
    <text x="295" y="92" font-family="Consolas" font-size="9" fill="${colors.gray}">α = 0.2  // 平滑系数</text>
    <text x="295" y="108" font-family="Consolas" font-size="9" fill="${colors.gray}">pref_new = α×edit + (1-α)×pref</text>
    <text x="295" y="124" font-family="SimSun" font-size="10" fill="${colors.gray}">按场景分组: food/landscape/...</text>
    
    <!-- 实现特点 -->
    <rect x="530" y="50" width="250" height="85" rx="6" fill="${colors.white}" opacity="0.95"/>
    <text x="655" y="72" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">实现特点</text>
    <text x="540" y="92" font-family="SimSun" font-size="10" fill="${colors.gray}">• 纯统计方法，无ML依赖</text>
    <text x="540" y="108" font-family="SimSun" font-size="10" fill="${colors.gray}">• Room数据库存储</text>
    <text x="540" y="124" font-family="SimSun" font-size="10" fill="${colors.success}">✓ 实现复杂度低</text>
  </g>
  
  <!-- 箭头定义 -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${colors.primary}"/>
    </marker>
  </defs>
</svg>`;

// 图表2: 开源组件依赖图
const chart2_dependencies = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500">
  <defs>
    <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="900" height="500" fill="${colors.background}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" font-family="SimHei, Microsoft YaHei" font-size="22" font-weight="bold" fill="${colors.darkText}" text-anchor="middle">层次化记忆架构开源组件依赖</text>
  
  <!-- 中心：本项目 -->
  <circle cx="450" cy="250" r="70" fill="${colors.primary}" filter="url(#shadow2)"/>
  <text x="450" y="240" font-family="SimHei" font-size="16" fill="${colors.white}" text-anchor="middle" font-weight="bold">拾光</text>
  <text x="450" y="262" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle">层次化记忆</text>
  <text x="450" y="280" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle">架构</text>
  
  <!-- 组件1: Native-LLM-for-Android -->
  <g transform="translate(80, 100)">
    <rect x="0" y="0" width="180" height="100" rx="10" fill="${colors.secondary}" filter="url(#shadow2)"/>
    <text x="90" y="25" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">Native-LLM-for-Android</text>
    <text x="90" y="45" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">GitHub ⭐ 224</text>
    <text x="90" y="65" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">Qwen3-VL 端侧推理</text>
    <text x="90" y="85" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">ONNX Runtime</text>
    <line x1="180" y1="50" x2="380" y2="200" stroke="${colors.secondary}" stroke-width="2" stroke-dasharray="5,3"/>
  </g>
  
  <!-- 组件2: generative_agents -->
  <g transform="translate(640, 100)">
    <rect x="0" y="0" width="180" height="100" rx="10" fill="${colors.success}" filter="url(#shadow2)"/>
    <text x="90" y="25" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">generative_agents</text>
    <text x="90" y="45" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">GitHub ⭐ 20.3k</text>
    <text x="90" y="65" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">Reflection架构参考</text>
    <text x="90" y="85" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">Stanford UIST 2023</text>
    <line x1="0" y1="50" x2="-160" y2="150" stroke="${colors.success}" stroke-width="2" stroke-dasharray="5,3"/>
  </g>
  
  <!-- 组件3: MNN-LLM -->
  <g transform="translate(80, 300)">
    <rect x="0" y="0" width="180" height="100" rx="10" fill="${colors.teal}" filter="url(#shadow2)"/>
    <text x="90" y="25" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">MNN-LLM</text>
    <text x="90" y="45" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">GitHub ⭐ 7.5k+</text>
    <text x="90" y="65" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">Tokenizer实现</text>
    <text x="90" y="85" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">阿里巴巴开源</text>
    <!-- 修复连接线：从组件右边(180,50)连接到中心(370,-50)相对于组件位置 -->
    <line x1="180" y1="50" x2="370" y2="-50" stroke="${colors.teal}" stroke-width="2" stroke-dasharray="5,3"/>
  </g>
  
  <!-- 组件4: ObjectBox -->
  <g transform="translate(640, 300)">
    <rect x="0" y="0" width="180" height="100" rx="10" fill="${colors.purple}" filter="url(#shadow2)"/>
    <text x="90" y="25" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">ObjectBox 4.0</text>
    <text x="90" y="45" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">GitHub ⭐ 4.5k</text>
    <text x="90" y="65" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">HNSW向量数据库</text>
    <text x="90" y="85" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">Android原生支持</text>
    <line x1="0" y1="50" x2="-160" y2="0" stroke="${colors.purple}" stroke-width="2" stroke-dasharray="5,3"/>
  </g>
  
  <!-- 图例 -->
  <g transform="translate(50, 440)">
    <text x="0" y="15" font-family="SimHei" font-size="12" fill="${colors.darkText}" font-weight="bold">技术成熟度说明:</text>
    <circle cx="180" cy="10" r="8" fill="${colors.success}"/>
    <text x="195" y="15" font-family="SimSun" font-size="11" fill="${colors.gray}">生产就绪 (⭐>10k)</text>
    <circle cx="340" cy="10" r="8" fill="${colors.teal}"/>
    <text x="355" y="15" font-family="SimSun" font-size="11" fill="${colors.gray}">成熟可用 (⭐>5k)</text>
    <circle cx="500" cy="10" r="8" fill="${colors.purple}"/>
    <text x="515" y="15" font-family="SimSun" font-size="11" fill="${colors.gray}">活跃维护 (⭐>1k)</text>
    <circle cx="660" cy="10" r="8" fill="${colors.secondary}"/>
    <text x="675" y="15" font-family="SimSun" font-size="11" fill="${colors.gray}">验证可行 (⭐&lt;1k)</text>
  </g>
</svg>`;

// 图表3: 更新的TRL分布图（含层次化记忆）
const chart3_trl_updated = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="550" viewBox="0 0 900 550">
  <defs>
    <filter id="shadow3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="900" height="550" fill="${colors.background}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" font-family="SimHei, Microsoft YaHei" font-size="22" font-weight="bold" fill="${colors.darkText}" text-anchor="middle">核心功能技术成熟度分布（含层次化记忆架构）</text>
  
  <!-- TRL刻度线 -->
  <g transform="translate(100, 70)">
    <!-- 刻度背景 -->
    <rect x="50" y="0" width="700" height="30" rx="4" fill="${colors.lightGray}"/>
    
    <!-- TRL 1-3 (研究) -->
    <rect x="50" y="0" width="233" height="30" rx="4" fill="${colors.danger}" opacity="0.3"/>
    <text x="166" y="20" font-family="SimSun" font-size="11" fill="${colors.danger}" text-anchor="middle">TRL 1-3 研究探索</text>
    
    <!-- TRL 4-6 (开发) -->
    <rect x="283" y="0" width="234" height="30" fill="${colors.warning}" opacity="0.3"/>
    <text x="400" y="20" font-family="SimSun" font-size="11" fill="${colors.warning}" text-anchor="middle">TRL 4-6 开发验证</text>
    
    <!-- TRL 7-9 (成熟) -->
    <rect x="517" y="0" width="233" height="30" rx="4" fill="${colors.success}" opacity="0.3"/>
    <text x="633" y="20" font-family="SimSun" font-size="11" fill="${colors.success}" text-anchor="middle">TRL 7-9 生产成熟</text>
    
    <!-- 刻度数字 -->
    <text x="50" y="50" font-family="Consolas" font-size="10" fill="${colors.gray}" text-anchor="middle">1</text>
    <text x="166" y="50" font-family="Consolas" font-size="10" fill="${colors.gray}" text-anchor="middle">3</text>
    <text x="283" y="50" font-family="Consolas" font-size="10" fill="${colors.gray}" text-anchor="middle">4</text>
    <text x="400" y="50" font-family="Consolas" font-size="10" fill="${colors.gray}" text-anchor="middle">6</text>
    <text x="517" y="50" font-family="Consolas" font-size="10" fill="${colors.gray}" text-anchor="middle">7</text>
    <text x="750" y="50" font-family="Consolas" font-size="10" fill="${colors.gray}" text-anchor="middle">9</text>
  </g>
  
  <!-- 功能条目 -->
  <!-- 1. 多模态语义搜索 TRL 7-8 -->
  <g transform="translate(100, 140)">
    <text x="0" y="15" font-family="SimHei" font-size="13" fill="${colors.darkText}">多模态语义搜索</text>
    <rect x="50" y="25" width="583" height="25" rx="4" fill="${colors.success}" filter="url(#shadow3)"/>
    <text x="350" y="43" font-family="SimSun" font-size="11" fill="${colors.white}" text-anchor="middle">TRL 7-8 | VLM推理验证 + HNSW成熟</text>
  </g>
  
  <!-- 2. 快速内容识别 TRL 8-9 -->
  <g transform="translate(100, 195)">
    <text x="0" y="15" font-family="SimHei" font-size="13" fill="${colors.darkText}">快速内容识别</text>
    <rect x="50" y="25" width="700" height="25" rx="4" fill="${colors.success}" filter="url(#shadow3)"/>
    <text x="400" y="43" font-family="SimSun" font-size="11" fill="${colors.white}" text-anchor="middle">TRL 8-9 | ZXing + ML Kit 生产验证</text>
  </g>
  
  <!-- 3. 跨应用智能跳转 TRL 9 -->
  <g transform="translate(100, 250)">
    <text x="0" y="15" font-family="SimHei" font-size="13" fill="${colors.darkText}">跨应用智能跳转</text>
    <rect x="50" y="25" width="700" height="25" rx="4" fill="${colors.success}" filter="url(#shadow3)"/>
    <text x="400" y="43" font-family="SimSun" font-size="11" fill="${colors.white}" text-anchor="middle">TRL 9 | Android Deep Link 标准API</text>
  </g>
  
  <!-- 4. 隐私保险箱 TRL 8-9 -->
  <g transform="translate(100, 305)">
    <text x="0" y="15" font-family="SimHei" font-size="13" fill="${colors.darkText}">隐私保险箱</text>
    <rect x="50" y="25" width="700" height="25" rx="4" fill="${colors.success}" filter="url(#shadow3)"/>
    <text x="400" y="43" font-family="SimSun" font-size="11" fill="${colors.white}" text-anchor="middle">TRL 8-9 | EncryptedFile + BiometricPrompt</text>
  </g>
  
  <!-- 5. 短期记忆层 TRL 7 -->
  <g transform="translate(100, 360)">
    <text x="0" y="15" font-family="SimHei" font-size="13" fill="${colors.primary}">短期记忆层 ★</text>
    <rect x="50" y="25" width="517" height="25" rx="4" fill="${colors.secondary}" filter="url(#shadow3)"/>
    <text x="300" y="43" font-family="SimSun" font-size="11" fill="${colors.white}" text-anchor="middle">TRL 7 | Room + ObjectBox向量索引</text>
  </g>
  
  <!-- 6. 长期记忆层(Reflection) TRL 4 -->
  <g transform="translate(100, 415)">
    <text x="0" y="15" font-family="SimHei" font-size="13" fill="${colors.primary}">长期记忆层 ★</text>
    <rect x="50" y="25" width="283" height="25" rx="4" fill="${colors.warning}" filter="url(#shadow3)"/>
    <text x="190" y="43" font-family="SimSun" font-size="11" fill="${colors.white}" text-anchor="middle">TRL 4 | Reflection机制需验证</text>
  </g>
  
  <!-- 7. 隐式记忆层 TRL 3 -->
  <g transform="translate(100, 470)">
    <text x="0" y="15" font-family="SimHei" font-size="13" fill="${colors.primary}">隐式记忆层 ★</text>
    <rect x="50" y="25" width="166" height="25" rx="4" fill="${colors.danger}" opacity="0.7" filter="url(#shadow3)"/>
    <text x="133" y="43" font-family="SimSun" font-size="11" fill="${colors.white}" text-anchor="middle">TRL 3 | EMA偏好学习</text>
  </g>
  
  <!-- 图例 -->
  <g transform="translate(600, 500)">
    <text x="0" y="15" font-family="SimSun" font-size="11" fill="${colors.primary}">★ 层次化记忆架构组件</text>
  </g>
</svg>`;

// 图表4: 风险评估矩阵（含层次化记忆）
const chart4_risk_matrix = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="550" viewBox="0 0 900 550">
  <defs>
    <filter id="shadow4" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="900" height="550" fill="${colors.background}"/>
  
  <!-- 标题 -->
  <text x="450" y="40" font-family="SimHei, Microsoft YaHei" font-size="22" font-weight="bold" fill="${colors.darkText}" text-anchor="middle">技术风险评估矩阵（含层次化记忆架构）</text>
  
  <!-- 坐标轴 -->
  <g transform="translate(120, 80)">
    <!-- Y轴：影响程度 -->
    <line x1="0" y1="0" x2="0" y2="380" stroke="${colors.gray}" stroke-width="2"/>
    <text x="-40" y="190" font-family="SimHei" font-size="14" fill="${colors.darkText}" text-anchor="middle" transform="rotate(-90 -40 190)">影响程度</text>
    <text x="-15" y="20" font-family="SimSun" font-size="10" fill="${colors.gray}">高</text>
    <text x="-15" y="190" font-family="SimSun" font-size="10" fill="${colors.gray}">中</text>
    <text x="-15" y="370" font-family="SimSun" font-size="10" fill="${colors.gray}">低</text>
    
    <!-- X轴：发生概率 -->
    <line x1="0" y1="380" x2="700" y2="380" stroke="${colors.gray}" stroke-width="2"/>
    <text x="350" y="420" font-family="SimHei" font-size="14" fill="${colors.darkText}" text-anchor="middle">发生概率</text>
    <text x="30" y="400" font-family="SimSun" font-size="10" fill="${colors.gray}">低</text>
    <text x="350" y="400" font-family="SimSun" font-size="10" fill="${colors.gray}">中</text>
    <text x="670" y="400" font-family="SimSun" font-size="10" fill="${colors.gray}">高</text>
    
    <!-- 背景区域 -->
    <rect x="0" y="0" width="233" height="127" fill="${colors.success}" opacity="0.15"/>
    <rect x="233" y="0" width="234" height="127" fill="${colors.warning}" opacity="0.15"/>
    <rect x="467" y="0" width="233" height="127" fill="${colors.danger}" opacity="0.15"/>
    <rect x="0" y="127" width="233" height="126" fill="${colors.success}" opacity="0.15"/>
    <rect x="233" y="127" width="234" height="126" fill="${colors.warning}" opacity="0.15"/>
    <rect x="467" y="127" width="233" height="126" fill="${colors.danger}" opacity="0.15"/>
    <rect x="0" y="253" width="233" height="127" fill="${colors.success}" opacity="0.15"/>
    <rect x="233" y="253" width="234" height="127" fill="${colors.success}" opacity="0.15"/>
    <rect x="467" y="253" width="233" height="127" fill="${colors.warning}" opacity="0.15"/>
    
    <!-- 风险点 -->
    <!-- R1: ML Kit依赖 (低概率，中影响) -->
    <circle cx="100" cy="190" r="30" fill="${colors.success}" filter="url(#shadow4)"/>
    <text x="100" y="185" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">ML Kit</text>
    <text x="100" y="200" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">依赖</text>
    
    <!-- R2: EncryptedFile deprecation (低概率，低影响) -->
    <circle cx="100" cy="320" r="28" fill="${colors.success}" filter="url(#shadow4)"/>
    <text x="100" y="315" font-family="SimSun" font-size="9" fill="${colors.white}" text-anchor="middle">Encrypted</text>
    <text x="100" y="330" font-family="SimSun" font-size="9" fill="${colors.white}" text-anchor="middle">File弃用</text>
    
    <!-- R3: VLM准确率 (中概率，中影响) -->
    <circle cx="350" cy="190" r="32" fill="${colors.warning}" filter="url(#shadow4)"/>
    <text x="350" y="185" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">VLM</text>
    <text x="350" y="200" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">准确率</text>
    
    <!-- R4: Reflection计算开销 (中概率，高影响) - 新增 -->
    <circle cx="380" cy="60" r="35" fill="${colors.danger}" filter="url(#shadow4)"/>
    <text x="380" y="50" font-family="SimSun" font-size="9" fill="${colors.white}" text-anchor="middle">Reflection</text>
    <text x="380" y="65" font-family="SimSun" font-size="9" fill="${colors.white}" text-anchor="middle">计算开销</text>
    <text x="380" y="80" font-family="SimSun" font-size="8" fill="${colors.white}" text-anchor="middle">★新增</text>
    
    <!-- R5: 高级事实准确率 (中概率，中影响) - 新增 -->
    <circle cx="420" cy="170" r="32" fill="${colors.warning}" filter="url(#shadow4)"/>
    <text x="420" y="160" font-family="SimSun" font-size="9" fill="${colors.white}" text-anchor="middle">高级事实</text>
    <text x="420" y="175" font-family="SimSun" font-size="9" fill="${colors.white}" text-anchor="middle">准确率</text>
    <text x="420" y="190" font-family="SimSun" font-size="8" fill="${colors.white}" text-anchor="middle">★新增</text>
    
    <!-- R6: 偏好学习冷启动 (低概率，低影响) - 新增 -->
    <circle cx="200" cy="300" r="28" fill="${colors.success}" filter="url(#shadow4)"/>
    <text x="200" y="290" font-family="SimSun" font-size="9" fill="${colors.white}" text-anchor="middle">偏好学习</text>
    <text x="200" y="305" font-family="SimSun" font-size="9" fill="${colors.white}" text-anchor="middle">冷启动</text>
    <text x="200" y="320" font-family="SimSun" font-size="8" fill="${colors.white}" text-anchor="middle">★新增</text>
  </g>
  
  <!-- 图例 -->
  <g transform="translate(50, 480)">
    <rect x="0" y="0" width="850" height="55" rx="6" fill="${colors.white}" stroke="${colors.lightGray}"/>
    <text x="20" y="20" font-family="SimHei" font-size="12" fill="${colors.darkText}" font-weight="bold">应对策略:</text>
    <text x="20" y="42" font-family="SimSun" font-size="10" fill="${colors.gray}">Reflection计算开销→动态调整触发阈值 | 高级事实准确率→置信度阈值(0.6)+用户可编辑 | 偏好冷启动→场景化默认偏好</text>
  </g>
</svg>`;

// 写入文件
const charts = [
    { name: 'chart_memory_layers.svg', content: chart1_memory_layers },
    { name: 'chart_dependencies.svg', content: chart2_dependencies },
    { name: 'chart_trl_updated.svg', content: chart3_trl_updated },
    { name: 'chart_risk_matrix.svg', content: chart4_risk_matrix }
];

charts.forEach(chart => {
    const filePath = path.join(outputDir, chart.name);
    fs.writeFileSync(filePath, chart.content, 'utf8');
    console.log(`Generated: ${chart.name}`);
});

console.log(`\nAll charts saved to: ${outputDir}`);
console.log('Run convert script to generate PNGs for Word embedding.');
