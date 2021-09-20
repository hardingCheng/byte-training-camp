// 初始化界面
const {promisify} = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const {clone} = require('./download')
const {install_dependencies} = require('./dependen')
const log = content => console.log(chalk.green(content))
const open = require('open')

module.exports = async name => {
    // 打印欢迎界面
    clear()
    const data = await figlet.textSync('OutputCli Hello!', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 200,
        whitespaceBreak: true
    })
    log(data)


    //项目模板
    console.log('创建项目');
    await clone('github:su37josephxia/vue-template',name)


    // 下载依赖  
    // 子进程
    // 输出流
    // log("安装依赖~")
    // await spawn('npm',['install'],{cwd : `./${name}`})
    // log(chalk.green(`
    // 安装完成：
    // To get Starat :
    // ================================
    //   cd ${name}
    //   npm run serve
    // ================================
    // `))
    install_dependencies(name)
    open('http://localhost:8080')
    await spawn('npm',['run','serve'],{cwd : `./${name}`})
}

