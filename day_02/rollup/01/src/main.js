import foo from "./foo.js";
import packageJSON from "../package.json";
// 不希望打包lodash 进入到bundle
import vue from "vue";
export default function () {
  console.log(packageJSON);
  // 可以分析tree-shaking
  console.log(vue)
}
