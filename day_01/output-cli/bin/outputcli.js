#!/usr/bin/env node
const program = require("commander");
// "bin": {
//     "mycli": "./bin/mycli.js"
//   },
// npm link
// console.log('hello cli...');

// 定制命令行界面   就是解析字符串
// 策略模式
program.version(require("../package").version);
program
  .command("init <name>")
  .description("init project")
  .action(require("../lib/init"));
program.parse(process.argv);
