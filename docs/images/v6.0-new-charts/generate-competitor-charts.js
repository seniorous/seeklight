/**
 * 竞品分析图表生成器
 * 生成国产手机系统相册对比图和OCR vs 记忆架构对比图
 */

const fs = require('fs');
const path = require('path');

// 图1: 国产手机系统相册AI功能对比
const svg_system_album = `<svg width="800" height="480" viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="huaweiBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#FF6B6B;stop-opacity:0.05"/>
    </linearGradient>
    <linearGradient id="xiaomiBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#FF9500;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#FF9500;stop-opacity:0.05"/>
    </linearGradient>
    <linearGradient id="vivoBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#415FFF;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#415FFF;stop-opacity:0.05"/>
    </linearGradient>
    <linearGradient id="oppoBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#00A86B;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#00A86B;stop-opacity:0.05"/>
    </linearGradient>
  </defs>
  
  <rect width="800" height="480" fill="#FAFAFA"/>
  
  <!-- 标题 -->
  <text x="400" y="35" font-family="SimHei, sans-serif" font-size="18" fill="#333" text-anchor="middle" font-weight="bold">国产手机系统相册AI功能对比</text>
  
  <!-- 四个品牌卡片 -->
  <!-- 华为 -->
  <rect x="30" y="60" width="175" height="200" rx="8" fill="url(#huaweiBg)" stroke="#FF6B6B" stroke-width="2"/>
  <text x="118" y="90" font-family="SimHei" font-size="16" fill="#FF6B6B" text-anchor="middle" font-weight="bold">华为相册</text>
  <text x="118" y="110" font-family="SimSun" font-size="11" fill="#666" text-anchor="middle">HarmonyOS</text>
  <line x1="50" y1="120" x2="185" y2="120" stroke="#FF6B6B" stroke-width="1" opacity="0.3"/>
  <text x="45" y="140" font-family="SimSun" font-size="11" fill="#333">• 精彩瞬间优化</text>
  <text x="45" y="158" font-family="SimSun" font-size="11" fill="#333">• 反光消除/除雾</text>
  <text x="45" y="176" font-family="SimSun" font-size="11" fill="#333">• 路人智能移除</text>
  <text x="45" y="194" font-family="SimSun" font-size="11" fill="#333">• 文档矫正</text>
  <rect x="45" y="220" width="130" height="24" rx="4" fill="#FFE5E5"/>
  <text x="110" y="236" font-family="SimSun" font-size="10" fill="#C0392B" text-anchor="middle">单图编辑为主</text>
  
  <!-- 小米 -->
  <rect x="220" y="60" width="175" height="200" rx="8" fill="url(#xiaomiBg)" stroke="#FF9500" stroke-width="2"/>
  <text x="308" y="90" font-family="SimHei" font-size="16" fill="#FF9500" text-anchor="middle" font-weight="bold">小米相册</text>
  <text x="308" y="110" font-family="SimSun" font-size="11" fill="#666" text-anchor="middle">澎湃OS</text>
  <line x1="240" y1="120" x2="375" y2="120" stroke="#FF9500" stroke-width="1" opacity="0.3"/>
  <text x="235" y="140" font-family="SimSun" font-size="11" fill="#333">• AI消除效果好</text>
  <text x="235" y="158" font-family="SimSun" font-size="11" fill="#333">• AI扩图</text>
  <text x="235" y="176" font-family="SimSun" font-size="11" fill="#333">• 智能视频剪辑</text>
  <text x="235" y="194" font-family="SimSun" font-size="11" fill="#333">• AI图文生成</text>
  <rect x="235" y="220" width="130" height="24" rx="4" fill="#FFF3E0"/>
  <text x="300" y="236" font-family="SimSun" font-size="10" fill="#E65100" text-anchor="middle">创作辅助为主</text>
  
  <!-- vivo -->
  <rect x="410" y="60" width="175" height="200" rx="8" fill="url(#vivoBg)" stroke="#415FFF" stroke-width="2"/>
  <text x="498" y="90" font-family="SimHei" font-size="16" fill="#415FFF" text-anchor="middle" font-weight="bold">vivo相册</text>
  <text x="498" y="110" font-family="SimSun" font-size="11" fill="#666" text-anchor="middle">OriginOS</text>
  <line x1="430" y1="120" x2="565" y2="120" stroke="#415FFF" stroke-width="1" opacity="0.3"/>
  <text x="425" y="140" font-family="SimSun" font-size="11" fill="#333">• 蓝心小V搜索</text>
  <text x="425" y="158" font-family="SimSun" font-size="11" fill="#333">• 屏幕识别跳转</text>
  <text x="425" y="176" font-family="SimSun" font-size="11" fill="#333">• AI总结命名</text>
  <text x="425" y="194" font-family="SimSun" font-size="11" fill="#333">• 个性化美颜</text>
  <rect x="425" y="220" width="130" height="24" rx="4" fill="#E8EAF6"/>
  <text x="490" y="236" font-family="SimSun" font-size="10" fill="#3949AB" text-anchor="middle">交互体验为主</text>
  
  <!-- OPPO -->
  <rect x="600" y="60" width="175" height="200" rx="8" fill="url(#oppoBg)" stroke="#00A86B" stroke-width="2"/>
  <text x="688" y="90" font-family="SimHei" font-size="16" fill="#00A86B" text-anchor="middle" font-weight="bold">OPPO相册</text>
  <text x="688" y="110" font-family="SimSun" font-size="11" fill="#666" text-anchor="middle">ColorOS</text>
  <line x1="620" y1="120" x2="755" y2="120" stroke="#00A86B" stroke-width="1" opacity="0.3"/>
  <text x="615" y="140" font-family="SimSun" font-size="11" fill="#333">• AI自动构图</text>
  <text x="615" y="158" font-family="SimSun" font-size="11" fill="#333">• 去拖影/去反光</text>
  <text x="615" y="176" font-family="SimSun" font-size="11" fill="#333">• 无痕消除</text>
  <text x="615" y="194" font-family="SimSun" font-size="11" fill="#333">• AI灵感成片</text>
  <rect x="615" y="220" width="130" height="24" rx="4" fill="#E8F5E9"/>
  <text x="680" y="236" font-family="SimSun" font-size="10" fill="#2E7D32" text-anchor="middle">影像优化为主</text>
  
  <!-- 共性问题区域 -->
  <rect x="30" y="280" width="745" height="180" rx="8" fill="#FFF5F5" stroke="#E74C3C" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="400" y="310" font-family="SimHei" font-size="16" fill="#C0392B" text-anchor="middle" font-weight="bold">共性局限：识别孤岛问题</text>
  
  <!-- 三个问题点 -->
  <g transform="translate(60, 330)">
    <circle cx="15" cy="15" r="20" fill="#FFCDD2"/>
    <text x="15" y="20" font-family="sans-serif" font-size="16" fill="#C0392B" text-anchor="middle" font-weight="bold">1</text>
    <text x="50" y="12" font-family="SimHei" font-size="13" fill="#333">单图独立处理</text>
    <text x="50" y="32" font-family="SimSun" font-size="11" fill="#666">每张图片被孤立分析，无法理解图片间的关联</text>
  </g>
  
  <g transform="translate(300, 330)">
    <circle cx="15" cy="15" r="20" fill="#FFCDD2"/>
    <text x="15" y="20" font-family="sans-serif" font-size="16" fill="#C0392B" text-anchor="middle" font-weight="bold">2</text>
    <text x="50" y="12" font-family="SimHei" font-size="13" fill="#333">OCR关键词匹配</text>
    <text x="50" y="32" font-family="SimSun" font-size="11" fill="#666">依赖文字识别，无法理解语义等价关系</text>
  </g>
  
  <g transform="translate(540, 330)">
    <circle cx="15" cy="15" r="20" fill="#FFCDD2"/>
    <text x="15" y="20" font-family="sans-serif" font-size="16" fill="#C0392B" text-anchor="middle" font-weight="bold">3</text>
    <text x="50" y="12" font-family="SimHei" font-size="13" fill="#333">品牌锁定</text>
    <text x="50" y="32" font-family="SimSun" font-size="11" fill="#666">换机后AI分析结果无法迁移，体验归零</text>
  </g>
  
  <!-- 底部对比 -->
  <rect x="60" y="400" width="300" height="55" rx="6" fill="#FFEBEE"/>
  <text x="210" y="422" font-family="SimHei" font-size="12" fill="#C0392B" text-anchor="middle">用户搜索「上次旅行的照片」</text>
  <text x="210" y="442" font-family="SimSun" font-size="11" fill="#666" text-anchor="middle">系统相册：仅匹配含「旅行」文字的图片 ✗</text>
  
  <rect x="440" y="400" width="300" height="55" rx="6" fill="#E8F5E9"/>
  <text x="590" y="422" font-family="SimHei" font-size="12" fill="#2E7D32" text-anchor="middle">拾光层次化记忆架构</text>
  <text x="590" y="442" font-family="SimSun" font-size="11" fill="#666" text-anchor="middle">关联返回机票+酒店+景点全部照片 ✓</text>
</svg>`;

// 图2: 传统OCR方案与层次化记忆架构对比
const svg_memory_vs_ocr = `<svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="450" fill="#FAFAFA"/>
  
  <!-- 标题 -->
  <text x="400" y="35" font-family="SimHei, sans-serif" font-size="18" fill="#333" text-anchor="middle" font-weight="bold">传统OCR方案 vs 层次化记忆架构</text>
  
  <!-- 左侧：传统OCR方案 -->
  <rect x="30" y="60" width="355" height="370" rx="10" fill="#FFF5F5" stroke="#E74C3C" stroke-width="2"/>
  <text x="208" y="90" font-family="SimHei" font-size="16" fill="#C0392B" text-anchor="middle" font-weight="bold">传统方案：OCR + 关键词匹配</text>
  
  <!-- 传统方案流程 -->
  <g transform="translate(50, 110)">
    <!-- 输入 -->
    <rect x="0" y="0" width="120" height="40" rx="5" fill="#FFCDD2"/>
    <text x="60" y="25" font-family="SimSun" font-size="12" fill="#333" text-anchor="middle">用户输入查询</text>
    
    <path d="M 120 20 L 145 20" stroke="#999" stroke-width="2" marker-end="url(#arrow)"/>
    
    <!-- OCR处理 -->
    <rect x="150" y="0" width="120" height="40" rx="5" fill="#FFCDD2"/>
    <text x="210" y="25" font-family="SimSun" font-size="12" fill="#333" text-anchor="middle">OCR文字识别</text>
    
    <!-- 孤立图片 -->
    <g transform="translate(0, 70)">
      <rect x="30" y="0" width="60" height="50" rx="3" fill="#FFE0E0" stroke="#E57373"/>
      <text x="60" y="30" font-family="SimSun" font-size="10" fill="#666" text-anchor="middle">图片A</text>
      <rect x="110" y="0" width="60" height="50" rx="3" fill="#FFE0E0" stroke="#E57373"/>
      <text x="140" y="30" font-family="SimSun" font-size="10" fill="#666" text-anchor="middle">图片B</text>
      <rect x="190" y="0" width="60" height="50" rx="3" fill="#FFE0E0" stroke="#E57373"/>
      <text x="220" y="30" font-family="SimSun" font-size="10" fill="#666" text-anchor="middle">图片C</text>
    </g>
    <text x="140" y="145" font-family="SimSun" font-size="11" fill="#999" text-anchor="middle">每张图片独立处理，无关联</text>
    
    <!-- 问题示例 -->
    <rect x="0" y="165" width="295" height="80" rx="5" fill="#FFEBEE" stroke="#E57373" stroke-dasharray="3,2"/>
    <text x="148" y="190" font-family="SimHei" font-size="12" fill="#C0392B" text-anchor="middle">典型问题场景</text>
    <text x="148" y="210" font-family="SimSun" font-size="11" fill="#666" text-anchor="middle">搜索「咖啡发票」→ 仅匹配含「咖啡」文字的图</text>
    <text x="148" y="228" font-family="SimSun" font-size="11" fill="#C0392B" text-anchor="middle">星巴克小票无「咖啡」二字 → 无法匹配 ✗</text>
  </g>
  
  <!-- 右侧：层次化记忆架构 -->
  <rect x="415" y="60" width="355" height="370" rx="10" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
  <text x="593" y="90" font-family="SimHei" font-size="16" fill="#2E7D32" text-anchor="middle" font-weight="bold">拾光：层次化记忆架构</text>
  
  <!-- 三层记忆 -->
  <g transform="translate(435, 110)">
    <!-- 短期记忆 -->
    <rect x="0" y="0" width="315" height="55" rx="5" fill="#C8E6C9"/>
    <text x="158" y="22" font-family="SimHei" font-size="13" fill="#2E7D32" text-anchor="middle">短期记忆层 (ImageMemory)</text>
    <text x="158" y="42" font-family="SimSun" font-size="10" fill="#555" text-anchor="middle">VLM语义描述 + OCR文字 + 场景标签 + 语义向量</text>
    
    <!-- 长期记忆 -->
    <rect x="0" y="65" width="315" height="55" rx="5" fill="#A5D6A7"/>
    <text x="158" y="87" font-family="SimHei" font-size="13" fill="#1B5E20" text-anchor="middle">长期记忆层 (HighLevelFact)</text>
    <text x="158" y="107" font-family="SimSun" font-size="10" fill="#555" text-anchor="middle">Reflection推断：「用户正在三亚旅行」「用户喜欢咖啡」</text>
    
    <!-- 隐式记忆 -->
    <rect x="0" y="130" width="315" height="55" rx="5" fill="#81C784"/>
    <text x="158" y="152" font-family="SimHei" font-size="13" fill="#1B5E20" text-anchor="middle">隐式记忆层 (UserPreference)</text>
    <text x="158" y="172" font-family="SimSun" font-size="10" fill="#555" text-anchor="middle">场景化偏好：拍食物→暖色调 / 拍风景→高饱和</text>
    
    <!-- 优势示例 -->
    <rect x="0" y="200" width="315" height="80" rx="5" fill="#E8F5E9" stroke="#66BB6A" stroke-dasharray="3,2"/>
    <text x="158" y="225" font-family="SimHei" font-size="12" fill="#2E7D32" text-anchor="middle">语义理解能力</text>
    <text x="158" y="245" font-family="SimSun" font-size="11" fill="#666" text-anchor="middle">搜索「咖啡发票」→ 理解星巴克=咖啡品牌</text>
    <text x="158" y="263" font-family="SimSun" font-size="11" fill="#2E7D32" text-anchor="middle">语义向量相似度匹配 → 成功返回 ✓</text>
  </g>
  
  <!-- 底部对比总结 -->
  <g transform="translate(0, 400)">
    <rect x="80" y="0" width="250" height="35" rx="5" fill="#FFCDD2"/>
    <text x="205" y="22" font-family="SimSun" font-size="12" fill="#C0392B" text-anchor="middle">关键词匹配 → 字面相同才能找到</text>
    
    <rect x="470" y="0" width="250" height="35" rx="5" fill="#C8E6C9"/>
    <text x="595" y="22" font-family="SimSun" font-size="12" fill="#2E7D32" text-anchor="middle">语义理解 → 意思相近即可找到</text>
  </g>
  
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#999"/>
    </marker>
  </defs>
</svg>`;

// 写入文件
fs.writeFileSync(path.join(__dirname, 'chart_system_album_comparison.svg'), svg_system_album);
fs.writeFileSync(path.join(__dirname, 'chart_memory_vs_ocr.svg'), svg_memory_vs_ocr);

console.log('竞品分析图表SVG文件生成完成');
