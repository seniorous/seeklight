package com.example.software.util

import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

data class StructuredMemory(
    val summary: String,
    val tags: TagGroups,
    val visualFeatures: VisualFeatures,
    val memoryExtraction: MemoryExtraction
) {
    fun allTags(): List<String> {
        return (tags.objects + tags.scene + tags.action + tags.timeContext)
            .distinct()
    }
}

data class TagGroups(
    val objects: List<String>,
    val scene: List<String>,
    val action: List<String>,
    val timeContext: List<String>
)

data class VisualFeatures(
    val dominantColors: List<String>,
    val lightingMood: String,
    val composition: String
)

data class MemoryExtraction(
    val ocrText: String,
    val narrativeCaption: String,
    val uniqueIdentifier: String
)

data class ParsedMemoryResult(
    val structured: StructuredMemory?,
    val fallbackSummary: String,
    val fallbackNarrative: String
)

object MemoryJsonParser {
    private const val TAG = "MemoryJsonParser"

    fun parse(rawOutput: String): ParsedMemoryResult {
        val cleaned = sanitizeJson(rawOutput)
        if (cleaned.isNullOrBlank()) {
            return ParsedMemoryResult(
                structured = null,
                fallbackSummary = summarizeFallback(rawOutput),
                fallbackNarrative = fallbackNarrative(rawOutput)
            )
        }

        return try {
            val json = JSONObject(cleaned)
            val summary = json.optString("summary", "").trim()

            val tagsObj = json.optJSONObject("tags") ?: JSONObject()
            val objects = filterTags(readStringList(tagsObj, "objects"))
            val scene = filterTags(readStringList(tagsObj, "scene"))
            val action = filterTags(readStringList(tagsObj, "action"))
            val timeContext = filterTags(readStringList(tagsObj, "time_context"))

            val visualObj = json.optJSONObject("visual_features") ?: JSONObject()
            val dominantColors = filterTags(readStringList(visualObj, "dominant_colors"))
            val lightingMood = visualObj.optString("lighting_mood", "").trim()
            val composition = visualObj.optString("composition", "").trim()

            val memoryObj = json.optJSONObject("memory_extraction") ?: JSONObject()
            val ocrText = memoryObj.optString("ocr_text", "").trim()
            val narrativeCaption = memoryObj.optString("narrative_caption", "").trim()
            val uniqueIdentifier = memoryObj.optString("unique_identifier", "").trim()

            val structured = StructuredMemory(
                summary = summary,
                tags = TagGroups(
                    objects = limitTags(objects),
                    scene = limitTags(scene),
                    action = limitTags(action),
                    timeContext = limitTags(timeContext)
                ),
                visualFeatures = VisualFeatures(
                    dominantColors = limitTags(dominantColors),
                    lightingMood = lightingMood,
                    composition = composition
                ),
                memoryExtraction = MemoryExtraction(
                    ocrText = ocrText,
                    narrativeCaption = narrativeCaption,
                    uniqueIdentifier = uniqueIdentifier
                )
            )

            ParsedMemoryResult(
                structured = structured,
                fallbackSummary = summarizeFallback(rawOutput),
                fallbackNarrative = fallbackNarrative(rawOutput)
            )
        } catch (e: JSONException) {
            AppLog.w(TAG, "JSON parse failed: ${e.message}")
            ParsedMemoryResult(
                structured = null,
                fallbackSummary = summarizeFallback(rawOutput),
                fallbackNarrative = fallbackNarrative(rawOutput)
            )
        }
    }

    private fun sanitizeJson(rawOutput: String): String? {
        val withoutFences = rawOutput
            .replace("```json", "", ignoreCase = true)
            .replace("```", "")
            .trim()
        val start = withoutFences.indexOf('{')
        val end = withoutFences.lastIndexOf('}')
        if (start < 0 || end <= start) return null
        val candidate = withoutFences.substring(start, end + 1)
        return candidate
            .replace(",}", "}")
            .replace(",]", "]")
            .trim()
    }

    private fun readStringList(json: JSONObject, key: String): List<String> {
        return when (val value = json.opt(key)) {
            is JSONArray -> {
                val result = mutableListOf<String>()
                for (i in 0 until value.length()) {
                    val item = value.optString(i, "").trim()
                    if (item.isNotBlank()) result.add(item)
                }
                result
            }
            is String -> splitTags(value)
            else -> emptyList()
        }
    }

    private fun splitTags(raw: String): List<String> {
        return raw.split(",", "，", "、", ";", "；", "\n")
            .map { it.trim() }
            .filter { it.isNotBlank() }
    }

    private fun limitTags(tags: List<String>, min: Int = 3, max: Int = 12): List<String> {
        val distinct = tags.distinct()
        return when {
            distinct.size <= max -> distinct
            else -> distinct.take(max)
        }
    }

    private fun filterTags(tags: List<String>): List<String> {
        return tags
            .map { it.trim() }
            .filter { it.isNotBlank() && it.length in 2..20 }
            .filter { isValidTag(it) }
    }

    private fun isValidTag(tag: String): Boolean {
        val technicalTerms = setOf(
            "http", "https", "http/https", "webrtc", "websocket", "tcp", "udp", "ip", "dns", "ssh", "ssl", "tls",
            "api", "rest", "graphql", "grpc",
            "github", "git", "gitlab", "jira", "jenkins", "docker", "kubernetes", "k8s",
            "javascript", "typescript", "python", "java", "kotlin", "swift", "rust", "go",
            "react", "vue", "angular", "node", "nodejs", "npm", "webpack",
            "sql", "nosql", "mongodb", "mysql", "postgresql", "redis",
            "json", "xml", "yaml", "csv", "html", "css",
            "word", "excel", "powerpoint", "office", "outlook",
            "算法", "数据库", "服务器", "缓存", "架构", "框架", "模型", "网络", "协议",
            "加密", "解密", "密钥", "证书", "验证", "授权", "认证",
            "分布式", "微服务", "容器", "云计算", "云存储", "大数据",
            "机器学习", "深度学习", "神经网络", "人工智能",
            "版本控制", "代码", "编程", "开发", "测试", "部署",
            "概念模型", "未来预测", "互动式学习", "个人化服务", "情绪管理",
            "悬疑推理", "关键词匹配", "逻辑推导", "时间序列",
            "发散思维", "心理健康", "灵魂伴侣", "成长过程",
            "条件反射", "归属感", "亲密关系", "人类情感"
        )
        val lowerTag = tag.lowercase()
        if (technicalTerms.any { lowerTag.contains(it) }) return false
        if (tag.contains("/") || tag.contains("\\") || tag.contains("://") ||
            tag.contains("::") || tag.contains("()") || tag.contains("{}") ||
            tag.contains("[]") || tag.contains("<>")
        ) {
            return false
        }
        if (tag.all { it.isDigit() }) return false
        if (tag.count { it.isDigit() } > tag.length / 2) return false
        return true
    }

    private fun summarizeFallback(raw: String): String {
        val cleaned = stripJsonArtifacts(raw)
        return if (cleaned.isBlank()) "解析失败" else cleaned.take(30)
    }

    private fun fallbackNarrative(raw: String): String {
        val cleaned = stripJsonArtifacts(raw)
        return cleaned.take(140)
    }

    private fun stripJsonArtifacts(raw: String): String {
        val cleaned = raw
            .replace(Regex("[\\{\\}\\[\\]\"]"), " ")
            .replace(
                Regex(
                    "(?i)\\b(json|summary|tags|objects|scene|action|time_context|visual_features|" +
                        "dominant_colors|lighting_mood|composition|memory_extraction|ocr_text|" +
                        "narrative_caption|unique_identifier)\\b"
                ),
                " "
            )
            .replace(Regex("[:：]+"), " ")
            .replace(Regex("[,，]+"), " ")
            .replace(Regex("[`]+"), " ")
            .replace(Regex("\\s+"), " ")
            .trim()
        return cleaned
    }
}
