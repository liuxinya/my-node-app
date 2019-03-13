
import Koa from 'koa';
import { initMiddleware } from './config/initMiddleware';

const app = new Koa();

// 设置签名的 Cookie 密钥
app.keys = ['some secret hurr'];
 
// 中间件捕捉不到的错误 这里可以拦截
process.on('uncaughtException', err => {
    console.error('app uncaughtException', err.stack);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('app Unhandled Rejection at:', p, 'reason:', reason);
});

// 初始化中间件
initMiddleware(app);

app.listen(3000);