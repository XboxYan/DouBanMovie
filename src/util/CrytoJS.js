import CryptoJS from 'crypto-js';
var dfgsd = "contentWindowHig";
var rgfgb = "contentDocuments";
function Get(a) {
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

function objToPara(obj, encode = true){
    if(obj){
        let paras = '';
        for(par in obj){
            const value = encode ? encodeURIComponent(obj[par]) : obj[par];
            paras += '&' + par + '=' + value;
        }
        return paras;
    }
    return '';
}

export {Get,objToPara};
export default CryptoJS;