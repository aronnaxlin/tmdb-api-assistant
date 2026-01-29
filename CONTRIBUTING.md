# Git 提交信息规范

使用规范的提交信息有助于：
- 📝 生成清晰的变更日志
- 🔍 快速定位问题
- 🤝 团队协作沟通

---

## 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### type（必需）

提交的类型：

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加多语言搜索支持` |
| `fix` | Bug 修复 | `fix: 修复搜索结果为空的问题` |
| `docs` | 文档更新 | `docs: 更新部署指南` |
| `style` | 代码格式调整（不影响功能） | `style: 调整按钮圆角` |
| `refactor` | 代码重构 | `refactor: 优化 API 调用逻辑` |
| `perf` | 性能优化 | `perf: 添加搜索结果缓存` |
| `test` | 测试相关 | `test: 添加 API 单元测试` |
| `build` | 构建系统或依赖更新 | `build: 升级 Vercel CLI` |
| `ci` | CI/CD 配置 | `ci: 添加 GitHub Actions` |
| `chore` | 其他杂项 | `chore: 更新 .gitignore` |

### scope（可选）

影响范围：

- `api` - API 相关
- `ui` - 界面相关
- `search` - 搜索功能
- `detail` - 详情功能
- `rename` - 重命名格式
- `deploy` - 部署相关
- `docs` - 文档

### subject（必需）

简短描述（50字符以内）：
- 使用祈使语气："添加"而不是"添加了"
- 首字母小写
- 结尾不加句号

### body（可选）

详细说明：
- 说明为什么做这个改动
- 说明做了哪些改动

### footer（可选）

重大变更或关联的 Issue：

```
BREAKING CHANGE: API 端点变更
Closes #123
```

---

## 示例

### 简单提交

```bash
git commit -m "feat: 添加电视剧季信息显示"
```

### 详细提交

```bash
git commit -m "feat(detail): 添加电视剧季信息显示

- 显示每季的集数
- 显示每季的首播日期
- 优化季信息卡片样式

Closes #15"
```

### 多行提交

```bash
git commit
# 在编辑器中输入：

feat(search): 优化搜索体验

- 添加防抖功能，减少 API 调用
- 优化空搜索结果的提示
- 添加搜索历史记录（本地存储）

这些改进将显著提升用户体验，特别是在移动网络环境下。
```

---

## 常用场景

### 新功能

```bash
git commit -m "feat: 添加深色模式支持"
git commit -m "feat(ui): 实现响应式布局"
```

### Bug 修复

```bash
git commit -m "fix: 修复移动端搜索框样式问题"
git commit -m "fix(api): 修复详情 API 超时错误"
```

### 文档更新

```bash
git commit -m "docs: 更新快速开始指南"
git commit -m "docs(deploy): 添加 Vercel 环境变量配置说明"
```

### 样式调整

```bash
git commit -m "style: 统一按钮圆角为 8px"
git commit -m "style(ui): 调整卡片间距"
```

### 重构

```bash
git commit -m "refactor: 提取搜索逻辑为独立模块"
git commit -m "refactor(api): 优化错误处理机制"
```

### 性能优化

```bash
git commit -m "perf: 添加图片懒加载"
git commit -m "perf(search): 实现搜索结果缓存"
```

---

## Git 工作流建议

### 功能开发

```bash
# 1. 创建功能分支
git checkout -b feature/add-dark-mode

# 2. 开发和提交
git add .
git commit -m "feat: 添加深色模式切换按钮"

# 3. 继续开发
git commit -m "feat: 实现深色模式样式"

# 4. 推送到远程
git push origin feature/add-dark-mode

# 5. 在 GitHub 创建 Pull Request
# 6. 审查通过后合并到 main
```

### Bug 修复

```bash
# 1. 创建修复分支
git checkout -b fix/search-empty-result

# 2. 修复和提交
git add .
git commit -m "fix: 修复搜索结果为空时的显示问题"

# 3. 推送并创建 PR
git push origin fix/search-empty-result
```

### 快速修复（Hotfix）

```bash
# 1. 从 main 创建 hotfix 分支
git checkout main
git pull
git checkout -b hotfix/api-token-error

# 2. 修复
git commit -m "fix(api): 修复 API Token 验证错误"

# 3. 快速合并到 main
git checkout main
git merge hotfix/api-token-error
git push origin main
```

---

## 工具推荐

### Commitizen

标准化提交信息的工具：

```bash
# 安装
npm install -g commitizen
npm install -g cz-conventional-changelog

# 使用
git cz  # 代替 git commit
```

### Commitlint

验证提交信息格式：

```bash
# 安装
npm install --save-dev @commitlint/{cli,config-conventional}

# 配置 husky
npm install --save-dev husky
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

---

## 参考资源

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular 提交规范](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
