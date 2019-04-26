const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let WeiboTypeSchema = new Schema({
    id: Number,
    name: String 
});
WeiboTypeSchema.statics.findWeiboTypeList = async function(option) {
    return await this.find(option);
}
WeiboTypeSchema.statics.addWeiboTypeList = async function(info, cb) {
    let WeiboTypeList = this;
    new WeiboTypeList(info).save(cb);
}
// WeiboTypeSchema.statics.update = async function(option, tarValue) {
//     // this.where(option)
//     //     .update(tarValue, cb)
//     await this.updateOne(option, tarValue);
// }
const WeiboTypeList = mongoose.model('weiboTypeList', WeiboTypeSchema);
module.exports = WeiboTypeList;
