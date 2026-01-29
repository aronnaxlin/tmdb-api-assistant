# Vercel 部署指南

## 🚀 推荐：GitHub + Vercel 自动部署

通过 GitHub 仓库管理代码，Vercel 自动监听推送并部署，实现真正的 CI/CD。

---

## 快速部署步骤

### 1. 准备 TMDB API Token

访问 [TMDB API 设置页面](https://www.themoviedb.org/settings/api) 获取你的 **Read Access Token**（Bearer Token）。

---

### 2. 推送代码到 GitHub

#### 创建新仓库

1. 访问 [GitHub](https://github.com/new) 创建新仓库
2. 仓库名称建议：`tmdb-api-assistant`
3. 设置为 **Public** 或 **Private**（都可以）
4. **不要**初始化 README、.gitignore 或 license（我们已经有了）

#### 推送本地代码

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 创建首次提交
git commit -m "Initial commit: TMDB API Assistant"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/tmdb-api-assistant.git

# 推送到 GitHub
git push -u origin main
```

> 💡 如果提示分支名称是 `master`，可以用 `git branch -M main` 重命名为 `main`

---

### 3. 连接 Vercel 与 GitHub

#### 首次部署

1. 访问 [Vercel Dashboard](https://vercel.com/new)
2. 点击 **"Add New..."** → **"Project"**
3. 选择 **"Import Git Repository"**
4. 授权 Vercel 访问你的 GitHub（首次需要）
5. 选择 `tmdb-api-assistant` 仓库
6. 保持默认配置，点击 **"Deploy"**

#### 配置环境变量

在部署页面或项目设置中：

1. 进入 **Settings** → **Environment Variables**
2. 添加环境变量：
   ```
   Key: TMDB_API_TOKEN
   Value: 你的 TMDB Bearer Token
   ```
3. **Environment**: 全选（Production, Preview, Development）
4. 点击 **Save**

#### 触发重新部署

添加环境变量后：
1. 前往 **Deployments** 标签
2. 点击最新部署右侧的 **"..."** 菜单
3. 选择 **"Redeploy"**

---

### 4. 自动部署配置

✅ **已自动启用**，每次推送代码到 GitHub 都会自动部署：

- **`main` 分支** → 生产环境（Production）
- **其他分支** → 预览环境（Preview）
- **Pull Request** → 独立预览环境

#### 分支管理示例

```bash
# 创建开发分支
git checkout -b dev

# 修改代码...
git add .
git commit -m "Update: 新功能"

# 推送到 GitHub（会自动创建预览部署）
git push origin dev

# 合并到主分支（会自动部署到生产环境）
git checkout main
git merge dev
git push origin main
```

---

### 5. 验证部署

访问 Vercel 提供的域名：
```
https://your-project-name.vercel.app
```

每次推送后，Vercel 会自动部署并发送通知。

---

## 🔧 本地开发（可选）

如果你想在本地测试功能：

### 1. 克隆仓库（或直接使用当前项目）

```bash
git clone https://github.com/你的用户名/tmdb-api-assistant.git
cd tmdb-api-assistant
```

### 2. 安装 Vercel CLI

```bash
npm install -g vercel
```

### 3. 配置本地环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，填入你的 TMDB API Token
# TMDB_API_TOKEN=你的Bearer_Token
```

### 4. 运行本地开发服务器

```bash
vercel dev
```

访问 `http://localhost:3000` 即可在本地测试。

> 💡 **注意**：`vercel dev` 会模拟 Vercel 的 Serverless 环境，比普通的 HTTP 服务器更准确。

---

## 📋 工作流程建议

### 日常开发流程

```bash
# 1. 创建功能分支
git checkout -b feature/新功能名称

# 2. 进行开发和测试
# ... 编写代码 ...

# 3. 提交更改
git add .
git commit -m "feat: 添加新功能描述"

# 4. 推送到 GitHub（会自动创建预览部署）
git push origin feature/新功能名称

# 5. 在 GitHub 创建 Pull Request
# 6. 在预览环境中测试
# 7. 合并到 main 分支（自动部署到生产环境）
```

### 提交信息规范（建议）

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 样式调整
refactor: 代码重构
perf: 性能优化
test: 测试相关
chore: 构建/工具相关
```

---

## 🎯 高级配置

### 自定义域名

1. 在 Vercel 项目中，前往 **Settings** → **Domains**
2. 输入你的域名
3. 按照提示配置 DNS 记录（A 记录或 CNAME）
4. 等待 DNS 生效（通常几分钟到几小时）

### 环境分离

Vercel 支持多环境配置：

- **Production**: `main` 分支，生产环境专用
- **Preview**: 其他分支，测试新功能
- **Development**: 本地开发

可以为不同环境设置不同的环境变量。

### 性能监控

Vercel Dashboard 提供：
- 📊 访问分析
- ⚡ 性能指标
- 🔍 实时日志
- 📈 带宽使用情况

---

## 📊 项目结构

```
tmdb-api-assistant/
├── api/                    # Vercel Serverless Functions
│   ├── search.js          # 搜索 API
│   └── details.js         # 详情 API
├── index.html             # 前端页面
├── app.js                 # 前端逻辑
├── styles.css             # 样式文件（Material Blue 设计）
├── vercel.json            # Vercel 配置
├── package.json           # 项目配置
├── .env.example           # 环境变量示例
├── .gitignore             # Git 忽略文件
├── DEPLOY.md              # 部署指南（本文档）
└── README.md              # 项目说明
```

---

## 🔌 API 端点说明

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

**响应**:
```json
{
  "results": [
    {
      "id": 120089,
      "title": "间谍过家家",
      "media_type": "tv",
      "first_air_date": "2022-04-09",
      "poster_path": "/xxx.jpg",
      ...
    }
  ]
}
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

**响应**:
```json
{
  "id": 120089,
  "name": "间谍过家家",
  "seasons": [...],
  "translations": {
    "zh-CN": { "title": "间谍过家家" },
    "zh-TW": { "title": "間諜家家酒" },
    "en-US": { "title": "Spy x Family" },
    "ja-JP": { "title": "スパイファミリー" }
  },
  ...
}
```

---

## ❓ 常见问题

### Q: 推送代码后没有自动部署？
**A**:
1. 检查 Vercel Dashboard 的 Git Integration 是否正常
2. 确认推送的是 `main` 分支或已配置的分支
3. 查看 Vercel Dashboard 的部署日志

### Q: API 返回 500 错误？
**A**:
1. 检查环境变量 `TMDB_API_TOKEN` 是否正确配置
2. 在 Vercel Dashboard 查看 Functions 日志
3. 确认 TMDB API Token 有效且未过期

### Q: 本地开发无法访问 API？
**A**:
- 必须使用 `vercel dev`，不能用普通 HTTP 服务器
- 确保 `.env` 文件存在且配置正确
- 检查端口 3000 是否被占用

### Q: 如何回滚到之前的版本？
**A**:
1. 在 Vercel Dashboard 的 **Deployments** 中找到历史部署
2. 点击部署右侧的 **"..."** 菜单
3. 选择 **"Promote to Production"**

或者通过 Git：
```bash
# 回退到上一个提交
git revert HEAD
git push origin main

# 或强制回退（谨慎使用）
git reset --hard <commit-hash>
git push origin main --force
```

### Q: Vercel 免费版有什么限制？
**A**:
- ✅ 每月 100GB 带宽
- ✅ Serverless 函数执行时间 10 秒
- ✅ 无限项目和部署
- ✅ 自动 HTTPS
- ⚠️ 团队协作功能受限
- ⚠️ 并发函数执行限制

对个人项目完全够用！

### Q: 如何查看 API 调用日志？
**A**:
1. 进入 Vercel Dashboard
2. 选择你的项目
3. 点击 **"Functions"** 标签
4. 选择具体的函数查看日志

### Q: 多人协作如何管理？
**A**:
1. 使用 GitHub 的分支和 Pull Request 工作流
2. 在 Vercel 中每个 PR 会自动创建预览部署
3. 审查通过后合并到 main 分支自动部署生产环境

---

## 🛡️ 安全最佳实践

### 环境变量安全

- ✅ 永远不要将 `.env` 提交到 Git
- ✅ 使用 Vercel Dashboard 配置环境变量
- ✅ 定期更换 API Token
- ✅ 为不同环境使用不同的 Token（可选）

### API 安全

- ✅ Serverless 函数隐藏了 API Token
- ✅ CORS 已配置为允许所有来源（可根据需要限制）
- ⚠️ 建议添加请求频率限制
- ⚠️ 建议添加缓存减少 API 调用

---

## 🚀 优化建议

### 添加缓存

在 Serverless 函数中添加缓存可以：
- 减少 TMDB API 调用次数
- 提升响应速度
- 降低成本

可以使用 Vercel KV（键值存储）或其他缓存方案。

### 性能监控

建议集成：
- Google Analytics
- Vercel Analytics（自带）
- Sentry（错误追踪）

---

## 📚 相关资源

- 📖 [Vercel 官方文档](https://vercel.com/docs)
- 📖 [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- 📖 [TMDB API 文档](https://developer.themoviedb.org/docs)
- 📖 [GitHub Actions（可选）](https://docs.github.com/actions)

---

## 📞 获取帮助

遇到问题？
1. 查看本文档的常见问题部分
2. 查看 Vercel Dashboard 的部署日志
3. 检查 GitHub Issues
4. 参考 Vercel 官方文档

---

**🎉 现在你已经完全掌握了 GitHub + Vercel 的部署流程！**

每次推送代码到 GitHub，Vercel 会自动部署，真正实现 CI/CD。
