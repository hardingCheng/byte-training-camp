#!/usr/bin/env node


import fs from 'fs';
import {createIndexTemplate} from './indexTemplate.js'
import {createPackageTemplate} from './packageJsonTemplate.js'
import {question} from './question/index.js'
import execa from 'execa'
import {createConfig} from './config.js'
import path from "path";


// input
// process
// output

// 程序的input
// input
// cli  -> gui

const answer = await question()
const config = createConfig(answer)

// 核心：自动化思维
// happy path
// 1. 创建了文件夹 （项目名）

fs.mkdirSync(`${getRootPath()}`)

// 2. 创建了 index.js
fs.writeFileSync(`${getRootPath()}/index.js`,createIndexTemplate(config))

// 3. 创建了 Package.json
fs.writeFileSync(`${getRootPath()}/package.json`,createPackageTemplate(config))
// 4. 安装依赖
execa('yarn',{
    cwd:getRootPath(),
    stdio:[2,2,2]
})

function getRootPath() {
    return path.resolve(process.cwd(),config.packageName)
}


