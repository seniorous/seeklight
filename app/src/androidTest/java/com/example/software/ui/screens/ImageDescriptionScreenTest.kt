package com.example.software.ui.screens

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsEnabled
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.example.software.ui.components.DescriptionCard
import com.example.software.ui.components.ImagePickerButton
import com.example.software.ui.components.PerformanceIndicator
import com.example.software.ui.theme.SoftwareTheme
import com.example.software.ui.viewmodels.PerformanceMetrics
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

/**
 * ImageDescriptionScreen UI 测试
 * 
 * 测试主界面的 UI 交互
 */
@RunWith(AndroidJUnit4::class)
class ImageDescriptionScreenTest {
    
    @get:Rule
    val composeTestRule = createComposeRule()
    
    @Test
    fun imagePickerButton_displaysCorrectText() {
        // Given: 渲染图片选择按钮
        composeTestRule.setContent {
            SoftwareTheme {
                ImagePickerButton(onImageSelected = {})
            }
        }
        
        // Then: 应显示正确的文本
        composeTestRule
            .onNodeWithText("选择图片")
            .assertIsDisplayed()
    }
    
    @Test
    fun imagePickerButton_isEnabledByDefault() {
        // Given: 渲染图片选择按钮
        composeTestRule.setContent {
            SoftwareTheme {
                ImagePickerButton(onImageSelected = {})
            }
        }
        
        // Then: 应默认启用
        composeTestRule
            .onNodeWithText("选择图片")
            .assertIsEnabled()
    }
    
    @Test
    fun imagePickerButton_canBeDisabled() {
        // Given: 渲染禁用的图片选择按钮
        composeTestRule.setContent {
            SoftwareTheme {
                ImagePickerButton(onImageSelected = {}, enabled = false)
            }
        }
        
        // Then: 应禁用
        composeTestRule
            .onNodeWithText("选择图片")
            .assertIsNotEnabled()
    }
    
    @Test
    fun descriptionCard_showsEmptyStateMessage() {
        // Given: 渲染空的描述卡片
        composeTestRule.setContent {
            SoftwareTheme {
                DescriptionCard(
                    description = "",
                    isStreaming = false
                )
            }
        }
        
        // Then: 应显示空状态提示
        composeTestRule
            .onNodeWithText("选择图片后点击\"生成描述\"按钮")
            .assertIsDisplayed()
    }
    
    @Test
    fun descriptionCard_showsDescription() {
        // Given: 渲染有内容的描述卡片
        val testDescription = "这是一张测试图片的描述"
        composeTestRule.setContent {
            SoftwareTheme {
                DescriptionCard(
                    description = testDescription,
                    isStreaming = false
                )
            }
        }
        
        // Then: 应显示描述内容
        composeTestRule
            .onNodeWithText(testDescription)
            .assertIsDisplayed()
    }
    
    @Test
    fun descriptionCard_showsStreamingIndicator() {
        // Given: 渲染流式输出中的描述卡片
        composeTestRule.setContent {
            SoftwareTheme {
                DescriptionCard(
                    description = "正在生成...",
                    isStreaming = true
                )
            }
        }
        
        // Then: 应显示流式指示器
        composeTestRule
            .onNodeWithText("生成中")
            .assertIsDisplayed()
    }
    
    @Test
    fun descriptionCard_showsCursorWhenStreaming() {
        // Given: 渲染流式输出中的描述卡片
        val streamingText = "这是正在生成的文本"
        composeTestRule.setContent {
            SoftwareTheme {
                DescriptionCard(
                    description = streamingText,
                    isStreaming = true
                )
            }
        }
        
        // Then: 应显示带光标的文本
        composeTestRule
            .onNodeWithText("${streamingText}▌")
            .assertIsDisplayed()
    }
    
    @Test
    fun performanceIndicator_showsMetrics() {
        // Given: 渲染性能指标
        val metrics = PerformanceMetrics(
            prefillTimeMs = 2500,
            decodeTimeMs = 5000,
            totalTokens = 100,
            tokensPerSecond = 20.0
        )
        
        composeTestRule.setContent {
            SoftwareTheme {
                PerformanceIndicator(
                    metrics = metrics,
                    isVisible = true
                )
            }
        }
        
        // Then: 应显示性能指标
        composeTestRule
            .onNodeWithText("2500ms")
            .assertIsDisplayed()
        
        composeTestRule
            .onNodeWithText("20.0 tok/s")
            .assertIsDisplayed()
        
        composeTestRule
            .onNodeWithText("100")
            .assertIsDisplayed()
    }
    
    @Test
    fun performanceIndicator_hidesWhenNoData() {
        // Given: 渲染空的性能指标
        val emptyMetrics = PerformanceMetrics()
        
        composeTestRule.setContent {
            SoftwareTheme {
                PerformanceIndicator(
                    metrics = emptyMetrics,
                    isVisible = true
                )
            }
        }
        
        // Then: 不应显示（因为没有数据）
        composeTestRule
            .onNodeWithText("性能指标")
            .assertDoesNotExist()
    }
    
    @Test
    fun descriptionCard_showsTitleLabel() {
        // Given: 渲染描述卡片
        composeTestRule.setContent {
            SoftwareTheme {
                DescriptionCard(
                    description = "",
                    isStreaming = false
                )
            }
        }
        
        // Then: 应显示标题
        composeTestRule
            .onNodeWithText("图像描述")
            .assertIsDisplayed()
    }
}
