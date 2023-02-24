module.exports = async (ctx,next) =>{
    ctx.isLogin = true;
    console.log(1);
    await next();
    console.log(2);
    var bofy = ctx.request.body;
    bofy.islogin1 = ctx.islogin1;
}