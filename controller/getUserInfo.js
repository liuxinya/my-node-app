const User = require('../model/user');
const jwt = require('jsonwebtoken');
const tokenHelp = require('../help/token');
async function getUserInfo(ctx, next) {
    try {
        const token = ctx.cookies.get("userId");
        let username =  tokenHelp.getUserNameFromToken(ctx);
        // token 没有问题就把 解析出来的用户名和token返回
        ctx.success({
            username,
            token
        })
    }catch(e) {
        console.error(e);
        ctx.fail(null, '服务端异常');
    }
}
module.exports = getUserInfo;