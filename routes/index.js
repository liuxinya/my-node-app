import koaBody from 'koa-body';
import  Router from 'koa-router';
const router = new Router();
router.post('/index', koaBody(), async (ctx, next) => {
    // ctx.set("Content-Type", "application/json");
    ctx.cookies.set('name', 'liuxinya')
    console.log(ctx.cookies.get('name'));
    ctx.body = {
        a:1
    }
})
router.get('/about', (ctx, next) => {
    ctx.body = '呵呵呵'
})

export { router }