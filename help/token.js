const jwt = require('jsonwebtoken');
function createToken(user_name){
    // 创建token时，我们把用户名作为JWT Payload的一个属性，并且把密钥设置为liuxinya,token过期时间设置为60s。意思是登录之后，60s内刷新页面不需要再重新登录。
    const token = jwt.sign({user_name: user_name}, 'liuxinya', {expiresIn: '60s'});
    // console.log(token)
    return token;
};

async function checkToken(ctx, next) {
    //拿到token
    const authorization = ctx.get('Authorization');
    if (authorization === '') {
        ctx.throw(401, 'no token detected in http headerAuthorization');
    }
    const token = authorization.split(' ')[1];
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, 'liuxinya');//如果token过期或验证失败，将抛出错误
    } catch (err) {
        ctx.throw(401, 'invalid token');
    }
    await next();
}

module.exports = {
    createToken,
    checkToken
}