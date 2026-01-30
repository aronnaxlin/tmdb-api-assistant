# TMDB 助手 - EMBY 文件重命名工具

一个基于 Vercel Serverless 的 TMDB (The Movie Database) 查询助手，专为 EMBY 媒体库文件重命名而设计。

**✨ GitHub + Vercel 自动部署，开箱即用，性能优化，快速访问！**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/你的用户名/tmdb-api-assistant)

---

## 🌟 功能特性

- 🔍 **多语言搜索**：支持简体中文、繁体中文、英语、日语的影视作品搜索
- 🎬 **电影与电视剧支持**：查询电影和电视剧的完整信息
- 📋 **快速复制命名格式**：一键复制符合 EMBY 规范的文件/文件夹命名
- 🌐 **多语言命名**：同时显示多种语言的标准命名格式
- 📺 **分季信息**：完整显示电视剧的所有季度信息
- 🎨 **Material Design 3**：采用 Google Material You (Blue Aesthetic) 设计风格
- 🚀 **自动 CI/CD**：推送代码到 GitHub 自动部署
- 🔒 **安全**：API Token 隐藏在服务器端
- ⚡ **性能优化**：亚太区域部署、智能缓存、DNS 预连接

---

## ⚠️ 常见问题快速解决

### 问题：部署后需要登录 Vercel 才能访问？

**解决方案**：
1. 进入 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择项目 → **Settings** → **General**
3. 找到 **Deployment Protection** → **Vercel Authentication**
4. 确保为 **OFF（关闭）**状态
5. 重新部署

详细说明见 [📘 访问权限指南](VERCEL_ACCESS_GUIDE.md)

### 问题：访问速度很慢？

**已优化**：
- ✅ 使用亚太区域节点（香港、新加坡）
- ✅ 启用智能缓存策略
- ✅ DNS 预连接和资源预加载
- ✅ 增加 Serverless 函数内存

**快速部署优化版本**：
```bash
./deploy-optimized.sh
```

详细说明见 [📘 访问权限和性能指南](VERCEL_ACCESS_GUIDE.md)

---

## 🚀 快速部署（5分钟）

### 方式 1: 一键部署（推荐）

1. 点击上方的 **Deploy with Vercel** 按钮
2. 使用 GitHub 登录 Vercel
3. 配置环境变量 `TMDB_API_TOKEN`（[获取方式](https://www.themoviedb.org/settings/api)）
4. 点击 Deploy
5. **重要**：部署后检查并关闭 Vercel Authentication（见上方常见问题）

完成！访问 Vercel 提供的域名即可使用（无需登录）。

### 方式 2: 优化部署脚本（性能最佳）

```bash
# 使用优化部署脚本
./deploy-optimized.sh
```

此脚本会：
- ✅ 自动检查环境
- ✅ Git 提交并推送
- ✅ 部署到 Vercel
- ✅ 提供配置检查清单

### 方式 3: 手动部署

详见 [📖 快速开始指南 (QUICKSTART.md)](QUICKSTART.md)

### 方式 4: Fork 后部署

1. Fork 本仓库
2. 在 [Vercel](https://vercel.com/new) 导入你的仓库
3. 配置环境变量 `TMDB_API_TOKEN`
4. 部署完成
5. **关闭 Vercel Authentication**

---

## 📖 文档

- 🚀 [快速开始](QUICKSTART.md) - 5分钟部署指南
- 📚 [完整部署文档](DEPLOY.md) - 详细部署步骤、工作流程、常见问题
- 🔓 [访问权限和性能优化](VERCEL_ACCESS_GUIDE.md) - 解决登录问题和速度优化

---

## 💻 本地开发

```bash
# 克隆项目
git clone https://github.com/你的用户名/tmdb-api-assistant.git
cd tmdb-api-assistant

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的 TMDB API Token

# 安装 Vercel CLI（首次）
npm install -g vercel

# 启动本地开发服务器
vercel dev
```

访问 `http://localhost:3000` 即可。

---

## 🔄 自动部署流程

推送代码到 GitHub 后，Vercel 会自动：

1. ✅ 检测代码变化
2. ✅ 自动构建和部署
3. ✅ 运行 Serverless Functions
4. ✅ 更新生产环境

```bash
# 日常更新流程
git add .
git commit -m "更新说明"
git push origin main  # 自动部署到生产环境
```

**分支策略**：
- `main` 分支 → 自动部署到生产环境
- 其他分支 → 自动创建预览部署
- Pull Request → 独立预览环境

---

## 📋 使用说明

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
