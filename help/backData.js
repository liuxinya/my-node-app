const backData = async (ctx, next) => {
    ctx.success = (data, message) => {
        ctx.body = {
            success: true,
            status: "200",
            data: {
                message: message || '成功',
                data
            },
        }
    }
    ctx.fail = (data, messageg) => {
        ctx.body = {
            success: false,
            status: "400",
            data: {
                message: message || '失败',
                data
            }
        }
    }
    next();
}
module.exports = backData;