const backData = async (ctx, next) => {
    ctx.success = (data, msg) => {
        ctx.body = {
            succ: true,
            code: 1,
            msg: msg || '成功',
            data: data || true,
        }
    }
    ctx.fail = (data, msg) => {
        ctx.body = {
            succ: false,
            code: 0,
            msg: msg || '失败',
            data: data || false,
        }
    }
    await next();
}
module.exports = backData;