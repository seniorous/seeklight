package com.example.software.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandVertically
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Analytics
import androidx.compose.material.icons.filled.Speed
import androidx.compose.material.icons.filled.Timer
import androidx.compose.material.icons.filled.Token
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.software.ui.viewmodels.PerformanceMetrics

/**
 * 性能指标显示组件
 * 
 * 显示推理性能数据：首 token 时间、解码速度、总 token 数等
 */
@Composable
fun PerformanceIndicator(
    metrics: PerformanceMetrics,
    modifier: Modifier = Modifier,
    isVisible: Boolean = true
) {
    AnimatedVisibility(
        visible = isVisible && (metrics.totalTokens > 0 || metrics.prefillTimeMs > 0),
        enter = expandVertically(),
        exit = shrinkVertically()
    ) {
        Card(
            modifier = modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.5f)
            )
        ) {
            Column(
                modifier = Modifier.padding(12.dp)
            ) {
                // 标题
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Analytics,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.secondary,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "性能指标",
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                    )
                }
                
                Spacer(modifier = Modifier.height(12.dp))
                
                // 指标网格
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    // 首 Token 时间
                    MetricItem(
                        icon = Icons.Default.Timer,
                        label = "首 Token",
                        value = "${metrics.prefillTimeMs}ms",
                        color = getMetricColor(
                            value = metrics.prefillTimeMs.toFloat(),
                            goodThreshold = 3000f,
                            badThreshold = 5000f,
                            lowerIsBetter = true
                        ),
                        modifier = Modifier.weight(1f)
                    )
                    
                    // 解码速度
                    MetricItem(
                        icon = Icons.Default.Speed,
                        label = "解码速度",
                        value = String.format("%.1f tok/s", metrics.tokensPerSecond),
                        color = getMetricColor(
                            value = metrics.tokensPerSecond.toFloat(),
                            goodThreshold = 10f,
                            badThreshold = 5f,
                            lowerIsBetter = false
                        ),
                        modifier = Modifier.weight(1f)
                    )
                    
                    // 总 Token 数
                    MetricItem(
                        icon = Icons.Default.Token,
                        label = "总 Tokens",
                        value = "${metrics.totalTokens}",
                        color = MaterialTheme.colorScheme.onSecondaryContainer,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }
    }
}

/**
 * 单个指标项
 */
@Composable
private fun MetricItem(
    icon: ImageVector,
    label: String,
    value: String,
    color: Color,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = color,
            modifier = Modifier.size(20.dp)
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = value,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold,
            color = color
        )
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSecondaryContainer.copy(alpha = 0.7f)
        )
    }
}

/**
 * 根据阈值获取指标颜色
 */
@Composable
private fun getMetricColor(
    value: Float,
    goodThreshold: Float,
    badThreshold: Float,
    lowerIsBetter: Boolean
): Color {
    return if (lowerIsBetter) {
        when {
            value <= goodThreshold -> Color(0xFF4CAF50) // Green
            value >= badThreshold -> Color(0xFFF44336) // Red
            else -> Color(0xFFFF9800) // Orange
        }
    } else {
        when {
            value >= goodThreshold -> Color(0xFF4CAF50) // Green
            value <= badThreshold -> Color(0xFFF44336) // Red
            else -> Color(0xFFFF9800) // Orange
        }
    }
}

/**
 * 紧凑型性能指示器（横向排列）
 */
@Composable
fun CompactPerformanceIndicator(
    metrics: PerformanceMetrics,
    modifier: Modifier = Modifier
) {
    if (metrics.totalTokens > 0 || metrics.prefillTimeMs > 0) {
        Surface(
            modifier = modifier,
            shape = RoundedCornerShape(8.dp),
            color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
        ) {
            Row(
                modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // 首 Token 时间
                CompactMetricItem(
                    label = "首Token",
                    value = "${metrics.prefillTimeMs}ms"
                )
                
                // 分隔符
                Box(
                    modifier = Modifier
                        .width(1.dp)
                        .height(16.dp)
                        .background(MaterialTheme.colorScheme.onSurface.copy(alpha = 0.2f))
                )
                
                // 解码速度
                CompactMetricItem(
                    label = "速度",
                    value = String.format("%.1f tok/s", metrics.tokensPerSecond)
                )
                
                // 分隔符
                Box(
                    modifier = Modifier
                        .width(1.dp)
                        .height(16.dp)
                        .background(MaterialTheme.colorScheme.onSurface.copy(alpha = 0.2f))
                )
                
                // Token 数
                CompactMetricItem(
                    label = "Tokens",
                    value = "${metrics.totalTokens}"
                )
            }
        }
    }
}

/**
 * 紧凑型指标项
 */
@Composable
private fun CompactMetricItem(
    label: String,
    value: String
) {
    Row(
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
        )
        Spacer(modifier = Modifier.width(4.dp))
        Text(
            text = value,
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Medium,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}

/**
 * 详细性能面板
 */
@Composable
fun DetailedPerformancePanel(
    metrics: PerformanceMetrics,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "推理性能详情",
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onSurface
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Prefill 时间
            DetailedMetricRow(
                label = "Prefill 时间（首 Token）",
                value = "${metrics.prefillTimeMs} ms",
                description = "模型处理输入并生成第一个 token 的时间"
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // Decode 时间
            DetailedMetricRow(
                label = "Decode 时间",
                value = "${metrics.decodeTimeMs} ms",
                description = "生成后续 tokens 的总时间"
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // 总时间
            DetailedMetricRow(
                label = "总推理时间",
                value = "${metrics.totalTimeMs} ms",
                description = "Prefill + Decode 总时间"
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // Token 数量
            DetailedMetricRow(
                label = "生成 Token 数",
                value = "${metrics.totalTokens}",
                description = "模型输出的 token 总数"
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // 解码速度
            DetailedMetricRow(
                label = "解码速度",
                value = String.format("%.2f tokens/秒", metrics.tokensPerSecond),
                description = "每秒生成的 token 数量",
                isHighlighted = true
            )
        }
    }
}

/**
 * 详细指标行
 */
@Composable
private fun DetailedMetricRow(
    label: String,
    value: String,
    description: String,
    isHighlighted: Boolean = false
) {
    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = label,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface
            )
            Text(
                text = value,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = if (isHighlighted) FontWeight.Bold else FontWeight.Medium,
                color = if (isHighlighted) {
                    MaterialTheme.colorScheme.primary
                } else {
                    MaterialTheme.colorScheme.onSurface
                }
            )
        }
        Text(
            text = description,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f)
        )
    }
}
