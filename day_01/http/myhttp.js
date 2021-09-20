const PORT = 8888; //访问端口号8888   //端口号最好为6000以上
const http = require('http'); //引入http模块
const fs = require('fs'); //引入fs模块
const url = require('url');//引入url模块
const path = require('path');//引入path模块

// request : 从浏览器带来的请求信息
// response : 从服务器返回给浏览器的信息
http.createServer((request, response) => {
    const { url,method } = request
    if(url === '/' && method === 'GET'){
        let PUBLIC_PATH = path.resolve(__dirname, 'index.html');
        fs.readFile(PUBLIC_PATH, (err, data) => {
            if(err) {
                response.writeHead(500,{
                    'Content-Type': 'text/plain;charset=utf-8',s
                })
                response.end('500 服务器挂了')
                return
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end(data)
        })
    }else{
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/plain;charset=utf-8')
        response.end('404 飞了')
    }
}).listen(PORT,() => {
    console.log('listening on 8888')
})