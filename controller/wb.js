const Weibo = require('../model/weibo');
const WeiboTypeList = require('../model/weiboTypeList');
const fileHelper = require('../help/fileHelper');
const tokenHelp = require('../help/token');
const token = require('../help/token.js');
const getGapNowToBefore = require('../help/time');
const UConfig = require('../config/app.config');
// 写微博
async function write(ctx, next) {
    try {
        let data = ctx.request.body;
        let imgUrlList = [];
        let imgList = data.imgList;
        if(imgList.length > 0) {
            for(let i = 0; i < imgList.length; i++ ) {
                let imgUrl = await fileHelper.saveImage(imgList[i].thumbUrl);
                imgUrlList.push(imgUrl);
            }
        }
        
        Weibo.addWeibo({
            creater: tokenHelp.getUserNameFromToken(ctx),
            createTime: new Date(),
            content: data.content,
            type: data.type || 1,
            imgList: imgUrlList,
        })
        ctx.success(true)
    }catch(e) {
        console.error(e);
        ctx.fail(null, '服务端异常');
    }
}
// 微博类型列表
async function getTypeList(ctx, next) {
    try {
        let typeList = await WeiboTypeList.findWeiboTypeList();
        let isSucc = await token.verifyToken(ctx);
        let backData = [];
        for(let i = 0; i < typeList.length; i++ ) {
            if(!isSucc && i == 0) continue;
            backData.push({
                id: typeList[i].id,
                name: typeList[i].name
            });
        }
        ctx.success(backData)
    }catch(e) {
        console.error(e);
        ctx.fail(null, '服务端异常');
    }
}
// 根据类型获得 微博列表
async function getWbList(ctx, next) {
    try {
        let type = ctx.url.match(/[0-9]/)[0];
        let option = type === "0"? {
            creater: tokenHelp.getUserNameFromToken(ctx),
        }: {
            type
        }
        let list = await Weibo.findWeiboOfSome(option);
        ctx.success(list.map(item => {
            for(let i = 0; i < item.imgList.length; i++) {
                item.imgList[i] =  UConfig.imgUrl + item.imgList[i];
            }
            return {
                imgList: item.imgList,
                type: item.type,
                creater: item.creater,
                content: item.content,
                id: item._id,
                createTime: getGapNowToBefore(item.createTime)
            }
        }))
    }catch(e) {
        console.error(e);
        ctx.fail(null, '服务端异常');
    }
}  
// 删除微博
async function deleteWb(ctx, next) {
    try{
        // 用登录用户名和微博id 去查找删除
        let username = token.getUserNameFromToken(ctx);
        let reqParam = ctx.query;
        let findRes = await Weibo.findWeiboOfOne({_id: reqParam.id});
        let imgList = findRes.imgList;
        let res = await Weibo.deleteWeibo({
            _id: reqParam.id,
            creater: username
        });
        if(res.ok && res.deletedCount == 1) {
            for(let i = 0; i < imgList.length; i++ ) {
                // 图片也删除
                let flag = await fileHelper.deleteFile(imgList[i]);
                // console.log(flag)
                if(!flag) console.error(`删除图片${imgList[i]}失败`);
            }
            ctx.success(true, '成功');
        }else {
            ctx.fail(false, '失败');
        }
    }catch(e) {
        console.error(e);
        ctx.fail(null, '服务端异常');
    }
} 

module.exports = {
    write,
    getTypeList,
    getWbList,
    deleteWb
};