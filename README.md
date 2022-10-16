<h1 style="text-align: center">坤坤平台前端</h1>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 🗿 文件结构
```lua
├── README.md            项目介绍
├── index.html           入口页面
├── build              构建脚本配置文件目录
│  ├── build.js            生产环境构建脚本
│  ├── utils.js            构建相关工具方法
│  ├── webpack.base.conf.js      wabpack基础配置
│  ├── webpack.dev.conf.js       wabpack开发环境配置
│  └── webpack.prod.conf.js      wabpack生产环境配置
├── config             项目配置文件目录
│  ├── dev.env.js           开发环境变量
│  ├── index.js               项目配置文件
│  ├── prod.env.js           生产环境变量
├── package.json          npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src               源码目录 
│  ├── main.js             主入口 js文件
│  ├── App.vue            根组件
│  ├── components      公共组件目录
│  ├── assets                资源目录(这里的资源会被wabpack构建)
│  │    └── logo.png     Vue 的logo图片
│  ├── routes             前端路由目录
│  │  └── index.js
├── static             纯静态资源（不会被wabpack构建）
```

