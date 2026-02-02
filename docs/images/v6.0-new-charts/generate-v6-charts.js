/**
 * v6.0 新增内容配图生成器
 * - HNSW算法原理图
 * - PQ乘积量化压缩图（更新）
 * - Reflection三项挑战图
 * - 市场规模TAM/SAM/SOM图
 * - SWOT战略组合双栏图
 * - 竞品定价对比图
 * - 用户付费意愿图
 */
const fs = require('fs');
const path = require('path');

// ========== 1. HNSW算法原理图 ==========
const svg_hnsw = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480">
  <defs>
    <linearGradient id="layerGrad0" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4A6FA5"/><stop offset="100%" style="stop-color:#3A5F95"/>
    </linearGradient>
    <linearGradient id="layerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#5580B0"/><stop offset="100%" style="stop-color:#4570A0"/>
    </linearGradient>
    <linearGradient id="layerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6090C0"/><stop offset="100%" style="stop-color:#5080B0"/>
    </linearGradient>
    <filter id="shadowH"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/></filter>
  </defs>
  
  <rect width="800" height="480" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="400" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#2C3E50">HNSW分层可导航小世界图索引结构</text>
  
  <!-- 左侧：层次结构示意 -->
  <g transform="translate(30, 60)">
    <rect x="0" y="0" width="350" height="380" rx="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" filter="url(#shadowH)"/>
    <text x="175" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="#2C3E50" font-weight="bold">多层图结构</text>
    
    <!-- Layer 2（最高层）-->
    <g transform="translate(30, 50)">
      <rect x="0" y="0" width="290" height="70" rx="6" fill="url(#layerGrad0)"/>
      <text x="145" y="20" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">Layer 2（入口层）</text>
      <!-- 节点 -->
      <circle cx="70" cy="48" r="12" fill="#F4A261" stroke="white" stroke-width="2"/>
      <circle cx="220" cy="48" r="12" fill="#E9ECEF" stroke="white" stroke-width="2"/>
      <line x1="82" y1="48" x2="208" y2="48" stroke="white" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="145" y="68" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">少量节点，长跨度连接</text>
    </g>
    
    <!-- Layer 1（中间层）-->
    <g transform="translate(30, 135)">
      <rect x="0" y="0" width="290" height="90" rx="6" fill="url(#layerGrad1)"/>
      <text x="145" y="20" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">Layer 1（中间层）</text>
      <!-- 节点 -->
      <circle cx="50" cy="55" r="10" fill="#F4A261" stroke="white" stroke-width="2"/>
      <circle cx="110" cy="55" r="10" fill="#E9ECEF" stroke="white" stroke-width="2"/>
      <circle cx="170" cy="55" r="10" fill="#E9ECEF" stroke="white" stroke-width="2"/>
      <circle cx="240" cy="55" r="10" fill="#E9ECEF" stroke="white" stroke-width="2"/>
      <line x1="60" y1="55" x2="100" y2="55" stroke="white" stroke-width="1.5"/>
      <line x1="120" y1="55" x2="160" y2="55" stroke="white" stroke-width="1.5"/>
      <line x1="180" y1="55" x2="230" y2="55" stroke="white" stroke-width="1.5"/>
      <text x="145" y="80" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">中等数量节点，中等跨度</text>
    </g>
    
    <!-- Layer 0（底层）-->
    <g transform="translate(30, 240)">
      <rect x="0" y="0" width="290" height="120" rx="6" fill="url(#layerGrad2)"/>
      <text x="145" y="20" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">Layer 0（底层 - 全部数据）</text>
      <!-- 节点网格 -->
      <g transform="translate(25, 35)">
        <circle cx="0" cy="0" r="8" fill="#F4A261" stroke="white" stroke-width="1.5"/>
        <circle cx="40" cy="0" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        <circle cx="80" cy="0" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        <circle cx="120" cy="0" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        <circle cx="160" cy="0" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        <circle cx="200" cy="0" r="8" fill="#2A9D8F" stroke="white" stroke-width="1.5"/>
        <circle cx="240" cy="0" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        
        <circle cx="20" cy="35" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        <circle cx="60" cy="35" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        <circle cx="100" cy="35" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        <circle cx="140" cy="35" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        <circle cx="180" cy="35" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        <circle cx="220" cy="35" r="8" fill="#E9ECEF" stroke="white" stroke-width="1.5"/>
        
        <!-- 连接线 -->
        <line x1="8" y1="0" x2="32" y2="0" stroke="white" stroke-width="1"/>
        <line x1="48" y1="0" x2="72" y2="0" stroke="white" stroke-width="1"/>
        <line x1="88" y1="0" x2="112" y2="0" stroke="white" stroke-width="1"/>
        <line x1="128" y1="0" x2="152" y2="0" stroke="white" stroke-width="1"/>
        <line x1="168" y1="0" x2="192" y2="0" stroke="white" stroke-width="1"/>
      </g>
      <text x="145" y="105" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="rgba(255,255,255,0.8)">所有节点，短距离邻近连接</text>
    </g>
    
    <!-- 图例 -->
    <g transform="translate(100, 365)">
      <circle cx="0" cy="0" r="6" fill="#F4A261"/>
      <text x="15" y="4" font-family="SimSun, serif" font-size="9" fill="#455A64">搜索路径</text>
      <circle cx="80" cy="0" r="6" fill="#2A9D8F"/>
      <text x="95" y="4" font-family="SimSun, serif" font-size="9" fill="#455A64">目标节点</text>
    </g>
  </g>
  
  <!-- 右侧：检索流程与参数 -->
  <g transform="translate(410, 60)">
    <rect x="0" y="0" width="360" height="200" rx="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" filter="url(#shadowH)"/>
    <text x="180" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="#2C3E50" font-weight="bold">检索流程</text>
    
    <g transform="translate(20, 45)">
      <rect x="0" y="0" width="320" height="35" rx="4" fill="#E3F2FD"/>
      <text x="160" y="15" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="#1565C0">1. 从Layer 2入口点开始</text>
      <text x="160" y="30" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">贪婪搜索当前层最近节点</text>
    </g>
    <text x="180" y="98" text-anchor="middle" font-family="Arial" font-size="14" fill="#7F8C8D">↓</text>
    <g transform="translate(20, 105)">
      <rect x="0" y="0" width="320" height="35" rx="4" fill="#FFF3E0"/>
      <text x="160" y="15" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="#E65100">2. 逐层下降搜索</text>
      <text x="160" y="30" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">每层找到的最近点作为下层入口</text>
    </g>
    <text x="180" y="158" text-anchor="middle" font-family="Arial" font-size="14" fill="#7F8C8D">↓</text>
    <g transform="translate(20, 165)">
      <rect x="0" y="0" width="320" height="28" rx="4" fill="#E8F5E9"/>
      <text x="160" y="18" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="#2E7D32">3. 在Layer 0精细搜索返回结果</text>
    </g>
  </g>
  
  <!-- 配置参数 -->
  <g transform="translate(410, 275)">
    <rect x="0" y="0" width="360" height="165" rx="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" filter="url(#shadowH)"/>
    <text x="180" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="#2C3E50" font-weight="bold">拾光配置参数</text>
    
    <g transform="translate(20, 45)">
      <rect x="0" y="0" width="155" height="50" rx="4" fill="#F5F5F5"/>
      <text x="78" y="20" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="#455A64">M (最大连接数)</text>
      <text x="78" y="40" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#4A6FA5">16</text>
    </g>
    <g transform="translate(185, 45)">
      <rect x="0" y="0" width="155" height="50" rx="4" fill="#F5F5F5"/>
      <text x="78" y="20" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="#455A64">ef_search</text>
      <text x="78" y="40" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#4A6FA5">50</text>
    </g>
    <g transform="translate(20, 105)">
      <rect x="0" y="0" width="320" height="45" rx="4" fill="#E8F5E9"/>
      <text x="160" y="18" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="#2E7D32">性能表现</text>
      <text x="160" y="36" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#455A64">10万向量 · 8ms检索 · 95%+召回率 · 50倍提升</text>
    </g>
  </g>
</svg>`;

// ========== 2. PQ乘积量化压缩图（更新版）==========
const svg_pq_new = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
  <defs>
    <linearGradient id="origGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#E76F51"/><stop offset="100%" style="stop-color:#F4A261"/>
    </linearGradient>
    <linearGradient id="compGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#52B788"/>
    </linearGradient>
    <filter id="shadowPQ"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/></filter>
  </defs>
  
  <rect width="800" height="420" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="400" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#2C3E50">PQ乘积量化压缩原理与效果</text>
  
  <!-- 上半部分：原理示意 -->
  <g transform="translate(30, 55)">
    <rect x="0" y="0" width="740" height="170" rx="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" filter="url(#shadowPQ)"/>
    <text x="370" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="#2C3E50" font-weight="bold">压缩原理：向量分割 + 子空间量化</text>
    
    <!-- 原始向量 -->
    <g transform="translate(20, 45)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#455A64">原始384维向量</text>
      <rect x="0" y="10" width="300" height="30" rx="4" fill="url(#origGrad)"/>
      <text x="150" y="30" text-anchor="middle" font-family="Arial" font-size="10" fill="white">[v₁, v₂, v₃, ... , v₃₈₄] × float32 = 1536字节</text>
    </g>
    
    <!-- 箭头 -->
    <text x="370" y="95" text-anchor="middle" font-family="Arial" font-size="16" fill="#7F8C8D">↓ 分割为48个8维子向量 ↓</text>
    
    <!-- 子向量 -->
    <g transform="translate(20, 110)">
      <rect x="0" y="0" width="60" height="40" rx="3" fill="#4A6FA5"/>
      <text x="30" y="25" text-anchor="middle" font-family="Arial" font-size="9" fill="white">子向量1</text>
      <rect x="70" y="0" width="60" height="40" rx="3" fill="#5580B0"/>
      <text x="100" y="25" text-anchor="middle" font-family="Arial" font-size="9" fill="white">子向量2</text>
      <rect x="140" y="0" width="60" height="40" rx="3" fill="#6090C0"/>
      <text x="170" y="25" text-anchor="middle" font-family="Arial" font-size="9" fill="white">子向量3</text>
      <text x="225" y="25" font-family="Arial" font-size="14" fill="#7F8C8D">...</text>
      <rect x="250" y="0" width="60" height="40" rx="3" fill="#70A0D0"/>
      <text x="280" y="25" text-anchor="middle" font-family="Arial" font-size="9" fill="white">子向量48</text>
    </g>
    
    <!-- 量化结果 -->
    <g transform="translate(370, 110)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#455A64">K-Means聚类 → 8-bit索引</text>
      <rect x="0" y="10" width="340" height="40" rx="4" fill="url(#compGrad)"/>
      <text x="170" y="35" text-anchor="middle" font-family="Arial" font-size="10" fill="white">[idx₁, idx₂, ... , idx₄₈] × uint8 = 48字节</text>
    </g>
  </g>
  
  <!-- 下半部分：效果对比 -->
  <g transform="translate(30, 240)">
    <rect x="0" y="0" width="360" height="160" rx="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" filter="url(#shadowPQ)"/>
    <text x="180" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="#2C3E50" font-weight="bold">存储空间对比（10万张图片）</text>
    
    <!-- 原始存储 -->
    <g transform="translate(20, 45)">
      <text x="0" y="0" font-family="SimSun, serif" font-size="10" fill="#455A64">原始存储</text>
      <rect x="0" y="8" width="300" height="25" rx="3" fill="#FFEBEE"/>
      <rect x="0" y="8" width="300" height="25" rx="3" fill="url(#origGrad)"/>
      <text x="305" y="25" font-family="Arial" font-size="11" font-weight="bold" fill="#E76F51">146 MB</text>
    </g>
    
    <!-- 压缩后 -->
    <g transform="translate(20, 95)">
      <text x="0" y="0" font-family="SimSun, serif" font-size="10" fill="#455A64">PQ压缩后</text>
      <rect x="0" y="8" width="300" height="25" rx="3" fill="#E8F5E9"/>
      <rect x="0" y="8" width="9.5" height="25" rx="3" fill="url(#compGrad)"/>
      <text x="305" y="25" font-family="Arial" font-size="11" font-weight="bold" fill="#2A9D8F">4.6 MB</text>
    </g>
    
    <text x="180" y="150" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="#E76F51">压缩率 32:1</text>
  </g>
  
  <!-- 精度与性能 -->
  <g transform="translate(410, 240)">
    <rect x="0" y="0" width="360" height="160" rx="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" filter="url(#shadowPQ)"/>
    <text x="180" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="#2C3E50" font-weight="bold">精度与性能权衡</text>
    
    <g transform="translate(20, 50)">
      <rect x="0" y="0" width="155" height="45" rx="4" fill="#FFF3E0"/>
      <text x="78" y="18" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#E65100">原始召回率</text>
      <text x="78" y="38" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#E76F51">98%</text>
    </g>
    <g transform="translate(185, 50)">
      <rect x="0" y="0" width="155" height="45" rx="4" fill="#E8F5E9"/>
      <text x="78" y="18" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#2E7D32">压缩后召回率</text>
      <text x="78" y="38" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#2A9D8F">94%</text>
    </g>
    
    <g transform="translate(20, 110)">
      <rect x="0" y="0" width="320" height="35" rx="4" fill="#E3F2FD"/>
      <text x="160" y="22" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#1565C0">ADC距离计算：384次乘法 → 48次加法</text>
    </g>
  </g>
</svg>`;

// ========== 3. Reflection三项挑战图 ==========
const svg_reflection_challenges = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="380" viewBox="0 0 800 380">
  <defs>
    <linearGradient id="ch1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E76F51"/><stop offset="100%" style="stop-color:#F4A261"/>
    </linearGradient>
    <linearGradient id="ch2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#52B788"/>
    </linearGradient>
    <linearGradient id="ch3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4A6FA5"/><stop offset="100%" style="stop-color:#6090C0"/>
    </linearGradient>
    <filter id="shadowR"><feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.12"/></filter>
  </defs>
  
  <rect width="800" height="380" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="400" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#2C3E50">Reflection机制移动端适配三项挑战</text>
  
  <!-- 挑战1：计算开销控制 -->
  <g transform="translate(30, 55)">
    <rect x="0" y="0" width="240" height="300" rx="10" fill="#FFFFFF" stroke="#E76F51" stroke-width="2" filter="url(#shadowR)"/>
    <rect x="0" y="0" width="240" height="45" rx="10 10 0 0" fill="url(#ch1Grad)"/>
    <text x="120" y="28" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">挑战一：计算开销控制</text>
    
    <g transform="translate(15, 60)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#E65100">事件驱动触发</text>
      <rect x="0" y="8" width="210" height="28" rx="4" fill="#FFF3E0"/>
      <text x="105" y="27" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">• 单次导入 &gt; 50张图片</text>
      <rect x="0" y="42" width="210" height="28" rx="4" fill="#FFF3E0"/>
      <text x="105" y="61" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">• 地理位置变化 &gt; 50km</text>
      <rect x="0" y="76" width="210" height="28" rx="4" fill="#FFF3E0"/>
      <text x="105" y="95" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">• 场景信息熵 &lt; 0.5</text>
    </g>
    
    <g transform="translate(15, 180)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#E65100">定时触发条件</text>
      <rect x="0" y="8" width="210" height="28" rx="4" fill="#FFEBEE"/>
      <text x="105" y="27" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">• 设备充电 + 屏幕关闭</text>
      <rect x="0" y="42" width="210" height="28" rx="4" fill="#FFEBEE"/>
      <text x="105" y="61" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">• 凌晨2:00-5:00空闲时段</text>
      <rect x="0" y="76" width="210" height="28" rx="4" fill="#FFEBEE"/>
      <text x="105" y="95" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">• WorkManager后台调度</text>
    </g>
  </g>
  
  <!-- 挑战2：推断结果可信度 -->
  <g transform="translate(280, 55)">
    <rect x="0" y="0" width="240" height="300" rx="10" fill="#FFFFFF" stroke="#2A9D8F" stroke-width="2" filter="url(#shadowR)"/>
    <rect x="0" y="0" width="240" height="45" rx="10 10 0 0" fill="url(#ch2Grad)"/>
    <text x="120" y="28" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">挑战二：推断可信度</text>
    
    <g transform="translate(15, 60)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#00695C">置信度计算公式</text>
      <rect x="0" y="8" width="210" height="50" rx="4" fill="#E0F2F1"/>
      <text x="105" y="28" text-anchor="middle" font-family="Arial" font-size="9" fill="#00695C">Confidence =</text>
      <text x="105" y="48" text-anchor="middle" font-family="Arial" font-size="9" fill="#00695C">1/(1+e^-(w₁N+w₂S+w₃T))</text>
    </g>
    
    <g transform="translate(15, 130)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#00695C">参数含义</text>
      <rect x="0" y="8" width="210" height="22" rx="3" fill="#E8F5E9"/>
      <text x="105" y="23" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">N = 支撑证据数量 (w₁=0.4)</text>
      <rect x="0" y="35" width="210" height="22" rx="3" fill="#E8F5E9"/>
      <text x="105" y="50" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">S = 证据强度 (w₂=0.35)</text>
      <rect x="0" y="62" width="210" height="22" rx="3" fill="#E8F5E9"/>
      <text x="105" y="77" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">T = 时间跨度因子 (w₃=0.25)</text>
    </g>
    
    <g transform="translate(15, 235)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#00695C">阈值筛选</text>
      <rect x="0" y="8" width="210" height="40" rx="4" fill="#C8E6C9"/>
      <text x="105" y="22" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#2E7D32">置信度 &lt; 0.6</text>
      <text x="105" y="40" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#2E7D32">→ 标记「待验证」不展示</text>
    </g>
  </g>
  
  <!-- 挑战3：端侧算力适配 -->
  <g transform="translate(530, 55)">
    <rect x="0" y="0" width="240" height="300" rx="10" fill="#FFFFFF" stroke="#4A6FA5" stroke-width="2" filter="url(#shadowR)"/>
    <rect x="0" y="0" width="240" height="45" rx="10 10 0 0" fill="url(#ch3Grad)"/>
    <text x="120" y="28" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">挑战三：端侧算力适配</text>
    
    <g transform="translate(15, 60)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#1565C0">模型配置</text>
      <rect x="0" y="8" width="210" height="28" rx="4" fill="#E3F2FD"/>
      <text x="105" y="27" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">Qwen3-VL-2B + INT4量化</text>
      <rect x="0" y="42" width="210" height="28" rx="4" fill="#E3F2FD"/>
      <text x="105" y="61" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">MNN推理框架</text>
    </g>
    
    <g transform="translate(15, 140)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#1565C0">性能指标</text>
      <rect x="0" y="8" width="100" height="50" rx="4" fill="#BBDEFB"/>
      <text x="50" y="28" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#1565C0">单次推理</text>
      <text x="50" y="48" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#0D47A1">8-12s</text>
      <rect x="110" y="8" width="100" height="50" rx="4" fill="#BBDEFB"/>
      <text x="160" y="28" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#1565C0">模型大小</text>
      <text x="160" y="48" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#0D47A1">~1.5GB</text>
    </g>
    
    <g transform="translate(15, 220)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#1565C0">执行策略</text>
      <rect x="0" y="8" width="210" height="55" rx="4" fill="#E8EAF6"/>
      <text x="105" y="25" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">• 后台执行，不影响前台体验</text>
      <text x="105" y="42" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">• 结构化提示词模板</text>
      <text x="105" y="58" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">• 输出：事实描述 + 置信度</text>
    </g>
  </g>
</svg>`;

// ========== 4. 市场规模TAM/SAM/SOM图（修复重叠版）==========
const svg_market_tam = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="480" viewBox="0 0 900 480">
  <defs>
    <linearGradient id="tamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4A6FA5" stop-opacity="0.3"/><stop offset="100%" style="stop-color:#4A6FA5" stop-opacity="0.1"/>
    </linearGradient>
    <linearGradient id="samGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F4A261" stop-opacity="0.5"/><stop offset="100%" style="stop-color:#F4A261" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="somGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#52B788"/>
    </linearGradient>
    <filter id="shadowM"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/></filter>
  </defs>
  
  <rect width="900" height="480" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="450" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#2C3E50">目标市场规模估算（TAM/SAM/SOM模型）</text>
  <text x="450" y="50" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="#7F8C8D">数据来源：QuestMobile、美图财报、第一财经调研</text>
  
  <!-- 同心圆图（左侧居中）-->
  <g transform="translate(220, 260)">
    <!-- TAM 外圈 -->
    <circle cx="0" cy="0" r="170" fill="url(#tamGrad)" stroke="#4A6FA5" stroke-width="2"/>
    
    <!-- TAM 标签（放在圆外）-->
    <g transform="translate(0, -185)">
      <rect x="-90" y="-12" width="180" height="24" rx="4" fill="#4A6FA5"/>
      <text x="0" y="5" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white" font-weight="bold">TAM 总可寻址市场 6亿</text>
    </g>
    <text x="0" y="-145" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#4A6FA5">有图片管理需求的智能手机用户</text>
    
    <!-- SAM 中圈 -->
    <circle cx="0" cy="0" r="105" fill="url(#samGrad)" stroke="#F4A261" stroke-width="2"/>
    <text x="0" y="-80" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="#E65100" font-weight="bold">SAM 可服务市场</text>
    <text x="0" y="-60" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#E65100">8000万</text>
    <text x="0" y="-42" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">隐私敏感 + 愿意付费</text>
    
    <!-- SOM 内圈 -->
    <circle cx="0" cy="0" r="50" fill="url(#somGrad)" stroke="#2A9D8F" stroke-width="3"/>
    <text x="0" y="-15" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="white" font-weight="bold">SOM 可获得市场</text>
    <text x="0" y="8" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="white">100万</text>
    <text x="0" y="25" text-anchor="middle" font-family="SimSun, serif" font-size="8" fill="white">第一年目标</text>
    <text x="0" y="40" text-anchor="middle" font-family="SimSun, serif" font-size="8" fill="rgba(255,255,255,0.8)">10万付费</text>
  </g>
  
  <!-- 右侧数据卡片（调整位置避免重叠）-->
  <g transform="translate(480, 70)">
    <rect x="0" y="0" width="390" height="380" rx="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" filter="url(#shadowM)"/>
    <text x="195" y="28" text-anchor="middle" font-family="SimHei, sans-serif" font-size="14" fill="#2C3E50" font-weight="bold">市场数据支撑</text>
    
    <!-- AI应用市场 -->
    <g transform="translate(15, 50)">
      <rect x="0" y="0" width="360" height="70" rx="6" fill="#E3F2FD"/>
      <text x="15" y="22" font-family="SimHei, sans-serif" font-size="11" fill="#1565C0" font-weight="bold">移动端AI应用市场</text>
      <text x="15" y="45" font-family="Arial" font-size="18" font-weight="bold" fill="#0D47A1">月活 7.29 亿</text>
      <text x="15" y="62" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">来源：QuestMobile 2025年9月报告</text>
    </g>
    
    <!-- 美图付费用户 -->
    <g transform="translate(15, 130)">
      <rect x="0" y="0" width="360" height="70" rx="6" fill="#FFF3E0"/>
      <text x="15" y="22" font-family="SimHei, sans-serif" font-size="11" fill="#E65100" font-weight="bold">美图付费订阅验证</text>
      <text x="15" y="45" font-family="Arial" font-size="18" font-weight="bold" fill="#E76F51">1540 万付费用户</text>
      <text x="15" y="62" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">同比增长42%，付费渗透率5.5%（美图2025中报）</text>
    </g>
    
    <!-- 大学生付费意愿 -->
    <g transform="translate(15, 210)">
      <rect x="0" y="0" width="360" height="70" rx="6" fill="#E8F5E9"/>
      <text x="15" y="22" font-family="SimHei, sans-serif" font-size="11" fill="#2E7D32" font-weight="bold">大学生付费意愿</text>
      <text x="15" y="45" font-family="Arial" font-size="18" font-weight="bold" fill="#2A9D8F">55.47% 愿意付费订阅</text>
      <text x="15" y="62" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">基数4763万在校生（第一财经2024调研、教育部统计）</text>
    </g>
    
    <!-- 隐私关注 -->
    <g transform="translate(15, 290)">
      <rect x="0" y="0" width="360" height="70" rx="6" fill="#FCE4EC"/>
      <text x="15" y="22" font-family="SimHei, sans-serif" font-size="11" fill="#C2185B" font-weight="bold">隐私保护需求</text>
      <text x="15" y="45" font-family="Arial" font-size="18" font-weight="bold" fill="#AD1457">46.7% 关注AI隐私泄露</text>
      <text x="15" y="62" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">支撑「端侧优先」定位（中国公众AI调研2025）</text>
    </g>
  </g>
</svg>`;

// ========== 5. SWOT战略组合双栏图 ==========
const svg_swot_strategy = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="850" height="520" viewBox="0 0 850 520">
  <defs>
    <linearGradient id="soGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#52B788"/>
    </linearGradient>
    <linearGradient id="woGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#F4A261"/><stop offset="100%" style="stop-color:#E9C46A"/>
    </linearGradient>
    <linearGradient id="stGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4A6FA5"/><stop offset="100%" style="stop-color:#6090C0"/>
    </linearGradient>
    <linearGradient id="wtGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#9B59B6"/><stop offset="100%" style="stop-color:#BB8FCE"/>
    </linearGradient>
    <filter id="shadowS"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/></filter>
  </defs>
  
  <rect width="850" height="520" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="425" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#2C3E50">SWOT战略组合矩阵</text>
  <text x="425" y="50" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="#7F8C8D">基于优势/劣势 × 机会/威胁的四象限战略</text>
  
  <!-- 2x2矩阵布局 -->
  <!-- SO战略（左上）-->
  <g transform="translate(25, 70)">
    <rect x="0" y="0" width="395" height="200" rx="10" fill="#FFFFFF" stroke="#2A9D8F" stroke-width="2" filter="url(#shadowS)"/>
    <rect x="0" y="0" width="395" height="40" rx="10 10 0 0" fill="url(#soGrad)"/>
    <text x="198" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">SO战略（增长型）优势×机会</text>
    
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="365" height="55" rx="4" fill="#E8F5E9"/>
      <text x="10" y="18" font-family="SimHei, sans-serif" font-size="10" fill="#2E7D32" font-weight="bold">策略1：快速迭代产品功能</text>
      <text x="10" y="35" font-family="SimSun, serif" font-size="9" fill="#455A64">利用开源生态优势（Qwen/MNN免费）+ 端侧AI成熟机会</text>
      <text x="10" y="50" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">→ 模型推理成本降低90%+，快速验证新功能</text>
    </g>
    
    <g transform="translate(15, 120)">
      <rect x="0" y="0" width="365" height="65" rx="4" fill="#C8E6C9"/>
      <text x="10" y="18" font-family="SimHei, sans-serif" font-size="10" fill="#2E7D32" font-weight="bold">策略2：高校市场建立口碑</text>
      <text x="10" y="35" font-family="SimSun, serif" font-size="9" fill="#455A64">借助大学生高付费意愿（55%）+ AI热度（7.29亿月活）</text>
      <text x="10" y="50" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">→ 聚焦4763万大学生种子用户，形成口碑传播</text>
    </g>
  </g>
  
  <!-- WO战略（右上）-->
  <g transform="translate(430, 70)">
    <rect x="0" y="0" width="395" height="200" rx="10" fill="#FFFFFF" stroke="#F4A261" stroke-width="2" filter="url(#shadowS)"/>
    <rect x="0" y="0" width="395" height="40" rx="10 10 0 0" fill="url(#woGrad)"/>
    <text x="198" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">WO战略（扭转型）劣势×机会</text>
    
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="365" height="55" rx="4" fill="#FFF3E0"/>
      <text x="10" y="18" font-family="SimHei, sans-serif" font-size="10" fill="#E65100" font-weight="bold">策略1：云端增强弥补端侧能力</text>
      <text x="10" y="35" font-family="SimSun, serif" font-size="9" fill="#455A64">劣势：端侧2B模型能力受限 → 机会：云端235B模型可选</text>
      <text x="10" y="50" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">→ 参数量比1:117，复杂任务可切换云端处理</text>
    </g>
    
    <g transform="translate(15, 120)">
      <rect x="0" y="0" width="365" height="65" rx="4" fill="#FFE0B2"/>
      <text x="10" y="18" font-family="SimHei, sans-serif" font-size="10" fill="#E65100" font-weight="bold">策略2：大赛提升品牌知名度</text>
      <text x="10" y="35" font-family="SimSun, serif" font-size="9" fill="#455A64">劣势：新产品冷启动 → 机会：高校创业大赛曝光</text>
      <text x="10" y="50" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">→ 全国大学生软件创新大赛 + 高校媒体报道</text>
    </g>
  </g>
  
  <!-- ST战略（左下）-->
  <g transform="translate(25, 285)">
    <rect x="0" y="0" width="395" height="200" rx="10" fill="#FFFFFF" stroke="#4A6FA5" stroke-width="2" filter="url(#shadowS)"/>
    <rect x="0" y="0" width="395" height="40" rx="10 10 0 0" fill="url(#stGrad)"/>
    <text x="198" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">ST战略（多元化）优势×威胁</text>
    
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="365" height="55" rx="4" fill="#E3F2FD"/>
      <text x="10" y="18" font-family="SimHei, sans-serif" font-size="10" fill="#1565C0" font-weight="bold">策略1：聚焦隐私敏感场景差异化</text>
      <text x="10" y="35" font-family="SimSun, serif" font-size="9" fill="#455A64">威胁：手机厂商AI助手5.35亿用户竞争</text>
      <text x="10" y="50" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">→ 专注身份证/银行卡等敏感场景，做深而非做广</text>
    </g>
    
    <g transform="translate(15, 120)">
      <rect x="0" y="0" width="365" height="65" rx="4" fill="#BBDEFB"/>
      <text x="10" y="18" font-family="SimHei, sans-serif" font-size="10" fill="#1565C0" font-weight="bold">策略2：模块化架构快速适配</text>
      <text x="10" y="35" font-family="SimSun, serif" font-size="9" fill="#455A64">威胁：VLM模型每季度更新</text>
      <text x="10" y="50" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">→ 模型可插拔设计，保持架构灵活性</text>
    </g>
  </g>
  
  <!-- WT战略（右下）-->
  <g transform="translate(430, 285)">
    <rect x="0" y="0" width="395" height="200" rx="10" fill="#FFFFFF" stroke="#9B59B6" stroke-width="2" filter="url(#shadowS)"/>
    <rect x="0" y="0" width="395" height="40" rx="10 10 0 0" fill="url(#wtGrad)"/>
    <text x="198" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">WT战略（防御型）劣势×威胁</text>
    
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="365" height="55" rx="4" fill="#F3E5F5"/>
      <text x="10" y="18" font-family="SimHei, sans-serif" font-size="10" fill="#7B1FA2" font-weight="bold">策略1：MVP聚焦核心功能</text>
      <text x="10" y="35" font-family="SimSun, serif" font-size="9" fill="#455A64">劣势：3人团队资源有限 + 威胁：大厂竞争</text>
      <text x="10" y="50" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">→ 避免功能膨胀，聚焦语义搜索+隐私保险箱核心</text>
    </g>
    
    <g transform="translate(15, 120)">
      <rect x="0" y="0" width="365" height="65" rx="4" fill="#E1BEE7"/>
      <text x="10" y="18" font-family="SimHei, sans-serif" font-size="10" fill="#7B1FA2" font-weight="bold">策略2：用户反馈闭环</text>
      <text x="10" y="35" font-family="SimSun, serif" font-size="9" fill="#455A64">劣势：付费意愿不确定 + 威胁：用户留存挑战</text>
      <text x="10" y="50" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">→ 建立用户反馈渠道，持续优化体验，强化价值感知</text>
    </g>
  </g>
</svg>`;

// ========== 6. 竞品定价对比图 ==========
const svg_pricing = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="340" viewBox="0 0 800 340">
  <defs>
    <linearGradient id="googleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4285F4"/><stop offset="100%" style="stop-color:#34A853"/>
    </linearGradient>
    <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#A3AAAE"/><stop offset="100%" style="stop-color:#555555"/>
    </linearGradient>
    <linearGradient id="meituGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF6B9D"/><stop offset="100%" style="stop-color:#FF9A8B"/>
    </linearGradient>
    <linearGradient id="seekGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#F4A261"/><stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <filter id="shadowP"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/></filter>
  </defs>
  
  <rect width="800" height="340" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="400" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#2C3E50">竞品定价对比与拾光定价策略</text>
  
  <!-- 表格式对比 -->
  <g transform="translate(50, 60)">
    <!-- 表头 -->
    <rect x="0" y="0" width="700" height="40" rx="6 6 0 0" fill="#2C3E50"/>
    <text x="80" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">服务商</text>
    <text x="220" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">免费额度</text>
    <text x="380" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">基础套餐</text>
    <text x="540" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">高级套餐</text>
    <text x="660" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">特点</text>
    
    <!-- Google One -->
    <rect x="0" y="45" width="700" height="50" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1"/>
    <rect x="5" y="50" width="150" height="40" rx="4" fill="url(#googleGrad)"/>
    <text x="80" y="75" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">Google One</text>
    <text x="220" y="75" text-anchor="middle" font-family="Arial" font-size="11" fill="#455A64">15GB</text>
    <text x="380" y="75" text-anchor="middle" font-family="Arial" font-size="11" fill="#455A64">$1.99/月 (100GB)</text>
    <text x="540" y="75" text-anchor="middle" font-family="Arial" font-size="11" fill="#455A64">$9.99/月 (2TB)</text>
    <text x="660" y="75" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">云端AI</text>
    
    <!-- iCloud+ -->
    <rect x="0" y="100" width="700" height="50" fill="#F5F5F5" stroke="#E0E0E0" stroke-width="1"/>
    <rect x="5" y="105" width="150" height="40" rx="4" fill="url(#appleGrad)"/>
    <text x="80" y="130" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">iCloud+</text>
    <text x="220" y="130" text-anchor="middle" font-family="Arial" font-size="11" fill="#455A64">5GB</text>
    <text x="380" y="130" text-anchor="middle" font-family="Arial" font-size="11" fill="#455A64">$0.99/月 (50GB)</text>
    <text x="540" y="130" text-anchor="middle" font-family="Arial" font-size="11" fill="#455A64">$9.99/月 (2TB)</text>
    <text x="660" y="130" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">生态闭环</text>
    
    <!-- 美图VIP -->
    <rect x="0" y="155" width="700" height="50" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1"/>
    <rect x="5" y="160" width="150" height="40" rx="4" fill="url(#meituGrad)"/>
    <text x="80" y="185" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">美图VIP</text>
    <text x="220" y="185" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="#455A64">有限功能</text>
    <text x="380" y="185" text-anchor="middle" font-family="Arial" font-size="11" fill="#455A64">¥18/月</text>
    <text x="540" y="185" text-anchor="middle" font-family="Arial" font-size="11" fill="#455A64">¥168/年</text>
    <text x="660" y="185" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#7F8C8D">修图工具</text>
    
    <!-- 拾光 -->
    <rect x="0" y="210" width="700" height="55" fill="#FFF8E1" stroke="#F4A261" stroke-width="2"/>
    <rect x="5" y="215" width="150" height="45" rx="4" fill="url(#seekGrad)"/>
    <text x="80" y="243" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="white" font-weight="bold">拾光</text>
    <text x="220" y="238" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#E65100">端侧AI +</text>
    <text x="220" y="253" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#E65100">1000张索引</text>
    <text x="380" y="243" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#E65100">¥12/月</text>
    <text x="540" y="243" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#E65100">¥98/年</text>
    <text x="660" y="238" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#E65100">隐私优先</text>
    <text x="660" y="253" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#E65100">本地AI</text>
  </g>
  
  <!-- 定价策略说明 -->
  <g transform="translate(50, 290)">
    <rect x="0" y="0" width="700" height="35" rx="4" fill="#E8F5E9"/>
    <text x="350" y="22" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="#2E7D32">定价策略：低于国际竞品，参考美图定价，适应中国市场消费习惯</text>
  </g>
</svg>`;

// 写入所有SVG文件
const outputDir = __dirname;
fs.writeFileSync(path.join(outputDir, 'chart_hnsw_structure.svg'), svg_hnsw);
fs.writeFileSync(path.join(outputDir, 'chart_pq_compression_v2.svg'), svg_pq_new);
fs.writeFileSync(path.join(outputDir, 'chart_reflection_challenges.svg'), svg_reflection_challenges);
fs.writeFileSync(path.join(outputDir, 'chart_market_tam_sam_som.svg'), svg_market_tam);
fs.writeFileSync(path.join(outputDir, 'chart_swot_strategy.svg'), svg_swot_strategy);
fs.writeFileSync(path.join(outputDir, 'chart_pricing_comparison.svg'), svg_pricing);

console.log('v6.0 新增配图生成完成！');
console.log('- chart_hnsw_structure.svg');
console.log('- chart_pq_compression_v2.svg');
console.log('- chart_reflection_challenges.svg');
console.log('- chart_market_tam_sam_som.svg');
console.log('- chart_swot_strategy.svg');
console.log('- chart_pricing_comparison.svg');
