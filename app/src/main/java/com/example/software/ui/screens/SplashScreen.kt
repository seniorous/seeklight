package com.example.software.ui.screens

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.software.BuildConfig
import com.example.software.R
import com.example.software.ui.theme.GradientEnd
import com.example.software.ui.theme.GradientStart
import kotlinx.coroutines.delay

/**
 * 拾光 SeekLight 启动界面
 * 
 * 设计理念：
 * - 暖色调记忆泡视觉
 * - 简洁的品牌展示
 * - 突出核心价值主张："用一句话，找到任何截图"
 */
@Composable
fun SplashScreen(
    onSplashComplete: () -> Unit
) {
    // 动画状态
    val logoScale = remember { Animatable(0.6f) }
    val logoAlpha = remember { Animatable(0f) }
    val textAlpha = remember { Animatable(0f) }
    val sloganAlpha = remember { Animatable(0f) }
    val versionAlpha = remember { Animatable(0f) }
    
    // 启动动画序列
    LaunchedEffect(Unit) {
        // Logo 缩放动画
        logoScale.animateTo(
            targetValue = 1f,
            animationSpec = tween(600, easing = FastOutSlowInEasing)
        )
    }
    
    LaunchedEffect(Unit) {
        // Logo 透明度动画
        logoAlpha.animateTo(
            targetValue = 1f,
            animationSpec = tween(400)
        )
        
        // 品牌名称
        delay(150)
        textAlpha.animateTo(
            targetValue = 1f,
            animationSpec = tween(400)
        )
        
        // Slogan
        delay(100)
        sloganAlpha.animateTo(
            targetValue = 1f,
            animationSpec = tween(350)
        )
        
        // 版本号
        delay(80)
        versionAlpha.animateTo(
            targetValue = 1f,
            animationSpec = tween(300)
        )
        
        // 等待后跳转
        delay(800)
        onSplashComplete()
    }
    
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(
                        MaterialTheme.colorScheme.background,
                        GradientStart.copy(alpha = 0.03f),
                        GradientEnd.copy(alpha = 0.02f),
                        MaterialTheme.colorScheme.background
                    )
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // Logo 图片
            Image(
                painter = painterResource(id = R.drawable.splash_logo),
                contentDescription = "拾光 Logo",
                modifier = Modifier
                    .size(140.dp)
                    .scale(logoScale.value)
                    .alpha(logoAlpha.value)
            )
            
            Spacer(modifier = Modifier.height(32.dp))
            
            // 中文品牌名
            Text(
                text = "拾光",
                modifier = Modifier.alpha(textAlpha.value),
                style = MaterialTheme.typography.headlineLarge,
                fontWeight = FontWeight.Bold,
                fontSize = 42.sp,
                color = MaterialTheme.colorScheme.onBackground
            )
            
            Spacer(modifier = Modifier.height(4.dp))
            
            // 英文名称
            Text(
                text = "SeekLight",
                modifier = Modifier.alpha(textAlpha.value),
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Medium,
                letterSpacing = 2.sp,
                color = GradientStart
            )
            
            Spacer(modifier = Modifier.height(20.dp))
            
            // 核心价值主张 Slogan
            Text(
                text = "用一句话，找到任何截图",
                modifier = Modifier.alpha(sloganAlpha.value),
                style = MaterialTheme.typography.bodyLarge,
                fontWeight = FontWeight.Normal,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(6.dp))
            
            // 副标语
            Text(
                text = "记忆你的每一刻",
                modifier = Modifier.alpha(sloganAlpha.value),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f)
            )
        }
        
        // 底部版本号
        Column(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .alpha(versionAlpha.value),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "v${BuildConfig.VERSION_FULL}",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.4f)
            )
            Spacer(modifier = Modifier.height(36.dp))
        }
    }
}
