package com.example.software.ui.screens

import android.graphics.Bitmap
import android.net.Uri
import androidx.compose.animation.AnimatedVisibility
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
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Error
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Stop
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
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
import com.example.software.ui.viewmodels.ImageDescriptionUiState
import com.example.software.ui.viewmodels.ImageDescriptionViewModel

/**
 * 图像描述主界面
 * 
 * 提供图片选择、AI 描述生成、性能监控等功能
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ImageDescriptionScreen(
    viewModel: ImageDescriptionViewModel = viewModel(),
    onNavigateToHistory: () -> Unit = {}
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val snackbarHostState = remember { SnackbarHostState() }
    val promptLanguageState = rememberSaveable { mutableStateOf(PromptLanguage.ENGLISH) }
    
    // 显示错误消息
    LaunchedEffect(uiState.errorMessage) {
        uiState.errorMessage?.let { message ->
            snackbarHostState.showSnackbar(message)
            viewModel.clearError()
        }
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Qwen3-VL 图像描述",
                            style = MaterialTheme.typography.titleLarge
                        )
                        Text(
                            text = if (uiState.isModelLoaded) "模型已加载" else "模型未加载",
                            style = MaterialTheme.typography.labelSmall,
                            color = if (uiState.isModelLoaded) {
                                Color(0xFF4CAF50)
                            } else {
                                MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f)
                            }
                        )
                    }
                },
                actions = {
                    IconButton(onClick = onNavigateToHistory) {
                        Icon(
                            imageVector = Icons.Default.History,
                            contentDescription = "历史记录"
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        snackbarHost = {
            SnackbarHost(snackbarHostState) { data ->
                Snackbar(
                    snackbarData = data,
                    containerColor = MaterialTheme.colorScheme.errorContainer,
                    contentColor = MaterialTheme.colorScheme.onErrorContainer
                )
            }
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
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
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

private enum class PromptLanguage(val label: String, val prompt: String) {
    ENGLISH("English", "Describe the image in detail."),
    CHINESE("中文", "请详细描述这张图片的内容。")
}

@Composable
private fun PromptLanguageSelector(promptLanguage: MutableState<PromptLanguage>) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        val selected = promptLanguage.value
        OutlinedButton(
            onClick = { promptLanguage.value = PromptLanguage.ENGLISH },
            modifier = Modifier.weight(1f),
            colors = ButtonDefaults.outlinedButtonColors(
                containerColor = if (selected == PromptLanguage.ENGLISH) {
                    MaterialTheme.colorScheme.primary.copy(alpha = 0.12f)
                } else {
                    Color.Transparent
                }
            )
        ) {
            Text("English")
        }
        OutlinedButton(
            onClick = { promptLanguage.value = PromptLanguage.CHINESE },
            modifier = Modifier.weight(1f),
            colors = ButtonDefaults.outlinedButtonColors(
                containerColor = if (selected == PromptLanguage.CHINESE) {
                    MaterialTheme.colorScheme.primary.copy(alpha = 0.12f)
                } else {
                    Color.Transparent
                }
            )
        ) {
            Text("中文")
        }
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
            .aspectRatio(4f / 3f),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
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
                        .clip(RoundedCornerShape(16.dp)),
                    contentScale = ContentScale.Fit
                )
                
                // 清除按钮
                if (!isProcessing) {
                    IconButton(
                        onClick = onClearImage,
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(8.dp)
                            .background(
                                Color.Black.copy(alpha = 0.5f),
                                CircleShape
                            )
                    ) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "清除图片",
                            tint = Color.White
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
                            .background(Color.Black.copy(alpha = 0.3f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            CircularProgressIndicator(
                                color = Color.White,
                                modifier = Modifier.size(48.dp)
                            )
                            Spacer(modifier = Modifier.height(12.dp))
                            Text(
                                text = "AI 正在分析图像...",
                                color = Color.White,
                                style = MaterialTheme.typography.bodyMedium
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
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // 图标容器
        Surface(
            modifier = Modifier.size(80.dp),
            shape = CircleShape,
            color = MaterialTheme.colorScheme.primary.copy(alpha = 0.1f)
        ) {
            Box(
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Image,
                    contentDescription = null,
                    modifier = Modifier.size(40.dp),
                    tint = MaterialTheme.colorScheme.primary.copy(alpha = 0.7f)
                )
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "选择一张图片",
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.onSurface
        )
        
        Spacer(modifier = Modifier.height(4.dp))
        
        Text(
            text = "支持 JPG、PNG、WebP 格式",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f)
        )
        
        Spacer(modifier = Modifier.height(24.dp))
        
        // 选择按钮
        ImagePickerButton(
            onImageSelected = onImageSelected,
            modifier = Modifier.fillMaxWidth(0.6f)
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
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // 主操作按钮
        if (isProcessing) {
            // 取消按钮
            Button(
                onClick = onCancelInference,
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.error
                )
            ) {
                Icon(
                    imageVector = Icons.Default.Stop,
                    contentDescription = null,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text("停止生成")
            }
        } else {
            // 生成描述按钮（始终可用，模型未加载时使用演示模式）
            Button(
                onClick = onDescribeImage,
                modifier = Modifier.fillMaxWidth(),
                enabled = hasImage,
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.primary
                )
            ) {
                Icon(
                    imageVector = Icons.Default.PlayArrow,
                    contentDescription = null,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(if (isModelLoaded) "生成描述" else "生成描述（演示）")
            }
        }
        
        // 模型状态提示（如果模型未加载）
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
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.5f)
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            if (isModelLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp),
                    strokeWidth = 2.dp
                )
            } else {
                Icon(
                    imageVector = Icons.Default.Info,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.secondary,
                    modifier = Modifier.size(24.dp)
                )
            }
            
            Spacer(modifier = Modifier.width(12.dp))
            
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Text(
                    text = if (isModelLoading) "正在检查模型..." else "演示模式",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = if (isModelLoading) {
                        "请稍候"
                    } else {
                        "MNN 模型未加载，可直接点击上方按钮体验演示效果"
                    },
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
                )
            }
            
            if (!isModelLoading) {
                OutlinedButton(
                    onClick = onLoadModel
                ) {
                    Text("检查模型")
                }
            }
        }
    }
}
