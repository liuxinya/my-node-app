const jwt = require('jsonwebtoken');
function createToken(user_name){
    // 创建token时，我们把用户名作为JWT Payload的一个属性，并且把密钥设置为liuxinya,token过期时间设置为60s。意思是登录之后，60s内刷新页面不需要再重新登录。
    const token = jwt.sign({user_name: user_name}, 'liuxinya', {expiresIn: '3600s'});
    // console.log(token)
    return token;
};
function getUserNameFromToken(ctx) {
    const token = ctx.cookies.get("userId");
    return jwt.decode(token).user_name;
}
async function checkToken(ctx, next) {
    // 拿到token
    // 从请求头里面拿 需要把cookie塞到 header里面去
    // const authorization = ctx.get('Authorization');
    // 从cookie里面拿 放cookie里面不能跨越
    const token = ctx.cookies.get("userId");
    if (token === '') {
        ctx.throw(401, 'no token detected in http headerAuthorization');
    }
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, 'liuxinya');//如果token过期或验证失败，将抛出错误
    } catch (err) {
        console.error(err)
        ctx.throw(401, 'invalid token');
    }
    await next();
}
async function verifyToken(ctx) {
    const token = ctx.cookies.get("userId");
    if (token === '') {
        return false;
    }
    try {
        await jwt.verify(token, 'liuxinya');//如果token过期或验证失败，将抛出错误
    } catch (err) {
        return false;
    }
    return true;
}
module.exports = {
    createToken,
    checkToken,
    getUserNameFromToken,
    verifyToken
}