package com.example.software.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.ui.unit.dp

/**
 * SeekLight 圆角规范
 * 
 * 设计原则：
 * - 统一的圆角半径，确保视觉一致性
 * - 大组件使用更大圆角，小组件使用较小圆角
 */
val Shapes = Shapes(
    // 超小圆角 - 标签、徽章
    extraSmall = RoundedCornerShape(4.dp),
    
    // 小圆角 - 按钮、输入框
    small = RoundedCornerShape(8.dp),
    
    // 中等圆角 - 卡片、对话框
    medium = RoundedCornerShape(12.dp),
    
    // 大圆角 - 底部弹窗、模态框
    large = RoundedCornerShape(16.dp),
    
    // 超大圆角 - 全屏弹窗顶部
    extraLarge = RoundedCornerShape(24.dp)
)

// ==================== 自定义圆角 ====================

/** 胶囊形状 - 用于标签、芯片 */
val PillShape = RoundedCornerShape(50)

/** 图片圆角 */
val ImageShape = RoundedCornerShape(12.dp)

/** 缩略图圆角 */
val ThumbnailShape = RoundedCornerShape(8.dp)

/** 卡片圆角 */
val CardShape = RoundedCornerShape(16.dp)

/** 按钮圆角 */
val ButtonShape = RoundedCornerShape(12.dp)

/** 输入框圆角 */
val InputShape = RoundedCornerShape(12.dp)

/** 底部导航栏顶部圆角 */
val BottomNavShape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp)

/** 底部弹窗圆角 */
val BottomSheetShape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp)

/** 对话框圆角 */
val DialogShape = RoundedCornerShape(20.dp)
