# Vercel 访问权限和性能优化指南

## 🔓 解决"需要登录才能访问"的问题

### 方法1: 检查项目可见性设置（推荐）

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **General**
4. 找到 **Deployment Protection** 部分
5. 确保以下选项：
   - ✅ **Vercel Authentication** 应该是 **关闭** 状态
   - ✅ **Protection Bypass for Automation** 根据需要设置

### 方法2: 移除密码保护

1. 在 **Settings** → **Environment Variables** 中
2. 检查是否有 `PASSWORD_PROTECT` 或类似的变量
3. 如果有，删除它们并重新部署

### 方法3: 确保项目是公开的

1. 在 Vercel 项目设置中
2. **Settings** → **General** → **Team**
3. 确认项目不在需要登录的 Team 下
4. 或者将项目转移到个人账户下

### 方法4: 检查域名设置

如果使用自定义域名：
1. **Settings** → **Domains**
2. 确保域名已正确配置并验证
3. 检查是否有重定向规则强制登录

---

## ⚡ 性能优化方案

### 已实施的优化（vercel.json）

✅ **区域优化**: 部署到亚太地区（香港、新加坡）
✅ **缓存配置**: 静态资源缓存1小时，API缓存5分钟
✅ **函数配置**: 增加内存到1024MB，减少冷启动

### 进一步优化建议

#### 1. 使用 CDN 加速静态资源

当前已配置缓存，Vercel 会自动通过全球 CDN 分发。

#### 2. API 响应缓存

在 API 函数中添加内存缓存（已在 vercel.json 配置响应头缓存）

#### 3. 预加载优化

在 `index.html` 中添加：
```html
<link rel="preconnect" href="https://api.themoviedb.org">
<link rel="dns-prefetch" href="https://api.themoviedb.org">
```

#### 4. 考虑使用国内替代方案

如果主要用户在中国，可以考虑：
- **Cloudflare Pages** - 有中国节点，速度更快
- **Netlify** - 全球CDN
- **自建服务器** + Nginx - 完全控制

---

## 🚀 快速检查清单

部署后访问出现问题？按此顺序检查：

- [ ] 1. 确认 Vercel Authentication 已关闭
- [ ] 2. 确认没有设置密码保护环境变量
- [ ] 3. 确认 TMDB_API_TOKEN 已正确配置
- [ ] 4. 确认部署成功且没有错误
- [ ] 5. 使用 Vercel 提供的 `.vercel.app` 域名测试
- [ ] 6. 清除浏览器缓存重试
- [ ] 7. 使用无痕模式测试

---

## 🌐 替代部署方案（速度更快）

如果 Vercel 速度仍不理想，可以尝试：

### 方案 A: Cloudflare Pages（推荐国内用户）

优势：
- 有中国大陆节点
- 速度比 Vercel 快
- 免费额度充足

步骤：
1. 将项目推送到 GitHub
2. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
3. 连接 GitHub 仓库
4. 部署设置：
   - Build command: (留空)
   - Build output directory: `/`
   - 环境变量: `TMDB_API_TOKEN`

### 方案 B: 静态部署 + 前端直连 TMDB

将 API Token 改为前端使用（注意安全性）：
- 优势：无服务器端延迟，速度最快
- 劣势：Token 会暴露在前端

---

## 📊 性能对比

| 方案 | 国内速度 | 国外速度 | 难度 | 成本 |
|------|---------|---------|------|------|
| Vercel (优化后) | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 简单 | 免费 |
| Cloudflare Pages | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 简单 | 免费 |
| 自建服务器 | ⭐⭐⭐⭐⭐ | ⭐⭐ | 困难 | 付费 |

---

## 🔍 故障排除

### 访问时提示 "Please log in to access this site"

这是 Vercel Authentication 开启导致的。

**解决**:
```
Vercel Dashboard → 项目 → Settings → General
→ Deployment Protection → Vercel Authentication → OFF
```

### API 返回 500 错误

检查环境变量是否正确设置：
```bash
# 本地测试
vercel env ls

# 拉取环境变量
vercel env pull
```

### 首次访问很慢，之后正常

这是 Serverless 函数冷启动。已通过以下方式优化：
- 增加函数内存到 1024MB
- 使用就近地区（香港/新加坡）
- 配置缓存策略

---

## 💡 推荐配置

**生产环境最佳配置**:
1. ✅ 关闭 Vercel Authentication
2. ✅ 配置区域为亚太（香港/新加坡）
3. ✅ 启用缓存策略
4. ✅ 使用自定义域名（可选）
5. ✅ 配置环境变量在所有环境中
6. ✅ 开启 Vercel Analytics（可选）

重新部署以应用更改：
```bash
git add .
git commit -m "chore: optimize vercel config for access and performance"
git push
```

或使用 Vercel CLI：
```bash
vercel --prod
```
