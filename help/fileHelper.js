const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v1'); // 
async function saveImage(thumbUrl) {
    return new Promise((resolve, reject) => {
        let base64 = thumbUrl.replace(/^data:image\/\w+;base64,/, "");
        let imgBuffer = new Buffer(base64, 'base64');
        const imgId = uuid();
        let imgPath = path.join(__dirname, '../public/imgs', `${imgId}.jpg`)
        fs.writeFile(imgPath, imgBuffer, (err) => {
            if(err) reject();
            resolve(`${imgId}.jpg`)
        })
    })
}
module.exports = saveImage;