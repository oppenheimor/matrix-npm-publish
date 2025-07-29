# Matrix Publish

<div align="center">

**🚀 专业的包发布工具 - 支持内网和公网发布**

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/atom-org/matrix-publish)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

</div>

## ✨ 功能特性

- 🎯 **智能包选择** - 交互式多选界面，选择要发布的包
- 📦 **自动版本管理** - 自动获取最新版本并升级 patch 版本
- 🏢 **内网模式支持** - 一键配置内网 registry，无缝切换发布源
- 🔨 **批量编译** - 支持 Matrix 批量编译工作流
- 🎨 **美化界面** - 专业的命令行界面，清晰的步骤展示
- ⚡ **模块化架构** - TypeScript 模块化设计，易于维护和扩展

## 🚀 快速开始

### 安装

```bash
npm install -g @atom/matrix-publish
```

### 基本使用

#### 常规模式（发布到 npm 官方源）
```bash
matrix-publish
```

#### 内网模式（发布到内网源）
```bash
matrix-publish --internal
```

## 📋 使用流程

Matrix Publish 提供完整的 6 步发布流程：

### 第1步：📦 读取包信息
- 扫描 `packages/` 目录下的所有包
- 读取 `package.json` 获取包名和当前版本

### 第2步：🔍 获取 npm 最新版本
- 查询每个包在 npm 源上的最新版本
- 支持未发布包的处理（从 0.0.1 开始）

### 第3步：📈 计算新版本号
- 自动升级 patch 版本（如：0.0.4 → 0.0.5）
- 智能处理版本冲突

### 第4步：✏️ 更新 package.json
- 更新版本号
- 内网模式下自动添加 `publishConfig`

### 第5步：🔨 执行批量编译
- 运行 `npx matrix receive --scope=包名@版本号`
- 支持批量编译多个包

### 第6步：📦 模拟发布流程
- 展示完整的发布命令
- 安全模式，不会实际发布

## 🏢 内网模式详解

### 功能对比

| 功能 | 常规模式 | 内网模式 |
|------|----------|----------|
| 版本升级 | ✅ 自动升级 patch 版本 | ✅ 自动升级 patch 版本 |
| publishConfig | ❌ 不添加 | ✅ 自动添加内网配置 |
| Registry | npm 官方源 | 内网私有源 |
| 界面提示 | 标准模式 | 内网模式标识 |

### 自动配置

使用 `--internal` 参数时，工具会自动在 `package.json` 中添加：

```json
{
  "name": "@oversea/button",
  "version": "0.0.5",
  "publishConfig": {
    "registry": "http://repositories.myhexin.com:8081/repository/npm-release/"
  }
}
```

### 发布流程

配置完成后，手动执行：

```bash
cd packages/your-package && npm publish && cd ../..
```

npm 会自动使用 `publishConfig` 中的内网 registry。

## 🎯 命令行选项

```bash
Usage: matrix-publish [options]

Options:
  -V, --version    显示版本号
  --internal       使用内网模式，配置内网 registry  
  -h, --help       显示帮助信息
```

## 📁 项目结构要求

Matrix Publish 要求项目采用 monorepo 结构：

```
your-project/
├── packages/
│   ├── package-a/
│   │   └── package.json
│   ├── package-b/
│   │   └── package.json
│   └── package-c/
│       └── package.json
└── package.json
```

## 🎨 界面预览

### 启动界面
```
███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ 
██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ 
██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝

██████╗ ██╗   ██╗██████╗ ██╗     ██╗███████╗██╗  ██╗
██╔══██╗██║   ██║██╔══██╗██║     ██║██╔════╝██║  ██║
██████╔╝██║   ██║██████╔╝██║     ██║███████╗███████║
██╔═══╝ ██║   ██║██╔══██╗██║     ██║╚════██║██╔══██║
██║     ╚██████╔╝██████╔╝███████╗██║███████║██║  ██║
╚═╝      ╚═════╝ ╚═════╝ ╚══════╝╚═╝╚══════╝╚═╝  ╚═╝

         Package Selection & Publishing Tool
                    v1.1.0
```

### 包选择界面
```
✅ 选中的包 (3 个)
────────────────────────────────────────────────────────────────────────────────
  ▸ package-a
  ▸ package-b  
  ▸ package-c
```

### 步骤展示
```
═══════════════════════════════════════════════════════════════════════════════
╭─ STEP 1 ─────────────────────────────────────────────────────────────────╮
│ 📦 读取包信息                                                               │
╰─────────────────────────────────────────────────────────────────────────╯
    ├─ package-a: @oversea/button@0.0.4
    ├─ package-b: @oversea/input@0.0.3
    ├─ package-c: @oversea/modal@0.0.2
  ✓ 成功读取 3 个包的信息
```

## 🏗️ 开发

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0
- TypeScript >= 5.0.0

### 本地开发

```bash
# 克隆项目
git clone https://github.com/atom-org/matrix-publish.git
cd matrix-publish

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建项目
npm run build

# 运行测试
npm run test
```

### 项目架构

```
src/
├── constants/          # 常量定义
│   ├── colors.ts      # ANSI 颜色代码
│   ├── config.ts      # 应用配置
│   └── index.ts       # 统一导出
├── types/             # TypeScript 类型定义
│   ├── package.ts     # 包相关类型
│   ├── colors.ts      # 颜色类型
│   └── index.ts       # 统一导出
├── utils/             # 工具函数库
│   ├── banner.ts      # 横幅显示
│   ├── display.ts     # 界面显示工具
│   ├── file.ts        # 文件操作工具
│   ├── version.ts     # 版本管理工具
│   └── index.ts       # 统一导出
├── core/              # 核心业务逻辑
│   ├── packageProcessor.ts  # 包处理器
│   └── index.ts       # 统一导出
└── index.ts           # 主入口文件
```

## 📝 脚本命令

```json
{
  "build": "构建项目",
  "dev": "开发模式（监听文件变化）",
  "start": "运行构建后的程序",
  "debug": "调试模式运行",
  "test": "运行测试"
}
```

## 🤝 贡献指南

我们欢迎任何形式的贡献！

### 贡献步骤

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 使用 TypeScript 进行开发
- 遵循现有的代码风格
- 添加适当的类型定义
- 更新相关文档

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🔗 相关链接

- [Issues](https://github.com/atom-org/matrix-publish/issues) - 报告问题
- [Discussions](https://github.com/atom-org/matrix-publish/discussions) - 讨论交流
- [Releases](https://github.com/atom-org/matrix-publish/releases) - 版本发布

## 💬 支持

如果您觉得这个项目有用，请给我们一个 ⭐️！

有问题或建议？欢迎通过以下方式联系我们：

- 📧 Email: your-email@example.com
- 💬 Issues: [GitHub Issues](https://github.com/atom-org/matrix-publish/issues)
- 📖 Wiki: [项目文档](https://github.com/atom-org/matrix-publish/wiki)

---

<div align="center">
Made with ❤️ by Your Team
</div>