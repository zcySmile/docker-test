/*
 * @Author: your name
 * @Date: 2020-12-11 11:08:04
 * @LastEditTime: 2020-12-11 16:53:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testvue2\vue.config.js
 */
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  lintOnSave: false, // 关闭eslint
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // publicPath:process.env.NODE_ENV === 'production'?"/test": "/"  两种方式都可以
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 1024,
        minRatio: 0.8
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserWebpackPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })]
    }
  }
}