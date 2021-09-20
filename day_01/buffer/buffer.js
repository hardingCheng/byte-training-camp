// 图片切割（合并）、视频压缩、掉个底层硬件（动态链接库）   js处理不了
// C语言

const buf1 = Buffer.alloc(10)  //分配10个字节
console.log(buf1); //<Buffer 00 00 00 00 00 00 00 00 00 00>

const buf2 = Buffer.from('a') 
console.log(buf2); //<Buffer 61>

const buf3 = Buffer.from('中') 
console.log(buf3); //utf-8  <Buffer e4 b8 ad>

const buf4 = Buffer.concat([buf2,buf3])
console.log(buf4); //<Buffer 61 e4 b8 ad>