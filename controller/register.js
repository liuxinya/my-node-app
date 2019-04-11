const User = require('../model/user');
const register = async (ctx, next) => {
    try {
        let userInfo = ctx.request.body;
        let s = await User.findUser(userInfo);
        // console.log(s)
        ctx.body = {
            a: 3
        }
    }catch(e) {
        ctx.body = {
            a: 1
        }
    }
}
module.exports = register;