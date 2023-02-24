export default () => {
    return async (cxt,next) => {
        ctx.isLogin1 = false;
        await next();
        ctx.body = bofy;
    }
}