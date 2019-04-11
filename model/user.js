const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    age: {
        type: Number,
        default: 18
    },
    password: String
});
UserSchema.statics.findUser = async function(options, cb) {
    // return this.find(options, cb);
    return new Promise(async (resolve, reject) => {
        let res = await this.find(options, cb);
        resolve(res);
    })
}
UserSchema.statics.addUser = async function(info, cb) {
    let User = this;
    new User(info).save(cb);
}
const User = mongoose.model('User', UserSchema);
module.exports = User;
