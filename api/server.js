// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(__dirname + '/db.json')
const middlewares = jsonServer.defaults()

const isAuthorized = function (req) {
    return true;
}

server.use(middlewares)
server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
        next() // continue to JSON Server router
    } else {
        res.sendStatus(401)
    }
})
/**
 * Use this for different auth implementations with same api endpoint
 */
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
