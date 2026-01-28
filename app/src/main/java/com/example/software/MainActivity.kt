package com.example.software

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.software.ui.screens.ImageDescriptionScreen
import com.example.software.ui.theme.SoftwareTheme
import com.example.software.util.AppLog

/**
 * 主 Activity
 * 
 * Qwen3-VL 图像描述 MVP 应用入口
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        AppLog.i("MainActivity", "onCreate")
        enableEdgeToEdge()
        setContent {
            SoftwareTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    ImageDescriptionScreen()
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun MainScreenPreview() {
    SoftwareTheme {
        ImageDescriptionScreen()
    }
}