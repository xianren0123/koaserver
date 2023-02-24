module.exports = async (ctx,next) =>{
    
    var bofy = ctx.request.body;
    bofy.islogin = ctx.isLogin;
    ctx.islogin1 = false;
    ctx.body = bofy;
    throw new Error("未知错误");
    console.log("中间件")
    await next();
}