const passport = require('koa-passport');
const LocalStrategy = require('passport-local')
const User = require("../../api/dbs/models/user")
passport.use(new LocalStrategy({
    usernameField: 'USER_CODE',
    passwordField: 'PASSWORD'
},async (username,password,done)=> {
    // let where = {
    //     userName: username
    // };
    //在数据库中寻找输入的用户信息
    let result = await User.findOne(username);
    if (result != null) {
        if (result.PASSWORD === password) {
            return done(null, result)
        } else {
            return done(null, false, '密码错误')
        }
    } else {
        return done(null, false, '用户不存在')
    }
}))
passport.serializeUser(function(user, done) {
    done(null, user)
})
passport.deserializeUser(function(user, done) {
    return done(null, user)
 })

module.exports = passport