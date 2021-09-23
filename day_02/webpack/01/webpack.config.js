const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    //入口文件
    mode: 'development',
    entry: {
        index: './src/index.js',
        another: './src/another-module.js',

        // 方式一
        // 使用 dependOn 把重复的代码可以抽离出去
        // index: {
        //   import: "./src/index.js",
        //   dependOn: "shared",
        // },
        // another: {
        //   import: "./src/another-module.js",
        //   dependOn: "shared",
        // },
        // shared: ["lodash"],
    },
    output: {
        filename: "[name].bundle.js",
        //必须是一个绝对路径
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/1-3文件命名和老师不一样.html'),
        },
        compress: true,
        open:true,
        port: 9000,
    },
    // 方式二
    // 也可以使用 splitChunks 自动来抽取重复的代码
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },// 加载字体和加载图片一样
            // webpack5 都已经给提供了内置的 loader 来处理
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
            //     type: "asset/resource",
            // },
            // {
            //     test: /\.json5$/i,
            //     type: "json",
            //     parser: {
            //         parse: json5.parse,
            //     },
            // },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Output Management",
        }),
    ],

}
