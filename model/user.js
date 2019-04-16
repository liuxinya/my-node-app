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
UserSchema.statics.findUser = async function(options, cb) {
    return this.find(options, cb);
}
UserSchema.statics.addUser = async function(info, cb) {
    let User = this;
    new User(info).save(cb);
}
UserSchema.statics.updateUser = async function(option, tarValue, cb) {
    this.where(option)
        .update(tarValue, cb)
    // this.update(option, tarValue, cb);
}
const User = mongoose.model('User', UserSchema);
module.exports = User;
