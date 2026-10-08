export interface AndroidProjectFile {
  path: string;
  category: 'gradle' | 'manifest' | 'res' | 'kotlin_core' | 'kotlin_ui' | 'kotlin_data';
  description: string;
  content: string;
}

export const ANDROID_FILES: AndroidProjectFile[] = [
  {
    path: 'build.gradle.kts',
    category: 'gradle',
    description: 'Root project build script with modern Android Gradle Plugin & Kotlin plugins',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
}
`,
  },
  {
    path: 'settings.gradle.kts',
    category: 'gradle',
    description: 'Project settings and Maven repositories (Google, MavenCentral)',
    content: `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "MaktabgachaTalim"
include(":app")
`,
  },
  {
    path: 'app/build.gradle.kts',
    category: 'gradle',
    description: 'App module build script with Jetpack Compose, Material 3, Navigation & DataStore',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "uz.maktabgacha.talim"
    compileSdk = 35

    defaultConfig {
        applicationId = "uz.maktabgacha.talim"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug") // Default debug key for testing
        }
        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons.extended)
    implementation(libs.androidx.navigation.compose)
    implementation(libs.androidx.datastore.preferences)

    // Audio & Sound
    implementation("androidx.media3:media3-exoplayer:1.5.1")

    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}
`,
  },
  {
    path: 'gradle/libs.versions.toml',
    category: 'gradle',
    description: 'Gradle Version Catalog for modern dependency management',
    content: `[versions]
agp = "8.8.0"
kotlin = "2.1.0"
coreKtx = "1.15.0"
lifecycleRuntimeKtx = "2.8.7"
activityCompose = "1.10.0"
composeBom = "2025.01.00"
navigationCompose = "2.8.5"
datastore = "1.1.2"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleRuntimeKtx" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-compose-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-compose-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-compose-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-compose-ui-test-manifest = { group = "androidx.compose.ui", name = "ui-test-manifest" }
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-compose-material-icons-extended = { group = "androidx.compose.material", name = "material-icons-extended" }
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
androidx-datastore-preferences = { group = "androidx.datastore", name = "datastore-preferences", version.ref = "datastore" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
`,
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    category: 'manifest',
    description: 'Android Manifest with Edge-to-Edge, Portrait & Landscape support, and accessibility',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Audio feedback vibration support -->
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:name=".MaktabgachaApp"
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MaktabgachaTalim"
        tools:targetApi="35">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|screenLayout|smallestScreenSize|density|fontScale"
            android:windowSoftInputMode="adjustResize"
            android:theme="@style/Theme.MaktabgachaTalim">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`,
  },
  {
    path: 'app/src/main/res/values/strings.xml',
    category: 'res',
    description: 'Complete localized strings for Uzbek language preschool education',
    content: `<resources>
    <string name="app_name">Maktabgacha Ta\'lim</string>
    <string name="tagline">3-7 yoshli bolalar uchun quvnoq ta\'lim</string>
    
    <!-- Navigation Tabs -->
    <string name="nav_home">Bosh sahifa</string>
    <string name="nav_lessons">Darslar</string>
    <string name="nav_games">O\'yinlar</string>
    <string name="nav_quiz">Viktorina</string>
    <string name="nav_results">Yutuqlar</string>
    <string name="nav_settings">Sozlamalar</string>

    <!-- Categories -->
    <string name="cat_colors">Ranglar Olami</string>
    <string name="cat_numbers">Raqamlar va Sanash</string>
    <string name="cat_fruits">Shirin Mevalar</string>
    <string name="cat_vegetables">Foydali Sabzavotlar</string>
    <string name="cat_animals">Jonivorlar va Qushlar</string>

    <!-- Age Groups -->
    <string name="age_3_4">3-4 yosh (Kichik guruh)</string>
    <string name="age_4_5">4-5 yosh (O\'rta guruh)</string>
    <string name="age_5_6">5-6 yosh (Katta guruh)</string>
    <string name="age_6_7">6-7 yosh (Tayyorlov guruhi)</string>

    <!-- Actions & Common -->
    <string name="action_start">Boshlash</string>
    <string name="action_continue">Davom etish</string>
    <string name="action_retry">Qaytadan sinash</string>
    <string name="action_next">Keyingisi</string>
    <string name="action_previous">Oldingisi</string>
    <string name="action_finish">Yakunlash</string>
    <string name="action_listen">Ovozni tinglash</string>
    <string name="action_reset">Ma\'lumotlarni tozalash</string>
    <string name="confirm_reset_msg">Rostdan ham barcha to\'plangan yulduzcha va natijalarni tozalashni xohlaysizmi?</string>
    <string name="yes">Ha</string>
    <string name="cancel">Bekor qilish</string>

    <!-- Quiz & Feedback -->
    <string name="quiz_well_done">Ofarin, juda to\'g\'ri!</string>
    <string name="quiz_try_again">Qaytadan urinib ko\'r, do\'stim!</string>
    <string name="quiz_score_prefix">To\'plangan ball:</string>
    <string name="stars_earned">Yulduzchalar:</string>
</resources>
`,
  },
  {
    path: 'app/src/main/res/values/colors.xml',
    category: 'res',
    description: 'Centralized Material 3 color palette for bright, child-friendly contrast',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_pink">#EC4899</color>
    <color name="primary_blue">#3B82F6</color>
    <color name="primary_green">#10B981</color>
    <color name="primary_amber">#F59E0B</color>
    <color name="primary_purple">#8B5CF6</color>

    <color name="bg_light">#FFFBEB</color>
    <color name="surface_light">#FFFFFF</color>
    <color name="text_dark">#1F2937</color>
    <color name="text_light">#F9FAFB</color>

    <color name="bg_dark">#111827</color>
    <color name="surface_dark">#1F2937</color>
</resources>
`,
  },
  {
    path: 'app/src/main/res/values/themes.xml',
    category: 'res',
    description: 'Material 3 DayNight theme definition',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="Theme.MaktabgachaTalim" parent="android:Theme.Material.Light.NoActionBar">
        <item name="android:statusBarColor">@android:color/transparent</item>
        <item name="android:navigationBarColor">@android:color/transparent</item>
        <item name="android:windowLightStatusBar">true</item>
    </style>
</resources>
`,
  },
  {
    path: 'app/src/main/java/uz/maktabgacha/talim/MaktabgachaApp.kt',
    category: 'kotlin_core',
    description: 'Application class for dependency setup and global context',
    content: `package uz.maktabgacha.talim

import android.app.Application

class MaktabgachaApp : Application() {
    override fun onCreate() {
        super.onCreate()
        // Initialize local database, audio engines, or crash-safe logging
    }
}
`,
  },
  {
    path: 'app/src/main/java/uz/maktabgacha/talim/MainActivity.kt',
    category: 'kotlin_core',
    description: 'Main Activity with Edge-to-Edge enableEdgeToEdge(), window insets & Compose Navigation',
    content: `package uz.maktabgacha.talim

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import uz.maktabgacha.talim.ui.navigation.MaktabgachaNavHost
import uz.maktabgacha.talim.ui.theme.MaktabgachaTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Android 14/15 modern edge-to-edge system bar handling
        enableEdgeToEdge()

        setContent {
            MaktabgachaTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MaktabgachaNavHost()
                }
            }
        }
    }
}
`,
  },
  {
    path: 'app/src/main/java/uz/maktabgacha/talim/data/model/PreschoolModels.kt',
    category: 'kotlin_data',
    description: 'Data models for age groups, categories, lessons, didactic games, quizzes & progress',
    content: `package uz.maktabgacha.talim.data.model

enum class AgeGroup(val label: String) {
    AGE_3_4("3-4 yosh"),
    AGE_4_5("4-5 yosh"),
    AGE_5_6("5-6 yosh"),
    AGE_6_7("6-7 yosh")
}

enum class CategoryId {
    RANGLAR,
    RAQAMLAR,
    MEVALAR,
    SABZAVOTLAR,
    HAYVONLAR
}

data class Category(
    val id: CategoryId,
    val title: String,
    val subtitle: String,
    val emoji: String,
    val colorHex: Long
)

data class Lesson(
    val id: String,
    val categoryId: CategoryId,
    val name: String,
    val nameEn: String,
    val description: String,
    val funFact: String,
    val emoji: String,
    val colorHex: Long? = null,
    val soundName: String? = null,
    val minAge: AgeGroup = AgeGroup.AGE_3_4,
    val examples: List<String> = emptyList()
)

data class QuizOption(
    val text: String,
    val emoji: String,
    val isCorrect: Boolean
)

data class QuizQuestion(
    val id: String,
    val question: String,
    val categoryId: CategoryId,
    val ageGroup: AgeGroup,
    val options: List<QuizOption>,
    val explanation: String
)

data class DidacticGame(
    val id: String,
    val title: String,
    val description: String,
    val emoji: String,
    val colorHex: Long
)

data class UserProgress(
    val selectedAge: AgeGroup = AgeGroup.AGE_3_4,
    val completedLessons: Set<String> = emptySet(),
    val totalStars: Int = 0,
    val bestQuizScore: Int = 0,
    val gamesPlayed: Int = 0,
    val childName: String = "Bolajon"
)
`,
  },
  {
    path: 'app/src/main/java/uz/maktabgacha/talim/data/repository/PreschoolRepository.kt',
    category: 'kotlin_data',
    description: 'Offline-first repository providing curriculum data, sound references & persistence',
    content: `package uz.maktabgacha.talim.data.repository

import uz.maktabgacha.talim.data.model.*

class PreschoolRepository {

    fun getCategories(): List<Category> = listOf(
        Category(CategoryId.RANGLAR, "Ranglar Olami", "Qizil, sariq, yashil, ko'k", "🎨", 0xFFEC4899),
        Category(CategoryId.RAQAMLAR, "Raqamlar va Sanash", "1 dan 10 gacha sanash", "🔢", 0xFF3B82F6),
        Category(CategoryId.MEVALAR, "Shirin Mevalar", "Olma, nok, shaftoli, anor", "🍎", 0xFFEF4444),
        Category(CategoryId.SABZAVOTLAR, "Foydali Sabzavotlar", "Sabzi, pomidor, bodring", "🥕", 0xFF10B981),
        Category(CategoryId.HAYVONLAR, "Jonivorlar va Qushlar", "Mushuk, kuchuk, ot, sigir", "🐾", 0xFFF59E0B)
    )

    fun getLessons(categoryId: CategoryId? = null, age: AgeGroup? = null): List<Lesson> {
        val all = listOf(
            Lesson("c_red", CategoryId.RANGLAR, "Qizil rang", "Red", "Qizil rang juda issiq va yorqin rang.", "Olma va qulupnay qizil rangda bo'ladi.", "🔴", 0xFFEF4444, examples = listOf("🍎 Olma", "🍓 Qulupnay", "🌹 Gul")),
            Lesson("c_yellow", CategoryId.RANGLAR, "Sariq rang", "Yellow", "Sariq rang quyosh va quvonch rangi.", "Quyoshjon va shirin banan sariq rangda.", "🟡", 0xFFFBBF24, examples = listOf("☀️ Quyosh", "🍌 Banan", "🍋 Limon")),
            Lesson("c_green", CategoryId.RANGLAR, "Yashil rang", "Green", "Yashil rang tabiat va barglarning rangi.", "Bahorda daraxtlar yashil libos kiyadi.", "🟢", 0xFF10B981, examples = listOf("🍃 Barg", "🥒 Bodring", "🌲 Daraxt")),
            Lesson("c_blue", CategoryId.RANGLAR, "Ko'k (Moviy) rang", "Blue", "Moviy rang tiniq osmon va dengiz rangi.", "Osmonda oq bulutlar suzib yuradi.", "🔵", 0xFF3B82F6, examples = listOf("🌌 Osmon", "💧 Tomchi")),
            Lesson("n_1", CategoryId.RAQAMLAR, "1 - Bir raqami", "One", "Bitta narsani ifodalaydi.", "Bitta quyosh bor.", "1️⃣", examples = listOf("☀️ Bitta quyosh")),
            Lesson("n_2", CategoryId.RAQAMLAR, "2 - Ikki raqami", "Two", "Juftlikni ifodalaydi.", "Ikkita ko'zimiz va qulog'imiz bor.", "2️⃣", examples = listOf("👀 Ikkita ko'z", "👂 Ikkita quloq")),
            Lesson("n_3", CategoryId.RAQAMLAR, "3 - Uch raqami", "Three", "Uchburchakning uchta tomoni bor.", "Svetaforda uchta chiroq bor.", "3️⃣", examples = listOf("🔺 Uchburchak", "🚥 Svetafor")),
            Lesson("f_apple", CategoryId.MEVALAR, "Olma", "Apple", "Shirin va qarsildoq meva.", "Olmaning qizil, sariq va yashil turlari bor.", "🍎", examples = listOf("Qizil olma", "Yashil olma")),
            Lesson("f_banana", CategoryId.MEVALAR, "Banan", "Banana", "Sariq va quvvat beruvchi meva.", "Maymunvoylar bananni sevadilar.", "🍌", examples = listOf("Sariq banan")),
            Lesson("v_carrot", CategoryId.SABZAVOTLAR, "Sabzi", "Carrot", "Ko'rish qobiliyatini oshiruvchi sabzavot.", "Quyonchalar sabzini yaxshi ko'radi.", "🥕", examples = listOf("Sabzili salat")),
            Lesson("a_cat", CategoryId.HAYVONLAR, "Mushukcha", "Cat", "Mayin va erka uy hayvoni.", "U 'Miyov-miyov' deb ovoz beradi.", "🐱", soundName = "cat", examples = listOf("Miyov-miyov")),
            Lesson("a_dog", CategoryId.HAYVONLAR, "Kuchukcha", "Dog", "Insonning eng vafodor do'sti.", "U 'Vov-vov' deb uyni qo'riqlaydi.", "🐶", soundName = "dog", examples = listOf("Vov-vov"))
        )
        return all.filter { (categoryId == null || it.categoryId == categoryId) }
    }

    fun getQuizQuestions(age: AgeGroup): List<QuizQuestion> {
        return listOf(
            QuizQuestion(
                id = "q1",
                question = "Qizil olma qaysi rasmda ko'rsatilgan?",
                categoryId = CategoryId.RANGLAR,
                ageGroup = AgeGroup.AGE_3_4,
                options = listOf(
                    QuizOption("Qizil olma", "🍎", true),
                    QuizOption("Yashil bodring", "🥒", false),
                    QuizOption("Sariq banan", "🍌", false)
                ),
                explanation = "Barakalla! Olma qizil rangda bo'ladi."
            ),
            QuizQuestion(
                id = "q2",
                question = "Qaysi hayvon 'Miyov-miyov' deydi?",
                categoryId = CategoryId.HAYVONLAR,
                ageGroup = AgeGroup.AGE_3_4,
                options = listOf(
                    QuizOption("Mushukcha", "🐱", true),
                    QuizOption("Kuchukcha", "🐶", false),
                    QuizOption("Sigir", "🐮", false)
                ),
                explanation = "To'g'ri! Mushukchalar 'miyov-miyov' deydi."
            )
        )
    }
}
`,
  },
  {
    path: 'app/src/main/java/uz/maktabgacha/talim/ui/viewmodel/PreschoolViewModel.kt',
    category: 'kotlin_core',
    description: 'Android ViewModel with StateFlow, UI state management & event triggers',
    content: `package uz.maktabgacha.talim.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import uz.maktabgacha.talim.data.model.*
import uz.maktabgacha.talim.data.repository.PreschoolRepository

data class PreschoolUiState(
    val currentAge: AgeGroup = AgeGroup.AGE_3_4,
    val selectedCategory: CategoryId? = null,
    val searchQuery: String = "",
    val completedLessons: Set<String> = setOf("c_red", "n_1"),
    val stars: Int = 12,
    val childName: String = "Bolajon",
    val soundEnabled: Boolean = true
)

class PreschoolViewModel(
    private val repository: PreschoolRepository = PreschoolRepository()
) : ViewModel() {

    private val _uiState = MutableStateFlow(PreschoolUiState())
    val uiState: StateFlow<PreschoolUiState> = _uiState.asStateFlow()

    fun setAgeGroup(age: AgeGroup) {
        _uiState.update { it.copy(currentAge = age) }
    }

    fun selectCategory(categoryId: CategoryId?) {
        _uiState.update { it.copy(selectedCategory = categoryId) }
    }

    fun updateSearch(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
    }

    fun markLessonCompleted(lessonId: String) {
        _uiState.update {
            val updated = it.completedLessons + lessonId
            it.copy(
                completedLessons = updated,
                stars = it.stars + 1
            )
        }
    }

    fun toggleSound() {
        _uiState.update { it.copy(soundEnabled = !it.soundEnabled) }
    }

    fun resetData() {
        _uiState.update {
            PreschoolUiState(currentAge = it.currentAge)
        }
    }
}
`,
  },
  {
    path: 'app/src/main/java/uz/maktabgacha/talim/ui/navigation/NavGraph.kt',
    category: 'kotlin_ui',
    description: 'Material 3 Navigation Bar and Animated Jetpack Compose NavHost',
    content: `package uz.maktabgacha.talim.ui.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.compose.*
import uz.maktabgacha.talim.ui.screens.*

sealed class Screen(val route: String, val title: String, val icon: ImageVector) {
    data object Home : Screen("home", "Bosh sahifa", Icons.Default.Home)
    data object Lessons : Screen("lessons", "Darslar", Icons.Default.MenuBook)
    data object Games : Screen("games", "O'yinlar", Icons.Default.Gamepad)
    data object Quiz : Screen("quiz", "Viktorina", Icons.Default.Extension)
    data object Results : Screen("results", "Yutuqlar", Icons.Default.EmojiEvents)
    data object Settings : Screen("settings", "Sozlamalar", Icons.Default.Settings)
}

@Composable
fun MaktabgachaNavHost() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val screens = listOf(
        Screen.Home,
        Screen.Lessons,
        Screen.Games,
        Screen.Quiz,
        Screen.Results,
        Screen.Settings
    )

    Scaffold(
        bottomBar = {
            NavigationBar {
                screens.forEach { screen ->
                    NavigationBarItem(
                        selected = currentRoute == screen.route,
                        onClick = {
                            if (currentRoute != screen.route) {
                                navController.navigate(screen.route) {
                                    popUpTo(Screen.Home.route) { saveState = true }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        },
                        icon = { Icon(screen.icon, contentDescription = screen.title) },
                        label = { Text(screen.title, maxLines = 1) }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Home.route) {
                HomeScreen(
                    onNavigateToCategory = { navController.navigate(Screen.Lessons.route) },
                    onNavigateToGame = { navController.navigate(Screen.Games.route) }
                )
            }
            composable(Screen.Lessons.route) { LessonsScreen() }
            composable(Screen.Games.route) { GamesScreen() }
            composable(Screen.Quiz.route) { QuizScreen() }
            composable(Screen.Results.route) { ResultsScreen() }
            composable(Screen.Settings.route) { SettingsScreen() }
        }
    }
}
`,
  },
  {
    path: 'app/src/main/java/uz/maktabgacha/talim/ui/screens/HomeScreen.kt',
    category: 'kotlin_ui',
    description: 'Child-friendly Home Screen with Age Selector, Star Counter, Categories & Daily Cards',
    content: `package uz.maktabgacha.talim.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import uz.maktabgacha.talim.data.model.AgeGroup

@Composable
fun HomeScreen(
    onNavigateToCategory: () -> Unit,
    onNavigateToGame: () -> Unit
) {
    var selectedAge by remember { mutableStateOf(AgeGroup.AGE_3_4) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(8.dp))
            // Header with Child Avatar and Star Counter
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Assalomu alaykum! 👋",
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = "Kichik Bilimdon",
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold
                    )
                }

                // Stars chip
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color(0xFFFEF3C7)
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Icon(Icons.Default.Star, contentDescription = "Yulduz", tint = Color(0xFFF59E0B))
                        Text("12", fontWeight = FontWeight.Bold, color = Color(0xFFB45309))
                    }
                }
            }
        }

        item {
            // Age Group Selector Chips
            Text(
                text = "Bolaning yoshi:",
                style = MaterialTheme.typography.labelLarge,
                fontWeight = FontWeight.SemiBold
            )
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(top = 8.dp)
            ) {
                items(AgeGroup.values()) { age ->
                    FilterChip(
                        selected = selectedAge == age,
                        onClick = { selectedAge = age },
                        label = { Text(age.label, fontWeight = FontWeight.Bold) }
                    )
                }
            }
        }

        item {
            // Daily Didactic Hero Banner
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onNavigateToGame() },
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFEC4899))
            ) {
                Row(
                    modifier = Modifier.padding(20.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "Bugungi O'yin: Ranglarni Top!",
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Olma va qulupnayning rangini toping va 3 ta yulduz yuting!",
                            color = Color.White.copy(alpha = 0.9f),
                            fontSize = 13.sp
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Button(
                            onClick = onNavigateToGame,
                            colors = ButtonDefaults.buttonColors(containerColor = Color.White)
                        ) {
                            Text("O'ynash 🎮", color = Color(0xFFEC4899), fontWeight = FontWeight.Bold)
                        }
                    }
                    Text(text = "🎨", fontSize = 48.sp)
                }
            }
        }

        item {
            Text(
                text = "Ta'lim Bo'limlari",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
        }

        // Categories Grid/List
        items(
            listOf(
                Triple("Ranglar Olami", "10 ta rang", "🎨"),
                Triple("Raqamlar va Sanash", "1 dan 10 gacha", "🔢"),
                Triple("Shirin Mevalar", "8 ta meva", "🍎"),
                Triple("Foydali Sabzavotlar", "8 ta sabzavot", "🥕"),
                Triple("Jonivorlar va Ovozlari", "10 ta jonivor", "🐾")
            )
        ) { item ->
            ElevatedCard(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onNavigateToCategory() },
                shape = RoundedCornerShape(16.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(Color(0xFFEFF6FF)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(text = item.third, fontSize = 26.sp)
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(text = item.first, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                        Text(text = item.second, color = Color.Gray, fontSize = 13.sp)
                    }
                    Text(text = "➜", color = Color.Gray, fontSize = 16.sp)
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}
`,
  },
  {
    path: 'app/src/main/java/uz/maktabgacha/talim/ui/theme/Color.kt',
    category: 'kotlin_ui',
    description: 'Material 3 Color Scheme palette definition in Kotlin',
    content: `package uz.maktabgacha.talim.ui.theme

import androidx.compose.ui.graphics.Color

val Pink80 = Color(0xFFFBCFE8)
val PinkGrey80 = Color(0xFFFCE7F3)
val Amber80 = Color(0xFFFDE68A)

val Pink40 = Color(0xFFDB2777)
val PinkGrey40 = Color(0xFF9D174D)
val Amber40 = Color(0xFFD97706)
`,
  },
  {
    path: 'app/src/main/java/uz/maktabgacha/talim/ui/theme/Theme.kt',
    category: 'kotlin_ui',
    description: 'Material 3 Dynamic Theme with dark & light mode support',
    content: `package uz.maktabgacha.talim.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Pink80,
    secondary = Amber80,
    tertiary = PinkGrey80
)

private val LightColorScheme = lightColorScheme(
    primary = Pink40,
    secondary = Amber40,
    tertiary = PinkGrey40
)

@Composable
fun MaktabgachaTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
`,
  },
];
