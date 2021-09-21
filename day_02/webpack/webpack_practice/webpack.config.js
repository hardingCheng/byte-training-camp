const path = require('path')
const json5 = require("json5")
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    //入口文件
    mode: 'development',
    entry:{
        index: './src/index.js',
        other: './src/other.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/index.html'),
        },
        compress: true,
        open:true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.csss$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.json5$/,

            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // webpack 会默认使用 file-loader
                // 如果想自己扩展的话，可以使用 type: "javascript/auto" 这个值可以阻止 webpack 使用默认的 loader
                type: "asset/resource",
            },
            // webpack5 都已经给提供了内置的 loader 来处理
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.json5$/i,
                type: "json",
                parser: {
                    parse: json5.parse,
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Output Management",
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
}
