import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

// rollup <- es,

// node.js  -> lib -> not esm  是  commonjs

export default {
    input: "src/main.js",
    output: [
        {
            file: "dist/bundle.esm.js",
            format: "esm",
            // 使用 terser 压缩代码
            plugins: [terser()],
        },
        {
            file: "dist/bundle.cjs.js",
            format: "cjs",
        }
    ],
    //resolve() 可以解析依赖的  node_modules
    //commonjs  可以使用commonjs的库   非esm的插件
    plugins: [json(),resolve(),commonjs()],
    // 使用 external 告诉 rollup 什么模块不打包进到 bundle 内
    external: ["vue"],  //package.json  peerDependencies告诉用户我这个项目必须依赖这些
};
