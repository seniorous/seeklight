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
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Error
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Stop
import androidx.compose.material.icons.outlined.Bolt
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.software.ui.components.DescriptionCard
import com.example.software.ui.components.ImagePickerButton
import com.example.software.ui.components.PerformanceIndicator
import com.example.software.ui.components.SeekLightGradientButton
import com.example.software.ui.components.SeekLightOutlinedButton
import com.example.software.ui.theme.CardShape
import com.example.software.ui.theme.GradientEnd
import com.example.software.ui.theme.GradientStart
import com.example.software.ui.theme.Success
import com.example.software.ui.viewmodels.ImageDescriptionUiState
import com.example.software.ui.viewmodels.ImageDescriptionViewModel

/**
 * SeekLight 图像描述主界面
 * 
 * 商业化设计 - 现代简洁风格
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
    
    // 显示错误消息
    LaunchedEffect(uiState.errorMessage) {
        uiState.errorMessage?.let { message ->
            snackbarHostState.showSnackbar(message)
            viewModel.clearError()
        }
    }
    
    Scaffold(
        topBar = {
            SeekLightTopBar(
                isModelLoaded = uiState.isModelLoaded,
                onNavigateToHistory = onNavigateToHistory
            )
        },
        snackbarHost = {
            SnackbarHost(snackbarHostState) { data ->
                Snackbar(
                    snackbarData = data,
                    containerColor = MaterialTheme.colorScheme.errorContainer,
                    contentColor = MaterialTheme.colorScheme.onErrorContainer,
                    shape = RoundedCornerShape(12.dp)
                )
            }
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            // 语言选择器
            PromptLanguageSelector(promptLanguageState)

            // 图片预览区域
            ImagePreviewSection(
                imageUri = uiState.selectedImageUri,
                imageBitmap = uiState.selectedImageBitmap,
                onImageSelected = viewModel::onImageSelected,
                onClearImage = viewModel::clearImage,
                isProcessing = uiState.isProcessing
            )
            
            // 操作按钮区域
            ActionButtonsSection(
                hasImage = uiState.selectedImageBitmap != null,
                isProcessing = uiState.isProcessing,
                isModelLoaded = uiState.isModelLoaded,
                isModelLoading = uiState.isModelLoading,
                onDescribeImage = {
                    viewModel.describeImage(prompt = promptLanguageState.value.prompt)
                },
                onCancelInference = viewModel::cancelInference,
                onLoadModel = viewModel::loadModel
            )
            
            // 性能指标
            PerformanceIndicator(
                metrics = uiState.performanceMetrics,
                isVisible = uiState.performanceMetrics.totalTokens > 0 || uiState.isProcessing
            )
            
            // 描述结果
            DescriptionCard(
                description = uiState.description,
                isStreaming = uiState.isProcessing
            )
            
            // 底部空间
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

/**
 * SeekLight 顶部栏
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun SeekLightTopBar(
    isModelLoaded: Boolean,
    onNavigateToHistory: () -> Unit
) {
    TopAppBar(
        title = {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                // 品牌图标
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(RoundedCornerShape(10.dp))
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
                        modifier = Modifier.size(20.dp)
                    )
                }
                
                Spacer(modifier = Modifier.width(12.dp))
                
                Column {
                    Text(
                        text = "SeekLight",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(6.dp)
                                .clip(CircleShape)
                                .background(
                                    if (isModelLoaded) Success else MaterialTheme.colorScheme.outline
                                )
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = if (isModelLoaded) "AI 就绪" else "演示模式",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        },
        actions = {
            // 历史记录按钮
            Surface(
                onClick = onNavigateToHistory,
                shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
                modifier = Modifier.padding(end = 4.dp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.History,
                        contentDescription = "历史记录",
                        modifier = Modifier.size(18.dp),
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "记忆库",
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = Color.Transparent
        )
    )
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun PromptLanguageSelector(promptLanguage: MutableState<PromptLanguage>) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        val selected = promptLanguage.value
        
        FilterChip(
            selected = selected == PromptLanguage.CHINESE,
            onClick = { promptLanguage.value = PromptLanguage.CHINESE },
            label = { Text("中文") },
            leadingIcon = if (selected == PromptLanguage.CHINESE) {
                { Icon(Icons.Outlined.Bolt, null, Modifier.size(16.dp)) }
            } else null,
            colors = FilterChipDefaults.filterChipColors(
                selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
                selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer
            ),
            modifier = Modifier.weight(1f)
        )
        
        FilterChip(
            selected = selected == PromptLanguage.ENGLISH,
            onClick = { promptLanguage.value = PromptLanguage.ENGLISH },
            label = { Text("English") },
            leadingIcon = if (selected == PromptLanguage.ENGLISH) {
                { Icon(Icons.Outlined.Bolt, null, Modifier.size(16.dp)) }
            } else null,
            colors = FilterChipDefaults.filterChipColors(
                selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
                selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer
            ),
            modifier = Modifier.weight(1f)
        )
    }
}

/**
 * 图片预览区域
 */
@Composable
private fun ImagePreviewSection(
    imageUri: Uri?,
    imageBitmap: Bitmap?,
    onImageSelected: (Uri) -> Unit,
    onClearImage: () -> Unit,
    isProcessing: Boolean
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .aspectRatio(4f / 3f)
            .shadow(
                elevation = 8.dp,
                shape = CardShape,
                spotColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.1f)
            ),
        shape = CardShape,
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            if (imageBitmap != null) {
                // 显示选中的图片
                Image(
                    bitmap = imageBitmap.asImageBitmap(),
                    contentDescription = "选中的图片",
                    modifier = Modifier
                        .fillMaxSize()
                        .clip(CardShape),
                    contentScale = ContentScale.Fit
                )
                
                // 清除按钮
                if (!isProcessing) {
                    Surface(
                        onClick = onClearImage,
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(12.dp),
                        shape = CircleShape,
                        color = Color.Black.copy(alpha = 0.6f)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "清除图片",
                            tint = Color.White,
                            modifier = Modifier
                                .padding(8.dp)
                                .size(20.dp)
                        )
                    }
                }
                
                // 处理中遮罩
                androidx.compose.animation.AnimatedVisibility(
                    visible = isProcessing,
                    enter = fadeIn(),
                    exit = fadeOut()
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(
                                brush = Brush.verticalGradient(
                                    colors = listOf(
                                        Color.Black.copy(alpha = 0.2f),
                                        Color.Black.copy(alpha = 0.5f)
                                    )
                                )
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            // 脉冲动画加载指示器
                            Box(
                                modifier = Modifier
                                    .size(72.dp)
                                    .clip(CircleShape)
                                    .background(Color.White.copy(alpha = 0.2f)),
                                contentAlignment = Alignment.Center
                            ) {
                                CircularProgressIndicator(
                                    color = Color.White,
                                    modifier = Modifier.size(40.dp),
                                    strokeWidth = 3.dp
                                )
                            }
                            Spacer(modifier = Modifier.height(16.dp))
                            Text(
                                text = "AI 正在理解图像...",
                                color = Color.White,
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                }
            } else {
                // 空状态 - 显示选择提示
                ImagePlaceholder(onImageSelected = onImageSelected)
            }
        }
    }
}

/**
 * 图片占位符（空状态）
 */
@Composable
private fun ImagePlaceholder(
    onImageSelected: (Uri) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(
                        MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f),
                        MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f)
                    )
                )
            )
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // 渐变图标容器
        Box(
            modifier = Modifier
                .size(88.dp)
                .clip(RoundedCornerShape(24.dp))
                .background(
                    brush = Brush.linearGradient(
                        colors = listOf(
                            GradientStart.copy(alpha = 0.15f),
                            GradientEnd.copy(alpha = 0.15f)
                        )
                    )
                )
                .border(
                    width = 2.dp,
                    brush = Brush.linearGradient(
                        colors = listOf(
                            GradientStart.copy(alpha = 0.3f),
                            GradientEnd.copy(alpha = 0.3f)
                        )
                    ),
                    shape = RoundedCornerShape(24.dp)
                ),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Image,
                contentDescription = null,
                modifier = Modifier.size(44.dp),
                tint = MaterialTheme.colorScheme.primary
            )
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        
        Text(
            text = "上传图片开始分析",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.SemiBold,
            color = MaterialTheme.colorScheme.onSurface
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Text(
            text = "支持 JPG、PNG、WebP 格式",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        
        Spacer(modifier = Modifier.height(28.dp))
        
        // 选择按钮
        ImagePickerButton(
            onImageSelected = onImageSelected,
            modifier = Modifier.fillMaxWidth(0.7f)
        )
    }
}

/**
 * 操作按钮区域
 */
@Composable
private fun ActionButtonsSection(
    hasImage: Boolean,
    isProcessing: Boolean,
    isModelLoaded: Boolean,
    isModelLoading: Boolean,
    onDescribeImage: () -> Unit,
    onCancelInference: () -> Unit,
    onLoadModel: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // 主操作按钮
        if (isProcessing) {
            // 取消按钮
            Button(
                onClick = onCancelInference,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.error
                ),
                shape = RoundedCornerShape(14.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Stop,
                    contentDescription = null,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "停止生成",
                    style = MaterialTheme.typography.labelLarge,
                    fontWeight = FontWeight.SemiBold
                )
            }
        } else {
            // 生成描述按钮（带渐变效果）
            SeekLightGradientButton(
                onClick = onDescribeImage,
                text = if (isModelLoaded) "开始分析" else "开始分析（演示）",
                enabled = hasImage,
                icon = Icons.Default.AutoAwesome,
                modifier = Modifier.fillMaxWidth()
            )
        }
        
        // 模型状态提示
        AnimatedVisibility(
            visible = !isModelLoaded && hasImage && !isProcessing,
            enter = slideInVertically() + fadeIn(),
            exit = slideOutVertically() + fadeOut()
        ) {
            ModelStatusCard(
                isModelLoading = isModelLoading,
                onLoadModel = onLoadModel
            )
        }
    }
}

/**
 * 模型状态卡片
 */
@Composable
private fun ModelStatusCard(
    isModelLoading: Boolean,
    onLoadModel: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.4f)
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // 图标
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(MaterialTheme.colorScheme.secondary.copy(alpha = 0.1f)),
                contentAlignment = Alignment.Center
            ) {
                if (isModelLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(20.dp),
                        strokeWidth = 2.dp,
                        color = MaterialTheme.colorScheme.secondary
                    )
                } else {
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.secondary,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.width(14.dp))
            
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Text(
                    text = if (isModelLoading) "正在检查模型..." else "演示模式",
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = if (isModelLoading) {
                        "请稍候"
                    } else {
                        "MNN 模型未加载，可直接体验演示效果"
                    },
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            
            if (!isModelLoading) {
                SeekLightOutlinedButton(
                    onClick = onLoadModel,
                    text = "检查"
                )
            }
        }
    }
}
