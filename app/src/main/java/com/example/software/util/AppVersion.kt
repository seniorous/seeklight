package com.example.software.util

import com.example.software.BuildConfig

/**
 * 应用版本信息
 */
object AppVersion {
    /** 版本名称 (如 "1.0.0") */
    val name: String = BuildConfig.VERSION_NAME
    
    /** 版本代码 */
    val code: Int = BuildConfig.VERSION_CODE
    
    /** 完整版本 (如 "1.0.0 (1)") */
    val full: String = BuildConfig.VERSION_FULL
    
    /** 主版本号 */
    val major: Int = BuildConfig.VERSION_MAJOR
    
    /** 次版本号 */
    val minor: Int = BuildConfig.VERSION_MINOR
    
    /** 补丁版本号 */
    val patch: Int = BuildConfig.VERSION_PATCH
    
    /** 构建号 */
    val build: Int = BuildConfig.VERSION_BUILD
    
    /** 显示文本 */
    val displayText: String get() = "v$full"
    
    /** 简短显示文本 */
    val shortText: String get() = "v$name"
}
