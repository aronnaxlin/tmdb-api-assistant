# 部署问题排查指南

## ✅ 已修复的问题

### 1. Vercel 配置优化

**问题**: `builds` 配置过时警告
```
WARN! Due to `builds` existing in your configuration file...
```

**解决方案**:
- ✅ 简化 `vercel.json`，移除 `builds` 和 `routes` 配置
- ✅ Vercel 会自动检测 `/api` 目录下的 Serverless Functions

**修改后的 vercel.json**:
```json
{
  "version": 2
}
```

---

### 2. ES 模块警告

**问题**: Node.js 函数从 ESM 编译到 CommonJS 的警告
```
Warning: Node.js functions are compiled from ESM to CommonJS...
```

**解决方案**:
- ✅ 在 `package.json` 中添加 `"type": "module"`
- ✅ 使用原生 ES 模块语法

---

### 3. npm 包过时警告

**警告类型**: 依赖包过时提醒

**说明**: 这些是 Vercel CLI 的依赖警告，不影响部署功能。可以忽略，Vercel 会自动处理。

---

## 🚀 现在重新部署

### 方式 1: Git 推送（推荐）

```bash
git add .
git commit -m "fix: 优化 Vercel 配置，修复部署警告"
git push origin main
```

Vercel 会自动检测更改并重新部署，警告消失！

---

### 方式 2: 手动触发

在 Vercel Dashboard:
1. 前往 **Deployments**
2. 点击最新部署的 **"..."** 菜单
3. 选择 **"Redeploy"**

---

## 📋 配置文件说明

### vercel.json

**最简配置**（推荐）:
```json
{
  "version": 2
}
```

**高级配置**（如需自定义）:
```json
{
  "version": 2,
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=3600"
        }
      ]
    }
  ]
}
```

---

### package.json

**关键配置**:
```json
{
  "type": "module",  // 使用 ES 模块
  "scripts": {
    "dev": "vercel dev",
    "deploy": "vercel --prod"
  }
}
```

---

## 🔍 常见部署问题

### Q: 部署成功但 API 返回 500 错误？

**检查清单**:
1. ✅ 环境变量 `TMDB_API_TOKEN` 已配置
2. ✅ Token 有效且未过期
3. ✅ 查看 Vercel Functions 日志

**解决步骤**:
```bash
# 在 Vercel Dashboard 查看日志
项目 → Functions → 选择具体函数 → 查看错误详情
```

---

### Q: 环境变量不生效？

**可能原因**:
- 添加环境变量后未重新部署
- 环境选择错误（只选了 Development）

**解决方案**:
1. 确认环境变量已添加到 Production 环境
2. 重新部署项目

---

### Q: 本地 `vercel dev` 报错？

**常见错误**:
```
Error: Cannot find module 'vercel'
```

**解决方案**:
```bash
# 全局安装 Vercel CLI
npm install -g vercel

# 或本地安装
npm install --save-dev vercel

# 然后运行
vercel dev
```

---

### Q: API 路径 404？

**检查**:
1. API 文件位置: `/api/search.js` 和 `/api/details.js`
2. 访问路径: `/api/search` 和 `/api/details`
3. 文件必须导出默认函数: `export default async function handler(req, res)`

---

## 🛠️ 调试技巧

### 查看实时日志

**Vercel Dashboard**:
```
项目 → Functions → 实时日志
```

**或使用 CLI**:
```bash
vercel logs <deployment-url>
```

---

### 本地调试

```bash
# 使用 vercel dev（推荐）
vercel dev

# 查看详细日志
vercel dev --debug
```

---

### 测试 API 端点

```bash
# 测试搜索 API
curl "https://your-domain.vercel.app/api/search?query=间谍过家家"

# 测试详情 API
curl "https://your-domain.vercel.app/api/details?id=120089&type=tv"
```

---

## 📊 性能优化建议

### 1. 启用缓存

在 `vercel.json` 中添加:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=3600, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

### 2. 添加错误处理

在 API 函数中:
```javascript
try {
  // API 逻辑
} catch (error) {
  console.error('API Error:', error);
  return res.status(500).json({
    error: error.message,
    timestamp: new Date().toISOString()
  });
}
```

### 3. 监控 API 使用

定期检查 Vercel Dashboard 的:
- 📊 函数调用次数
- ⚡ 函数执行时间
- 📈 带宽使用情况

---

## ⚠️ 注意事项

### Vercel 免费版限制

- ✅ 每月 100GB 带宽
- ✅ 函数执行时间 10 秒
- ✅ 函数内存 1GB
- ⚠️ 并发函数执行限制

### TMDB API 限制

- 每 10 秒最多 50 个请求
- 建议添加缓存减少调用

---

## 📚 相关资源

- 🔗 [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- 🔗 [Vercel 配置文档](https://vercel.com/docs/projects/project-configuration)
- 🔗 [Node.js 运行时](https://vercel.com/docs/functions/runtimes/node-js)
- 🔗 [环境变量](https://vercel.com/docs/projects/environment-variables)

---

**✅ 配置已优化，重新部署后警告将消失！**
