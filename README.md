# 预测之书 — 微信小程序版（ebook-miniapp）

基于微信小程序原生框架 + 腾讯云 CloudBase 的电子书阅读器，支持逐句高亮 TTS 语音朗读、AI 问答、书签笔记，并可编译为 iOS/Android 原生 App。

## 功能

- **三幕剧电子书**：封面 → 目录 → 阅读器，支持暗色模式、字号/行距调节
- **Edge TTS 逐句朗读**：基于 Edge TTS WSS 协议的云函数，zh-CN-XiaoxiaoNeural 女声，并行预取消除句间延迟
- **AI 问答**：长按句子可向 AI 提问，基于当前章节上下文回答
- **书签 + 笔记**：长按标记书签、添加笔记，侧边栏管理，支持滑动删除
- **多端编译**：已升级为多端项目，可在微信开发者工具中一键构建 Android APK / iOS IPA

## 技术栈

| 层面 | 技术 |
|---|---|
| 框架 | 微信小程序原生 + 多端框架（Donut） |
| 后端 | 腾讯云 CloudBase 云开发 |
| 云函数 | `get_data` / `tts` / `ai_qa` / `gen_content` |
| TTS | Edge TTS WSS（Sec-MS-GEC DRM 协议逆向） |
| AI | TokenHub API |

## 项目结构

```
ebook-miniapp/
├── app.js                  # 入口，CloudBase 初始化
├── app.json                # 页面路由、窗口配置
├── app.wxss                # 全局样式
├── theme.json              # 暗色模式主题
├── project.config.json     # 微信开发者工具项目配置
├── project.miniapp.json    # 多端应用配置（Android/iOS）
├── cloudbaserc.example.json # CloudBase 云函数配置模板
├── pages/
│   ├── cover/              # 封面页
│   ├── toc/                # 目录页（幕→章节）
│   └── reader/             # 阅读器（句子模式/段落模式、TTS、AI、书签笔记）
├── cloudfunctions/
│   ├── get_data/           # 书籍数据 API
│   ├── tts/                # Edge TTS 语音合成（WSS + DRM）
│   ├── ai_qa/              # AI 问答
│   └── gen_content/        # 内容生成
├── utils/
│   └── api.js              # 网络请求封装（云函数优先）
├── i18n/                   # 多语言
└── miniapp/                # 多端原生资源（Android 图标、启动页等）
```

## 本地运行

1. 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)（≥ 1.06.2306272）
2. 克隆仓库，用开发者工具打开
3. 复制 `cloudbaserc.example.json` 为 `cloudbaserc.json`，填入你的 CloudBase 环境 ID 和密钥
4. 在开发者工具中开通云开发，部署云函数
5. 编译运行

> TTS 云函数需将超时时间调至 **60 秒**（默认 3 秒会导致超时报错），在 CloudBase 控制台修改。

## 构建移动 App

项目已升级为多端项目（`projectArchitecture: "multiPlatform"`），在微信开发者工具中切换至「多端应用模式」即可：

- **Android**：工具栏 → 构建 → 打包生成 APK（需 Android 签名证书）
- **iOS**：工具栏 → 构建 → 打包生成 IPA（需 Apple 开发者账号 + 证书 + Profile）

## 注意事项

- `cloudbaserc.json` 包含密钥，已加入 `.gitignore`，请勿提交
- TTS 云函数内 `TRUSTED_CLIENT_TOKEN` 为硬编码值，如遇 Edge TTS 协议更新需同步修改
- 构建多端 App 时，微信特有 API（如 `wx.login`）需通过条件编译或开放平台替代

## 许可证

MIT
