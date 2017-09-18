const router = require('koa-router')()
const wechatController = require('./../controllers/wechat')

router.get('/', wechatController.checkToken)

module.exports = router
