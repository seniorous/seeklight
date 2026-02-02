/**
 * 代码逻辑示意图生成脚本
 * 将代码块转换为可视化流程图/架构图
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'v5.0-memory-arch-charts');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 配色方案
const colors = {
    primary: '#2563EB',
    secondary: '#3B82F6',
    accent: '#60A5FA',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    gray: '#6B7280',
    lightGray: '#E5E7EB',
    darkText: '#1F2937',
    background: '#F9FAFB',
    white: '#FFFFFF',
    purple: '#8B5CF6',
    teal: '#14B8A6'
};

// 图表1: ImageMemory 数据模型示意图
const chart1_imagememory = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="380" viewBox="0 0 800 380">
  <defs>
    <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.12"/>
    </filter>
    <linearGradient id="headerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="800" height="380" fill="${colors.background}"/>
  
  <!-- 标题 -->
  <text x="400" y="35" font-family="SimHei, Microsoft YaHei" font-size="20" font-weight="bold" fill="${colors.darkText}" text-anchor="middle">短期记忆层数据模型 (ImageMemory)</text>
  
  <!-- 主卡片 -->
  <g transform="translate(50, 60)">
    <!-- 卡片背景 -->
    <rect x="0" y="0" width="700" height="300" rx="12" fill="${colors.white}" filter="url(#shadow1)" stroke="${colors.lightGray}" stroke-width="1"/>
    
    <!-- 表头 -->
    <rect x="0" y="0" width="700" height="50" rx="12" fill="url(#headerGrad1)"/>
    <rect x="0" y="40" width="700" height="10" fill="url(#headerGrad1)"/>
    <text x="350" y="33" font-family="SimHei" font-size="16" fill="${colors.white}" text-anchor="middle" font-weight="bold">Room Entity: image_memory</text>
    
    <!-- 字段列表 -->
    <g transform="translate(20, 70)">
      <!-- 主键 -->
      <rect x="0" y="0" width="310" height="45" rx="6" fill="${colors.primary}" opacity="0.1"/>
      <circle cx="20" cy="22" r="8" fill="${colors.primary}"/>
      <text x="20" y="27" font-family="Consolas" font-size="10" fill="${colors.white}" text-anchor="middle">PK</text>
      <text x="40" y="20" font-family="SimHei" font-size="13" fill="${colors.darkText}" font-weight="bold">imageId</text>
      <text x="40" y="38" font-family="SimSun" font-size="11" fill="${colors.gray}">String · 图片唯一标识</text>
      
      <!-- 语义描述 -->
      <rect x="340" y="0" width="320" height="45" rx="6" fill="${colors.success}" opacity="0.1"/>
      <circle cx="360" cy="22" r="8" fill="${colors.success}"/>
      <text x="360" y="27" font-family="Consolas" font-size="8" fill="${colors.white}" text-anchor="middle">VLM</text>
      <text x="380" y="20" font-family="SimHei" font-size="13" fill="${colors.darkText}" font-weight="bold">description</text>
      <text x="380" y="38" font-family="SimSun" font-size="11" fill="${colors.gray}">String · VLM生成的语义描述</text>
    </g>
    
    <g transform="translate(20, 125)">
      <!-- OCR文本 -->
      <rect x="0" y="0" width="310" height="45" rx="6" fill="${colors.teal}" opacity="0.1"/>
      <circle cx="20" cy="22" r="8" fill="${colors.teal}"/>
      <text x="20" y="27" font-family="Consolas" font-size="7" fill="${colors.white}" text-anchor="middle">OCR</text>
      <text x="40" y="20" font-family="SimHei" font-size="13" fill="${colors.darkText}" font-weight="bold">ocrText</text>
      <text x="40" y="38" font-family="SimSun" font-size="11" fill="${colors.gray}">String? · 识别的文字内容</text>
      
      <!-- 场景分类 -->
      <rect x="340" y="0" width="320" height="45" rx="6" fill="${colors.purple}" opacity="0.1"/>
      <circle cx="360" cy="22" r="8" fill="${colors.purple}"/>
      <text x="360" y="27" font-family="Consolas" font-size="7" fill="${colors.white}" text-anchor="middle">类型</text>
      <text x="380" y="20" font-family="SimHei" font-size="13" fill="${colors.darkText}" font-weight="bold">sceneType</text>
      <text x="380" y="38" font-family="SimSun" font-size="11" fill="${colors.gray}">String · food/landscape/chat/...</text>
    </g>
    
    <g transform="translate(20, 180)">
      <!-- 语义向量 -->
      <rect x="0" y="0" width="310" height="45" rx="6" fill="${colors.warning}" opacity="0.1"/>
      <circle cx="20" cy="22" r="8" fill="${colors.warning}"/>
      <text x="20" y="27" font-family="Consolas" font-size="6" fill="${colors.white}" text-anchor="middle">Vec</text>
      <text x="40" y="20" font-family="SimHei" font-size="13" fill="${colors.darkText}" font-weight="bold">embedding</text>
      <text x="40" y="38" font-family="SimSun" font-size="11" fill="${colors.gray}">Float[384] · MiniLM语义向量</text>
      
      <!-- 时间戳 -->
      <rect x="340" y="0" width="320" height="45" rx="6" fill="${colors.gray}" opacity="0.1"/>
      <circle cx="360" cy="22" r="8" fill="${colors.gray}"/>
      <text x="360" y="27" font-family="Consolas" font-size="8" fill="${colors.white}" text-anchor="middle">T</text>
      <text x="380" y="20" font-family="SimHei" font-size="13" fill="${colors.darkText}" font-weight="bold">timestamp</text>
      <text x="380" y="38" font-family="SimSun" font-size="11" fill="${colors.gray}">Long · 创建时间戳</text>
    </g>
    
    <g transform="translate(20, 235)">
      <!-- GPS -->
      <rect x="0" y="0" width="660" height="45" rx="6" fill="${colors.danger}" opacity="0.1"/>
      <circle cx="20" cy="22" r="8" fill="${colors.danger}"/>
      <text x="20" y="27" font-family="Consolas" font-size="6" fill="${colors.white}" text-anchor="middle">GPS</text>
      <text x="40" y="20" font-family="SimHei" font-size="13" fill="${colors.darkText}" font-weight="bold">gpsLat, gpsLng</text>
      <text x="40" y="38" font-family="SimSun" font-size="11" fill="${colors.gray}">Double? · 地理位置坐标（可选）</text>
    </g>
  </g>
  
  <!-- 存储说明 -->
  <g transform="translate(50, 340)">
    <text x="0" y="15" font-family="SimSun" font-size="11" fill="${colors.gray}">存储方案: Room (SQLite) + ObjectBox 4.0 HNSW向量索引 | 技术成熟度: TRL 7</text>
  </g>
</svg>`;

// 图表2: ReflectionEngine 流程图
const chart2_reflection = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520">
  <defs>
    <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.12"/>
    </filter>
    <linearGradient id="triggerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.warning};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#F97316;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="executeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="confGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.success};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.teal};stop-opacity:1" />
    </linearGradient>
    <marker id="arrowGray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${colors.gray}"/>
    </marker>
    <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${colors.primary}"/>
    </marker>
    <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${colors.success}"/>
    </marker>
  </defs>
  
  <!-- 背景 -->
  <rect width="900" height="520" fill="${colors.background}"/>
  
  <!-- 标题 -->
  <text x="450" y="35" font-family="SimHei, Microsoft YaHei" font-size="20" font-weight="bold" fill="${colors.darkText}" text-anchor="middle">Reflection机制执行流程 (ReflectionEngine)</text>
  
  <!-- 第一部分：触发条件判断 -->
  <g transform="translate(30, 60)">
    <rect x="0" y="0" width="260" height="180" rx="10" fill="${colors.white}" filter="url(#shadow2)" stroke="${colors.warning}" stroke-width="2"/>
    <rect x="0" y="0" width="260" height="40" rx="10" fill="url(#triggerGrad)"/>
    <rect x="0" y="30" width="260" height="10" fill="url(#triggerGrad)"/>
    <text x="130" y="28" font-family="SimHei" font-size="14" fill="${colors.white}" text-anchor="middle" font-weight="bold">触发条件判断</text>
    
    <!-- 条件列表 -->
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="230" height="35" rx="5" fill="${colors.warning}" opacity="0.15"/>
      <text x="115" y="15" font-family="SimHei" font-size="12" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">条件1: 批量导入</text>
      <text x="115" y="30" font-family="SimSun" font-size="11" fill="${colors.gray}" text-anchor="middle">单次导入图片 ≥ 50张</text>
    </g>
    <g transform="translate(15, 95)">
      <rect x="0" y="0" width="230" height="35" rx="5" fill="${colors.warning}" opacity="0.15"/>
      <text x="115" y="15" font-family="SimHei" font-size="12" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">条件2: 位置变化</text>
      <text x="115" y="30" font-family="SimSun" font-size="11" fill="${colors.gray}" text-anchor="middle">GPS位移距离 &gt; 50km</text>
    </g>
    <g transform="translate(15, 135)">
      <rect x="0" y="0" width="230" height="35" rx="5" fill="${colors.warning}" opacity="0.15"/>
      <text x="115" y="15" font-family="SimHei" font-size="12" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">条件3: 场景聚集</text>
      <text x="115" y="30" font-family="SimSun" font-size="11" fill="${colors.gray}" text-anchor="middle">场景信息熵 &lt; 0.5</text>
    </g>
  </g>
  
  <!-- 箭头1 -->
  <path d="M295,150 L330,150" stroke="${colors.gray}" stroke-width="2" marker-end="url(#arrowGray)"/>
  <text x="312" y="140" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">OR</text>
  
  <!-- 第二部分：执行推理 -->
  <g transform="translate(335, 60)">
    <rect x="0" y="0" width="240" height="180" rx="10" fill="${colors.white}" filter="url(#shadow2)" stroke="${colors.primary}" stroke-width="2"/>
    <rect x="0" y="0" width="240" height="40" rx="10" fill="url(#executeGrad)"/>
    <rect x="0" y="30" width="240" height="10" fill="url(#executeGrad)"/>
    <text x="120" y="28" font-family="SimHei" font-size="14" fill="${colors.white}" text-anchor="middle" font-weight="bold">执行Reflection推理</text>
    
    <!-- 步骤 -->
    <g transform="translate(15, 55)">
      <circle cx="12" cy="12" r="12" fill="${colors.primary}"/>
      <text x="12" y="17" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle">1</text>
      <text x="35" y="17" font-family="SimSun" font-size="12" fill="${colors.darkText}">构建Reflection提示词</text>
    </g>
    <g transform="translate(15, 85)">
      <circle cx="12" cy="12" r="12" fill="${colors.primary}"/>
      <text x="12" y="17" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle">2</text>
      <text x="35" y="17" font-family="SimSun" font-size="12" fill="${colors.darkText}">调用VLM生成响应</text>
    </g>
    <g transform="translate(15, 115)">
      <circle cx="12" cy="12" r="12" fill="${colors.primary}"/>
      <text x="12" y="17" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle">3</text>
      <text x="35" y="17" font-family="SimSun" font-size="12" fill="${colors.darkText}">解析高级事实</text>
    </g>
    <g transform="translate(15, 145)">
      <circle cx="12" cy="12" r="12" fill="${colors.primary}"/>
      <text x="12" y="17" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle">4</text>
      <text x="35" y="17" font-family="SimSun" font-size="12" fill="${colors.darkText}">计算置信度分数</text>
    </g>
  </g>
  
  <!-- 箭头2 -->
  <path d="M580,150 L615,150" stroke="${colors.primary}" stroke-width="2" marker-end="url(#arrowBlue)"/>
  
  <!-- 第三部分：置信度计算 -->
  <g transform="translate(620, 60)">
    <rect x="0" y="0" width="250" height="180" rx="10" fill="${colors.white}" filter="url(#shadow2)" stroke="${colors.success}" stroke-width="2"/>
    <rect x="0" y="0" width="250" height="40" rx="10" fill="url(#confGrad)"/>
    <rect x="0" y="30" width="250" height="10" fill="url(#confGrad)"/>
    <text x="125" y="28" font-family="SimHei" font-size="14" fill="${colors.white}" text-anchor="middle" font-weight="bold">置信度计算公式</text>
    
    <!-- 公式 -->
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="220" height="70" rx="6" fill="${colors.success}" opacity="0.1"/>
      <text x="110" y="25" font-family="Consolas" font-size="13" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">Confidence =</text>
      <text x="110" y="48" font-family="Consolas" font-size="11" fill="${colors.gray}" text-anchor="middle">Evidence×0.4 + Temporal×0.3</text>
      <text x="110" y="63" font-family="Consolas" font-size="11" fill="${colors.gray}" text-anchor="middle">+ Spatial×0.3</text>
    </g>
    
    <!-- 阈值判断 -->
    <g transform="translate(15, 135)">
      <rect x="0" y="0" width="105" height="35" rx="5" fill="${colors.success}" opacity="0.2"/>
      <text x="52" y="15" font-family="SimSun" font-size="11" fill="${colors.success}" text-anchor="middle" font-weight="bold">≥ 0.6</text>
      <text x="52" y="30" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">保存入库</text>
      
      <rect x="115" y="0" width="105" height="35" rx="5" fill="${colors.danger}" opacity="0.2"/>
      <text x="167" y="15" font-family="SimSun" font-size="11" fill="${colors.danger}" text-anchor="middle" font-weight="bold">&lt; 0.6</text>
      <text x="167" y="30" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">标记待验证</text>
    </g>
  </g>
  
  <!-- 执行时机说明 -->
  <g transform="translate(30, 270)">
    <rect x="0" y="0" width="840" height="100" rx="10" fill="${colors.white}" filter="url(#shadow2)"/>
    <text x="420" y="30" font-family="SimHei" font-size="14" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">执行时机与资源约束</text>
    
    <!-- 时机 -->
    <g transform="translate(30, 45)">
      <rect x="0" y="0" width="180" height="45" rx="6" fill="${colors.purple}" opacity="0.15"/>
      <text x="90" y="18" font-family="SimHei" font-size="12" fill="${colors.purple}" text-anchor="middle" font-weight="bold">WorkManager约束</text>
      <text x="90" y="38" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">充电中 + 息屏空闲</text>
    </g>
    <g transform="translate(230, 45)">
      <rect x="0" y="0" width="180" height="45" rx="6" fill="${colors.teal}" opacity="0.15"/>
      <text x="90" y="18" font-family="SimHei" font-size="12" fill="${colors.teal}" text-anchor="middle" font-weight="bold">预计耗时</text>
      <text x="90" y="38" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">45-60秒/次 (30条记忆)</text>
    </g>
    <g transform="translate(430, 45)">
      <rect x="0" y="0" width="180" height="45" rx="6" fill="${colors.secondary}" opacity="0.15"/>
      <text x="90" y="18" font-family="SimHei" font-size="12" fill="${colors.secondary}" text-anchor="middle" font-weight="bold">推理引擎</text>
      <text x="90" y="38" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">Qwen3-VL-2B (q4f32)</text>
    </g>
    <g transform="translate(630, 45)">
      <rect x="0" y="0" width="180" height="45" rx="6" fill="${colors.gray}" opacity="0.15"/>
      <text x="90" y="18" font-family="SimHei" font-size="12" fill="${colors.gray}" text-anchor="middle" font-weight="bold">成熟度</text>
      <text x="90" y="38" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">TRL 4 (需原型验证)</text>
    </g>
  </g>
  
  <!-- 输出示例 -->
  <g transform="translate(30, 395)">
    <rect x="0" y="0" width="840" height="110" rx="10" fill="${colors.white}" filter="url(#shadow2)"/>
    <text x="420" y="30" font-family="SimHei" font-size="14" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">高级事实推断示例 (HighLevelFact)</text>
    
    <g transform="translate(30, 45)">
      <rect x="0" y="0" width="380" height="55" rx="6" fill="${colors.primary}" opacity="0.1"/>
      <text x="15" y="20" font-family="SimHei" font-size="12" fill="${colors.primary}" font-weight="bold">输入: 短期记忆序列</text>
      <text x="15" y="40" font-family="SimSun" font-size="11" fill="${colors.gray}">海滩×5, 酒店×3, 美食×8, 景点×6 (GPS: 三亚)</text>
    </g>
    <g transform="translate(430, 45)">
      <rect x="0" y="0" width="380" height="55" rx="6" fill="${colors.success}" opacity="0.1"/>
      <text x="15" y="20" font-family="SimHei" font-size="12" fill="${colors.success}" font-weight="bold">输出: 高级事实</text>
      <text x="15" y="40" font-family="SimSun" font-size="11" fill="${colors.gray}">"用户正在三亚旅行" (置信度: 0.87)</text>
    </g>
  </g>
</svg>`;

// 图表3: UserPreference + EMA算法示意图
const chart3_preference = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="850" height="450" viewBox="0 0 850 450">
  <defs>
    <filter id="shadow3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.12"/>
    </filter>
    <linearGradient id="prefGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.purple};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#A855F7;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="emaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.teal};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.success};stop-opacity:1" />
    </linearGradient>
    <marker id="arrowPurple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${colors.purple}"/>
    </marker>
  </defs>
  
  <!-- 背景 -->
  <rect width="850" height="450" fill="${colors.background}"/>
  
  <!-- 标题 -->
  <text x="425" y="35" font-family="SimHei, Microsoft YaHei" font-size="20" font-weight="bold" fill="${colors.darkText}" text-anchor="middle">隐式记忆层偏好学习机制 (UserPreference)</text>
  
  <!-- 左侧：数据模型 -->
  <g transform="translate(30, 60)">
    <rect x="0" y="0" width="300" height="250" rx="10" fill="${colors.white}" filter="url(#shadow3)" stroke="${colors.purple}" stroke-width="2"/>
    <rect x="0" y="0" width="300" height="40" rx="10" fill="url(#prefGrad)"/>
    <rect x="0" y="30" width="300" height="10" fill="url(#prefGrad)"/>
    <text x="150" y="28" font-family="SimHei" font-size="14" fill="${colors.white}" text-anchor="middle" font-weight="bold">偏好数据模型</text>
    
    <!-- 字段 -->
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="270" height="35" rx="5" fill="${colors.purple}" opacity="0.1"/>
      <circle cx="15" cy="17" r="8" fill="${colors.purple}"/>
      <text x="15" y="22" font-family="Consolas" font-size="8" fill="${colors.white}" text-anchor="middle">PK</text>
      <text x="35" y="15" font-family="SimHei" font-size="12" fill="${colors.darkText}" font-weight="bold">sceneType</text>
      <text x="35" y="30" font-family="SimSun" font-size="10" fill="${colors.gray}">场景类型: food / landscape / portrait</text>
    </g>
    <g transform="translate(15, 100)">
      <rect x="0" y="0" width="270" height="35" rx="5" fill="${colors.teal}" opacity="0.1"/>
      <circle cx="15" cy="17" r="8" fill="${colors.teal}"/>
      <text x="15" y="22" font-family="Consolas" font-size="6" fill="${colors.white}" text-anchor="middle">Vec</text>
      <text x="35" y="15" font-family="SimHei" font-size="12" fill="${colors.darkText}" font-weight="bold">filterPreference</text>
      <text x="35" y="30" font-family="SimSun" font-size="10" fill="${colors.gray}">滤镜偏好向量 (EMA更新)</text>
    </g>
    <g transform="translate(15, 145)">
      <rect x="0" y="0" width="130" height="35" rx="5" fill="${colors.warning}" opacity="0.1"/>
      <text x="65" y="15" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">brightnessAvg</text>
      <text x="65" y="30" font-family="SimSun" font-size="9" fill="${colors.gray}" text-anchor="middle">亮度均值</text>
      
      <rect x="140" y="0" width="130" height="35" rx="5" fill="${colors.warning}" opacity="0.1"/>
      <text x="205" y="15" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">contrastAvg</text>
      <text x="205" y="30" font-family="SimSun" font-size="9" fill="${colors.gray}" text-anchor="middle">对比度均值</text>
    </g>
    <g transform="translate(15, 190)">
      <rect x="0" y="0" width="130" height="35" rx="5" fill="${colors.gray}" opacity="0.1"/>
      <text x="65" y="15" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">updateCount</text>
      <text x="65" y="30" font-family="SimSun" font-size="9" fill="${colors.gray}" text-anchor="middle">样本数量</text>
      
      <rect x="140" y="0" width="130" height="35" rx="5" fill="${colors.gray}" opacity="0.1"/>
      <text x="205" y="15" font-family="SimHei" font-size="11" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">lastUpdated</text>
      <text x="205" y="30" font-family="SimSun" font-size="9" fill="${colors.gray}" text-anchor="middle">最后更新时间</text>
    </g>
  </g>
  
  <!-- 箭头 -->
  <path d="M340,185 L380,185" stroke="${colors.purple}" stroke-width="2" marker-end="url(#arrowPurple)"/>
  <text x="360" y="175" font-family="SimSun" font-size="10" fill="${colors.purple}" text-anchor="middle">更新</text>
  
  <!-- 右侧：EMA算法 -->
  <g transform="translate(390, 60)">
    <rect x="0" y="0" width="430" height="250" rx="10" fill="${colors.white}" filter="url(#shadow3)" stroke="${colors.teal}" stroke-width="2"/>
    <rect x="0" y="0" width="430" height="40" rx="10" fill="url(#emaGrad)"/>
    <rect x="0" y="30" width="430" height="10" fill="url(#emaGrad)"/>
    <text x="215" y="28" font-family="SimHei" font-size="14" fill="${colors.white}" text-anchor="middle" font-weight="bold">EMA指数移动平均更新算法</text>
    
    <!-- 核心公式 -->
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="400" height="60" rx="8" fill="${colors.teal}" opacity="0.15"/>
      <text x="200" y="25" font-family="SimHei" font-size="14" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">核心公式</text>
      <text x="200" y="48" font-family="Consolas" font-size="15" fill="${colors.teal}" text-anchor="middle" font-weight="bold">Pref_new = α × Edit + (1-α) × Pref_old</text>
    </g>
    
    <!-- 参数说明 -->
    <g transform="translate(15, 125)">
      <rect x="0" y="0" width="130" height="55" rx="6" fill="${colors.purple}" opacity="0.1"/>
      <text x="65" y="20" font-family="SimHei" font-size="12" fill="${colors.purple}" text-anchor="middle" font-weight="bold">α = 0.2</text>
      <text x="65" y="38" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">平滑系数</text>
      <text x="65" y="50" font-family="SimSun" font-size="9" fill="${colors.gray}" text-anchor="middle">新数据权重20%</text>
      
      <rect x="140" y="0" width="130" height="55" rx="6" fill="${colors.success}" opacity="0.1"/>
      <text x="205" y="20" font-family="SimHei" font-size="12" fill="${colors.success}" text-anchor="middle" font-weight="bold">Edit</text>
      <text x="205" y="38" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">本次修图参数</text>
      <text x="205" y="50" font-family="SimSun" font-size="9" fill="${colors.gray}" text-anchor="middle">滤镜/亮度/对比度</text>
      
      <rect x="280" y="0" width="120" height="55" rx="6" fill="${colors.secondary}" opacity="0.1"/>
      <text x="340" y="20" font-family="SimHei" font-size="12" fill="${colors.secondary}" text-anchor="middle" font-weight="bold">Pref</text>
      <text x="340" y="38" font-family="SimSun" font-size="10" fill="${colors.gray}" text-anchor="middle">历史偏好</text>
      <text x="340" y="50" font-family="SimSun" font-size="9" fill="${colors.gray}" text-anchor="middle">保留80%权重</text>
    </g>
    
    <!-- 特点说明 -->
    <g transform="translate(15, 195)">
      <circle cx="15" cy="12" r="6" fill="${colors.success}"/>
      <text x="30" y="16" font-family="SimSun" font-size="11" fill="${colors.darkText}">纯统计方法，无ML依赖</text>
      
      <circle cx="215" cy="12" r="6" fill="${colors.success}"/>
      <text x="230" y="16" font-family="SimSun" font-size="11" fill="${colors.darkText}">Room数据库存储</text>
      
      <circle cx="15" cy="35" r="6" fill="${colors.success}"/>
      <text x="30" y="39" font-family="SimSun" font-size="11" fill="${colors.darkText}">按场景分组，独立学习</text>
      
      <circle cx="215" cy="35" r="6" fill="${colors.success}"/>
      <text x="230" y="39" font-family="SimSun" font-size="11" fill="${colors.darkText}">实现复杂度低</text>
    </g>
  </g>
  
  <!-- 底部：工作流程 -->
  <g transform="translate(30, 330)">
    <rect x="0" y="0" width="790" height="105" rx="10" fill="${colors.white}" filter="url(#shadow3)"/>
    <text x="395" y="28" font-family="SimHei" font-size="14" fill="${colors.darkText}" text-anchor="middle" font-weight="bold">偏好学习触发流程</text>
    
    <!-- 流程步骤 -->
    <g transform="translate(30, 45)">
      <rect x="0" y="0" width="140" height="50" rx="8" fill="${colors.purple}" opacity="0.9"/>
      <text x="70" y="22" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">用户修图</text>
      <text x="70" y="40" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">选择滤镜/调参</text>
    </g>
    <path d="M175,70 L210,70" stroke="${colors.gray}" stroke-width="2" marker-end="url(#arrowGray)"/>
    
    <g transform="translate(215, 45)">
      <rect x="0" y="0" width="140" height="50" rx="8" fill="${colors.teal}" opacity="0.9"/>
      <text x="70" y="22" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">识别场景类型</text>
      <text x="70" y="40" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">food/landscape/...</text>
    </g>
    <path d="M360,70 L395,70" stroke="${colors.gray}" stroke-width="2" marker-end="url(#arrowGray)"/>
    
    <g transform="translate(400, 45)">
      <rect x="0" y="0" width="140" height="50" rx="8" fill="${colors.success}" opacity="0.9"/>
      <text x="70" y="22" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">EMA更新偏好</text>
      <text x="70" y="40" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">α=0.2 平滑更新</text>
    </g>
    <path d="M545,70 L580,70" stroke="${colors.gray}" stroke-width="2" marker-end="url(#arrowGray)"/>
    
    <g transform="translate(585, 45)">
      <rect x="0" y="0" width="170" height="50" rx="8" fill="${colors.secondary}" opacity="0.9"/>
      <text x="85" y="22" font-family="SimHei" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">下次修图时推荐</text>
      <text x="85" y="40" font-family="SimSun" font-size="10" fill="${colors.white}" text-anchor="middle">场景化个性化建议</text>
    </g>
  </g>
</svg>`;

// 写入文件
const charts = [
    { name: 'diagram_imagememory_model.svg', content: chart1_imagememory },
    { name: 'diagram_reflection_flow.svg', content: chart2_reflection },
    { name: 'diagram_preference_ema.svg', content: chart3_preference }
];

charts.forEach(chart => {
    const filePath = path.join(outputDir, chart.name);
    fs.writeFileSync(filePath, chart.content, 'utf8');
    console.log(`Generated: ${chart.name}`);
});

console.log(`\n代码示意图已保存到: ${outputDir}`);
console.log('运行转换脚本生成PNG文件。');
