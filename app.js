const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const http = require('http')
const https = require('https')
const config = require('./config')
const routers = require('./routers')
const utils = require('./utils')
const env = utils.constants.env
const session = require('koa-session')

// error handler
onerror(app)

utils.dbUtils(config[env].mongodb)

app.keys = ['SoHKDA3kIFEE91JD9crfnu4c3dvnvgMXH61IqVXkKXmKdSaM5VaRO']
  // middlewares
app.use(session(app))
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routers.routes(), routers.allowedMethods())
if (process && process.env && process.env.NODE_ENV) {
  http.createServer(app.callback()).listen(config[process.env.NODE_ENV].port)
} else {
  // Only for dev
  http.createServer(app.callback()).listen(3000)
}
