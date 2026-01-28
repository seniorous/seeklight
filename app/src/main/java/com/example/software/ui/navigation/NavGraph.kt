package com.example.software.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.software.data.repository.ImageMemoryRepository
import com.example.software.ui.screens.BatchImportScreen
import com.example.software.ui.screens.HistoryScreen
import com.example.software.ui.screens.ImageDescriptionScreen
import com.example.software.ui.screens.MemoryDetailScreen
import com.example.software.ui.screens.SplashScreen
import com.example.software.ui.viewmodels.BatchImportViewModel
import com.example.software.ui.viewmodels.HistoryViewModel
import com.example.software.ui.viewmodels.ImageDescriptionViewModel

/**
 * 导航路由定义
 */
sealed class Screen(val route: String) {
    /** 启动封面 */
    data object Splash : Screen("splash")
    
    /** 主页 - 图像描述 */
    data object Home : Screen("home")
    
    /** 历史记录 */
    data object History : Screen("history")
    
    /** 批量导入 */
    data object BatchImport : Screen("batch_import")
    
    /** 记忆详情 */
    data object MemoryDetail : Screen("memory/{memoryId}") {
        fun createRoute(memoryId: Long) = "memory/$memoryId"
    }
}

/**
 * 导航图
 */
@Composable
fun NavGraph(
    navController: NavHostController,
    imageDescriptionViewModel: ImageDescriptionViewModel,
    historyViewModel: HistoryViewModel,
    repository: ImageMemoryRepository,
    modifier: Modifier = Modifier
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Splash.route,
        modifier = modifier
    ) {
        // 启动封面
        composable(Screen.Splash.route) {
            SplashScreen(
                onSplashComplete = {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Splash.route) { inclusive = true }
                    }
                }
            )
        }
        
        // 主页
        composable(Screen.Home.route) {
            ImageDescriptionScreen(
                viewModel = imageDescriptionViewModel,
                onNavigateToHistory = {
                    navController.navigate(Screen.History.route)
                }
            )
        }
        
        // 历史记录
        composable(Screen.History.route) {
            HistoryScreen(
                viewModel = historyViewModel,
                onMemoryClick = { memoryId ->
                    navController.navigate(Screen.MemoryDetail.createRoute(memoryId))
                },
                onNavigateToHome = {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Home.route) { inclusive = true }
                    }
                },
                onNavigateToBatchImport = {
                    navController.navigate(Screen.BatchImport.route)
                }
            )
        }
        
        // 批量导入
        composable(Screen.BatchImport.route) {
            val batchImportViewModel: BatchImportViewModel = viewModel()
            
            // 设置 Repository
            remember(repository) {
                batchImportViewModel.setRepository(repository)
                true
            }
            
            BatchImportScreen(
                viewModel = batchImportViewModel,
                onNavigateBack = { navController.popBackStack() },
                onNavigateToHistory = {
                    navController.navigate(Screen.History.route) {
                        popUpTo(Screen.History.route) { inclusive = true }
                    }
                }
            )
        }
        
        // 记忆详情
        composable(
            route = Screen.MemoryDetail.route,
            arguments = listOf(
                navArgument("memoryId") { type = NavType.LongType }
            )
        ) { backStackEntry ->
            val memoryId = backStackEntry.arguments?.getLong("memoryId") ?: return@composable
            
            MemoryDetailScreen(
                memoryId = memoryId,
                repository = repository,
                onNavigateBack = { navController.popBackStack() },
                onDelete = {
                    // 删除后返回历史列表
                    historyViewModel.requestDeleteMemory(
                        historyViewModel.uiState.value.memories.find { it.id == memoryId }
                            ?: return@MemoryDetailScreen
                    )
                    navController.popBackStack()
                }
            )
        }
    }
}
