'use strict';
const cors = require('@koa/cors');
const session = require('koa-session');
const router = require('../routes');
const sessionConfig = require('./session.config');
const bodyParser = require('koa-bodyparser')
const backData = require('../help/backData');
const path = require('path');
function initMiddleware(app) {
    // 跨域
    app.use(cors({
        origin(ctx) {
            const origin = ctx.accept.headers.origin;
            return origin;
        },
        credentials: true,
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
      }));
    // session
    app.use(session(sessionConfig, app));
    app.use(bodyParser({
        jsonLimit: '10mb'    // 增大数据的大小限制（图片的存储） 默认1M 超过限制报413错误
    }))
    app.use(require('koa-static')(path.join(__dirname, '..', "public")));
    app.use(backData);
    // sessionInit(app);
    // 路由
    app
        .use(router.routes())
        .use(router.allowedMethods());
}

module.exports = initMiddleware;

function sessionInit(app) {
    app.use(async (ctx, next) => {
        // ignore favicon
        if (ctx.path === '/favicon.ico') return;
        let n = ctx.session.views || 0;
        ctx.session.views = ++n;
        // ctx.body = n + ' views';
        await next();
    });
}
