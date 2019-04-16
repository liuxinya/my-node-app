const User = require('../model/user');
const crypto = require('crypto');
const token = require('../help/token');
const register = async (ctx, next) => {
    try {
        let userInfo = ctx.request.body;
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(userInfo.password).digest("hex");
        let newInfo = {
            password: newPas,
            username: userInfo.username,
        }
        let user = await User.findUser({username: userInfo.username});
        if(user[0]) {
            ctx.fail(false,'用户名被注册！')
        }else {
            User.addUser({
                ...newInfo,
                token: token.createToken(userInfo.username)
            });
            ctx.success(true, '注册成功！')
        }
    }catch(e) {
        ctx.fail();
    }
}
module.exports = register;