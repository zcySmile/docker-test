const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname,'build')
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/build.css'
        })
    ]
}