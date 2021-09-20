// 初始化界面
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const { clone } = require("./download");
const log = (content) => console.log(chalk.green(content));
const open = require("open");
const spawn = async (...args) => {
  // 同步 Promise api
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    // 输出流 子进程 合并到 主进程
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};
module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet.textSync("OutputCli Hello!", {
    font: "Ghost",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 200,
    whitespaceBreak: true,
  });
  log(data);

  //项目模板
  console.log("创建项目");
  await clone("github:su37josephxia/vue-template", name);

  // 下载依赖
  // 子进程
  // 输出流
  log("安装依赖~");
  await spawn("npm", ["install"], { cwd: `./${name}` });
  log(
    chalk.green(`
     👌安装完成：
     To get Start:
     ===========================
         cd ${name}
         npm run serve
     ===========================
                 `)
  );

  open("http://localhost:8080");
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};
