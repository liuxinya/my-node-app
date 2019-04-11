const koaBody = require('koa-body');
const  Router = require('koa-router');
const router = new Router();
const login = require('../controller/login');
const register = require('../controller/register');
router.post('/index', koaBody(), async (ctx, next) => {
    // ctx.set("Content-Type", "application/json");
    // ctx.cookies.set('name', 'liuxinya', {
    //     domain: 'localhost', // 写cookie所在的域名
    //     path: '/', // 写cookie所在的路径
    //     // maxAge: 1111110, // cookie有效时长
    // })
    console.log(ctx.cookies.get('name'));
    ctx.body = {
        a:1
    }
})
router.post('/login',login)
router.post('/register', register)

module.exports = router;