plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.ksp)
}

// 版本号管理
object AppVersion {
    const val MAJOR = 1        // 主版本号：重大更新
    const val MINOR = 0        // 次版本号：功能更新
    const val PATCH = 0        // 补丁版本：Bug 修复
    const val BUILD = 1        // 构建号：每次构建递增
    
    val code: Int get() = MAJOR * 10000 + MINOR * 100 + PATCH
    val name: String get() = "$MAJOR.$MINOR.$PATCH"
    val full: String get() = "$MAJOR.$MINOR.$PATCH ($BUILD)"
}

android {
    namespace = "com.example.software"
    compileSdk {
        version = release(36)
    }

    defaultConfig {
        applicationId = "com.example.software"
        minSdk = 24
        targetSdk = 36
        versionCode = AppVersion.code
        versionName = AppVersion.name
        
        // 将版本信息传递到 BuildConfig
        buildConfigField("String", "VERSION_FULL", "\"${AppVersion.full}\"")
        buildConfigField("int", "VERSION_MAJOR", "${AppVersion.MAJOR}")
        buildConfigField("int", "VERSION_MINOR", "${AppVersion.MINOR}")
        buildConfigField("int", "VERSION_PATCH", "${AppVersion.PATCH}")
        buildConfigField("int", "VERSION_BUILD", "${AppVersion.BUILD}")

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        // 只支持 64 位 ARM 架构
        ndk {
            abiFilters += "arm64-v8a"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
    
    // JNI 库目录配置
    sourceSets {
        getByName("main") {
            jniLibs.srcDirs("src/main/jniLibs")
        }
    }
    
    // 单元测试配置
    testOptions {
        unitTests {
            isIncludeAndroidResources = true
            isReturnDefaultValues = true
        }
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    
    // Material Icons Extended (用于更多图标)
    implementation(libs.androidx.material.icons.extended)
    
    // Image loading
    implementation(libs.coil.compose)
    
    // ViewModel for Compose
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.lifecycle.runtime.compose)
    
    // Permission handling
    implementation(libs.accompanist.permissions)
    
    // Room Database
    implementation(libs.androidx.room.runtime)
    implementation(libs.androidx.room.ktx)
    ksp(libs.androidx.room.compiler)
    
    // Navigation
    implementation(libs.androidx.navigation.compose)
    
    // ONNX Runtime for Text Embedding
    implementation(libs.onnxruntime.android)
    
    // WorkManager for background embedding generation
    implementation(libs.androidx.work.runtime.ktx)
    
    // Unit Testing
    testImplementation(libs.junit)
    testImplementation(libs.robolectric)
    testImplementation(libs.mockito.core)
    testImplementation(libs.mockito.kotlin)
    testImplementation(libs.kotlinx.coroutines.test)
    testImplementation(libs.turbine)
    testImplementation(libs.androidx.arch.core.testing)
    
    // Android Instrumentation Testing
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
    androidTestImplementation(libs.kotlinx.coroutines.test)
    androidTestImplementation(libs.androidx.room.testing)
    
    // Debug dependencies
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}