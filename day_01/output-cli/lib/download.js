const { promisify } = require("util");
const ora = require('ora')
// import ora from "ora";
module.exports.clone = async function (repo, decs) {
  const download = promisify(require("download-git-repo"));
  // 下载进度条  ora
  const process = ora(`🚗 下载：${repo}`);
  await process.start();
  await download(repo, decs);
  process.succeed();
};
