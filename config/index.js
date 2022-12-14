// 'use strict'
// const path = require('path')
// module.exports = {
//   dev: {
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//     proxyTable: {},
//     host: '192.168.3.10', // can be overwritten by process.env.HOST
//     port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
//     autoOpenBrowser: false,
//     errorOverlay: true,
//     notifyOnErrors: true,
//     poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
//     devtool: 'cheap-module-eval-source-map',
//     cacheBusting: true,
//     cssSourceMap: true
//   },

//   build: {
//     index: path.resolve(__dirname, '../dist/index.html'),
//     assetsRoot: path.resolve(__dirname, '../dist'),
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//     productionSourceMap: true,
//     devtool: '#source-map',
//     productionGzip: false,
//     productionGzipExtensions: ['js', 'css'],
//     bundleAnalyzerReport: process.env.npm_config_report
//   }
// }
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/'),
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    productionSourceMap: false,

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    host: '192.168.3.10',
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
