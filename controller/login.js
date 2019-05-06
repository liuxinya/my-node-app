const User = require('../model/user');
const encrypt = require('../help/encrypt');
const token = require('../help/token');
async function login(ctx, next) {
    try {
        let userInfo = ctx.request.body;
        let newPas = encrypt(userInfo.password);
        let user = await User.findUser({username: userInfo.username, password: newPas});
        console.log(user)
        let newToken = token.createToken(userInfo.username);
        if(user) {
            await User.updateUser({username: userInfo.username}, {token: newToken});
            ctx.success({
                username: user.username,
                token: newToken
            }, '登录成功');
        }else {
            ctx.fail(null, '用户名或密码错误');
        }
    }catch(e) {
        console.error(e);
        ctx.fail(null, '服务端异常');
    }
}
module.exports = login;