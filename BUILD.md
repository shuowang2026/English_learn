# 快乐学英语 - 安卓 APK 云端构建指南

## 一键构建流程

本项目已配置 GitHub Actions，推送代码即自动构建 APK，无需在本机安装 Android Studio / JDK / SDK。

---

## 步骤一：把项目推送到 GitHub

```bash
# 1. 在 GitHub 新建一个仓库（名称随意，选 Private 即可）
# 2. 在项目目录执行：

cd jiubao-english-app

git init
git add .
git commit -m "init: jiubao english app"
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git branch -M main
git push -u origin main
```

> 替换 `<你的用户名>` 和 `<仓库名>` 为你实际的 GitHub 信息。

---

## 步骤二：等待构建完成

推送后 GitHub 自动触发构建，约 **5~10 分钟** 完成。

查看进度：
- 打开 GitHub 仓库页面
- 点击顶部 **"Actions"** 标签
- 找到最新一条 **"Build Android APK"** 工作流，点击进入

---

## 步骤三：下载 APK

构建成功后，在 Actions 页面的 **Artifacts** 区域找到：

```
jiubao-english-debug-1
```

点击下载 zip，解压后得到 `app-debug.apk`。

---

## 手动触发构建

无需推送代码，也可以手动触发：

1. GitHub 仓库 → Actions → "Build Android APK"
2. 点击右侧 **"Run workflow"** → **"Run workflow"**

---

## 注意事项

| 项目 | 说明 |
|------|------|
| APK 类型 | debug（未签名，可直接安装到开启了"允许未知来源"的安卓手机）|
| 保留时间 | 7 天，过期后需重新触发构建 |
| 免费额度 | GitHub 公开仓库免费；私有仓库每月 2000 分钟（远超需求）|
| JDK 版本 | Actions 使用 JDK 17（Temurin），与 Gradle 8.x 兼容 |
