/*
 * @Author: zcySmile
 * @Date: 2021-01-01 20:21:36
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-02 10:30:24
 * @Description:
 */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      //  告诉webpack 不要使用箭头函数
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // 设置预定义的环境，就是编译成那些环境下可以运行的代码
                            presets: [
                                [
                                    // 使用的插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 支持的目标环境
                                        targets: {
                                            chrome: '58',
                                            ie: '10'
                                        },
                                        // 指定的corejs 版本
                                        corejs: '3',
                                        // 使用corejs 的方式， usage按需加载
                                        useBuiltIns: 'usage'
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    resolve: {
        extensions: ['.ts', '.js']
    }
}
