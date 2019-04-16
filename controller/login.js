const User = require('../model/user');
const crypto = require('crypto');
const token = require('../help/token');
async function login(ctx, next) {
    let userInfo = ctx.request.body;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(userInfo.password).digest("hex");
    let user = await User.findUser({username: userInfo.username});
    if(user[0]) {
        if(user[0].password == newPas) {
            // 更新token
            await User.updateUser({username: userInfo.username}, {token: token.createToken(userInfo.username)}, (e) => {
                if(e) ctx.throw(401, 'token更新出错');
            });
            ctx.success({
                username: user[0].username,
                token: user[0].token
            }, '登录成功');
        }else {
            ctx.fail(null, '密码错误');
        }
    }else {
        ctx.fail(null, '该用户没有注册，请前去注册');
    }
}
module.exports = login;