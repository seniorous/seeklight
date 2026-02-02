/**
 * 改进版图表生成脚本
 * 风险卡片列表 + TRL表格进度条
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'v5.0-memory-arch-charts');

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

// 图表1: 风险卡片列表
const chart_risk_cards = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="340" viewBox="0 0 900 340">
  <defs>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.12"/>
    </filter>
    <linearGradient id="dangerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.danger};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#DC2626;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="warningGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.warning};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#D97706;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="successGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.success};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="900" height="340" fill="${colors.background}"/>
  
  <!-- 标题 -->
  <text x="450" y="32" font-family="SimHei, Microsoft YaHei" font-size="18" font-weight="bold" fill="${colors.darkText}" text-anchor="middle">技术风险识别与应对策略</text>
  
  <!-- 风险等级图例 -->
  <g transform="translate(650, 18)">
    <rect x="0" y="0" width="12" height="12" rx="2" fill="${colors.danger}"/>
    <text x="18" y="10" font-family="SimSun" font-size="10" fill="${colors.gray}">高风险</text>
    <rect x="60" y="0" width="12" height="12" rx="2" fill="${colors.warning}"/>
    <text x="78" y="10" font-family="SimSun" font-size="10" fill="${colors.gray}">中风险</text>
    <rect x="120" y="0" width="12" height="12" rx="2" fill="${colors.success}"/>
    <text x="138" y="10" font-family="SimSun" font-size="10" fill="${colors.gray}">低风险</text>
  </g>
  
  <!-- 第一行：中/高风险 -->
  <g transform="translate(25, 55)">
    <!-- 卡片1: Reflection计算开销 (中风险) -->
    <g>
      <rect x="0" y="0" width="275" height="120" rx="8" fill="${colors.white}" filter="url(#cardShadow)"/>
      <rect x="0" y="0" width="275" height="32" rx="8" fill="url(#warningGrad)"/>
      <rect x="0" y="24" width="275" height="8" fill="url(#warningGrad)"/>
      <text x="137" y="22" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">Reflection计算开销</text>
      <text x="15" y="52" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">风险表现</text>
      <text x="15" y="68" font-family="SimSun" font-size="10" fill="${colors.gray}">单次推理耗时可能超过60秒</text>
      <text x="15" y="88" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">应对策略</text>
      <text x="15" y="104" font-family="SimSun" font-size="10" fill="${colors.teal}">动态调整触发阈值 + 分批处理</text>
    </g>
    
    <!-- 卡片2: 高级事实准确率 (中风险) -->
    <g transform="translate(290, 0)">
      <rect x="0" y="0" width="275" height="120" rx="8" fill="${colors.white}" filter="url(#cardShadow)"/>
      <rect x="0" y="0" width="275" height="32" rx="8" fill="url(#warningGrad)"/>
      <rect x="0" y="24" width="275" height="8" fill="url(#warningGrad)"/>
      <text x="137" y="22" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">高级事实推断准确率</text>
      <text x="15" y="52" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">风险表现</text>
      <text x="15" y="68" font-family="SimSun" font-size="10" fill="${colors.gray}">误判率可能超过20%</text>
      <text x="15" y="88" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">应对策略</text>
      <text x="15" y="104" font-family="SimSun" font-size="10" fill="${colors.teal}">置信度阈值过滤(&lt;0.6) + 用户可编辑</text>
    </g>
    
    <!-- 卡片3: VLM准确率 (中风险) -->
    <g transform="translate(580, 0)">
      <rect x="0" y="0" width="275" height="120" rx="8" fill="${colors.white}" filter="url(#cardShadow)"/>
      <rect x="0" y="0" width="275" height="32" rx="8" fill="url(#warningGrad)"/>
      <rect x="0" y="24" width="275" height="8" fill="url(#warningGrad)"/>
      <text x="137" y="22" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">VLM语义理解准确率</text>
      <text x="15" y="52" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">风险表现</text>
      <text x="15" y="68" font-family="SimSun" font-size="10" fill="${colors.gray}">端侧模型描述可能不够精确</text>
      <text x="15" y="88" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">应对策略</text>
      <text x="15" y="104" font-family="SimSun" font-size="10" fill="${colors.teal}">云端增强模式 + 用户反馈优化</text>
    </g>
  </g>
  
  <!-- 第二行：低风险 -->
  <g transform="translate(25, 190)">
    <!-- 卡片4: ML Kit依赖 (低风险) -->
    <g>
      <rect x="0" y="0" width="275" height="120" rx="8" fill="${colors.white}" filter="url(#cardShadow)"/>
      <rect x="0" y="0" width="275" height="32" rx="8" fill="url(#successGrad)"/>
      <rect x="0" y="24" width="275" height="8" fill="url(#successGrad)"/>
      <text x="137" y="22" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">ML Kit服务依赖</text>
      <text x="15" y="52" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">风险表现</text>
      <text x="15" y="68" font-family="SimSun" font-size="10" fill="${colors.gray}">国产手机无Google Play服务</text>
      <text x="15" y="88" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">应对策略</text>
      <text x="15" y="104" font-family="SimSun" font-size="10" fill="${colors.teal}">自动降级到VLM OCR模式</text>
    </g>
    
    <!-- 卡片5: 偏好学习冷启动 (低风险) -->
    <g transform="translate(290, 0)">
      <rect x="0" y="0" width="275" height="120" rx="8" fill="${colors.white}" filter="url(#cardShadow)"/>
      <rect x="0" y="0" width="275" height="32" rx="8" fill="url(#successGrad)"/>
      <rect x="0" y="24" width="275" height="8" fill="url(#successGrad)"/>
      <text x="137" y="22" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">偏好学习冷启动</text>
      <text x="15" y="52" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">风险表现</text>
      <text x="15" y="68" font-family="SimSun" font-size="10" fill="${colors.gray}">新用户无历史数据时无建议</text>
      <text x="15" y="88" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">应对策略</text>
      <text x="15" y="104" font-family="SimSun" font-size="10" fill="${colors.teal}">提供场景化默认偏好预设</text>
    </g>
    
    <!-- 卡片6: EncryptedFile弃用 (低风险) -->
    <g transform="translate(580, 0)">
      <rect x="0" y="0" width="275" height="120" rx="8" fill="${colors.white}" filter="url(#cardShadow)"/>
      <rect x="0" y="0" width="275" height="32" rx="8" fill="url(#successGrad)"/>
      <rect x="0" y="24" width="275" height="8" fill="url(#successGrad)"/>
      <text x="137" y="22" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">EncryptedFile API弃用</text>
      <text x="15" y="52" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">风险表现</text>
      <text x="15" y="68" font-family="SimSun" font-size="10" fill="${colors.gray}">Jetpack Security标记deprecated</text>
      <text x="15" y="88" font-family="SimHei" font-size="11" fill="${colors.darkText}" font-weight="bold">应对策略</text>
      <text x="15" y="104" font-family="SimSun" font-size="10" fill="${colors.teal}">使用Keystore+自实现加密替代</text>
    </g>
  </g>
</svg>`;

// 图表2: TRL表格进度条
const chart_trl_table = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="850" height="420" viewBox="0 0 850 420">
  <defs>
    <filter id="tableShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.1"/>
    </filter>
    <linearGradient id="trl9" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#059669" />
      <stop offset="100%" style="stop-color:${colors.success}" />
    </linearGradient>
    <linearGradient id="trl8" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.success}" />
      <stop offset="100%" style="stop-color:#34D399" />
    </linearGradient>
    <linearGradient id="trl7" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.secondary}" />
      <stop offset="100%" style="stop-color:${colors.accent}" />
    </linearGradient>
    <linearGradient id="trl4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.warning}" />
      <stop offset="100%" style="stop-color:#FBBF24" />
    </linearGradient>
    <linearGradient id="trl3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.danger}" />
      <stop offset="100%" style="stop-color:#F87171" />
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="850" height="420" fill="${colors.background}"/>
  
  <!-- 标题 -->
  <text x="425" y="32" font-family="SimHei, Microsoft YaHei" font-size="18" font-weight="bold" fill="${colors.darkText}" text-anchor="middle">核心功能技术成熟度评估 (TRL)</text>
  
  <!-- 表格 -->
  <g transform="translate(25, 50)">
    <!-- 表头 -->
    <rect x="0" y="0" width="800" height="36" rx="6" fill="${colors.primary}"/>
    <text x="110" y="24" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">功能模块</text>
    <text x="280" y="24" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">TRL等级</text>
    <text x="500" y="24" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">成熟度进度</text>
    <text x="720" y="24" font-family="SimHei" font-size="13" fill="${colors.white}" text-anchor="middle" font-weight="bold">开发阶段</text>
    
    <!-- 行1: 跨应用智能跳转 TRL 9 -->
    <rect x="0" y="42" width="800" height="44" rx="4" fill="${colors.white}" filter="url(#tableShadow)"/>
    <text x="20" y="70" font-family="SimHei" font-size="12" fill="${colors.darkText}">跨应用智能跳转</text>
    <rect x="240" y="55" width="80" height="22" rx="11" fill="${colors.success}"/>
    <text x="280" y="71" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">TRL 9</text>
    <rect x="340" y="58" width="280" height="16" rx="8" fill="${colors.lightGray}"/>
    <rect x="340" y="58" width="280" height="16" rx="8" fill="url(#trl9)"/>
    <text x="720" y="70" font-family="SimSun" font-size="11" fill="${colors.success}" text-anchor="middle">Phase 2 快速实现</text>
    
    <!-- 行2: 快速内容识别 TRL 8-9 -->
    <rect x="0" y="92" width="800" height="44" rx="4" fill="${colors.white}" filter="url(#tableShadow)"/>
    <text x="20" y="120" font-family="SimHei" font-size="12" fill="${colors.darkText}">快速内容识别</text>
    <rect x="240" y="105" width="80" height="22" rx="11" fill="${colors.success}"/>
    <text x="280" y="121" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">TRL 8-9</text>
    <rect x="340" y="108" width="280" height="16" rx="8" fill="${colors.lightGray}"/>
    <rect x="340" y="108" width="265" height="16" rx="8" fill="url(#trl8)"/>
    <text x="720" y="120" font-family="SimSun" font-size="11" fill="${colors.success}" text-anchor="middle">Phase 2 快速实现</text>
    
    <!-- 行3: 隐私保险箱 TRL 8-9 -->
    <rect x="0" y="142" width="800" height="44" rx="4" fill="${colors.white}" filter="url(#tableShadow)"/>
    <text x="20" y="170" font-family="SimHei" font-size="12" fill="${colors.darkText}">隐私保险箱</text>
    <rect x="240" y="155" width="80" height="22" rx="11" fill="${colors.success}"/>
    <text x="280" y="171" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">TRL 8-9</text>
    <rect x="340" y="158" width="280" height="16" rx="8" fill="${colors.lightGray}"/>
    <rect x="340" y="158" width="265" height="16" rx="8" fill="url(#trl8)"/>
    <text x="720" y="170" font-family="SimSun" font-size="11" fill="${colors.success}" text-anchor="middle">Phase 3 快速实现</text>
    
    <!-- 行4: 多模态语义搜索 TRL 7-8 -->
    <rect x="0" y="192" width="800" height="44" rx="4" fill="${colors.white}" filter="url(#tableShadow)"/>
    <text x="20" y="220" font-family="SimHei" font-size="12" fill="${colors.darkText}">多模态语义搜索</text>
    <rect x="240" y="205" width="80" height="22" rx="11" fill="${colors.secondary}"/>
    <text x="280" y="221" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">TRL 7-8</text>
    <rect x="340" y="208" width="280" height="16" rx="8" fill="${colors.lightGray}"/>
    <rect x="340" y="208" width="233" height="16" rx="8" fill="url(#trl7)"/>
    <text x="720" y="220" font-family="SimSun" font-size="11" fill="${colors.secondary}" text-anchor="middle">Phase 2-3</text>
    
    <!-- 行5: 短期记忆层 TRL 7 -->
    <rect x="0" y="242" width="800" height="44" rx="4" fill="${colors.white}" filter="url(#tableShadow)"/>
    <circle cx="15" cy="264" r="5" fill="${colors.purple}"/>
    <text x="28" y="270" font-family="SimHei" font-size="12" fill="${colors.primary}">短期记忆层</text>
    <rect x="240" y="255" width="80" height="22" rx="11" fill="${colors.secondary}"/>
    <text x="280" y="271" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">TRL 7</text>
    <rect x="340" y="258" width="280" height="16" rx="8" fill="${colors.lightGray}"/>
    <rect x="340" y="258" width="217" height="16" rx="8" fill="url(#trl7)"/>
    <text x="720" y="270" font-family="SimSun" font-size="11" fill="${colors.secondary}" text-anchor="middle">Phase 3</text>
    
    <!-- 行6: 长期记忆层(Reflection) TRL 4 -->
    <rect x="0" y="292" width="800" height="44" rx="4" fill="${colors.white}" filter="url(#tableShadow)"/>
    <circle cx="15" cy="314" r="5" fill="${colors.purple}"/>
    <text x="28" y="320" font-family="SimHei" font-size="12" fill="${colors.primary}">长期记忆层 (Reflection)</text>
    <rect x="240" y="305" width="80" height="22" rx="11" fill="${colors.warning}"/>
    <text x="280" y="321" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">TRL 4</text>
    <rect x="340" y="308" width="280" height="16" rx="8" fill="${colors.lightGray}"/>
    <rect x="340" y="308" width="124" height="16" rx="8" fill="url(#trl4)"/>
    <text x="720" y="320" font-family="SimSun" font-size="11" fill="${colors.warning}" text-anchor="middle">Phase 4 需原型验证</text>
    
    <!-- 行7: 隐式记忆层 TRL 3 -->
    <rect x="0" y="342" width="800" height="44" rx="4" fill="${colors.white}" filter="url(#tableShadow)"/>
    <circle cx="15" cy="364" r="5" fill="${colors.purple}"/>
    <text x="28" y="370" font-family="SimHei" font-size="12" fill="${colors.primary}">隐式记忆层 (偏好学习)</text>
    <rect x="240" y="355" width="80" height="22" rx="11" fill="${colors.danger}"/>
    <text x="280" y="371" font-family="Consolas" font-size="12" fill="${colors.white}" text-anchor="middle" font-weight="bold">TRL 3</text>
    <rect x="340" y="358" width="280" height="16" rx="8" fill="${colors.lightGray}"/>
    <rect x="340" y="358" width="93" height="16" rx="8" fill="url(#trl3)"/>
    <text x="720" y="370" font-family="SimSun" font-size="11" fill="${colors.danger}" text-anchor="middle">Phase 4 需原型验证</text>
  </g>
  
  <!-- 图例 -->
  <g transform="translate(25, 400)">
    <circle cx="8" cy="8" r="5" fill="${colors.purple}"/>
    <text x="20" y="12" font-family="SimSun" font-size="10" fill="${colors.gray}">层次化记忆架构组件</text>
    <rect x="160" y="2" width="50" height="12" rx="6" fill="${colors.success}"/>
    <text x="220" y="12" font-family="SimSun" font-size="10" fill="${colors.gray}">TRL 7-9 生产成熟</text>
    <rect x="320" y="2" width="50" height="12" rx="6" fill="${colors.warning}"/>
    <text x="380" y="12" font-family="SimSun" font-size="10" fill="${colors.gray}">TRL 4-6 开发验证</text>
    <rect x="480" y="2" width="50" height="12" rx="6" fill="${colors.danger}"/>
    <text x="540" y="12" font-family="SimSun" font-size="10" fill="${colors.gray}">TRL 1-3 研究探索</text>
  </g>
</svg>`;

// 写入文件
const charts = [
    { name: 'chart_risk_cards.svg', content: chart_risk_cards },
    { name: 'chart_trl_table.svg', content: chart_trl_table }
];

charts.forEach(chart => {
    const filePath = path.join(outputDir, chart.name);
    fs.writeFileSync(filePath, chart.content, 'utf8');
    console.log(`Generated: ${chart.name}`);
});

console.log('\n改进版图表已生成，运行转换脚本生成PNG。');
