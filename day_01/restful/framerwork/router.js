const router = require('koa-router')()
const {
    init, get, create, update, del,list
} = require('./api')


// 不用写那么多路由，模块都属于动态的
router.get('/api/:list/:id', init, get)
router.get('/api/:list', init, list)
router.post('/api/:list', init,create)
router.put('/api/:list/:id', init, update)
router.delete('/api/:list/:id', init, del)

module.exports = router.routes()
