package com.example.software.ai

import android.util.Base64
import com.example.software.data.local.CloudSettings
import com.example.software.util.AppLog
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import kotlin.coroutines.cancellation.CancellationException

class CloudInferenceClient {
    companion object {
        private const val CONNECT_TIMEOUT_MS = 10000
        private const val READ_TIMEOUT_MS = 20000
        private const val LONG_READ_TIMEOUT_MS = 120000
        private const val HEALTH_CONNECT_TIMEOUT_MS = 4000
        private const val HEALTH_READ_TIMEOUT_MS = 6000
        private const val PING_TIMEOUT_MS = 800
    }

    fun isServiceReachable(settings: CloudSettings): Boolean {
        return try {
            val baseUrl = normalizeBaseUrl(settings.baseUrl)
            val url = URL(baseUrl)
            val port = if (url.port != -1) url.port else if (url.protocol == "https") 443 else 80
            java.net.Socket().use { socket ->
                socket.connect(java.net.InetSocketAddress(url.host, port), PING_TIMEOUT_MS)
            }
            true
        } catch (e: Exception) {
            AppLog.w("CloudInferenceClient", "Reachability check failed: ${e.message}")
            false
        }
    }

    fun requestCompletion(
        settings: CloudSettings,
        systemPrompt: String,
        imagePath: String
    ): Result<String> {
        val baseUrl = normalizeBaseUrl(settings.baseUrl)
        val url = URL("$baseUrl/chat/completions")
        val modelReady = checkModelWorking(settings)
        val imageFile = File(imagePath)
        if (!imageFile.exists()) {
            return Result.failure(IllegalStateException("image not found"))
        }

        val imageBytes = imageFile.readBytes()
        val encoded = Base64.encodeToString(imageBytes, Base64.NO_WRAP)
        val imageDataUrl = "data:image/jpeg;base64,$encoded"

        val payload = JSONObject().apply {
            put("model", settings.model)
            put("stream", false)
            put("max_tokens", 1024)
            put(
                "messages",
                JSONArray().apply {
                    put(JSONObject().apply {
                        put("role", "system")
                        put("content", systemPrompt)
                    })
                    put(JSONObject().apply {
                        put("role", "user")
                        put(
                            "content",
                            JSONArray().apply {
                                put(JSONObject().apply {
                                    put("type", "text")
                                    put("text", "请根据系统要求输出结果。")
                                })
                                put(JSONObject().apply {
                                    put("type", "image_url")
                                    put(
                                        "image_url",
                                        JSONObject().apply {
                                            put("url", imageDataUrl)
                                            put("detail", "auto")
                                        }
                                    )
                                })
                            }
                        )
                    })
                }
            )
        }

        return try {
            val connection = (url.openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = CONNECT_TIMEOUT_MS
                readTimeout = if (modelReady) LONG_READ_TIMEOUT_MS else READ_TIMEOUT_MS
                doOutput = true
                setRequestProperty("Content-Type", "application/json")
                setRequestProperty("Authorization", "Bearer ${settings.apiKey}")
            }

            connection.outputStream.use { out ->
                out.write(payload.toString().toByteArray(Charsets.UTF_8))
            }

            val responseCode = connection.responseCode
            val stream = if (responseCode in 200..299) {
                connection.inputStream
            } else {
                connection.errorStream
            }
            val responseText = stream?.bufferedReader()?.readText().orEmpty()
            if (responseCode !in 200..299) {
                return Result.failure(IllegalStateException("http $responseCode: $responseText"))
            }

            val responseJson = JSONObject(responseText)
            val choices = responseJson.optJSONArray("choices") ?: JSONArray()
            val message = choices.optJSONObject(0)?.optJSONObject("message")
            val content = message?.optString("content", "")?.trim().orEmpty()
            if (content.isBlank()) {
                Result.failure(IllegalStateException("empty response"))
            } else {
                Result.success(content)
            }
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            AppLog.w(
                "CloudInferenceClient",
                "Cloud request failed: ${e::class.java.simpleName}: ${e.message}"
            )
            Result.failure(e)
        }
    }

    private fun checkModelWorking(settings: CloudSettings): Boolean {
        val baseUrl = normalizeBaseUrl(settings.baseUrl)
        val url = URL("$baseUrl/chat/completions")
        val payload = JSONObject().apply {
            put("model", settings.model)
            put("stream", false)
            put("max_tokens", 1)
            put(
                "messages",
                JSONArray().apply {
                    put(JSONObject().apply {
                        put("role", "system")
                        put("content", "你是服务健康检查。")
                    })
                    put(JSONObject().apply {
                        put("role", "user")
                        put("content", "ping")
                    })
                }
            )
        }

        return try {
            val connection = (url.openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = HEALTH_CONNECT_TIMEOUT_MS
                readTimeout = HEALTH_READ_TIMEOUT_MS
                doOutput = true
                setRequestProperty("Content-Type", "application/json")
                setRequestProperty("Authorization", "Bearer ${settings.apiKey}")
            }

            connection.outputStream.use { out ->
                out.write(payload.toString().toByteArray(Charsets.UTF_8))
            }

            val responseCode = connection.responseCode
            responseCode in 200..299
        } catch (e: Exception) {
            AppLog.w("CloudInferenceClient", "Health check failed: ${e::class.java.simpleName}: ${e.message}")
            false
        }
    }

    private fun normalizeBaseUrl(raw: String): String {
        val trimmed = raw.trim().removeSuffix("/")
        return if (trimmed.endsWith("/v1")) trimmed else "$trimmed/v1"
    }
}
