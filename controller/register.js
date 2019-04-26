const User = require('../model/user');
const encrypt = require('../help/encrypt');
const token = require('../help/token');
const register = async (ctx, next) => {
    try {
        let userInfo = ctx.request.body;
        let newPas = encrypt(userInfo.password)
        let newInfo = {
            password: newPas,
            username: userInfo.username,
        }
        let user = await User.findUser({username: userInfo.username});
        if(user) {
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