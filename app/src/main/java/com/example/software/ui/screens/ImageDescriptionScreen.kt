package com.example.software.ui.screens

import android.graphics.Bitmap
import android.net.Uri
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Stop
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.outlined.Speed
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.software.ui.components.ImagePickerButton
import com.example.software.ui.components.PerformanceIndicator
import com.example.software.ui.theme.Error
import com.example.software.ui.theme.GradientEnd
import com.example.software.ui.theme.GradientStart
import com.example.software.ui.theme.Success
import com.example.software.ui.viewmodels.ImageDescriptionViewModel

/**
 * SeekLight 主界面 - 商业化布局
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ImageDescriptionScreen(
    viewModel: ImageDescriptionViewModel = viewModel(),
    onNavigateToHistory: () -> Unit = {}
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val snackbarHostState = remember { SnackbarHostState() }
    val promptLanguageState = rememberSaveable { mutableStateOf(PromptLanguage.CHINESE) }
    
    LaunchedEffect(uiState.errorMessage) {
        uiState.errorMessage?.let { message ->
            snackbarHostState.showSnackbar(message)
            viewModel.clearError()
        }
    }
    
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
    ) {
        // 顶部渐变背景
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(280.dp)
                .background(
                    brush = Brush.verticalGradient(
                        colors = listOf(
                            GradientStart.copy(alpha = 0.08f),
                            MaterialTheme.colorScheme.background
                        )
                    )
                )
        )
        
        Column(
            modifier = Modifier
                .fillMaxSize()
                .statusBarsPadding()
                .verticalScroll(rememberScrollState())
        ) {
            // 顶部栏
            TopSection(
                isModelLoaded = uiState.isModelLoaded,
                isModelLoading = uiState.isModelLoading,
                onConfigureModel = viewModel::configureModel,
                onNavigateToHistory = onNavigateToHistory
            )
            
            // 主内容区
            Column(
                modifier = Modifier.padding(horizontal = 20.dp)
            ) {
                Spacer(modifier = Modifier.height(8.dp))
                
                // 图片上传卡片（核心区域）
                ImageUploadCard(
                    imageBitmap = uiState.selectedImageBitmap,
                    isProcessing = uiState.isProcessing,
                    onImageSelected = viewModel::onImageSelected,
                    onClearImage = viewModel::clearImage
                )
                
                Spacer(modifier = Modifier.height(20.dp))
                
                // 操作区域
                ActionSection(
                    promptLanguage = promptLanguageState,
                    hasImage = uiState.selectedImageBitmap != null,
                    isProcessing = uiState.isProcessing,
                    isModelLoaded = uiState.isModelLoaded,
                    onDescribeImage = {
                        viewModel.describeImage(prompt = promptLanguageState.value.prompt)
                    },
                    onCancelInference = viewModel::cancelInference
                )
                
                Spacer(modifier = Modifier.height(20.dp))
                
                // 结果区域
                ResultSection(
                    description = uiState.description,
                    isProcessing = uiState.isProcessing,
                    metrics = uiState.performanceMetrics,
                    showMetrics = uiState.performanceMetrics.totalTokens > 0
                )
                
                Spacer(modifier = Modifier.height(32.dp))
            }
        }
        
        // Snackbar
        SnackbarHost(
            hostState = snackbarHostState,
            modifier = Modifier.align(Alignment.BottomCenter)
        ) { data ->
            Snackbar(
                snackbarData = data,
                containerColor = MaterialTheme.colorScheme.errorContainer,
                contentColor = MaterialTheme.colorScheme.onErrorContainer,
                shape = RoundedCornerShape(12.dp)
            )
        }
    }
}

/**
 * 顶部区域
 */
@Composable
private fun TopSection(
    isModelLoaded: Boolean,
    isModelLoading: Boolean,
    onConfigureModel: () -> Unit,
    onNavigateToHistory: () -> Unit
) {
    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // 品牌区域
            Row(verticalAlignment = Alignment.CenterVertically) {
                // Logo
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(
                            brush = Brush.linearGradient(
                                colors = listOf(GradientStart, GradientEnd)
                            )
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoAwesome,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(24.dp)
                    )
                }
                
                Spacer(modifier = Modifier.width(14.dp))
                
                Column {
                    Text(
                        text = "SeekLight",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        fontSize = 22.sp
                    )
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(6.dp)
                                .clip(CircleShape)
                                .background(if (isModelLoaded) Success else MaterialTheme.colorScheme.error.copy(alpha = 0.7f))
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = if (isModelLoaded) "AI 就绪" else "未配置",
                            style = MaterialTheme.typography.bodySmall,
                            color = if (isModelLoaded) MaterialTheme.colorScheme.onSurfaceVariant else MaterialTheme.colorScheme.error
                        )
                    }
                }
            }
            
            // 记忆库入口
            Surface(
                onClick = onNavigateToHistory,
                shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.surface,
                shadowElevation = 2.dp
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 14.dp, vertical = 10.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.History,
                        contentDescription = null,
                        modifier = Modifier.size(18.dp),
                        tint = MaterialTheme.colorScheme.primary
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "记忆库",
                        style = MaterialTheme.typography.labelLarge,
                        fontWeight = FontWeight.Medium
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Icon(
                        imageVector = Icons.Default.KeyboardArrowRight,
                        contentDescription = null,
                        modifier = Modifier.size(16.dp),
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
        
        // 模型配置提示条
        AnimatedVisibility(
            visible = !isModelLoaded,
            enter = slideInVertically() + fadeIn(),
            exit = slideOutVertically() + fadeOut()
        ) {
            Surface(
                onClick = onConfigureModel,
                enabled = !isModelLoading,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                shape = RoundedCornerShape(14.dp),
                color = MaterialTheme.colorScheme.primaryContainer
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        if (isModelLoading) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(20.dp),
                                strokeWidth = 2.dp,
                                color = MaterialTheme.colorScheme.primary
                            )
                        } else {
                            Icon(
                                imageVector = Icons.Outlined.Info,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                        Spacer(Modifier.width(12.dp))
                        Column {
                            Text(
                                text = if (isModelLoading) "正在配置模型..." else "模型未配置",
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.SemiBold,
                                color = MaterialTheme.colorScheme.onPrimaryContainer
                            )
                            if (!isModelLoading) {
                                Text(
                                    text = "点击自动检测并加载模型",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.7f)
                                )
                            }
                        }
                    }
                    
                    if (!isModelLoading) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = MaterialTheme.colorScheme.primary
                        ) {
                            Text(
                                text = "配置",
                                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                                style = MaterialTheme.typography.labelMedium,
                                fontWeight = FontWeight.SemiBold,
                                color = Color.White
                            )
                        }
                    }
                }
            }
        }
    }
}

/**
 * 图片上传卡片
 */
@Composable
private fun ImageUploadCard(
    imageBitmap: Bitmap?,
    isProcessing: Boolean,
    onImageSelected: (Uri) -> Unit,
    onClearImage: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .shadow(
                elevation = 12.dp,
                shape = RoundedCornerShape(24.dp),
                spotColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.15f)
            ),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(1f),
            contentAlignment = Alignment.Center
        ) {
            if (imageBitmap != null) {
                // 已选择图片
                Image(
                    bitmap = imageBitmap.asImageBitmap(),
                    contentDescription = "选中的图片",
                    modifier = Modifier
                        .fillMaxSize()
                        .clip(RoundedCornerShape(24.dp)),
                    contentScale = ContentScale.Crop
                )
                
                // 清除按钮
                if (!isProcessing) {
                    Surface(
                        onClick = onClearImage,
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(16.dp),
                        shape = CircleShape,
                        color = Color.Black.copy(alpha = 0.6f)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "清除",
                            tint = Color.White,
                            modifier = Modifier.padding(10.dp).size(20.dp)
                        )
                    }
                }
                
                // 处理中遮罩
                if (isProcessing) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(Color.Black.copy(alpha = 0.5f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            CircularProgressIndicator(
                                color = Color.White,
                                modifier = Modifier.size(48.dp),
                                strokeWidth = 4.dp
                            )
                            Spacer(modifier = Modifier.height(16.dp))
                            Text(
                                text = "AI 正在分析...",
                                color = Color.White,
                                style = MaterialTheme.typography.titleMedium
                            )
                        }
                    }
                }
            } else {
                // 空状态 - 上传提示
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            brush = Brush.radialGradient(
                                colors = listOf(
                                    MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f),
                                    MaterialTheme.colorScheme.surface
                                )
                            )
                        )
                        .padding(32.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    // 上传图标
                    Box(
                        modifier = Modifier
                            .size(100.dp)
                            .clip(CircleShape)
                            .background(MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.5f))
                            .border(
                                width = 3.dp,
                                brush = Brush.linearGradient(listOf(GradientStart, GradientEnd)),
                                shape = CircleShape
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Add,
                            contentDescription = null,
                            modifier = Modifier.size(48.dp),
                            tint = MaterialTheme.colorScheme.primary
                        )
                    }
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Text(
                        text = "点击上传图片",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.SemiBold
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Text(
                        text = "支持 JPG、PNG、WebP 格式",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    
                    Spacer(modifier = Modifier.height(28.dp))
                    
                    ImagePickerButton(
                        onImageSelected = onImageSelected,
                        modifier = Modifier.fillMaxWidth(0.6f)
                    )
                }
            }
        }
    }
}

/**
 * 操作区域
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ActionSection(
    promptLanguage: MutableState<PromptLanguage>,
    hasImage: Boolean,
    isProcessing: Boolean,
    isModelLoaded: Boolean,
    onDescribeImage: () -> Unit,
    onCancelInference: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp)
        ) {
            // 语言选择
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "输出语言",
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Medium
                )
                
                SingleChoiceSegmentedButtonRow {
                    SegmentedButton(
                        selected = promptLanguage.value == PromptLanguage.CHINESE,
                        onClick = { promptLanguage.value = PromptLanguage.CHINESE },
                        shape = SegmentedButtonDefaults.itemShape(index = 0, count = 2)
                    ) {
                        Text("中文", style = MaterialTheme.typography.labelMedium)
                    }
                    SegmentedButton(
                        selected = promptLanguage.value == PromptLanguage.ENGLISH,
                        onClick = { promptLanguage.value = PromptLanguage.ENGLISH },
                        shape = SegmentedButtonDefaults.itemShape(index = 1, count = 2)
                    ) {
                        Text("English", style = MaterialTheme.typography.labelMedium)
                    }
                }
            }
            
            Spacer(modifier = Modifier.height(20.dp))
            
            // 操作按钮
            if (isProcessing) {
                Button(
                    onClick = onCancelInference,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.error
                    ),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Icon(Icons.Default.Stop, null, Modifier.size(20.dp))
                    Spacer(Modifier.width(8.dp))
                    Text("停止分析", fontWeight = FontWeight.SemiBold)
                }
            } else {
                // 检查是否可以开始分析
                val canStart = hasImage && isModelLoaded
                
                // 渐变主按钮
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp)
                        .clip(RoundedCornerShape(16.dp))
                        .background(
                            brush = if (canStart) {
                                Brush.horizontalGradient(listOf(GradientStart, GradientEnd))
                            } else {
                                Brush.horizontalGradient(
                                    listOf(
                                        MaterialTheme.colorScheme.surfaceVariant,
                                        MaterialTheme.colorScheme.surfaceVariant
                                    )
                                )
                            }
                        )
                        .clickable(enabled = canStart, onClick = onDescribeImage),
                    contentAlignment = Alignment.Center
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.AutoAwesome,
                            contentDescription = null,
                            tint = if (canStart) Color.White else MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.size(22.dp)
                        )
                        Spacer(Modifier.width(10.dp))
                        Text(
                            text = when {
                                !isModelLoaded -> "请先配置模型"
                                !hasImage -> "请先上传图片"
                                else -> "开始分析"
                            },
                            color = if (canStart) Color.White else MaterialTheme.colorScheme.onSurfaceVariant,
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 16.sp
                        )
                    }
                }
            }
        }
    }
}

/**
 * 结果区域
 */
@Composable
private fun ResultSection(
    description: String,
    isProcessing: Boolean,
    metrics: com.example.software.ui.viewmodels.PerformanceMetrics,
    showMetrics: Boolean
) {
    // 性能指标（如果有）
    AnimatedVisibility(
        visible = showMetrics,
        enter = fadeIn() + slideInVertically(),
        exit = fadeOut() + slideOutVertically()
    ) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
            )
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                MetricItem(
                    label = "Tokens",
                    value = "${metrics.totalTokens}"
                )
                MetricItem(
                    label = "速度",
                    value = String.format("%.1f tok/s", metrics.tokensPerSecond)
                )
                MetricItem(
                    label = "耗时",
                    value = String.format("%.1fs", metrics.totalTimeMs / 1000.0)
                )
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
    }
    
    // 描述结果
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(MaterialTheme.colorScheme.primaryContainer),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoAwesome,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Spacer(Modifier.width(12.dp))
                Text(
                    text = "AI 分析结果",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold
                )
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f))
                    .padding(16.dp)
            ) {
                if (description.isBlank() && !isProcessing) {
                    Text(
                        text = "上传图片后点击「开始分析」按钮",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                } else {
                    Text(
                        text = if (isProcessing && description.isBlank()) "正在生成..." else description,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface,
                        lineHeight = 24.sp
                    )
                }
            }
        }
    }
}

@Composable
private fun MetricItem(label: String, value: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            text = value,
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

private enum class PromptLanguage(val label: String, val prompt: String) {
    ENGLISH("English", """Analyze this image and provide:
1. A brief description (1-2 sentences)
2. Tags: list key objects, scenes, colors, people, food, animals, activities visible in the image

Format your response as:
Description: [your description]
Tags: tag1, tag2, tag3, ..."""),
    CHINESE("中文", """分析这张图片，提供以下信息：
1. 简短描述（1-2句话）
2. 标签：列出图片中可见的主要物体、场景、颜色、人物、食物、动物、活动等

请按以下格式输出：
描述：[你的描述]
标签：标签1, 标签2, 标签3, ...""")
}
