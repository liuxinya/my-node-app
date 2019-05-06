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

async function deleteFile(fileName) {
    return new Promise(resolve => {
        //异步 文件删除(判断文件是否存在)
        let imgPath = path.join(__dirname, '../public/imgs', fileName)
        // console.log(imgPath)
        fs.exists(imgPath, async function(exist) {
            if(exist) {
                await fs.unlink(imgPath, function(err) {
                    if(err) {
                        console.error(err);
                        resolve(false)
                    }
                    resolve(true)
                });
            }
        });  
    })
}
module.exports = {
    saveImage,
    deleteFile
}