# ww-space 作品集展示项目 - 管理后台

这个项目模仿了dribbble网页设计的视觉效果（ps仅作为练习使用），使用 React + Node.js 搭建的个人作品展示项目。项目分为前台、后台、服务端三个代码仓，整体都使用 TypeScript 开发，并配置了 Eslint + Prettier 进行代码风格规范优化。

🟢 本仓库为管理后台部分。

#### 查看前台与服务端:   [⚛ 前台](https://github.com/tomoko-tiba/ww-space-portfolio-react)  [⚙ 服务端](https://github.com/tomoko-tiba/ww-space-backend-express/tree/main)

## 管理后台介绍

![image](https://github.com/tomoko-tiba/ww-space-admin-react/assets/41440180/09009b56-7ba1-4d6e-8f04-782a3ae181e7)


- 使用了 Ant Design Pro 脚手架快速搭建的 React 后台框架，实现用户登录、用户管理、作品管理、分类管理。
- 使用了 Ant Design 框架的多个基础组件，并通过 ProCompoents 实现列表、表单的快速增删改查。
- 封装图片上传组件，使用Ant Design组件Upload、ImgCrop实现图片自由编辑裁切后上传，通过 new FormData 创建对象后使用 axios POST请求传输。
- 封装富文本编辑器 (TinyMCE)公共组件，可作为 Ant Design 表单组件进行调用。

## 使用

```
# install dependency
npm install

# develop
npm run dev
```

#### 配置文件_修改页面入口、增加页面: config/routes.ts