const Router = require('koa-router')
const router = new Router({
    prefix: "/B"
})
router.get('/apiB', async ctx => {
    ctx.body = 'bRouter';
})
router.get('/apiA', async ctx => {
    await ctx.render('./index.ejs',{title: 'hello world!公告'})
})
module.exports = router