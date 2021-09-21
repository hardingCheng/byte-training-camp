const path = require('path')

module.exports = {
    //入口文件
    mode:'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        //必须是一个绝对路径
        path:path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use:['style-loader','css-loader']
        }]
    }
}
