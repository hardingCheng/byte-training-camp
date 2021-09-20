const fs = require('fs');
// 1.png => 2.png
const rs = fs.createReadStream('./1.jpg')
const ws = fs.createWriteStream('./2.jpg')
//管道
rs.pipe(ws)