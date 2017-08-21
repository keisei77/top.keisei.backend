const router = require('koa-router')()

router.prefix('/api/v1')

const home = require('./home')
const users = require('./users')
const wechat = require('./wechat')

router.use('/home', home.routes(), home.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())
router.use('/wechat', wechat.routes(), wechat.allowedMethods())

module.exports = router