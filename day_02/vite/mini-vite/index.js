const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const app = new Koa();
// import {createApp} from "/@modules/vue"
function rewriteImport(content) {
  return content
      .replace(/(from\s+['"])(?![\.\/])/g, "$1/@modules/")
      .replace(/process\.env\.NODE_ENV/g, '"development"');
}

app.use(ctx => {
  const url = ctx.request.url
  if (url === '/') {
    ctx.body = fs.readFileSync('./index.html','utf-8')
  }else if(url.endsWith(".js")){
    // 找到对应的路径  去加载  然后给到浏览器
    const p = path.resolve(__dirname,url.slice(1))
    console.log(p)
    // 做一个标识，   import vue (*) from 'vue'  ->  node_modules
    ctx.type = 'text/javascript'
    const result = fs.readFileSync(p,'utf-8')
    ctx.body = rewriteImport(result);
  }else if (url.startsWith("/@modules")) {
    // 去node_modules中去找
    const moduleName = url.replace("/@modules/", "");
    const prefix = path.resolve(__dirname, "node_modules", moduleName);
    const module = require(prefix + "/package.json").module;
    const filePath = path.join(prefix, module);
    const result = fs.readFileSync(filePath, "utf8");
    ctx.type = "text/javascript";
    ctx.body = rewriteImport(result);
  }
})

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
