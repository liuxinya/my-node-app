'use strict';
const cors = require('@koa/cors');
const session = require('koa-session');
const router = require('../routes');
const sessionConfig = require('./session.config');
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
    sessionInit(app);

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
        ctx.body = n + ' views';
        await next();
    });
}
