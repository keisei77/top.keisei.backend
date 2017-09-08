const bcrypt = require('bcrypt')
const User = require('../models/user')
const utils = require('../utils')

module.exports = {
  async register (ctx) {
    try {
      const user = await new User(ctx.request.body).save()
      ctx.body = user
    } catch (err) {
      ctx.throw(500)
    }
  },
  async login (ctx) {
    try {
      const name = ctx.request.body.name
      const password = ctx.request.body.password
      const user = await User.findOne({ name: name })
      if (!user) {
        utils.httpUtils.errorHandler(ctx, utils.errorCodes.USER_NOT_FOUND)
      }
      let result = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user.hashed_password, (err, res) => {
          resolve(res)
          reject(err)
        })
      })
      if (result) {
        ctx.session.isLogged = true
        ctx.body = result
      } else {
        utils.httpUtils.errorHandler(ctx, utils.errorCodes.PASSWORD_INVALID)
      }
    } catch (err) {
      console.log('err: ', err)
      ctx.body = err
      // ctx.throw(500)
    }
  }
}