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
const routers  = require('./routers')
const constants = require('./utils')
const env = constants.constants.env
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routers.routes(), routers.allowedMethods())
server = http.createServer(app.callback()).listen(config[process.env.NODE_ENV].port)

