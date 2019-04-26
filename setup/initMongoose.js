
const mongoose = require('mongoose');
const db = mongoose.connection;
function initMongoose() {
    mongoose.connect('mongodb://127.0.0.1:27017/myblog');
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('链接数据库成功！');
    });
}
module.exports = initMongoose;
