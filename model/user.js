const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    age: {
        type: Number,
        default: 18
    },
    password: String,
    token: String
});
UserSchema.statics.findUser = async function(options) {
    return await this.findOne(options, {
        password : 0 // 返回结果不包含密码字段
    });
}
UserSchema.statics.addUser = async function(info, cb) {
    let User = this;
    new User(info).save(cb);
}
UserSchema.statics.updateUser = async function(option, tarValue) {
    // this.where(option)
    //     .update(tarValue, cb)
    await this.updateOne(option, tarValue);
}
const User = mongoose.model('User', UserSchema);
module.exports = User;
