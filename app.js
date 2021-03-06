const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// register + send vericode + check vericode
const user_reg = require('./routes/user_register');
app.use(user_reg.routes(), user_reg.allowedMethods());

// login
const user_login = require('./routes/user_login');
app.use(user_login.routes(), user_login.allowedMethods());

// profile view and edit
const profile_view = require('./routes/profile_view');
app.use(profile_view.routes(), profile_view.allowedMethods());

const profile_edit = require('./routes/profile_edit');
app.use(profile_edit.routes(), profile_edit.allowedMethods());

// create new post and edit
const post_mgmt = require('./routes/post_mgmt');
app.use(post_mgmt.routes(), post_mgmt.allowedMethods());

// const file_list = require('./routes/file_listAll');
// app.use(file_list.routes(), file_list.allowedMethods());
// const file_getSignedURL = require('./routes/file_getSignedURL');
// app.use(file_getSignedURL.routes(), file_getSignedURL.allowedMethods());

// const file_like = require('./routes/file_like');
// app.use(file_like.routes(), file_like.allowedMethods());

// const file_edit = require('./routes/file_edit');
// app.use(file_edit.routes(), file_edit.allowedMethods());

// const file_delete = require('./routes/file_delete');
// app.use(file_delete.routes(), file_delete.allowedMethods());

// // comments
// const comments = require('./routes/comments');
// app.use(comments.routes(), comments.allowedMethods());

// // rate
// const rate = require('./routes/rate_file');
// app.use(rate.routes(), rate.allowedMethods());

// // report
// const report = require('./routes/report');
// app.use(report.routes(), report.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app