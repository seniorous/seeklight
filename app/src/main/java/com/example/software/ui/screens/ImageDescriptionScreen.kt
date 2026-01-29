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
import androidx.compose.material.icons.outlined.Settings
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
import coil.compose.AsyncImage
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
    onNavigateToHistory: () -> Unit = {},
    onNavigateToSettings: () -> Unit = {}
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
                onNavigateToHistory = onNavigateToHistory,
                onNavigateToSettings = onNavigateToSettings
            )
            
            // 主内容区
            Column(
                modifier = Modifier.padding(horizontal = 20.dp)
            ) {
                Spacer(modifier = Modifier.height(8.dp))

                HeroSection(
                    recentImages = uiState.recentMemories.map { it.imageUri },
                    onPrimaryAction = {
                        if (uiState.selectedImageBitmap == null) {
                            // 触发上传按钮逻辑由 ImageUploadCard 内部处理
                        }
                    },
                    onSecondaryAction = onNavigateToHistory
                )
                
                Spacer(modifier = Modifier.height(20.dp))
                
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
                    summary = uiState.summary,
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
    onNavigateToHistory: () -> Unit,
    onNavigateToSettings: () -> Unit
) {
    Column {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 16.dp)
        ) {
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
                        text = "SeekLight 记忆馆",
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
                            text = if (isModelLoaded) "AI 已就绪" else "未配置",
                            style = MaterialTheme.typography.bodySmall,
                            color = if (isModelLoaded) MaterialTheme.colorScheme.onSurfaceVariant else MaterialTheme.colorScheme.error
                        )
                    }
                }
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Surface(
                    onClick = onNavigateToHistory,
                    shape = RoundedCornerShape(12.dp),
                    color = MaterialTheme.colorScheme.surface,
                    shadowElevation = 2.dp,
                    modifier = Modifier.weight(1f)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 14.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
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
                    }
                }
                
                Surface(
                    onClick = onNavigateToSettings,
                    shape = RoundedCornerShape(12.dp),
                    color = MaterialTheme.colorScheme.surfaceVariant,
                    modifier = Modifier.weight(1f)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 12.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Icon(
                            imageVector = Icons.Outlined.Settings,
                            contentDescription = "设置",
                            tint = MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "设置",
                            style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
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
 * 主页英雄区
 */
@Composable
private fun HeroSection(
    recentImages: List<String>,
    onPrimaryAction: () -> Unit,
    onSecondaryAction: () -> Unit
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Column(
            modifier = Modifier.weight(0.58f)
        ) {
            Surface(
                shape = RoundedCornerShape(10.dp),
                color = MaterialTheme.colorScheme.tertiaryContainer
            ) {
                Text(
                    text = "暖心记忆 · 视觉归档",
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onTertiaryContainer,
                    fontWeight = FontWeight.SemiBold
                )
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Text(
                text = "把生活的香气\n装进你的记忆菜单",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onBackground,
                lineHeight = 34.sp
            )
            
            Spacer(modifier = Modifier.height(10.dp))
            
            Text(
                text = "用温暖色调记录每一张照片的味道与情绪，随时按关键词找回你的故事。",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row {
                Button(
                    onClick = onPrimaryAction,
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.primary
                    ),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Text("开始记录", fontWeight = FontWeight.SemiBold, color = Color.White)
                }
                
                Spacer(modifier = Modifier.width(10.dp))
                
                Surface(
                    onClick = onSecondaryAction,
                    shape = RoundedCornerShape(14.dp),
                    color = MaterialTheme.colorScheme.surfaceVariant
                ) {
                    Text(
                        text = "浏览记忆",
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 10.dp),
                        style = MaterialTheme.typography.labelLarge,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }
        
        Column(
            modifier = Modifier
                .weight(0.42f)
                .padding(start = 14.dp)
        ) {
            val images = recentImages.filter { it.isNotBlank() }.take(4)
            val slots = List(4) { index -> images.getOrNull(index) }
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                WarmImageTile(
                    modifier = Modifier.weight(1f),
                    tint = MaterialTheme.colorScheme.primaryContainer,
                    imageUri = slots[0]
                )
                WarmImageTile(
                    modifier = Modifier.weight(1f),
                    tint = MaterialTheme.colorScheme.tertiaryContainer,
                    imageUri = slots[1]
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                WarmImageTile(
                    modifier = Modifier.weight(1f),
                    tint = MaterialTheme.colorScheme.surfaceVariant,
                    imageUri = slots[2]
                )
                WarmImageTile(
                    modifier = Modifier.weight(1f),
                    tint = MaterialTheme.colorScheme.secondaryContainer,
                    imageUri = slots[3]
                )
            }
        }
    }
}

@Composable
private fun WarmImageTile(
    modifier: Modifier,
    tint: Color,
    imageUri: String?
) {
    Card(
        modifier = modifier
            .aspectRatio(1f)
            .shadow(6.dp, RoundedCornerShape(16.dp)),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = tint)
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            if (!imageUri.isNullOrBlank()) {
                AsyncImage(
                    model = imageUri,
                    contentDescription = "最近记忆",
                    modifier = Modifier
                        .fillMaxSize()
                        .clip(RoundedCornerShape(16.dp)),
                    contentScale = ContentScale.Crop
                )
            } else {
                Icon(
                    imageVector = Icons.Default.Image,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.size(22.dp)
                )
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
    summary: String,
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
            
            // 摘要部分
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f))
                    .padding(16.dp)
            ) {
                Text(
                    text = "摘要：",
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(4.dp))
                
                if (summary.isBlank() && !isProcessing) {
                    Text(
                        text = "上传图片后点击「开始分析」按钮",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                } else {
                    Text(
                        text = if (isProcessing && summary.isBlank()) "正在生成..." else summary,
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
    ENGLISH(
        "English",
        """# Role
You are a professional "visual memory archivist". Your task is to transform the input image into deeply structured memory data. You must not only recognize objects, but also capture the mood, unique visual features, and potential narrative.

# Goals
1. Tagging: Extract multi-dimensional keywords including objects, scenes, actions, time.
2. Characterization: Analyze lighting, composition, dominant colors, and unique details.
3. Memory Anchors: Generate natural language hooks for future retrieval.

# Output Format
Output STRICT JSON only. Do not include any text outside JSON. Schema:

{
  "summary": "A concise description within 30 Chinese characters",
  "tags": {
    "objects": ["object1", "object2"],
    "scene": ["scene type", "specific place"],
    "action": ["action"],
    "time_context": ["time", "season", "festival"]
  },
  "visual_features": {
    "dominant_colors": ["color1", "color2"],
    "lighting_mood": "lighting mood",
    "composition": "composition style"
  },
  "memory_extraction": {
    "ocr_text": "extract text if any, otherwise empty",
    "narrative_caption": "around 100 Chinese characters, with details and interactions",
    "unique_identifier": "the most unique or eye-catching detail"
  }
}"""
    ),
    CHINESE(
        "中文",
        """# Role
你是一个专业的“视觉记忆档案员”。你的任务是将输入的图片转化为深度结构化的记忆数据。你需要不仅仅识别物体，还要捕捉图片中的氛围、独特的视觉特征以及潜在的故事性。

# Goals
1. 标签化 (Tagging): 提取多维度的关键词，包括物体、场景、动作、时间。
2. 特征化 (Characterization): 分析图片的光影、构图、主要色调以及独特细节。
3. 记忆锚点 (Memory Anchors): 生成用于未来检索的“记忆钩子”。

# Output Format
请严格以 JSON 格式输出，不要包含任何 JSON 以外文字。Schema:

{
  "summary": "一句简短、精准的图片描述（30字以内），用于列表展示",
  "tags": {
    "objects": ["物体1", "物体2", "..."],
    "scene": ["场景类型", "具体的地点特征"],
    "action": ["正在发生的动作"],
    "time_context": ["推测的时间", "季节", "节日"]
  },
  "visual_features": {
    "dominant_colors": ["主要颜色1", "主要颜色2"],
    "lighting_mood": "光影氛围 (e.g., 赛博朋克, 温暖午后, 阴郁)",
    "composition": "构图风格 (e.g., 特写, 广角, 对称)"
  },
  "memory_extraction": {
    "ocr_text": "如果图中有文字，请在此提取，无则留空",
    "narrative_caption": "一段详实的描述（100字左右），包含画面细节、人物表情、环境互动，用于生成Embedding向量。",
    "unique_identifier": "画面中最独特、最反直觉或最显眼的一个细节"
  }
}"""
    )
}
