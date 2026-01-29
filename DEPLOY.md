# Vercel 部署指南

## 快速部署步骤

### 1. 准备 TMDB API Token

访问 [TMDB API 设置页面](https://www.themoviedb.org/settings/api) 获取你的 **Read Access Token**（Bearer Token）。

---

### 2. 部署到 Vercel

#### 方式一：通过 Vercel CLI（推荐）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 在项目目录下执行
vercel

# 首次部署会要求登录并链接项目
# 按照提示完成配置
```

#### 方式二：通过 GitHub + Vercel Dashboard

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel Dashboard](https://vercel.com/new)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. 点击 "Deploy"

---

### 3. 配置环境变量

在 Vercel 项目设置中添加环境变量：

1. 进入项目的 **Settings** → **Environment Variables**
2. 添加以下变量：
   - **Key**: `TMDB_API_TOKEN`
   - **Value**: 你的 TMDB Bearer Token
   - **Environment**: 全选（Production, Preview, Development）

3. 点击 **Save**
4. 重新部署项目使环境变量生效

---

### 4. 验证部署

访问 Vercel 提供的域名，例如：
```
https://your-project-name.vercel.app
```

开始使用！无需任何配置，直接搜索即可。

---

## 本地开发

### 1. 安装依赖

```bash
# 安装 Vercel CLI（如果还没安装）
npm install -g vercel
```

### 2. 配置本地环境变量

创建 `.env` 文件：

```bash
cp .env.example .env
```

编辑 `.env`，填入你的 TMDB API Token：

```
TMDB_API_TOKEN=你的Bearer_Token
```

### 3. 运行本地开发服务器

```bash
# 使用 Vercel Dev
vercel dev
```

访问 `http://localhost:3000` 即可在本地测试。

---

## 项目结构

```
tmdb-api-assistant/
├── api/                    # Serverless 函数
│   ├── search.js          # 搜索 API
│   └── details.js         # 详情 API
├── index.html             # 前端页面
├── app.js                 # 前端逻辑
├── styles.css             # 样式文件
├── vercel.json            # Vercel 配置
├── .env.example           # 环境变量示例
└── .gitignore             # Git 忽略文件
```

---

## API 端点说明

### 搜索 API

**Endpoint**: `/api/search`

**参数**:
- `query` (required): 搜索关键词
- `type` (optional): 媒体类型 (`multi`, `movie`, `tv`)，默认 `multi`
- `language` (optional): 语言，默认 `zh-CN`

**示例**:
```
/api/search?query=间谍过家家&type=tv&language=zh-CN
```

---

### 详情 API

**Endpoint**: `/api/details`

**参数**:
- `id` (required): TMDB ID
- `type` (required): 媒体类型 (`movie` 或 `tv`)
- `languages` (optional): 多语言，用逗号分隔，默认 `zh-CN,zh-TW,en-US,ja-JP`

**示例**:
```
/api/details?id=120089&type=tv&languages=zh-CN,zh-TW,en-US,ja-JP
```

---

## 常见问题

### Q: API 返回 500 错误？
**A**: 检查环境变量 `TMDB_API_TOKEN` 是否正确配置。

### Q: 本地开发无法访问 API？
**A**: 确保使用 `vercel dev` 而不是普通的本地服务器（如 Python 的 http.server）。

### Q: Vercel 免费版有什么限制？
**A**:
- 每月 100GB 带宽
- Serverless 函数执行时间 10 秒
- 对个人项目完全够用

---

## 自定义域名

在 Vercel 项目设置中可以添加自定义域名：

1. **Settings** → **Domains**
2. 输入你的域名
3. 按照提示配置 DNS 记录

---

## 技术栈

- **前端**: 原生 HTML + CSS + JavaScript
- **后端**: Vercel Serverless Functions (Node.js)
- **API**: TMDB API v3
- **部署**: Vercel

---

## 注意事项

⚠️ **不要将 `.env` 文件提交到 Git**
⚠️ **定期检查 TMDB API 使用配额**
⚠️ **建议添加 API 缓存以减少请求次数**

---

## 支持

如有问题，请查看：
- [Vercel 文档](https://vercel.com/docs)
- [TMDB API 文档](https://developer.themoviedb.org/docs)

---

**🎉 部署完成后，你的 TMDB 助手就可以上线使用了！**
