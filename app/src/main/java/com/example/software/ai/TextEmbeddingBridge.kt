package com.example.software.ai

import ai.onnxruntime.OnnxTensor
import ai.onnxruntime.OrtEnvironment
import ai.onnxruntime.OrtSession
import android.content.Context
import com.example.software.util.AppLog
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileOutputStream
import java.nio.LongBuffer

/**
 * 文本向量生成桥接器
 * 
 * 使用 ONNX Runtime 运行 all-MiniLM-L6-v2 模型生成文本向量。
 * 向量维度: 384
 */
class TextEmbeddingBridge private constructor() {
    
    companion object {
        private const val TAG = "TextEmbeddingBridge"
        private const val MODEL_DIR = "models/minilm-l6-v2"
        private const val MODEL_FILE = "model.onnx"
        private const val VOCAB_FILE = "vocab.txt"
        
        const val EMBEDDING_DIM = 384
        const val MAX_SEQ_LENGTH = 128
        
        @Volatile
        private var instance: TextEmbeddingBridge? = null
        
        fun getInstance(): TextEmbeddingBridge {
            return instance ?: synchronized(this) {
                instance ?: TextEmbeddingBridge().also { instance = it }
            }
        }
    }
    
    private var ortEnvironment: OrtEnvironment? = null
    private var ortSession: OrtSession? = null
    private var vocabulary: Map<String, Int>? = null
    private var isInitialized = false
    private val mutex = Mutex()
    
    // 特殊 Token ID
    private var clsTokenId: Int = 101  // [CLS]
    private var sepTokenId: Int = 102  // [SEP]
    private var padTokenId: Int = 0    // [PAD]
    private var unkTokenId: Int = 100  // [UNK]
    
    /**
     * 初始化模型
     */
    suspend fun initialize(context: Context): Boolean = withContext(Dispatchers.IO) {
        mutex.withLock {
            if (isInitialized) {
                AppLog.d(TAG, "Already initialized")
                return@withContext true
            }
            
            try {
                // 复制模型文件到内部存储
                val modelFile = copyAssetToInternal(context, "$MODEL_DIR/$MODEL_FILE", MODEL_FILE)
                val vocabFile = copyAssetToInternal(context, "$MODEL_DIR/$VOCAB_FILE", VOCAB_FILE)
                
                if (modelFile == null || vocabFile == null) {
                    AppLog.e(TAG, "Failed to copy model files")
                    return@withContext false
                }
                
                // 加载词汇表
                vocabulary = loadVocabulary(vocabFile)
                if (vocabulary == null) {
                    AppLog.e(TAG, "Failed to load vocabulary")
                    return@withContext false
                }
                
                // 更新特殊 Token ID
                vocabulary?.let { vocab ->
                    clsTokenId = vocab["[CLS]"] ?: 101
                    sepTokenId = vocab["[SEP]"] ?: 102
                    padTokenId = vocab["[PAD]"] ?: 0
                    unkTokenId = vocab["[UNK]"] ?: 100
                }
                
                // 初始化 ONNX Runtime
                ortEnvironment = OrtEnvironment.getEnvironment()
                val sessionOptions = OrtSession.SessionOptions().apply {
                    setIntraOpNumThreads(4)
                }
                ortSession = ortEnvironment?.createSession(modelFile.absolutePath, sessionOptions)
                
                isInitialized = true
                AppLog.i(TAG, "Initialized successfully, vocab size: ${vocabulary?.size}")
                return@withContext true
                
            } catch (e: Exception) {
                AppLog.e(TAG, "Initialization failed: ${e.message}", e)
                cleanup()
                return@withContext false
            }
        }
    }
    
    /**
     * 生成文本向量
     */
    suspend fun generateEmbedding(text: String): FloatArray? = withContext(Dispatchers.Default) {
        if (!isInitialized || ortSession == null || vocabulary == null) {
            AppLog.w(TAG, "Not initialized")
            return@withContext null
        }
        
        try {
            // Tokenize
            val tokens = tokenize(text)
            
            // 创建输入张量
            val inputIds = LongArray(MAX_SEQ_LENGTH) { padTokenId.toLong() }
            val attentionMask = LongArray(MAX_SEQ_LENGTH) { 0L }
            val tokenTypeIds = LongArray(MAX_SEQ_LENGTH) { 0L }
            
            // 填充 token
            inputIds[0] = clsTokenId.toLong()
            attentionMask[0] = 1L
            
            val maxTokens = minOf(tokens.size, MAX_SEQ_LENGTH - 2)
            for (i in 0 until maxTokens) {
                inputIds[i + 1] = tokens[i].toLong()
                attentionMask[i + 1] = 1L
            }
            inputIds[maxTokens + 1] = sepTokenId.toLong()
            attentionMask[maxTokens + 1] = 1L
            
            // 创建 ONNX 输入
            val env = ortEnvironment ?: return@withContext null
            val session = ortSession ?: return@withContext null
            
            val inputIdsTensor = OnnxTensor.createTensor(
                env,
                LongBuffer.wrap(inputIds),
                longArrayOf(1, MAX_SEQ_LENGTH.toLong())
            )
            val attentionMaskTensor = OnnxTensor.createTensor(
                env,
                LongBuffer.wrap(attentionMask),
                longArrayOf(1, MAX_SEQ_LENGTH.toLong())
            )
            val tokenTypeIdsTensor = OnnxTensor.createTensor(
                env,
                LongBuffer.wrap(tokenTypeIds),
                longArrayOf(1, MAX_SEQ_LENGTH.toLong())
            )
            
            // 运行推理
            val inputs = mapOf(
                "input_ids" to inputIdsTensor,
                "attention_mask" to attentionMaskTensor,
                "token_type_ids" to tokenTypeIdsTensor
            )
            
            val results = session.run(inputs)
            
            // 获取输出 (sentence_embedding)
            val output = results.get(0).value
            
            val embedding = when (output) {
                is Array<*> -> {
                    @Suppress("UNCHECKED_CAST")
                    val floatArray = (output as Array<FloatArray>)[0]
                    normalizeVector(floatArray)
                }
                else -> {
                    AppLog.e(TAG, "Unexpected output type: ${output?.javaClass}")
                    null
                }
            }
            
            // 清理资源
            inputIdsTensor.close()
            attentionMaskTensor.close()
            tokenTypeIdsTensor.close()
            results.close()
            
            return@withContext embedding
            
        } catch (e: Exception) {
            AppLog.e(TAG, "Embedding generation failed: ${e.message}", e)
            return@withContext null
        }
    }
    
    /**
     * 简单分词器（WordPiece 风格）
     */
    private fun tokenize(text: String): List<Int> {
        val vocab = vocabulary ?: return emptyList()
        val tokens = mutableListOf<Int>()
        
        // 简单预处理：小写 + 基本分词
        val words = text.lowercase()
            .replace(Regex("[^a-z0-9\\u4e00-\\u9fff\\s]"), " ")
            .split(Regex("\\s+"))
            .filter { it.isNotBlank() }
        
        for (word in words) {
            // 尝试整词匹配
            val tokenId = vocab[word]
            if (tokenId != null) {
                tokens.add(tokenId)
                continue
            }
            
            // WordPiece 子词分割
            var remaining = word
            var isFirst = true
            while (remaining.isNotEmpty()) {
                var found = false
                for (endIdx in remaining.length downTo 1) {
                    val subword = if (isFirst) {
                        remaining.substring(0, endIdx)
                    } else {
                        "##${remaining.substring(0, endIdx)}"
                    }
                    
                    val subTokenId = vocab[subword]
                    if (subTokenId != null) {
                        tokens.add(subTokenId)
                        remaining = remaining.substring(endIdx)
                        isFirst = false
                        found = true
                        break
                    }
                }
                
                if (!found) {
                    // 未知字符，使用 [UNK]
                    tokens.add(unkTokenId)
                    remaining = remaining.drop(1)
                    isFirst = false
                }
            }
            
            if (tokens.size >= MAX_SEQ_LENGTH - 2) break
        }
        
        return tokens.take(MAX_SEQ_LENGTH - 2)
    }
    
    /**
     * L2 归一化向量
     */
    private fun normalizeVector(vector: FloatArray): FloatArray {
        var norm = 0f
        for (v in vector) {
            norm += v * v
        }
        norm = kotlin.math.sqrt(norm)
        
        if (norm > 0) {
            for (i in vector.indices) {
                vector[i] = vector[i] / norm
            }
        }
        
        return vector
    }
    
    /**
     * 从 assets 复制文件到内部存储
     */
    private fun copyAssetToInternal(context: Context, assetPath: String, fileName: String): File? {
        return try {
            val outFile = File(context.filesDir, "embedding_model/$fileName")
            if (outFile.exists()) {
                return outFile
            }
            
            outFile.parentFile?.mkdirs()
            
            context.assets.open(assetPath).use { input ->
                FileOutputStream(outFile).use { output ->
                    input.copyTo(output)
                }
            }
            
            AppLog.d(TAG, "Copied $assetPath to ${outFile.absolutePath}")
            outFile
        } catch (e: Exception) {
            AppLog.e(TAG, "Failed to copy asset $assetPath: ${e.message}")
            null
        }
    }
    
    /**
     * 加载词汇表
     */
    private fun loadVocabulary(vocabFile: File): Map<String, Int>? {
        return try {
            val vocab = mutableMapOf<String, Int>()
            vocabFile.readLines().forEachIndexed { index, line ->
                vocab[line.trim()] = index
            }
            vocab
        } catch (e: Exception) {
            AppLog.e(TAG, "Failed to load vocabulary: ${e.message}")
            null
        }
    }
    
    /**
     * 检查是否已初始化
     */
    fun isInitialized(): Boolean = isInitialized
    
    /**
     * 清理资源
     */
    fun cleanup() {
        try {
            ortSession?.close()
            ortEnvironment?.close()
        } catch (e: Exception) {
            AppLog.e(TAG, "Cleanup error: ${e.message}")
        } finally {
            ortSession = null
            ortEnvironment = null
            vocabulary = null
            isInitialized = false
        }
    }
}
