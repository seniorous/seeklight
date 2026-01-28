package com.example.software.util

import android.util.Log

/**
 * 统一日志入口，确保 Tag 可过滤且格式一致
 */
object AppLog {
    private const val APP_TAG = "Software"

    private fun format(tag: String, message: String): String {
        val threadName = Thread.currentThread().name
        return "[$tag][thread=$threadName] $message"
    }

    fun d(tag: String, message: String) {
        Log.d(APP_TAG, format(tag, message))
    }

    fun i(tag: String, message: String) {
        Log.i(APP_TAG, format(tag, message))
    }

    fun w(tag: String, message: String) {
        Log.w(APP_TAG, format(tag, message))
    }

    fun e(tag: String, message: String, throwable: Throwable? = null) {
        if (throwable != null) {
            Log.e(APP_TAG, format(tag, message), throwable)
        } else {
            Log.e(APP_TAG, format(tag, message))
        }
    }
}
