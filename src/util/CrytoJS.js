import CryptoJS from 'crypto-js';
var dfgsd = "contentWindowHig";
var rgfgb = "contentDocuments";
function get(a) {
    var b = CryptoJS.MD5(dfgsd);
    var c = CryptoJS.enc.Utf8.parse(b);
    var d = CryptoJS.enc.Utf8.parse(rgfgb);
    var e = CryptoJS.AES.encrypt(a, c, {
        iv: d,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return e.toString()
}

export {get};
export default CryptoJS;