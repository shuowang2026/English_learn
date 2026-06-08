#!/bin/bash

# 快乐学英语 - Android APK 构建脚本
# 使用方法: ./build-android.sh

echo "=========================================="
echo "  快乐学英语 - Android APK 构建"
echo "=========================================="
echo ""

# 检查 Node.js
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 Node.js"
    exit 1
fi

echo "✅ 检查 Node.js 环境..."

# 检查是否在正确目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 安装依赖（如果需要）
echo ""
echo "📦 检查并安装 npm 依赖..."
npm install

# 构建 Web 应用
echo ""
echo "🏗️  构建 Web 应用..."
npm run build

# 同步到 Android
echo ""
echo "🔄 同步到 Android 项目..."
npx cap sync android

# 进入 Android 目录
echo ""
echo "📱 构建 Android APK..."
cd android

# 构建 APK
if [ -f "gradlew" ]; then
    chmod +x gradlew
    ./gradlew assembleDebug
else
    echo "⚠️  警告: 未找到 gradlew，请尝试使用系统 gradle"
    if command -v gradle &> /dev/null; then
        gradle assembleDebug
    else
        echo "❌ 错误: 未找到 gradle，请安装 Gradle 或使用 Android Studio 构建"
        cd ..
        exit 1
    fi
fi

# 检查是否构建成功
cd ..
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"

if [ -f "$APK_PATH" ]; then
    echo ""
    echo "🎉 构建成功！"
    echo "📍 APK 位置: $(pwd)/$APK_PATH"
    echo ""
    echo "📋 下一步:"
    echo "  1. 使用 ADB 安装到设备: adb install $APK_PATH"
    echo "  2. 或者直接将 APK 文件复制到手机安装"
    echo ""
else
    echo ""
    echo "❌ 构建失败，请查看上面的错误信息"
    exit 1
fi
