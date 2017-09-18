const errorCodes = require('./error-codes')

module.exports = {
  errorHandler (ctx, errorCode) {
    switch (errorCode) {
      case errorCodes.USER_NOT_FOUND:
        ctx.throw(400, 'user not found', {
          code: errorCodes.USER_NOT_FOUND,
          message: 'User not found!'
        })
        break
        case errorCodes.PASSWORD_INVALID:
        ctx.throw(400, 'password is invalid', {
          code: errorCodes.PASSWORD_INVALID,
          message: 'Password is invalid!'
        })
        break
      default:
        break
    }
    console.log('error', error)
  }
}