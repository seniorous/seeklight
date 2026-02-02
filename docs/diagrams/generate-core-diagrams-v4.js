/**
 * 拾光核心图表生成器 v4
 * - 删除"卖点"等营销词汇
 * - 重新设计技术架构布局
 * - 采用更专业的技术文档风格
 */
const fs = require('fs');
const path = require('path');

// ========== 1. 技术架构图（重构版）==========
const diagram_techarch_v4 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="950" height="720" viewBox="0 0 950 720">
  <defs>
    <linearGradient id="layer1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4A6FA5"/><stop offset="100%" style="stop-color:#3A5F95"/>
    </linearGradient>
    <linearGradient id="layer2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#5580B0"/><stop offset="100%" style="stop-color:#4570A0"/>
    </linearGradient>
    <linearGradient id="layer3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6090C0"/><stop offset="100%" style="stop-color:#5080B0"/>
    </linearGradient>
    <linearGradient id="layer4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#70A0D0"/><stop offset="100%" style="stop-color:#6090C0"/>
    </linearGradient>
    <linearGradient id="memoryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#1A8D7F"/>
    </linearGradient>
    <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#7090A8"/><stop offset="100%" style="stop-color:#608098"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.12"/></filter>
  </defs>
  
  <rect width="950" height="720" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="475" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="20" font-weight="bold" fill="#2C3E50">拾光系统技术架构</text>
  <text x="475" y="52" text-anchor="middle" font-family="SimSun, serif" font-size="12" fill="#7F8C8D">端云协同四层架构 · 层次化记忆系统</text>
  
  <!-- 左侧：四层架构 -->
  <g transform="translate(30, 75)">
    <!-- Layer 1: 用户界面层 -->
    <rect x="0" y="0" width="560" height="90" rx="8" fill="url(#layer1)" filter="url(#shadow)"/>
    <text x="20" y="28" font-family="SimHei, sans-serif" font-size="14" fill="white" font-weight="bold">用户界面层 Presentation Layer</text>
    <g transform="translate(20, 42)">
      <rect x="0" y="0" width="120" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="60" y="23" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="white">自然语言搜索</text>
    </g>
    <g transform="translate(135, 42)">
      <rect x="0" y="0" width="120" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="60" y="23" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="white">相册浏览</text>
    </g>
    <g transform="translate(270, 42)">
      <rect x="0" y="0" width="120" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="60" y="23" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="white">隐私保险箱</text>
    </g>
    <g transform="translate(405, 42)">
      <rect x="0" y="0" width="120" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="60" y="23" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="white">跨应用跳转</text>
    </g>
    <text x="540" y="82" text-anchor="end" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.7)">Jetpack Compose</text>
    
    <!-- Layer 2: 智能处理层 -->
    <rect x="0" y="105" width="560" height="140" rx="8" fill="url(#layer2)" filter="url(#shadow)"/>
    <text x="20" y="133" font-family="SimHei, sans-serif" font-size="14" fill="white" font-weight="bold">智能处理层 Intelligence Layer</text>
    
    <!-- 多层处理管道 -->
    <rect x="20" y="148" width="520" height="85" rx="6" fill="rgba(255,255,255,0.12)"/>
    <text x="280" y="168" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">多层处理管道 Multi-Layer Pipeline</text>
    
    <rect x="35" y="180" width="150" height="45" rx="4" fill="#3D7A6A"/>
    <text x="110" y="200" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="white" font-weight="bold">L1 快速预处理</text>
    <text x="110" y="217" text-anchor="middle" font-family="Arial" font-size="9" fill="white">ZXing · ML Kit · &lt;500ms</text>
    
    <text x="197" y="205" font-family="Arial" font-size="14" fill="white">→</text>
    
    <rect x="210" y="180" width="150" height="45" rx="4" fill="#4A8A7A"/>
    <text x="285" y="200" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="white" font-weight="bold">L2 结构化提取</text>
    <text x="285" y="217" text-anchor="middle" font-family="Arial" font-size="9" fill="white">正则引擎 · 场景分类</text>
    
    <text x="372" y="205" font-family="Arial" font-size="14" fill="white">→</text>
    
    <rect x="385" y="180" width="145" height="45" rx="4" fill="#5A9A8A"/>
    <text x="458" y="200" text-anchor="middle" font-family="SimHei, sans-serif" font-size="10" fill="white" font-weight="bold">L3 深度理解</text>
    <text x="458" y="217" text-anchor="middle" font-family="Arial" font-size="9" fill="white">VLM · 3-5s</text>
    
    <!-- Layer 3: 数据存储层 -->
    <rect x="0" y="260" width="560" height="90" rx="8" fill="url(#layer3)" filter="url(#shadow)"/>
    <text x="20" y="288" font-family="SimHei, sans-serif" font-size="14" fill="white" font-weight="bold">数据存储层 Data Layer</text>
    <g transform="translate(20, 302)">
      <rect x="0" y="0" width="165" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="82" y="15" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">图片元数据</text>
      <text x="82" y="30" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">Room + SQLite</text>
    </g>
    <g transform="translate(200, 302)">
      <rect x="0" y="0" width="165" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="82" y="15" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">向量数据库</text>
      <text x="82" y="30" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">ObjectBox HNSW</text>
    </g>
    <g transform="translate(380, 302)">
      <rect x="0" y="0" width="160" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="80" y="15" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">加密存储</text>
      <text x="80" y="30" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">EncryptedFile API</text>
    </g>
    
    <!-- Layer 4: 系统服务层 -->
    <rect x="0" y="365" width="560" height="90" rx="8" fill="url(#layer4)" filter="url(#shadow)"/>
    <text x="20" y="393" font-family="SimHei, sans-serif" font-size="14" fill="white" font-weight="bold">系统服务层 System Layer</text>
    <g transform="translate(20, 407)">
      <rect x="0" y="0" width="165" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="82" y="15" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">截图监听</text>
      <text x="82" y="30" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">ContentObserver</text>
    </g>
    <g transform="translate(200, 407)">
      <rect x="0" y="0" width="165" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="82" y="15" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">Deep Link路由</text>
      <text x="82" y="30" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">App Links</text>
    </g>
    <g transform="translate(380, 407)">
      <rect x="0" y="0" width="160" height="36" rx="4" fill="rgba(255,255,255,0.2)"/>
      <text x="80" y="15" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">后台调度</text>
      <text x="80" y="30" text-anchor="middle" font-family="Arial" font-size="9" fill="rgba(255,255,255,0.8)">WorkManager</text>
    </g>
  </g>
  
  <!-- 右侧：层次化记忆系统 -->
  <g transform="translate(620, 75)">
    <rect x="0" y="0" width="300" height="380" rx="10" fill="#F0F7F5" stroke="#2A9D8F" stroke-width="2" filter="url(#shadow)"/>
    <rect x="0" y="0" width="300" height="40" rx="10 10 0 0" fill="url(#memoryGrad)"/>
    <text x="150" y="26" text-anchor="middle" font-family="SimHei, sans-serif" font-size="14" fill="white" font-weight="bold">层次化记忆系统</text>
    
    <!-- 短期记忆 -->
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="270" height="85" rx="6" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
      <text x="135" y="22" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="#2E7D32" font-weight="bold">短期记忆 ImageMemory</text>
      <text x="15" y="42" font-family="SimSun, serif" font-size="10" fill="#455A64">• VLM语义描述</text>
      <text x="15" y="58" font-family="SimSun, serif" font-size="10" fill="#455A64">• OCR文字内容</text>
      <text x="135" y="42" font-family="SimSun, serif" font-size="10" fill="#455A64">• 场景分类标签</text>
      <text x="135" y="58" font-family="SimSun, serif" font-size="10" fill="#455A64">• 384维语义向量</text>
      <text x="135" y="78" text-anchor="middle" font-family="Arial" font-size="9" fill="#4CAF50">TRL 7 | 单图粒度</text>
    </g>
    
    <!-- 箭头 -->
    <text x="150" y="155" text-anchor="middle" font-family="Arial" font-size="16" fill="#2A9D8F">↓ Reflection推断 ↓</text>
    
    <!-- 长期记忆 -->
    <g transform="translate(15, 170)">
      <rect x="0" y="0" width="270" height="85" rx="6" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
      <text x="135" y="22" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="#E65100" font-weight="bold">长期记忆 HighLevelFact</text>
      <text x="15" y="42" font-family="SimSun, serif" font-size="10" fill="#455A64">• 跨图片事件推断</text>
      <text x="15" y="58" font-family="SimSun, serif" font-size="10" fill="#455A64">• 置信度评分机制</text>
      <text x="135" y="42" font-family="SimSun, serif" font-size="10" fill="#455A64">• 事件驱动触发</text>
      <text x="135" y="58" font-family="SimSun, serif" font-size="10" fill="#455A64">• 后台空闲执行</text>
      <text x="135" y="78" text-anchor="middle" font-family="Arial" font-size="9" fill="#FF9800">TRL 3 | 事件粒度</text>
    </g>
    
    <!-- 箭头 -->
    <text x="150" y="270" text-anchor="middle" font-family="Arial" font-size="16" fill="#2A9D8F">↓ 行为观察 ↓</text>
    
    <!-- 隐式记忆 -->
    <g transform="translate(15, 285)">
      <rect x="0" y="0" width="270" height="80" rx="6" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1"/>
      <text x="135" y="22" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="#7B1FA2" font-weight="bold">隐式记忆 UserPreference</text>
      <text x="15" y="42" font-family="SimSun, serif" font-size="10" fill="#455A64">• 场景化修图偏好</text>
      <text x="15" y="58" font-family="SimSun, serif" font-size="10" fill="#455A64">• EMA渐进式更新</text>
      <text x="135" y="42" font-family="SimSun, serif" font-size="10" fill="#455A64">• 浏览行为分析</text>
      <text x="135" y="58" font-family="SimSun, serif" font-size="10" fill="#455A64">• 收藏模式学习</text>
      <text x="135" y="73" text-anchor="middle" font-family="Arial" font-size="9" fill="#9C27B0">TRL 3 | 用户粒度</text>
    </g>
  </g>
  
  <!-- 云端服务（可选） -->
  <g transform="translate(620, 470)">
    <rect x="0" y="0" width="300" height="85" rx="8" fill="#F8FAFB" stroke="#7090A8" stroke-width="2" stroke-dasharray="6,3" filter="url(#shadow)"/>
    <text x="150" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="#4A6080" font-weight="bold">云端增强服务（用户可选）</text>
    <rect x="15" y="40" width="270" height="35" rx="4" fill="url(#cloudGrad)"/>
    <text x="150" y="62" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="white">Qwen3-VL-235B · SiliconFlow API</text>
  </g>
  
  <!-- 端云切换逻辑 -->
  <g transform="translate(30, 530)">
    <rect x="0" y="0" width="560" height="170" rx="8" fill="#FAFAFA" stroke="#BDC3C7" stroke-width="1" filter="url(#shadow)"/>
    <text x="280" y="25" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="#2C3E50" font-weight="bold">推理模式决策逻辑</text>
    
    <!-- 决策树 -->
    <g transform="translate(30, 45)">
      <rect x="0" y="0" width="140" height="40" rx="4" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
      <text x="70" y="25" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="#2E7D32">用户设置隐私模式?</text>
      
      <line x1="70" y1="40" x2="70" y2="60" stroke="#7F8C8D" stroke-width="1"/>
      <line x1="70" y1="60" x2="30" y2="60" stroke="#7F8C8D" stroke-width="1"/>
      <line x1="70" y1="60" x2="110" y2="60" stroke="#7F8C8D" stroke-width="1"/>
      <line x1="30" y1="60" x2="30" y2="75" stroke="#7F8C8D" stroke-width="1"/>
      <line x1="110" y1="60" x2="110" y2="75" stroke="#7F8C8D" stroke-width="1"/>
      
      <text x="20" y="55" font-family="Arial" font-size="9" fill="#27AE60">是</text>
      <text x="115" y="55" font-family="Arial" font-size="9" fill="#E74C3C">否</text>
      
      <rect x="-30" y="75" width="120" height="35" rx="4" fill="#3D7A6A"/>
      <text x="30" y="97" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">强制端侧推理</text>
      
      <rect x="50" y="75" width="120" height="35" rx="4" fill="#4A6FA5"/>
      <text x="110" y="97" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">云端优先模式</text>
    </g>
    
    <!-- 失败回退 -->
    <g transform="translate(220, 45)">
      <rect x="0" y="0" width="140" height="40" rx="4" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
      <text x="70" y="25" text-anchor="middle" font-family="SimSun, serif" font-size="11" fill="#E65100">云端请求成功?</text>
      
      <line x1="70" y1="40" x2="70" y2="60" stroke="#7F8C8D" stroke-width="1"/>
      <line x1="70" y1="60" x2="30" y2="60" stroke="#7F8C8D" stroke-width="1"/>
      <line x1="70" y1="60" x2="110" y2="60" stroke="#7F8C8D" stroke-width="1"/>
      <line x1="30" y1="60" x2="30" y2="75" stroke="#7F8C8D" stroke-width="1"/>
      <line x1="110" y1="60" x2="110" y2="75" stroke="#7F8C8D" stroke-width="1"/>
      
      <text x="20" y="55" font-family="Arial" font-size="9" fill="#27AE60">是</text>
      <text x="115" y="55" font-family="Arial" font-size="9" fill="#E74C3C">否</text>
      
      <rect x="-30" y="75" width="120" height="35" rx="4" fill="#4A6FA5"/>
      <text x="30" y="97" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">返回云端结果</text>
      
      <rect x="50" y="75" width="120" height="35" rx="4" fill="#3D7A6A"/>
      <text x="110" y="97" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="white">回退端侧推理</text>
    </g>
    
    <!-- 参数说明 -->
    <g transform="translate(400, 50)">
      <text x="0" y="0" font-family="SimHei, sans-serif" font-size="11" fill="#2C3E50" font-weight="bold">关键参数</text>
      <text x="0" y="20" font-family="SimSun, serif" font-size="10" fill="#455A64">• 云端超时阈值: 0.8s</text>
      <text x="0" y="38" font-family="SimSun, serif" font-size="10" fill="#455A64">• 最大重试次数: 3次</text>
      <text x="0" y="56" font-family="SimSun, serif" font-size="10" fill="#455A64">• 端侧模型: Qwen3-VL-2B</text>
      <text x="0" y="74" font-family="SimSun, serif" font-size="10" fill="#455A64">• 云端模型: Qwen3-VL-235B</text>
      <text x="0" y="92" font-family="SimSun, serif" font-size="10" fill="#455A64">• 参数量比: 1:117</text>
    </g>
  </g>
  
  <!-- 底部技术栈说明 -->
  <rect x="620" y="570" width="300" height="130" rx="8" fill="#F5F5F5" stroke="#E0E0E0" stroke-width="1"/>
  <text x="770" y="595" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="#2C3E50" font-weight="bold">核心技术栈</text>
  <text x="635" y="618" font-family="SimSun, serif" font-size="10" fill="#455A64">• 端侧推理: MNN + INT4量化</text>
  <text x="635" y="636" font-family="SimSun, serif" font-size="10" fill="#455A64">• 向量检索: HNSW + PQ压缩</text>
  <text x="635" y="654" font-family="SimSun, serif" font-size="10" fill="#455A64">• 语义嵌入: MiniLM-L6-v2</text>
  <text x="635" y="672" font-family="SimSun, serif" font-size="10" fill="#455A64">• 隐私保护: EncryptedFile + Biometric</text>
  <text x="635" y="690" font-family="SimSun, serif" font-size="10" fill="#455A64">• UI框架: Jetpack Compose + MD3</text>
</svg>`;

// ========== 2. 数据流图（重构版）==========
const diagram_dataflow_v4 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="950" height="580" viewBox="0 0 950 580">
  <defs>
    <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3498DB"/><stop offset="100%" style="stop-color:#2980B9"/>
    </linearGradient>
    <linearGradient id="processGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#F4A261"/><stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <linearGradient id="storeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2A9D8F"/><stop offset="100%" style="stop-color:#1A8D7F"/>
    </linearGradient>
    <linearGradient id="outputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#9B59B6"/><stop offset="100%" style="stop-color:#8E44AD"/>
    </linearGradient>
    <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#7F8C8D"/>
    </marker>
    <filter id="shadowDF"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.1"/></filter>
  </defs>
  
  <rect width="950" height="580" fill="#FAFBFC"/>
  
  <!-- 标题 -->
  <text x="475" y="30" text-anchor="middle" font-family="SimHei, sans-serif" font-size="20" font-weight="bold" fill="#2C3E50">拾光系统数据流图</text>
  <text x="475" y="52" text-anchor="middle" font-family="SimSun, serif" font-size="12" fill="#7F8C8D">图片导入 → 智能处理 → 存储索引 → 语义检索</text>
  
  <!-- 阶段1: 图片输入 -->
  <g transform="translate(30, 80)">
    <rect x="0" y="0" width="180" height="200" rx="8" fill="#FFFFFF" stroke="#3498DB" stroke-width="2" filter="url(#shadowDF)"/>
    <rect x="0" y="0" width="180" height="35" rx="8 8 0 0" fill="url(#inputGrad)"/>
    <text x="90" y="23" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="white" font-weight="bold">1. 图片输入</text>
    
    <g transform="translate(15, 50)">
      <rect x="0" y="0" width="150" height="35" rx="4" fill="#E3F2FD"/>
      <text x="75" y="22" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#1565C0">截图监听触发</text>
    </g>
    <g transform="translate(15, 95)">
      <rect x="0" y="0" width="150" height="35" rx="4" fill="#E3F2FD"/>
      <text x="75" y="22" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#1565C0">手动批量导入</text>
    </g>
    <g transform="translate(15, 140)">
      <rect x="0" y="0" width="150" height="35" rx="4" fill="#E3F2FD"/>
      <text x="75" y="22" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#1565C0">相册同步扫描</text>
    </g>
  </g>
  
  <!-- 箭头1 -->
  <line x1="220" y1="180" x2="260" y2="180" stroke="#7F8C8D" stroke-width="2" marker-end="url(#arrowHead)"/>
  
  <!-- 阶段2: 智能处理 -->
  <g transform="translate(270, 80)">
    <rect x="0" y="0" width="200" height="200" rx="8" fill="#FFFFFF" stroke="#E76F51" stroke-width="2" filter="url(#shadowDF)"/>
    <rect x="0" y="0" width="200" height="35" rx="8 8 0 0" fill="url(#processGrad)"/>
    <text x="100" y="23" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="white" font-weight="bold">2. 智能处理</text>
    
    <g transform="translate(15, 50)">
      <rect x="0" y="0" width="170" height="28" rx="4" fill="#FFF3E0"/>
      <text x="85" y="18" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#E65100">L1: 二维码/OCR/分类</text>
    </g>
    <g transform="translate(15, 85)">
      <rect x="0" y="0" width="170" height="28" rx="4" fill="#FFF3E0"/>
      <text x="85" y="18" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#E65100">L2: 结构化信息提取</text>
    </g>
    <g transform="translate(15, 120)">
      <rect x="0" y="0" width="170" height="28" rx="4" fill="#FFF3E0"/>
      <text x="85" y="18" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#E65100">L3: VLM语义描述</text>
    </g>
    <g transform="translate(15, 155)">
      <rect x="0" y="0" width="170" height="28" rx="4" fill="#FFEBEE"/>
      <text x="85" y="18" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#C62828">敏感内容检测</text>
    </g>
  </g>
  
  <!-- 箭头2 -->
  <line x1="480" y1="180" x2="520" y2="180" stroke="#7F8C8D" stroke-width="2" marker-end="url(#arrowHead)"/>
  
  <!-- 阶段3: 存储索引 -->
  <g transform="translate(530, 80)">
    <rect x="0" y="0" width="180" height="200" rx="8" fill="#FFFFFF" stroke="#2A9D8F" stroke-width="2" filter="url(#shadowDF)"/>
    <rect x="0" y="0" width="180" height="35" rx="8 8 0 0" fill="url(#storeGrad)"/>
    <text x="90" y="23" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="white" font-weight="bold">3. 存储索引</text>
    
    <g transform="translate(15, 50)">
      <rect x="0" y="0" width="150" height="35" rx="4" fill="#E0F2F1"/>
      <text x="75" y="15" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#00695C">短期记忆</text>
      <text x="75" y="30" text-anchor="middle" font-family="Arial" font-size="9" fill="#00897B">ImageMemory</text>
    </g>
    <g transform="translate(15, 95)">
      <rect x="0" y="0" width="150" height="35" rx="4" fill="#E0F2F1"/>
      <text x="75" y="15" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#00695C">向量索引</text>
      <text x="75" y="30" text-anchor="middle" font-family="Arial" font-size="9" fill="#00897B">HNSW + PQ</text>
    </g>
    <g transform="translate(15, 140)">
      <rect x="0" y="0" width="150" height="35" rx="4" fill="#FCE4EC"/>
      <text x="75" y="15" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#AD1457">隐私保险箱</text>
      <text x="75" y="30" text-anchor="middle" font-family="Arial" font-size="9" fill="#C2185B">加密隔离</text>
    </g>
  </g>
  
  <!-- 箭头3 -->
  <line x1="720" y1="180" x2="760" y2="180" stroke="#7F8C8D" stroke-width="2" marker-end="url(#arrowHead)"/>
  
  <!-- 阶段4: 检索输出 -->
  <g transform="translate(770, 80)">
    <rect x="0" y="0" width="150" height="200" rx="8" fill="#FFFFFF" stroke="#9B59B6" stroke-width="2" filter="url(#shadowDF)"/>
    <rect x="0" y="0" width="150" height="35" rx="8 8 0 0" fill="url(#outputGrad)"/>
    <text x="75" y="23" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="white" font-weight="bold">4. 检索输出</text>
    
    <g transform="translate(15, 50)">
      <rect x="0" y="0" width="120" height="35" rx="4" fill="#F3E5F5"/>
      <text x="60" y="22" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#7B1FA2">语义匹配结果</text>
    </g>
    <g transform="translate(15, 95)">
      <rect x="0" y="0" width="120" height="35" rx="4" fill="#F3E5F5"/>
      <text x="60" y="22" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#7B1FA2">事件聚合结果</text>
    </g>
    <g transform="translate(15, 140)">
      <rect x="0" y="0" width="120" height="35" rx="4" fill="#F3E5F5"/>
      <text x="60" y="22" text-anchor="middle" font-family="SimSun, serif" font-size="10" fill="#7B1FA2">智能建议推送</text>
    </g>
  </g>
  
  <!-- 层次化记忆系统（底部） -->
  <g transform="translate(270, 320)">
    <rect x="0" y="0" width="440" height="240" rx="10" fill="#F0F7F5" stroke="#2A9D8F" stroke-width="2" filter="url(#shadowDF)"/>
    <rect x="0" y="0" width="440" height="35" rx="10 10 0 0" fill="url(#storeGrad)"/>
    <text x="220" y="23" text-anchor="middle" font-family="SimHei, sans-serif" font-size="13" fill="white" font-weight="bold">层次化记忆系统 Hierarchical Memory</text>
    
    <!-- 短期→长期 -->
    <g transform="translate(20, 50)">
      <rect x="0" y="0" width="125" height="80" rx="6" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
      <text x="62" y="20" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="#2E7D32" font-weight="bold">短期记忆</text>
      <text x="62" y="40" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">单图描述</text>
      <text x="62" y="55" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">语义向量</text>
      <text x="62" y="70" text-anchor="middle" font-family="Arial" font-size="8" fill="#4CAF50">TRL 7</text>
    </g>
    
    <text x="160" y="95" font-family="Arial" font-size="14" fill="#2A9D8F">→</text>
    <text x="155" y="115" font-family="SimSun, serif" font-size="8" fill="#7F8C8D">Reflection</text>
    
    <g transform="translate(175, 50)">
      <rect x="0" y="0" width="125" height="80" rx="6" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
      <text x="62" y="20" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="#E65100" font-weight="bold">长期记忆</text>
      <text x="62" y="40" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">高级事实推断</text>
      <text x="62" y="55" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">事件关联</text>
      <text x="62" y="70" text-anchor="middle" font-family="Arial" font-size="8" fill="#FF9800">TRL 3</text>
    </g>
    
    <text x="315" y="95" font-family="Arial" font-size="14" fill="#2A9D8F">→</text>
    <text x="305" y="115" font-family="SimSun, serif" font-size="8" fill="#7F8C8D">行为观察</text>
    
    <g transform="translate(330, 50)">
      <rect x="0" y="0" width="90" height="80" rx="6" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1"/>
      <text x="45" y="20" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="#7B1FA2" font-weight="bold">隐式记忆</text>
      <text x="45" y="40" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">用户偏好</text>
      <text x="45" y="55" text-anchor="middle" font-family="SimSun, serif" font-size="9" fill="#455A64">EMA更新</text>
      <text x="45" y="70" text-anchor="middle" font-family="Arial" font-size="8" fill="#9C27B0">TRL 3</text>
    </g>
    
    <!-- Reflection触发条件 -->
    <g transform="translate(20, 145)">
      <rect x="0" y="0" width="400" height="80" rx="6" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="1"/>
      <text x="200" y="20" text-anchor="middle" font-family="SimHei, sans-serif" font-size="11" fill="#2C3E50" font-weight="bold">Reflection触发条件</text>
      <text x="15" y="42" font-family="SimSun, serif" font-size="9" fill="#455A64">• 单次导入 &gt; 50张图片</text>
      <text x="15" y="58" font-family="SimSun, serif" font-size="9" fill="#455A64">• 地理位置变化 &gt; 50km</text>
      <text x="200" y="42" font-family="SimSun, serif" font-size="9" fill="#455A64">• 场景信息熵 &lt; 0.5</text>
      <text x="200" y="58" font-family="SimSun, serif" font-size="9" fill="#455A64">• 设备空闲 + 充电状态</text>
      <text x="200" y="74" text-anchor="middle" font-family="Arial" font-size="8" fill="#7F8C8D">WorkManager后台调度</text>
    </g>
  </g>
</svg>`;

// 写入文件
const outputDir = path.join(__dirname, 'images-v2');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(path.join(outputDir, 'diagram_core_techarch.svg'), diagram_techarch_v4);
fs.writeFileSync(path.join(outputDir, 'diagram_core_dataflow.svg'), diagram_dataflow_v4);

console.log('技术架构图 v4 生成完成（已删除营销词汇）');
console.log('- diagram_core_techarch.svg');
console.log('- diagram_core_dataflow.svg');
