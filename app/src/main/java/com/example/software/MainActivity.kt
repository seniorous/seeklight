package com.example.software

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.software.data.local.AppDatabase
import com.example.software.data.repository.ImageMemoryRepositoryImpl
import com.example.software.ui.navigation.NavGraph
import com.example.software.ui.screens.ImageDescriptionScreen
import com.example.software.ui.theme.SoftwareTheme
import com.example.software.ui.viewmodels.HistoryViewModel
import com.example.software.ui.viewmodels.ImageDescriptionViewModel
import com.example.software.util.AppLog

/**
 * 主 Activity
 * 
 * SeekLight 图像记忆库应用入口
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
                    MainScreen()
                }
            }
        }
    }
}

/**
 * 主界面
 */
@Composable
fun MainScreen() {
    val navController = rememberNavController()
    
    // 创建数据库和 Repository
    val context = androidx.compose.ui.platform.LocalContext.current
    val database = remember { AppDatabase.getInstance(context) }
    val repository = remember { ImageMemoryRepositoryImpl(database.imageMemoryDao()) }
    
    // 创建 ViewModels
    val imageDescriptionViewModel: ImageDescriptionViewModel = viewModel()
    val historyViewModel: HistoryViewModel = viewModel(
        factory = HistoryViewModel.Factory(repository)
    )
    
    // 设置 Repository 到 ImageDescriptionViewModel
    remember(repository) {
        imageDescriptionViewModel.setRepository(repository)
        true
    }
    
    NavGraph(
        navController = navController,
        imageDescriptionViewModel = imageDescriptionViewModel,
        historyViewModel = historyViewModel,
        repository = repository
    )
}

@Preview(showBackground = true)
@Composable
fun MainScreenPreview() {
    SoftwareTheme {
        ImageDescriptionScreen()
    }
}