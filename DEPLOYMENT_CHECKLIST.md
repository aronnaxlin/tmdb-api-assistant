# ✅ Vercel 配置检查清单

部署后按此清单检查，确保网站可以正常访问且性能最佳。

---

## 🔓 访问权限配置

### 1. 关闭 Vercel Authentication（必须）

这是导致"需要登录才能访问"的主要原因。

**操作步骤**：
```
Vercel Dashboard → 选择项目 → Settings → General 
→ 找到 "Deployment Protection" 部分
→ Vercel Authentication → 确保为 OFF（关闭）
```

✅ 完成后，访问网站应该无需登录。

---

### 2. 检查环境变量

**操作步骤**：
```
Vercel Dashboard → 选择项目 → Settings → Environment Variables
```

**必需变量**：
- ✅ `TMDB_API_TOKEN` - 你的 TMDB Bearer Token
  - Environment: Production, Preview, Development（全选）
  - Value: eyJhbG... (以 eyJ 开头)

**测试命令**（本地）：
```bash
vercel env ls
```

---

### 3. 确认部署状态

**操作步骤**：
```
Vercel Dashboard → 选择项目 → Deployments
```

检查：
- ✅ 最新部署状态为 "Ready"（绿色）
- ✅ 没有错误或警告
- ✅ 构建日志正常

---

## ⚡ 性能优化配置

### 4. 区域设置（已配置）

`vercel.json` 应包含：
```json
"regions": ["hkg1", "sin1"]
```

✅ 这会将应用部署到香港和新加坡节点，提升亚太地区访问速度。

---

### 5. 缓存策略（已配置）

`vercel.json` 应包含：
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
      }
    ]
  }
]
```

✅ 静态资源缓存 1 小时，显著提升加载速度。

---

### 6. 函数优化（已配置）

`vercel.json` 应包含：
```json
"functions": {
  "api/*.js": {
    "maxDuration": 10,
    "memory": 1024,
    "regions": ["hkg1", "sin1"]
  }
}
```

✅ 增加函数内存，减少冷启动时间。

---

### 7. DNS 预连接（已配置）

`index.html` 应包含：
```html
<link rel="preconnect" href="https://api.themoviedb.org">
<link rel="dns-prefetch" href="https://api.themoviedb.org">
```

✅ 提前建立连接，加快 API 请求。

---

## 🧪 功能测试

### 8. 访问测试

在**无痕窗口**中访问你的网站：

**测试项目**：
- [ ] 无需登录即可访问首页
- [ ] 搜索功能正常工作
- [ ] 可以查看电影详情
- [ ] 可以查看电视剧详情
- [ ] 可以复制命名格式
- [ ] 多语言切换正常

**测试 URL**：
```
https://你的项目名.vercel.app
```

---

### 9. API 测试

直接访问 API 端点：

**搜索 API**：
```
https://你的项目名.vercel.app/api/search?query=阿凡达&type=movie
```

**详情 API**：
```
https://你的项目名.vercel.app/api/details?id=19995&type=movie
```

**预期结果**：
- ✅ 返回 JSON 数据
- ✅ 无需认证
- ✅ 响应时间 < 2秒（首次可能较慢）

---

### 10. 性能测试

使用浏览器开发者工具：

**操作步骤**：
1. 按 F12 打开开发者工具
2. 切换到 Network 标签
3. 刷新页面
4. 查看加载时间

**性能指标**（理想值）：
- ✅ DOMContentLoaded < 1s
- ✅ Load < 2s
- ✅ 首次内容绘制（FCP）< 1s
- ✅ 最大内容绘制（LCP）< 2.5s

---

## 🔍 故障排查

### 问题 1: 提示需要登录

**可能原因**：
- Vercel Authentication 未关闭
- 项目在需要认证的 Team 下

**解决方法**：
1. 关闭 Vercel Authentication（见第 1 步）
2. 或将项目转移到个人账户

---

### 问题 2: API 返回 500 错误

**可能原因**：
- TMDB_API_TOKEN 未配置
- Token 无效或过期

**解决方法**：
1. 检查环境变量是否存在
2. 重新生成 TMDB Token
3. 重新部署项目

---

### 问题 3: 访问速度仍然很慢

**可能原因**：
- DNS 解析问题
- 本地网络问题
- 首次访问冷启动

**解决方法**：
1. 清除浏览器缓存
2. 使用不同网络测试
3. 等待 10-30 秒后重试
4. 考虑使用 Cloudflare Pages（见 VERCEL_ACCESS_GUIDE.md）

---

### 问题 4: 构建失败

**可能原因**：
- vercel.json 语法错误
- 依赖安装失败

**解决方法**：
1. 检查 vercel.json 是否为有效 JSON
2. 在本地运行 `vercel dev` 测试
3. 查看 Vercel 构建日志

---

## 📊 配置验证总结

完成所有检查后，你的应用应该：

- ✅ 无需登录即可访问
- ✅ 访问速度明显提升
- ✅ API 响应时间减少
- ✅ 缓存策略生效
- ✅ 所有功能正常工作

---

## 🎯 下一步优化（可选）

### 自定义域名
```
Settings → Domains → Add Domain
```
好处：
- 更专业的访问地址
- 支持 HTTPS
- 可配置 CDN

### 启用 Analytics
```
Settings → Analytics → Enable
```
好处：
- 查看访问统计
- 性能监控
- 用户行为分析

### 配置 Preview 部署
```
Settings → Git → Deploy Hooks
```
好处：
- 每个分支独立预览
- PR 自动部署预览
- 测试后再合并到生产

---

## 📞 需要帮助？

如果按照清单操作后仍有问题：

1. 查看 [VERCEL_ACCESS_GUIDE.md](VERCEL_ACCESS_GUIDE.md)
2. 查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. 查看 Vercel 部署日志
4. 检查浏览器控制台错误

---

**更新日期**: 2026-01-30  
**版本**: 1.0.0
