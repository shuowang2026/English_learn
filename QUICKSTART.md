# 快速开始 - 本地构建 Android 应用

## 🚀 最简单的方法

### 方法一：使用 Android Studio (推荐)

1. 下载并安装 Android Studio: https://developer.android.com/studio

2. 打开 Android Studio

3. 打开项目:
   - 选择 "Open an Existing Project"
   - 选择 `workspace/android` 目录
   - 等待 Gradle 同步完成（首次需要下载依赖）

4. 构建 APK:
   - 点击菜单: Build > Build Bundle(s) / APK(s) > Build APK(s)
   - 等待构建完成
   - 在底部会显示 APK 的位置

5. APK 位置:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### 方法二：使用命令行脚本

**Mac/Linux 用户:
```bash
./build-android.sh
```

**Windows 用户:**
```cmd
build-android.bat
```

## 📋 详细说明

详细的构建指南请查看: [BUILD.md](./BUILD.md)

## 🎨 预览应用 (无需构建)

你也可以直接在浏览器中预览 Web 应用：

```bash
npm run dev
```

然后打开: http://localhost:5173/

## 💡 提示

- 首次使用 Android Studio 需要下载 Android SDK，约 2-3 GB，建议选择默认安装即可
- 构建 APK 过程可能需要 5-15 分钟，取决于网络和电脑性能
- 构建好的 APK 可以直接在 Android 手机安装（需允许未知来源安装）
