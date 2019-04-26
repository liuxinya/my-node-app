
const crypto = require('crypto');

function encrypt(options) {
    let md5 = crypto.createHash("md5");
    return  md5.update(options).digest("hex");

}
module.exports = encrypt;