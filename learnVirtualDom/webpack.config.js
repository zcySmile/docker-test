/*
 * @Author: zcySmile
 * @Date: 2021-01-02 14:27:55
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-02 14:32:40
 * @Description: 
 */
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'dist',
        filename:'bundle.js'
    },
    devServer: {
        port: 8080,
        contentBase: 'www'
    }
}