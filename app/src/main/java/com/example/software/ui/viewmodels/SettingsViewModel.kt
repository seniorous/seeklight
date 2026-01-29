package com.example.software.ui.viewmodels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.software.data.local.CloudSettings
import com.example.software.data.local.CloudSettingsStore
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class SettingsUiState(
    val privacyMode: Boolean = true,
    val baseUrl: String = CloudSettingsStore.DEFAULT_BASE_URL,
    val apiKey: String = CloudSettingsStore.DEFAULT_API_KEY,
    val model: String = CloudSettingsStore.DEFAULT_MODEL,
    val message: String? = null
)

class SettingsViewModel(application: Application) : AndroidViewModel(application) {
    private val store = CloudSettingsStore(application)
    private val _uiState = MutableStateFlow(SettingsUiState())
    val uiState: StateFlow<SettingsUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        val settings = store.load()
        _uiState.update {
            it.copy(
                privacyMode = settings.privacyMode,
                baseUrl = settings.baseUrl,
                apiKey = settings.apiKey,
                model = settings.model
            )
        }
    }

    fun updatePrivacyMode(enabled: Boolean) {
        _uiState.update { it.copy(privacyMode = enabled) }
        store.updatePrivacyMode(enabled)
    }

    fun updateBaseUrl(value: String) {
        _uiState.update { it.copy(baseUrl = value) }
    }

    fun updateApiKey(value: String) {
        _uiState.update { it.copy(apiKey = value) }
    }

    fun updateModel(value: String) {
        _uiState.update { it.copy(model = value) }
    }

    fun save() {
        val state = _uiState.value
        val settings = CloudSettings(
            privacyMode = state.privacyMode,
            baseUrl = state.baseUrl.ifBlank { CloudSettingsStore.DEFAULT_BASE_URL },
            apiKey = state.apiKey.ifBlank { CloudSettingsStore.DEFAULT_API_KEY },
            model = state.model.ifBlank { CloudSettingsStore.DEFAULT_MODEL }
        )
        viewModelScope.launch {
            store.save(settings)
            _uiState.update { it.copy(message = "设置已保存") }
        }
    }

    fun clearMessage() {
        _uiState.update { it.copy(message = null) }
    }
}
