const Router = require('koa-router')
const Passport = require('../interface/utils/passport');
const router = new Router()

//用户登录
router.post('/signin',async (ctx,next) => {
    // Passport 本地登录 这是固定用法
    return Passport.authenticate('local', function(err, user, info, status) {
        if (err) {
            ctx.body = {
                code: -1,
                msg: err
            }
        } else {
            if (user) {     
                //user是我们在数据库中找到的数据                           
                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    user
                }
                //可以存储用户的session
                console.log(user.USER_NAME);
                return ctx.login(user)
            } else {
                ctx.body = {
                    code: 1,
                    //info是在验证里面判断后的信息，密码错误或者用户不存在
                    msg: info
                }
                console.log("登录失败");
            }
        }
    })(ctx, next)
})

//获取用户
router.post('/getUser',async (ctx,next) => {
    
    ctx.body = {
        code: 0,
        msg: '登录成功',
        login: ctx.isAuthenticated()
    }
})

//用户退出
router.post('/exit',async (ctx,next) => {
    ctx.logout();
    ctx.body = {
        code: 0,
        msg: '登出',
        login: ctx.isAuthenticated()
    }
})
module.exports = router