/**
 * 生成功能创新点相关图片
 */
const fs = require('fs');
const path = require('path');

// 图1: 多模态语义搜索流程图
const svg_semantic_search = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
  <defs>
    <linearGradient id="gradInput" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3498db"/>
      <stop offset="100%" style="stop-color:#2980b9"/>
    </linearGradient>
    <linearGradient id="gradProcess" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <linearGradient id="gradOutput" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2A9D8F"/>
      <stop offset="100%" style="stop-color:#264653"/>
    </linearGradient>
    <filter id="shadowFunc">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.12"/>
    </filter>
  </defs>
  
  <rect width="800" height="420" fill="#FAFAFA"/>
  
  <!-- 标题 -->
  <text x="400" y="30" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#353535" text-anchor="middle">多模态语义搜索：「用一句话，找到任何截图」</text>
  
  <!-- 左侧：用户输入 -->
  <g transform="translate(30, 60)">
    <rect x="0" y="0" width="180" height="300" rx="10" fill="#FFFFFF" stroke="#3498db" stroke-width="2" filter="url(#shadowFunc)"/>
    <rect x="0" y="0" width="180" height="40" rx="10 10 0 0" fill="url(#gradInput)"/>
    <text x="90" y="26" font-family="SimHei, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">用户输入</text>
    
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="150" height="50" rx="6" fill="#E3F2FD"/>
      <text x="10" y="20" font-family="SimSun, serif" font-size="11" fill="#1565C0">「上周的咖啡发票」</text>
      <text x="10" y="38" font-family="SimSun, serif" font-size="10" fill="#78909C">→ 星巴克小票截图</text>
    </g>
    
    <g transform="translate(15, 115)">
      <rect x="0" y="0" width="150" height="50" rx="6" fill="#FFF8E1"/>
      <text x="10" y="20" font-family="SimSun, serif" font-size="11" fill="#F57F17">「红色的裙子」</text>
      <text x="10" y="38" font-family="SimSun, serif" font-size="10" fill="#78909C">→ 电商商品截图</text>
    </g>
    
    <g transform="translate(15, 175)">
      <rect x="0" y="0" width="150" height="50" rx="6" fill="#E8F5E9"/>
      <text x="10" y="20" font-family="SimSun, serif" font-size="11" fill="#2E7D32">「和小明的聊天」</text>
      <text x="10" y="38" font-family="SimSun, serif" font-size="10" fill="#78909C">→ 微信聊天截图</text>
    </g>
    
    <g transform="translate(15, 235)">
      <rect x="0" y="0" width="150" height="50" rx="6" fill="#F3E5F5"/>
      <text x="10" y="20" font-family="SimSun, serif" font-size="11" fill="#7B1FA2">「上次去海边」</text>
      <text x="10" y="38" font-family="SimSun, serif" font-size="10" fill="#78909C">→ 旅行照片集合</text>
    </g>
  </g>
  
  <!-- 箭头1 -->
  <g transform="translate(220, 200)">
    <path d="M0,10 L40,10 L40,0 L55,15 L40,30 L40,20 L0,20 Z" fill="#3498db"/>
  </g>
  
  <!-- 中间：处理流程 -->
  <g transform="translate(290, 60)">
    <rect x="0" y="0" width="220" height="300" rx="10" fill="#FFFFFF" stroke="#E76F51" stroke-width="2" filter="url(#shadowFunc)"/>
    <rect x="0" y="0" width="220" height="40" rx="10 10 0 0" fill="url(#gradProcess)"/>
    <text x="110" y="26" font-family="SimHei, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">智能处理管道</text>
    
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="190" height="55" rx="6" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
      <text x="95" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#E65100" text-anchor="middle">1. 查询向量化</text>
      <text x="95" y="40" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">MiniLM-L6-v2 → 384维向量</text>
    </g>
    
    <g transform="translate(15, 120)">
      <rect x="0" y="0" width="190" height="55" rx="6" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
      <text x="95" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#2E7D32" text-anchor="middle">2. 向量检索</text>
      <text x="95" y="40" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">HNSW索引 | 余弦相似度</text>
    </g>
    
    <g transform="translate(15, 185)">
      <rect x="0" y="0" width="190" height="55" rx="6" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
      <text x="95" y="20" font-family="SimHei, sans-serif" font-size="12" fill="#1565C0" text-anchor="middle">3. 记忆层增强</text>
      <text x="95" y="40" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">长期记忆关联 | 事件聚合</text>
    </g>
    
    <g transform="translate(15, 250)">
      <rect x="0" y="0" width="190" height="40" rx="6" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1"/>
      <text x="95" y="26" font-family="SimHei, sans-serif" font-size="12" fill="#6A1B9A" text-anchor="middle">4. 结果排序与返回</text>
    </g>
  </g>
  
  <!-- 箭头2 -->
  <g transform="translate(520, 200)">
    <path d="M0,10 L40,10 L40,0 L55,15 L40,30 L40,20 L0,20 Z" fill="#E76F51"/>
  </g>
  
  <!-- 右侧：搜索结果 -->
  <g transform="translate(590, 60)">
    <rect x="0" y="0" width="180" height="300" rx="10" fill="#FFFFFF" stroke="#2A9D8F" stroke-width="2" filter="url(#shadowFunc)"/>
    <rect x="0" y="0" width="180" height="40" rx="10 10 0 0" fill="url(#gradOutput)"/>
    <text x="90" y="26" font-family="SimHei, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">搜索结果</text>
    
    <g transform="translate(15, 55)">
      <rect x="0" y="0" width="150" height="70" rx="6" fill="#E0F2F1"/>
      <text x="75" y="20" font-family="SimHei, sans-serif" font-size="11" fill="#00695C" text-anchor="middle">精确匹配</text>
      <text x="75" y="40" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">相似度 &gt; 0.85</text>
      <text x="75" y="58" font-family="SimSun, serif" font-size="10" fill="#4CAF50" text-anchor="middle">✓ 直接返回目标图片</text>
    </g>
    
    <g transform="translate(15, 135)">
      <rect x="0" y="0" width="150" height="70" rx="6" fill="#FFF8E1"/>
      <text x="75" y="20" font-family="SimHei, sans-serif" font-size="11" fill="#F57F17" text-anchor="middle">模糊匹配</text>
      <text x="75" y="40" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">相似度 0.6-0.85</text>
      <text x="75" y="58" font-family="SimSun, serif" font-size="10" fill="#FF9800" text-anchor="middle">◐ 候选列表供选择</text>
    </g>
    
    <g transform="translate(15, 215)">
      <rect x="0" y="0" width="150" height="70" rx="6" fill="#FCE4EC"/>
      <text x="75" y="20" font-family="SimHei, sans-serif" font-size="11" fill="#C2185B" text-anchor="middle">事件聚合</text>
      <text x="75" y="40" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">长期记忆命中</text>
      <text x="75" y="58" font-family="SimSun, serif" font-size="10" fill="#E91E63" text-anchor="middle">★ 返回整个事件集合</text>
    </g>
  </g>
  
  <!-- 底部说明 -->
  <text x="400" y="395" font-family="SimSun, serif" font-size="12" fill="#78909C" text-anchor="middle">突破传统相册「时间+地点」索引限制，支持自然语言语义检索</text>
</svg>`;

// 图2: 隐私保险箱双闭环架构
const svg_privacy_vault = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="380" viewBox="0 0 800 380">
  <defs>
    <linearGradient id="gradVault1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1976D2"/>
      <stop offset="100%" style="stop-color:#0D47A1"/>
    </linearGradient>
    <linearGradient id="gradVault2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7B1FA2"/>
      <stop offset="100%" style="stop-color:#4A148C"/>
    </linearGradient>
    <filter id="shadowVault">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="800" height="380" fill="#FAFAFA"/>
  
  <!-- 标题 -->
  <text x="400" y="30" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#353535" text-anchor="middle">隐私保护双闭环：数据不出端 + 数据不被看见</text>
  
  <!-- 左侧闭环：端侧推理 -->
  <g transform="translate(50, 60)">
    <rect x="0" y="0" width="320" height="260" rx="12" fill="#FFFFFF" stroke="#1976D2" stroke-width="2" filter="url(#shadowVault)"/>
    <rect x="0" y="0" width="320" height="45" rx="12 12 0 0" fill="url(#gradVault1)"/>
    <text x="160" y="30" font-family="SimHei, sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF" text-anchor="middle">闭环一：数据不出端</text>
    
    <g transform="translate(20, 60)">
      <rect x="0" y="0" width="280" height="45" rx="6" fill="#E3F2FD"/>
      <text x="140" y="18" font-family="SimHei, sans-serif" font-size="12" fill="#1565C0" text-anchor="middle">端侧VLM推理</text>
      <text x="140" y="36" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">Qwen3-VL-2B | MNN框架 | 本地执行</text>
    </g>
    
    <g transform="translate(20, 115)">
      <rect x="0" y="0" width="280" height="45" rx="6" fill="#E8F5E9"/>
      <text x="140" y="18" font-family="SimHei, sans-serif" font-size="12" fill="#2E7D32" text-anchor="middle">本地向量数据库</text>
      <text x="140" y="36" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">ObjectBox HNSW | SQLite | 设备存储</text>
    </g>
    
    <g transform="translate(20, 170)">
      <rect x="0" y="0" width="280" height="45" rx="6" fill="#FFF3E0"/>
      <text x="140" y="18" font-family="SimHei, sans-serif" font-size="12" fill="#E65100" text-anchor="middle">云端增强（可选）</text>
      <text x="140" y="36" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">用户主动开启 | 知情同意 | TLS 1.3加密</text>
    </g>
    
    <rect x="20" y="225" width="280" height="25" rx="4" fill="#BBDEFB"/>
    <text x="160" y="242" font-family="SimSun, serif" font-size="11" fill="#0D47A1" text-anchor="middle">✓ 符合PIPL数据最小化原则</text>
  </g>
  
  <!-- 中间连接 -->
  <g transform="translate(385, 180)">
    <text x="15" y="0" font-family="SimHei, sans-serif" font-size="28" fill="#2A9D8F" text-anchor="middle">+</text>
    <text x="15" y="25" font-family="SimSun, serif" font-size="11" fill="#78909C" text-anchor="middle">协同</text>
  </g>
  
  <!-- 右侧闭环：隐私保险箱 -->
  <g transform="translate(430, 60)">
    <rect x="0" y="0" width="320" height="260" rx="12" fill="#FFFFFF" stroke="#7B1FA2" stroke-width="2" filter="url(#shadowVault)"/>
    <rect x="0" y="0" width="320" height="45" rx="12 12 0 0" fill="url(#gradVault2)"/>
    <text x="160" y="30" font-family="SimHei, sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF" text-anchor="middle">闭环二：数据不被看见</text>
    
    <g transform="translate(20, 60)">
      <rect x="0" y="0" width="280" height="45" rx="6" fill="#F3E5F5"/>
      <text x="140" y="18" font-family="SimHei, sans-serif" font-size="12" fill="#7B1FA2" text-anchor="middle">敏感内容检测</text>
      <text x="140" y="36" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">身份证 | 银行卡 | 密码 | 合同</text>
    </g>
    
    <g transform="translate(20, 115)">
      <rect x="0" y="0" width="280" height="45" rx="6" fill="#FCE4EC"/>
      <text x="140" y="18" font-family="SimHei, sans-serif" font-size="12" fill="#C2185B" text-anchor="middle">自动隔离加密</text>
      <text x="140" y="36" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">EncryptedFile API | AES-256-GCM</text>
    </g>
    
    <g transform="translate(20, 170)">
      <rect x="0" y="0" width="280" height="45" rx="6" fill="#EDE7F6"/>
      <text x="140" y="18" font-family="SimHei, sans-serif" font-size="12" fill="#512DA8" text-anchor="middle">生物识别解锁</text>
      <text x="140" y="36" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">BiometricPrompt | 指纹/面部 | 主时间线隐藏</text>
    </g>
    
    <rect x="20" y="225" width="280" height="25" rx="4" fill="#E1BEE7"/>
    <text x="160" y="242" font-family="SimSun, serif" font-size="11" fill="#4A148C" text-anchor="middle">✓ 防止他人窥探敏感照片</text>
  </g>
  
  <!-- 底部总结 -->
  <rect x="200" y="335" width="400" height="30" rx="6" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
  <text x="400" y="355" font-family="SimHei, sans-serif" font-size="12" fill="#2E7D32" text-anchor="middle">双闭环协同 = 完整的隐私保护方案</text>
</svg>`;

// 图3: 隐式偏好学习流程
const svg_implicit_pref = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="350" viewBox="0 0 800 350">
  <defs>
    <linearGradient id="gradPref" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#F4A261"/>
      <stop offset="100%" style="stop-color:#E76F51"/>
    </linearGradient>
    <filter id="shadowPref">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.1"/>
    </filter>
  </defs>
  
  <rect width="800" height="350" fill="#FAFAFA"/>
  
  <!-- 标题 -->
  <text x="400" y="30" font-family="SimHei, sans-serif" font-size="18" font-weight="bold" fill="#353535" text-anchor="middle">隐式偏好学习：无声的个性化体验</text>
  
  <!-- 流程步骤 -->
  <!-- 步骤1：行为观察 -->
  <g transform="translate(30, 60)">
    <rect x="0" y="0" width="160" height="220" rx="10" fill="#FFFFFF" stroke="#3498db" stroke-width="2" filter="url(#shadowPref)"/>
    <circle cx="80" cy="30" r="20" fill="#3498db"/>
    <text x="80" y="36" font-family="Arial" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">1</text>
    <text x="80" y="65" font-family="SimHei, sans-serif" font-size="13" fill="#1565C0" text-anchor="middle">行为观察</text>
    
    <g transform="translate(15, 80)">
      <rect x="0" y="0" width="130" height="30" rx="4" fill="#E3F2FD"/>
      <text x="65" y="20" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">修图历史</text>
    </g>
    <g transform="translate(15, 118)">
      <rect x="0" y="0" width="130" height="30" rx="4" fill="#E3F2FD"/>
      <text x="65" y="20" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">浏览时长</text>
    </g>
    <g transform="translate(15, 156)">
      <rect x="0" y="0" width="130" height="30" rx="4" fill="#E3F2FD"/>
      <text x="65" y="20" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">收藏行为</text>
    </g>
    <g transform="translate(15, 194)">
      <rect x="0" y="0" width="130" height="20" rx="4" fill="#BBDEFB"/>
      <text x="65" y="14" font-family="SimSun, serif" font-size="9" fill="#1565C0" text-anchor="middle">无需用户配置</text>
    </g>
  </g>
  
  <!-- 箭头1 -->
  <path d="M200,170 L230,170 L230,160 L250,175 L230,190 L230,180 L200,180 Z" fill="#3498db"/>
  
  <!-- 步骤2：模式识别 -->
  <g transform="translate(260, 60)">
    <rect x="0" y="0" width="160" height="220" rx="10" fill="#FFFFFF" stroke="#F4A261" stroke-width="2" filter="url(#shadowPref)"/>
    <circle cx="80" cy="30" r="20" fill="#F4A261"/>
    <text x="80" y="36" font-family="Arial" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">2</text>
    <text x="80" y="65" font-family="SimHei, sans-serif" font-size="13" fill="#E65100" text-anchor="middle">模式识别</text>
    
    <g transform="translate(15, 80)">
      <rect x="0" y="0" width="130" height="45" rx="4" fill="#FFF3E0"/>
      <text x="65" y="18" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">食物照片</text>
      <text x="65" y="36" font-family="SimSun, serif" font-size="10" fill="#E65100" text-anchor="middle">→ 偏好暖色调</text>
    </g>
    <g transform="translate(15, 133)">
      <rect x="0" y="0" width="130" height="45" rx="4" fill="#FFF3E0"/>
      <text x="65" y="18" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">风景照片</text>
      <text x="65" y="36" font-family="SimSun, serif" font-size="10" fill="#E65100" text-anchor="middle">→ 偏好高饱和度</text>
    </g>
    <g transform="translate(15, 186)">
      <rect x="0" y="0" width="130" height="28" rx="4" fill="#FFE0B2"/>
      <text x="65" y="18" font-family="SimSun, serif" font-size="9" fill="#E65100" text-anchor="middle">场景化偏好聚类</text>
    </g>
  </g>
  
  <!-- 箭头2 -->
  <path d="M430,170 L460,170 L460,160 L480,175 L460,190 L460,180 L430,180 Z" fill="#F4A261"/>
  
  <!-- 步骤3：EMA更新 -->
  <g transform="translate(490, 60)">
    <rect x="0" y="0" width="160" height="220" rx="10" fill="#FFFFFF" stroke="#9C27B0" stroke-width="2" filter="url(#shadowPref)"/>
    <circle cx="80" cy="30" r="20" fill="#9C27B0"/>
    <text x="80" y="36" font-family="Arial" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">3</text>
    <text x="80" y="65" font-family="SimHei, sans-serif" font-size="13" fill="#7B1FA2" text-anchor="middle">渐进式更新</text>
    
    <g transform="translate(15, 85)">
      <rect x="0" y="0" width="130" height="55" rx="4" fill="#F3E5F5"/>
      <text x="65" y="18" font-family="SimHei, sans-serif" font-size="10" fill="#7B1FA2" text-anchor="middle">EMA算法</text>
      <text x="65" y="36" font-family="SimSun, serif" font-size="9" fill="#455A64" text-anchor="middle">Pref = 0.2×New</text>
      <text x="65" y="50" font-family="SimSun, serif" font-size="9" fill="#455A64" text-anchor="middle">+ 0.8×Old</text>
    </g>
    <g transform="translate(15, 150)">
      <rect x="0" y="0" width="130" height="30" rx="4" fill="#EDE7F6"/>
      <text x="65" y="20" font-family="SimSun, serif" font-size="10" fill="#455A64" text-anchor="middle">抵抗偶发噪声</text>
    </g>
    <g transform="translate(15, 188)">
      <rect x="0" y="0" width="130" height="26" rx="4" fill="#E1BEE7"/>
      <text x="65" y="17" font-family="SimSun, serif" font-size="9" fill="#7B1FA2" text-anchor="middle">捕捉渐进演变</text>
    </g>
  </g>
  
  <!-- 箭头3 -->
  <path d="M660,170 L690,170 L690,160 L710,175 L690,190 L690,180 L660,180 Z" fill="#9C27B0"/>
  
  <!-- 步骤4：智能推荐 -->
  <g transform="translate(720, 100)">
    <rect x="0" y="0" width="60" height="140" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
    <text x="30" y="30" font-family="SimHei, sans-serif" font-size="11" fill="#2E7D32" text-anchor="middle">智能</text>
    <text x="30" y="50" font-family="SimHei, sans-serif" font-size="11" fill="#2E7D32" text-anchor="middle">推荐</text>
    <text x="30" y="80" font-family="SimSun, serif" font-size="9" fill="#455A64" text-anchor="middle">主动</text>
    <text x="30" y="95" font-family="SimSun, serif" font-size="9" fill="#455A64" text-anchor="middle">建议</text>
    <text x="30" y="110" font-family="SimSun, serif" font-size="9" fill="#455A64" text-anchor="middle">滤镜</text>
    <text x="30" y="130" font-family="SimSun, serif" font-size="9" fill="#4CAF50" text-anchor="middle">✓</text>
  </g>
  
  <!-- 底部说明 -->
  <text x="400" y="320" font-family="SimSun, serif" font-size="12" fill="#78909C" text-anchor="middle">无需用户手动设置，系统自动学习场景化偏好</text>
</svg>`;

// 写入文件
fs.writeFileSync(path.join(__dirname, 'diagram_semantic_search_flow.svg'), svg_semantic_search);
fs.writeFileSync(path.join(__dirname, 'diagram_privacy_vault.svg'), svg_privacy_vault);
fs.writeFileSync(path.join(__dirname, 'diagram_implicit_pref_learning.svg'), svg_implicit_pref);

console.log('功能创新图片生成完成!');
console.log('- diagram_semantic_search_flow.svg');
console.log('- diagram_privacy_vault.svg');
console.log('- diagram_implicit_pref_learning.svg');
