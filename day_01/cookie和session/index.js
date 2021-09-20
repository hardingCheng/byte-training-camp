const http = require('http')
const session = {}
http.createServer((req, res) => {
    const sessionKey = 'sid'

    if (req.url === '/favicon.ico') {
        return
    } else {
        const cookie = req.headers.cookie
        if (cookie && cookie.indexOf(sessionKey) > -1) {
            res.end('欢迎你的到来')
        } else {
            const sid = (Math.random() * 9999999).toFixed()
            res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
            session[sid] = { name: 'laowang' }
            res.end('hello cookie')
        }
    }

}).listen(3000)
