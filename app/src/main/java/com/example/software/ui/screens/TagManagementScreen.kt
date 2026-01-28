package com.example.software.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Tag
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.software.ui.theme.GradientEnd
import com.example.software.ui.theme.GradientStart
import com.example.software.ui.viewmodels.TagCategory
import com.example.software.ui.viewmodels.TagInfo
import com.example.software.ui.viewmodels.TagManagementViewModel

/**
 * 标签管理页面
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TagManagementScreen(
    viewModel: TagManagementViewModel,
    onNavigateBack: () -> Unit,
    onTagClick: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    var selectedTabIndex by remember { mutableIntStateOf(0) }
    var showDeleteDialog by remember { mutableStateOf<TagInfo?>(null) }
    
    val categories = TagCategory.entries.toList()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "标签管理",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "${uiState.totalTagCount} 个标签",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "返回")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color.Transparent
                )
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // 搜索栏
            OutlinedTextField(
                value = uiState.searchQuery,
                onValueChange = viewModel::onSearchQueryChanged,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 8.dp),
                placeholder = { Text("搜索标签...") },
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Search,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                },
                trailingIcon = {
                    if (uiState.searchQuery.isNotBlank()) {
                        IconButton(onClick = { viewModel.onSearchQueryChanged("") }) {
                            Icon(Icons.Default.Close, contentDescription = "清除")
                        }
                    }
                },
                singleLine = true,
                shape = RoundedCornerShape(16.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    unfocusedBorderColor = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f),
                    focusedBorderColor = MaterialTheme.colorScheme.primary
                )
            )
            
            // 分类 Tab
            ScrollableTabRow(
                selectedTabIndex = selectedTabIndex,
                edgePadding = 20.dp,
                containerColor = Color.Transparent,
                divider = {}
            ) {
                categories.forEachIndexed { index, category ->
                    val count = uiState.tagsByCategory[category]?.size ?: 0
                    Tab(
                        selected = selectedTabIndex == index,
                        onClick = { selectedTabIndex = index },
                        text = {
                            Text(
                                text = "${category.displayName} ($count)",
                                fontWeight = if (selectedTabIndex == index) FontWeight.SemiBold else FontWeight.Normal
                            )
                        }
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            // 标签列表
            val currentCategory = categories[selectedTabIndex]
            val tagsInCategory = uiState.tagsByCategory[currentCategory] ?: emptyList()
            val filteredTags = if (uiState.searchQuery.isBlank()) {
                tagsInCategory
            } else {
                tagsInCategory.filter { it.name.contains(uiState.searchQuery, ignoreCase = true) }
            }
            
            if (filteredTags.isEmpty()) {
                EmptyTagsContent(category = currentCategory)
            } else {
                TagList(
                    tags = filteredTags,
                    onTagClick = onTagClick,
                    onDeleteClick = { showDeleteDialog = it }
                )
            }
        }
        
        // 删除确认对话框
        showDeleteDialog?.let { tagInfo ->
            AlertDialog(
                onDismissRequest = { showDeleteDialog = null },
                title = { Text("删除标签") },
                text = { 
                    Text("确定要从所有记忆中删除标签「${tagInfo.name}」吗？\n该标签在 ${tagInfo.count} 条记忆中使用。") 
                },
                confirmButton = {
                    TextButton(
                        onClick = {
                            viewModel.deleteTag(tagInfo.name)
                            showDeleteDialog = null
                        }
                    ) {
                        Text("删除", color = MaterialTheme.colorScheme.error)
                    }
                },
                dismissButton = {
                    TextButton(onClick = { showDeleteDialog = null }) {
                        Text("取消")
                    }
                }
            )
        }
    }
}

/**
 * 标签列表
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun TagList(
    tags: List<TagInfo>,
    onTagClick: (String) -> Unit,
    onDeleteClick: (TagInfo) -> Unit
) {
    LazyColumn(
        contentPadding = PaddingValues(horizontal = 20.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(tags, key = { it.name }) { tagInfo ->
            TagItem(
                tagInfo = tagInfo,
                onClick = { onTagClick(tagInfo.name) },
                onDeleteClick = { onDeleteClick(tagInfo) }
            )
        }
    }
}

/**
 * 标签项
 */
@Composable
private fun TagItem(
    tagInfo: TagInfo,
    onClick: () -> Unit,
    onDeleteClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // 标签图标
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.5f),
                modifier = Modifier.size(40.dp)
            ) {
                Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
                    Icon(
                        imageVector = Icons.Default.Tag,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.width(12.dp))
            
            // 标签名称和计数
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "#${tagInfo.name}",
                    style = MaterialTheme.typography.bodyLarge,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = "${tagInfo.count} 条记忆",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            
            // 删除按钮
            IconButton(
                onClick = onDeleteClick,
                modifier = Modifier.size(36.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Delete,
                    contentDescription = "删除",
                    tint = MaterialTheme.colorScheme.error.copy(alpha = 0.6f),
                    modifier = Modifier.size(18.dp)
                )
            }
        }
    }
}

/**
 * 空标签内容
 */
@Composable
private fun EmptyTagsContent(category: TagCategory) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(40.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Surface(
                shape = RoundedCornerShape(24.dp),
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
                modifier = Modifier.size(80.dp)
            ) {
                Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
                    Icon(
                        imageVector = Icons.Default.Tag,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(36.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Text(
                text = "暂无${category.displayName}标签",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = "上传图片后 AI 会自动生成标签",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f),
                textAlign = TextAlign.Center
            )
        }
    }
}
