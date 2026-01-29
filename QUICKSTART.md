# 🚀 快速开始 - GitHub + Vercel 部署

> 5分钟内完成部署，实现自动 CI/CD

---

## 步骤 1: 准备 TMDB API Token (2分钟)

1. 访问 [TMDB 注册](https://www.themoviedb.org/signup)（如果没有账号）
2. 登录后访问 [API 设置页面](https://www.themoviedb.org/settings/api)
3. 复制 **API Read Access Token** (Bearer Token)

> 💡 保存好这个 Token，稍后要用

---

## 步骤 2: 推送到 GitHub (1分钟)

```bash
# 如果还没有初始化 Git
git init
git add .
git commit -m "Initial commit"

# 在 GitHub 创建新仓库后（建议名称：tmdb-api-assistant）
git remote add origin https://github.com/你的用户名/tmdb-api-assistant.git
git branch -M main
git push -u origin main
```

---

## 步骤 3: 部署到 Vercel (2分钟)

1. 访问 [Vercel](https://vercel.com/new)
2. 使用 GitHub 登录
3. 点击 **"Import Project"**
4. 选择 `tmdb-api-assistant` 仓库
5. 点击 **"Deploy"** (保持默认配置)

等待约 30 秒...

---

## 步骤 4: 配置环境变量 (30秒)

部署完成后：

1. 进入项目的 **Settings** → **Environment Variables**
2. 添加：
   - Key: `TMDB_API_TOKEN`
   - Value: 你在步骤1复制的 Token
   - Environments: 全选
3. 保存后，前往 **Deployments** 标签
4. 点击最新部署的 **"..."** → **"Redeploy"**

---

## ✅ 完成！

访问 Vercel 提供的域名（类似 `https://tmdb-api-assistant.vercel.app`），开始使用！

---

## 🔄 后续更新

每次修改代码并推送到 GitHub，Vercel 会自动部署：

```bash
# 修改代码...
git add .
git commit -m "更新描述"
git push
```

几十秒后，更新自动上线！

---

## 📌 重要提示

✅ **分支策略**
- `main` 分支 → 生产环境
- 其他分支 → 预览环境

✅ **环境变量**
- 已在 Vercel 中配置
- 本地开发需要创建 `.env` 文件

✅ **域名**
- Vercel 提供免费域名
- 可在设置中添加自定义域名

---

## 🆘 遇到问题？

查看 [DEPLOY.md](DEPLOY.md) 的完整指南和常见问题。
