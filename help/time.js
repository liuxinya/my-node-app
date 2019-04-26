function getGapNowToBefore(time) {
    let gap = new Date() - time;
    let s = gap / 1000;
    if(s >= 1 && s <= 60) {
        return Math.round(s) + '秒';
    } 
    let m = gap / (1000 * 60);
    if(m >= 1 && m <= 60) {
        return Math.round(m) + '分钟';
    }
    let h = gap / (1000 * 60 * 60);
    if(h >= 1 && h <= 60) {
        return Math.round(h) + '小时';
    }
    let d = gap / (1000 * 60 * 60 * 24);
    if(d >= 1 && d <= 30) {
        return Math.round(d) + '天';
    }
    let month = gap / (1000 * 60 * 60 * 24 / 30);
    if(month >= 1 && month <= 30) {
        return Math.round(month) + '月';
    }
    let y = gap / (1000 * 60 * 60 * 24 * 365);
    if(y >= 1) {
        return Math.round(y) + '年';
    }
}
// exports.getGapNowToBefore = getGapNowToBefore;
module.exports = getGapNowToBefore