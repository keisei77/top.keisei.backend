const crypto = require('crypto');
const hash = crypto.createHash('sha1');

module.exports = {
  checkToken (ctx) {
    let requestBody = ctx.request.query
    console.log(requestBody)
    // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
    let signature = requestBody.signature
    // 时间戳
    let timestamp = requestBody.timestamp
    // 随机数
    let nonce = requestBody.nonce
    // 随机字符串
    let echostr = requestBody.echostr

    let beforeEncrypt = ''
    for (let key of Object.keys(requestBody).sort()) {
      beforeEncrypt += `${key}=${requestBody[key]}`
    }
    hash.update(beforeEncrypt)
    let afterEncrypt = hash.digest('hex')
    if (signature === afterEncrypt) {
      ctx.body = 'Success'
    } else {
      ctx.throw(500)
    }
  }
}