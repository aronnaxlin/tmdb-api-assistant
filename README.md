# TMDB 助手 - EMBY 文件重命名工具

一个纯前端的 TMDB (The Movie Database) 查询助手，专为 EMBY 媒体库文件重命名而设计。

**✨ 已集成 Vercel Serverless 后端，开箱即用，无需配置 API Token！**

---

## 功能特性

- 🔍 **多语言搜索**：支持简体中文、繁体中文、英语、日语的影视作品搜索
- 🎬 **电影与电视剧支持**：查询电影和电视剧的完整信息
- 📋 **快速复制命名格式**：一键复制符合 EMBY 规范的文件/文件夹命名
- 🌐 **多语言命名**：同时显示多种语言的标准命名格式
- 📺 **分季信息**：完整显示电视剧的所有季度信息
- 🎨 **Material You 设计**：采用 Google Material Design 3 (Blue Aesthetic) 设计风格
- 🚀 **Serverless 架构**：基于 Vercel，无需用户配置，开箱即用

---

## 快速开始

### 在线使用

直接访问已部署的网站（部署后填入链接），无需任何配置！

### 本地开发

```bash
# 克隆项目
git clone <your-repo-url>
cd tmdb-api-assistant

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的 TMDB API Token

# 安装 Vercel CLI
npm install -g vercel

# 启动本地开发服务器
vercel dev
```

访问 `http://localhost:3000` 即可。

---

## 部署到 Vercel

详细部署步骤请查看 [DEPLOY.md](DEPLOY.md)

**快速部署：**

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel

# 配置环境变量 TMDB_API_TOKEN
# 在 Vercel Dashboard 中添加
```

---

## 使用方法

### 1. 搜索影视作品

1. 在搜索框中输入电影或电视剧名称
2. 选择媒体类型（电影/电视剧/全部）
3. 选择显示语言（简体中文/繁体中文/英语/日语）
4. 自动显示搜索结果

### 2. 获取重命名格式

点击任意搜索结果后，系统会显示：

- **基本信息**：TMDB ID、多语言标题、年份等
- **分季信息**（电视剧）：所有季度的详细信息
- **重命名格式**：符合 EMBY 规范的命名格式

#### 电影命名示例

```
间谍过家家 (2022)
东京爱情故事 (1991)
棋士 (2025)[tmdbid-258490]
```

#### 电视剧命名示例

**文件夹结构：**
```
间谍过家家 (2022)[tmdbid-140960]/
├── Season 01/
│   ├── 间谍过家家 S01E01.mkv
│   ├── 间谍过家家 S01E02.mkv
│   └── ...
└── Season 02/
    ├── 间谍过家家 S02E01.mkv
    └── ...
```

**特殊季（番外篇等）：**
```
Season 00/
```

## 技术特点

- ✅ Serverless 架构，基于 Vercel Functions
- ✅ 纯前端界面，零配置使用
- ✅ 后端 API 代理，保护 API Token 安全
- ✅ 响应式设计，支持移动端
- ✅ 防抖搜索，提升用户体验
- ✅ 一键复制功能
- ✅ Material Design 3 (Blue Aesthetic) 设计风格

---

## 项目结构
api/                    # Vercel Serverless Functions
│   ├── search.js          # 搜索 API
│   └── details.js         # 详情 API
├── index.html             # 主页面
├── styles.css             # Material You 样式
├── app.js                 # 应用逻辑
├── vercel.json            # Vercel 配置
├── .env.example           # 环境变量示例
├── DEPLOY.md              # 部署指南
└── README.md              # 说明文档
```

---

## API 配额说明

- **Vercel 免费版**：每月 100GB 带宽，Function 执行时间 10 秒
- **TMDB API**：每 10 秒最多 50 个请求
- 建议：添加缓存机制以减少 API 调用次数

--- styles.css      # Material You 样式
├── app.js          # 应用逻辑
└── README.md       # 说明文档
```

## 支持的语言

- 🇨🇳 简体中文 (zh-CN)
- 🇹🇼 繁体中文 (zh-TW)
- 🇺🇸 英语 (en-US)
- 🇯🇵 日语 (ja-JP)

---

## 相关资源

- 📘 [部署指南](DEPLOY.md)
- 🔗 建议使用 Read Access Token，不要使用 API Key

⚠️ **API 限制**：
- TMDB API 有速率限制
- 建议合理使用，避免频繁请求

## 开发信息

- **设计风格**：Google Material You (Material Design 3)
- **API 版本**：TMDB API v3
- **前端技术**：原生 HTML + CSS + JavaScript
- **依赖**：仅依赖 Google Fonts 和 Material Icons

## 许可证

本项目仅供个人学习和使用。

## 相关链接

- [TMDB API 文档](https://developer.themoviedb.org/docs/getting-started)
- [EMBY 官网](https://emby.media/)
- [Material Design 3](https://m3.material.io/)
🔗 [TMDB API 文档](https://developer.themoviedb.org/docs/getting-started)
- 🚀 [Vercel 文档](https://vercel.com/docs)
- 🎬 [EMBY 官网](https://emby.media/)
- 🎨 [Material Design 3](https://m3.material.io/)

---

**🎉 现在就开始使用，让 EMBY 文件重命名变得简单高效！**
