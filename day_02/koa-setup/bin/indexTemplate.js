import ejs from 'ejs'
import fs from 'fs'
import prettier from 'prettier'
import path from "path";
import {fileURLToPath} from "url";
// 问题驱动
// 1. 手动创建
// 模板
// 开发思想  - 小步骤的开发思想
// 动态生成代码模板
export function createIndexTemplate(config){
    //路径问题
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    let PUBLIC_PATH = path.resolve(__dirname, './template/index.ejs');
    const template = fs.readFileSync( PUBLIC_PATH,'utf-8').toString()

    const code = ejs.render(template, {
        router: config.middleware.router,
        static: config.middleware.static,
        port: config.port,
    });

    return prettier.format(code,{
        parser:"babel"
    })
}

