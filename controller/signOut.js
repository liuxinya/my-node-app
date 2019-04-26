const User = require('../model/user');
async function signOut(ctx, next) {
    try {
        const token = ctx.cookies.get("userId");
        await User.updateUser({token}, {token: ''});
        ctx.success()
    }catch(e) {
        console.error(e);
        ctx.fail(null, '服务端异常');
    }
}
module.exports = signOut;