package com.example.software.ui.components

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.Image
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * 图片选择按钮组件
 * 
 * 提供从相册选择图片的功能
 */
@Composable
fun ImagePickerButton(
    onImageSelected: (Uri) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    // 图片选择器
    val imagePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        uri?.let { onImageSelected(it) }
    }
    
    Button(
        onClick = { imagePickerLauncher.launch("image/*") },
        modifier = modifier,
        enabled = enabled,
        colors = ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.primary
        )
    ) {
        Icon(
            imageVector = Icons.Default.Image,
            contentDescription = null,
            modifier = Modifier.size(20.dp)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text("选择图片")
    }
}

/**
 * 图片选择按钮组（包含相册和拍照）
 * 
 * MVP 版本仅支持相册选择，拍照功能后续添加
 */
@Composable
fun ImagePickerButtonGroup(
    onImageSelected: (Uri) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    // 图片选择器
    val imagePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        uri?.let { onImageSelected(it) }
    }
    
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // 从相册选择
        Button(
            onClick = { imagePickerLauncher.launch("image/*") },
            modifier = Modifier.weight(1f),
            enabled = enabled
        ) {
            Icon(
                imageVector = Icons.Default.Image,
                contentDescription = null,
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text("相册")
        }
        
        // 拍照（MVP 暂不支持）
        OutlinedButton(
            onClick = { /* TODO: 实现拍照功能 */ },
            modifier = Modifier.weight(1f),
            enabled = false // MVP 版本禁用
        ) {
            Icon(
                imageVector = Icons.Default.CameraAlt,
                contentDescription = null,
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text("拍照")
        }
    }
}
