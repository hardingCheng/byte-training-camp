// Node 文件系统
const fs = require('fs');
// 异步IO

// 同步读取
// const data = fs.readFileSync('xxxxx.js')
// console.log('data',data.toString());

// 异步读取
fs.readFile('config.js', 'utf-8', function (err, data) {
    // 错误优先的回调
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})

// 不在用回调了
// promise  api(promisify)  async/await 
// (async () => {
//     const fs = require('fs');
//     const {promisify} = require('util')
//     const readFile = promisify(fs.readFile())
//     const data = await readFile('./config.js')
//     console.log(data.toString());
// })

