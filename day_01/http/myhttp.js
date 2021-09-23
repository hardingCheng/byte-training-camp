const PORT = 8888; //访问端口号8888   //端口号最好为6000以上
const http = require('http'); //引入http模块
const fs = require('fs'); //引入fs模块
const nodeurl = require('url');//引入url模块
const path = require('path');//引入path模块

// request : 从浏览器带来的请求信息
// response : 从服务器返回给浏览器的信息
http.createServer((request, response) => {
    const { url,method,headers } = request
    //url模块的parse方法 接受一个字符串，返回一个url对象,切出来路径
    const pathName = nodeurl.parse(url).pathname;  "/1-3文件命名和老师不一样.html    /"
    //有可能出现中文乱码，写成中文路径(刚才输入没切换 出现了这个问题)
    pathName = decodeURI(pathName);
    if(pathName === '/' || pathName === '/1-3文件命名和老师不一样.html' && method === 'GET'){
        //获取资源文件的绝对路径 (回来需要提出函数  不是这种写死的)
        let PUBLIC_PATH = path.resolve(__dirname, '1-3文件命名和老师不一样.html');
        fs.readFile(PUBLIC_PATH, (err, data) => {
            if(err) {
                response.writeHead(500,{
                    //处理静态文件    要动态的写Content-Type类型
                    'Content-Type': 'text/plain;charset=utf-8',s
                })
                response.end('500 服务器挂了')
                return
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end(data)
        })
    }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
        //所有的图片
        //直接用 readfile 读取是否ok 把全部图片内容加到服务器
        //stream 流
        fs.createReadStream('.' + url).pipe(response)
    }else{
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/plain;charset=utf-8')
        response.end('404 飞了')
    }
}).listen(PORT,() => {
    console.log('listening on 8888')
})
