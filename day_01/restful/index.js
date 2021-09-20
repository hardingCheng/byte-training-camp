const Koa = require('koa')
const app = new Koa()

const config = require('./conf')

const { loadModel } = require('./framerwork/loader')
loadModel(config)(app)


const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use(require('koa-static')(__dirname + '/'))
const restful = require('./framerwork/router')
app.use(restful)


const port = 4000
app.listen(port, () => {
    console.log(`app started at port ${port}`)
})
