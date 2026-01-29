package com.example.software.data.local

import android.content.Context

data class CloudSettings(
    val privacyMode: Boolean,
    val baseUrl: String,
    val apiKey: String,
    val model: String
)

class CloudSettingsStore(context: Context) {
    private val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    fun load(): CloudSettings {
        return CloudSettings(
            privacyMode = prefs.getBoolean(KEY_PRIVACY_MODE, true),
            baseUrl = prefs.getString(KEY_BASE_URL, DEFAULT_BASE_URL) ?: DEFAULT_BASE_URL,
            apiKey = prefs.getString(KEY_API_KEY, DEFAULT_API_KEY) ?: DEFAULT_API_KEY,
            model = prefs.getString(KEY_MODEL, DEFAULT_MODEL) ?: DEFAULT_MODEL
        )
    }

    fun save(settings: CloudSettings) {
        prefs.edit()
            .putBoolean(KEY_PRIVACY_MODE, settings.privacyMode)
            .putString(KEY_BASE_URL, settings.baseUrl)
            .putString(KEY_API_KEY, settings.apiKey)
            .putString(KEY_MODEL, settings.model)
            .apply()
    }

    fun updatePrivacyMode(enabled: Boolean) {
        prefs.edit().putBoolean(KEY_PRIVACY_MODE, enabled).apply()
    }

    fun updateBaseUrl(baseUrl: String) {
        prefs.edit().putString(KEY_BASE_URL, baseUrl).apply()
    }

    fun updateApiKey(apiKey: String) {
        prefs.edit().putString(KEY_API_KEY, apiKey).apply()
    }

    fun updateModel(model: String) {
        prefs.edit().putString(KEY_MODEL, model).apply()
    }

    companion object {
        private const val PREFS_NAME = "cloud_settings"
        private const val KEY_PRIVACY_MODE = "privacy_mode"
        private const val KEY_BASE_URL = "base_url"
        private const val KEY_API_KEY = "api_key"
        private const val KEY_MODEL = "model"

        const val DEFAULT_BASE_URL = "https://api.siliconflow.cn/v1"
        const val DEFAULT_API_KEY = "YOUR_API_KEY_HERE"
        const val DEFAULT_MODEL = "Qwen/Qwen3-VL-235B-A22B-Thinking"
    }
}
