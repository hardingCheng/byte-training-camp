const ora = require('ora')
// import ora from "ora";

const spawn = async(...args) => {
    const { spawn } = require('child_process')
    return new Promise((resolve, reject) =>{
        const proc = spawn(...args)
        // 输出流  子进程  合并到   主进程
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}


module.exports.install_dependencies = () => {
    const process = ora(`🚗 安装依赖中~`);
    await process.start();
    await spawn('npm',['install'],{cwd : `./${name}`})
    process.succeed();
}