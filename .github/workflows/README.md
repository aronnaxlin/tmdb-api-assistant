# GitHub Actions 配置说明

> ⚠️ 这些 GitHub Actions 工作流是**可选的**。Vercel 的 Git Integration 已经提供了自动部署功能。

---

## 为什么需要 GitHub Actions？

如果你只是想要自动部署，**不需要**配置 GitHub Actions。Vercel 的 Git Integration 已经足够。

但如果你想要：
- 🧪 运行自动化测试
- 📊 生成部署报告
- 🔍 代码质量检查
- 🎯 自定义部署流程

那么可以配置 GitHub Actions。

---

## 配置步骤（可选）

### 1. 获取 Vercel Token

1. 访问 [Vercel Tokens](https://vercel.com/account/tokens)
2. 创建新 Token，命名如 `GitHub Actions Token`
3. 复制生成的 Token

### 2. 获取项目信息

在项目目录运行：

```bash
# 需要先安装 Vercel CLI
npm install -g vercel

# 链接项目
vercel link

# 查看项目信息
cat .vercel/project.json
```

你会看到：
```json
{
  "orgId": "team_xxxxxxxxx",
  "projectId": "prj_xxxxxxxxx"
}
```

### 3. 配置 GitHub Secrets

在 GitHub 仓库中：

1. 前往 **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**
3. 添加以下 Secrets：

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | 步骤1获取的 Token |
| `VERCEL_ORG_ID` | 从 `.vercel/project.json` 获取 |
| `VERCEL_PROJECT_ID` | 从 `.vercel/project.json` 获取 |

### 4. 完成

推送代码到 GitHub，Actions 会自动运行。

---

## 工作流说明

### production.yml

- **触发条件**：推送到 `main` 分支
- **作用**：部署到生产环境
- **状态**：可在 Actions 标签查看

### preview.yml

- **触发条件**：推送到其他分支或创建 PR
- **作用**：创建预览部署
- **状态**：可在 PR 中查看部署链接

---

## 是否需要配置？

### ✅ 推荐场景

- 大型团队协作项目
- 需要运行自动化测试
- 需要代码质量检查
- 需要自定义部署流程

### ❌ 不需要场景

- 个人项目
- 小型项目
- 只需要简单的自动部署

**对于大多数用户，Vercel 的 Git Integration 已经足够！**

---

## 删除 GitHub Actions（如果不需要）

如果你不需要 GitHub Actions，可以直接删除 `.github/workflows` 目录：

```bash
rm -rf .github/workflows
git add .
git commit -m "Remove GitHub Actions"
git push
```

Vercel 的自动部署依然正常工作。

---

## 参考资源

- [GitHub Actions 文档](https://docs.github.com/actions)
- [Vercel Action](https://github.com/amondnet/vercel-action)
- [Vercel CLI](https://vercel.com/docs/cli)
