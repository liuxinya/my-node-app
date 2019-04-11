const User = require('../model/user');
async function login(ctx, next) {
    let userInfo = ctx.request.body;
    // console.log(userInfo)
    User.findUser(userInfo, (err, res) => {
        if(err) throw err;
        console.log(res)
        if(res[0])  {
            console.log('登录成功');
        }else {
            console.log('登录失败');
        }
    })
}
module.exports = login;