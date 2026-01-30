#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  TMDB 助手 - 性能优化部署脚本${NC}"
echo -e "${BLUE}========================================${NC}\n"

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  未检测到 Vercel CLI${NC}"
    echo -e "${BLUE}正在安装 Vercel CLI...${NC}"
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Vercel CLI 安装失败${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Vercel CLI 安装成功${NC}\n"
fi

# 提示用户检查配置
echo -e "${YELLOW}📋 部署前检查清单:${NC}"
echo -e "  1. 是否已设置 TMDB_API_TOKEN 环境变量？"
echo -e "  2. 是否已关闭 Vercel Authentication？"
echo -e "  3. 是否已将代码推送到 GitHub？\n"

read -p "$(echo -e ${YELLOW}是否继续部署? [y/N]: ${NC})" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ 部署已取消${NC}"
    exit 1
fi

# Git 提交（如果有更改）
echo -e "\n${BLUE}📦 检查 Git 状态...${NC}"
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}检测到未提交的更改${NC}"
    git add .
    git commit -m "chore: optimize vercel config for performance and access"

    if command -v git &> /dev/null && git remote | grep -q "origin"; then
        echo -e "${BLUE}正在推送到 GitHub...${NC}"
        git push
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ 代码已推送到 GitHub${NC}"
        else
            echo -e "${RED}❌ 推送失败，但会继续本地部署${NC}"
        fi
    fi
else
    echo -e "${GREEN}✅ 没有需要提交的更改${NC}"
fi

# 部署到 Vercel
echo -e "\n${BLUE}🚀 开始部署到 Vercel...${NC}"
vercel --prod

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✅ 部署成功！${NC}"
    echo -e "${GREEN}========================================${NC}\n"

    echo -e "${YELLOW}📝 部署后操作:${NC}"
    echo -e "  1. 访问 Vercel Dashboard 检查部署状态"
    echo -e "  2. 确认 Settings → General → Deployment Protection"
    echo -e "     ${RED}关闭${NC} Vercel Authentication"
    echo -e "  3. 确认环境变量 TMDB_API_TOKEN 已设置"
    echo -e "  4. 测试访问部署的网站（无需登录）\n"

    echo -e "${BLUE}🌐 性能优化已启用:${NC}"
    echo -e "  ✅ 亚太区域部署（香港、新加坡）"
    echo -e "  ✅ 缓存策略优化"
    echo -e "  ✅ 函数内存增加到 1024MB"
    echo -e "  ✅ DNS 预连接优化"
    echo -e "  ✅ 字体异步加载\n"

    echo -e "${GREEN}🎉 完成！现在应该可以更快地访问你的网站了${NC}"
else
    echo -e "\n${RED}========================================${NC}"
    echo -e "${RED}  ❌ 部署失败${NC}"
    echo -e "${RED}========================================${NC}\n"

    echo -e "${YELLOW}💡 故障排除:${NC}"
    echo -e "  1. 运行 'vercel login' 确保已登录"
    echo -e "  2. 运行 'vercel env ls' 检查环境变量"
    echo -e "  3. 检查 vercel.json 语法是否正确"
    echo -e "  4. 查看详细文档: VERCEL_ACCESS_GUIDE.md\n"
    exit 1
fi
