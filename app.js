//require
const Koa = require("koa");
const views = require("koa-views");
const source = require("koa-static");
const session = require("koa-generic-session");
const Redis = require("koa-redis");
const passport = require("./interface/utils/passport");
const bodyParser = require("koa-bodyparser");
const router = require('./routers/index');

//实例化app
const app = new Koa();

//入参解析
app.use(bodyParser());

// session的加密处理
app.keys = ['mt', 'keyskeys']
app.use(session({
    key: 'mt',
    prefix: 'mt:uid',
    maxAge: 1000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** cookie是否只有服务器端可以访问 (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    store: new Redis() // 将session存入redis 不传options 默认就是连接127.0.0.1:6379
}))
//initialzie()函数的作用是为上下文添加passport字段， 会在ctx挂载以下方法
//ctx.state.user 认证用户
//ctx.login(user) 登录用户
//ctx.logout() 用户退出登录
//ctx.isAuthenticated() 判断是否认证
app.use(passport.initialize())
//开启koa-passport对session的支持，passport.session()是使passport能够从session中提取用户信息
app.use(passport.session())

// 错误处理中间件, 洋葱最外层
app.use(async (ctx, next)=>{
    try {
        await next();
    } catch (error) {
        // 响应用户
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = error.message;
        ctx.app.emit('error', error); // 触发应用层级错误事件
    }
});

app.use(async (ctx, next)=>{
    // console.log("前置操作");
    await next();
    // console.log("后置操作");
});

// app.use(ctx=>{
//     // 抛出错误, 也可以理解为模拟错误发生
//     throw new Error("未知错误");
//     console.log("执行任务...");
// });


// 全局错误事件监听
app.on('error', (error)=>{
    console.error(error);
});


/* view处理 */
app.use(views('./views',{
    map: {
        ejs: 'ejs'
    }
}))

//文件路径配置
app.use(source('./src'))

//挂载路由
app.use(router());

//监听8888端口
app.listen(8888,()=>{
    console.info("服务启动!")
});
