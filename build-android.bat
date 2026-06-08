@echo off
chcp 65001 >nul
REM 快乐学英语 - Android APK 构建脚本 (Windows)
REM 使用方法: build-android.bat

echo ==========================================
echo   快乐学英语 - Android APK 构建
echo ==========================================
echo.

REM 检查 Node.js
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到 npm，请先安装 Node.js
    pause
    exit /b 1
)

echo ✅ 检查 Node.js 环境...

REM 检查是否在正确目录
if not exist "package.json" (
    echo ❌ 错误: 请在项目根目录运行此脚本
    pause
    exit /b 1
)

REM 安装依赖（如果需要）
echo.
echo 📦 检查并安装 npm 依赖...
call npm install

REM 构建 Web 应用
echo.
echo 🏗️ 构建 Web 应用...
call npm run build

REM 同步到 Android
echo.
echo 🔄 同步到 Android 项目...
call npx cap sync android

REM 进入 Android 目录
echo.
echo 📱 构建 Android APK...
cd android

REM 构建 APK
if exist "gradlew.bat" (
    call gradlew.bat assembleDebug
) else (
    echo ⚠️  警告: 未找到 gradlew.bat，请尝试使用系统 gradle
    where gradle >nul 2>nul
    if %errorlevel% equ 0 (
        call gradle assembleDebug
    ) else (
        echo ❌ 错误: 未找到 gradle，请安装 Gradle 或使用 Android Studio 构建
        cd ..
        pause
        exit /b 1
    )
)

REM 检查是否构建成功
cd ..
set APK_PATH=android\app\build\outputs\apk\debug\app-debug.apk

if exist "%APK_PATH%" (
    echo.
    echo 🎉 构建成功！
    echo 📍 APK 位置: %CD%\%APK_PATH%
    echo.
    echo 📋 下一步:
    echo   1. 使用 ADB 安装到设备: adb install %APK_PATH%
    echo   2. 或者直接将 APK 文件复制到手机安装
    echo.
) else (
    echo.
    echo ❌ 构建失败，请查看上面的错误信息
)

pause
