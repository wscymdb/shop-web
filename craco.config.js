// react脚手架没有暴露webpack的配置 需要借助craco插件 npm i @craco/craco -D
// 因为本项目使用的是react-script5 所以需要这样安装 npm i @craco/craco@alpha -D
// 注意在package.json中将script 改为craco xxx eg：craco start
const path = require('path')

const resolve = (pathname) => path.resolve(__dirname, pathname)

module.exports = {
  // 配置webpack
  webpack: {
    // 配置别名
    alias: {
      '@': resolve('src'),
    },
  },
  //
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
}
