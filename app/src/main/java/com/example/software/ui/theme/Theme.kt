package com.example.software.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

/**
 * SeekLight 深色主题配色
 */
private val DarkColorScheme = darkColorScheme(
    // 主色
    primary = PrimaryLight,
    onPrimary = Color.White,
    primaryContainer = PrimaryDark,
    onPrimaryContainer = Color.White,
    
    // 次要色
    secondary = SecondaryLight,
    onSecondary = Color.White,
    secondaryContainer = SecondaryDark,
    onSecondaryContainer = Color.White,
    
    // 强调色
    tertiary = TertiaryLight,
    onTertiary = Color.White,
    tertiaryContainer = TertiaryDark,
    onTertiaryContainer = Color.White,
    
    // 背景
    background = BackgroundDark,
    onBackground = TextPrimaryDark,
    
    // 表面
    surface = SurfaceDark,
    onSurface = TextPrimaryDark,
    surfaceVariant = SurfaceVariantDark,
    onSurfaceVariant = TextSecondaryDark,
    
    // 轮廓
    outline = BorderDark,
    outlineVariant = SurfaceVariantDark,
    
    // 错误
    error = Error,
    onError = Color.White,
    errorContainer = ErrorContainer,
    onErrorContainer = OnErrorContainer,
    
    // 反转
    inverseSurface = Surface,
    inverseOnSurface = TextPrimary,
    inversePrimary = Primary,
    
    // 其他
    scrim = Color.Black.copy(alpha = 0.5f)
)

/**
 * SeekLight 浅色主题配色
 */
private val LightColorScheme = lightColorScheme(
    // 主色
    primary = Primary,
    onPrimary = Color.White,
    primaryContainer = PrimaryContainer,
    onPrimaryContainer = OnPrimaryContainer,
    
    // 次要色
    secondary = Secondary,
    onSecondary = Color.White,
    secondaryContainer = SecondaryContainer,
    onSecondaryContainer = OnSecondaryContainer,
    
    // 强调色
    tertiary = Tertiary,
    onTertiary = Color.White,
    tertiaryContainer = TertiaryContainer,
    onTertiaryContainer = OnTertiaryContainer,
    
    // 背景
    background = Background,
    onBackground = TextPrimary,
    
    // 表面
    surface = Surface,
    onSurface = TextPrimary,
    surfaceVariant = SurfaceVariant,
    onSurfaceVariant = TextSecondary,
    
    // 轮廓
    outline = Border,
    outlineVariant = SurfaceVariant,
    
    // 错误
    error = Error,
    onError = Color.White,
    errorContainer = ErrorContainer,
    onErrorContainer = OnErrorContainer,
    
    // 反转
    inverseSurface = SurfaceDark,
    inverseOnSurface = TextPrimaryDark,
    inversePrimary = PrimaryLight,
    
    // 其他
    scrim = Color.Black.copy(alpha = 0.3f)
)

/**
 * SeekLight 主题
 * 
 * @param darkTheme 是否使用深色主题
 * @param dynamicColor 是否使用动态颜色（Android 12+）- 默认关闭以保持品牌一致性
 * @param content 内容
 */
@Composable
fun SoftwareTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // 默认关闭动态颜色以保持品牌一致性
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        // 可选：启用 Android 12+ 动态颜色
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalView.current.context
            if (darkTheme) {
                androidx.compose.material3.dynamicDarkColorScheme(context)
            } else {
                androidx.compose.material3.dynamicLightColorScheme(context)
            }
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }
    
    // 设置状态栏和导航栏颜色
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            // 状态栏颜色
            window.statusBarColor = colorScheme.background.toArgb()
            // 导航栏颜色
            window.navigationBarColor = colorScheme.background.toArgb()
            // 状态栏图标颜色
            WindowCompat.getInsetsController(window, view).apply {
                isAppearanceLightStatusBars = !darkTheme
                isAppearanceLightNavigationBars = !darkTheme
            }
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        shapes = Shapes,
        content = content
    )
}

/**
 * SeekLight 主题别名（品牌名称）
 */
@Composable
fun SeekLightTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) = SoftwareTheme(darkTheme, dynamicColor, content)
