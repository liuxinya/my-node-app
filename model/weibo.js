const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let WeiboSchema = new Schema({
    creater: String,
    createTime: Date,
    content: String,
    type: {
        type: Number,
        default: 1
    },
    imgList: Array,
});
WeiboSchema.statics.findWeiboOfOne = async function(options) {
    return await this.findOne(options);
}
WeiboSchema.statics.findWeiboOfSome = async function(options) {
    return await this.find(options);
}
WeiboSchema.statics.addWeibo = async function(info, cb) {
    let Weibo = this;
    new Weibo(info).save(cb);
}
WeiboSchema.statics.deleteWeibo = async function(info, cb) {
    return await this.deleteOne(info);
}
// WeiboSchema.statics.update = async function(option, tarValue) {
//     // this.where(option)
//     //     .update(tarValue, cb)
//     await this.updateOne(option, tarValue);
// }
const Weibo = mongoose.model('Weibo', WeiboSchema);
module.exports = Weibo;
