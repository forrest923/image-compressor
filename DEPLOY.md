# 部署指南

## 使用 GitHub Pages 部署

1. 创建 GitHub 仓库
   - 登录 GitHub 账号
   - 点击右上角的 "+" 按钮，选择 "New repository"
   - 仓库名称填写：`image-compressor`
   - 选择 "Public"
   - 点击 "Create repository"

2. 上传代码
   ```bash
   # 在本地项目目录下初始化 Git
   git init

   # 添加远程仓库
   git remote add origin https://github.com/你的用户名/image-compressor.git

   # 添加所有文件
   git add .

   # 提交更改
   git commit -m "Initial commit"

   # 推送到 GitHub
   git push -u origin main
   ```

3. 启用 GitHub Pages
   - 在 GitHub 仓库页面，点击 "Settings"
   - 找到 "Pages" 选项
   - 在 "Source" 下选择 "main" 分支
   - 点击 "Save"
   - 等待几分钟，你的网站就会在 `https://你的用户名.github.io/image-compressor` 上线

## 其他部署选项

如果你想使用其他托管服务，这里有一些推荐：

1. Netlify
   - 注册 Netlify 账号
   - 连接你的 GitHub 仓库
   - 选择自动部署

2. Vercel
   - 注册 Vercel 账号
   - 导入你的 GitHub 仓库
   - 自动部署完成

这些平台都提供免费的静态网站托管服务，并且都支持自动部署。 