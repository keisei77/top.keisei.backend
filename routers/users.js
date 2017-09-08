const router = require('koa-router')()
const userController = require('./../controllers/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/', userController.register)

router.post('/login', userController.login)

module.exports = router
