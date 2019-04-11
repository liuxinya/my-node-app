'use strict';
const Koa = require('koa');
const initMiddleware = require('./setup/initMiddleware');
const initMongoose = require('./setup/initMongoose');
const app = new Koa();

// 设置签名的 Cookie 密钥
app.keys = [ 'some secret hurr' ];

// 中间件捕捉不到的错误 这里可以拦截
process.on('uncaughtException', err => {
    console.error('app uncaughtException', err.stack);
});

process.on('unhandledRejection', (reason, p) => {
    console.error('app Unhandled Rejection at:', p, 'reason:', reason);
});

// 初始化中间件
initMiddleware(app);
initMongoose();

app.listen(3000);
