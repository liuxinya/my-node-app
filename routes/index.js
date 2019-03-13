const koaBody = require('koa-body');
const  Router = require('koa-router');
const router = new Router();
router.post('/index', koaBody(), async (ctx, next) => {
    // ctx.set("Content-Type", "application/json");
    ctx.cookies.set('name', 'liuxinya', {
        domain: 'localhost', // 写cookie所在的域名
        path: '/', // 写cookie所在的路径
        // maxAge: 1111110, // cookie有效时长
    })
    console.log(ctx.cookies.get('name'));
    ctx.body = {
        a:1
    }
})
router.get('/about', (ctx, next) => {
    ctx.body = '呵呵呵'
})

module.exports = router;