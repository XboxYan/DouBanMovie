/*
*
MovieDetail
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    UIManager,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    Animated,
    Image,
    Picker,
    LayoutAnimation,
    View,
} from 'react-native';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react/native';
import _ from '../../theme';
import fetchData from '../../util/Fetch';
import Loading from '../../compoents/Loading';
import Shadow from '../../compoents/Shadow';
import Star from '../../compoents/Star';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Touchable from '../../compoents/Touchable';
import CommentList from '../../compoents/CommentList';

const SortTitle = observer((props) => (
    <View style={[styles.view_hd, { borderColor: _.Color }]}>
        <Text style={styles.view_title}>{props.title}</Text>
        {
            props.children || null
        }
    </View>
))

const CastItem = observer((props) => (
    <TouchableOpacity activeOpacity={.7} style={styles.castitem}>
        <View style={styles.castimgwrap}>
            {
                (!props.item.avatars || props.DoubanisNull) && <Text style={styles.casttitle}>{props.DoubanisNull ? props.item && props.item[0] : props.item.name && props.item.name[0]}</Text>
            }
            <Image resizeMode='cover' style={styles.castimg} source={{ uri: props.item.avatars ? props.item.avatars.medium : '...' }} />
        </View>
        <Text numberOfLines={2} style={[styles.castname, props.director && { color: _.Color, fontStyle: 'italic' }, (props.DoubanisNull ? props.item : props.item.name) && { marginTop: 10 }]}>{props.DoubanisNull ? props.item : props.item.name}</Text>
        {
            props.director && <Text style={[styles.director, { backgroundColor: _.Color }]}>导</Text>
        }
    </TouchableOpacity>
))

const TypeItem = observer((props) => (
    <TouchableOpacity activeOpacity={.7} style={styles.typeitem}>
        <Text style={styles.typename}>{props.item}</Text>
    </TouchableOpacity>
))

@observer
class SourceItem extends PureComponent {
    getUrl = () => {
        const { Source: { getUrl, currentIndex }, index } = this.props;
        if (currentIndex != index) {
            getUrl(index);
        }
    }
    render() {
        const { item, last, index, Source: { currentIndex } } = this.props;
        return (
            <TouchableOpacity onPress={this.getUrl} style={[styles.sourceitem, last && { marginRight: 30 }]} activeOpacity={.7}>
                <Text numberOfLines={2} style={styles.castname}>{item.name || ' '}</Text>
                <View style={[styles.sourcedot, { backgroundColor: _.Color }, currentIndex === index && { opacity: 1 }]} />
            </TouchableOpacity>
        )
    }
}

@observer
class MovieSource extends PureComponent {
    renderItem = ({ item, index }) => {
        return <SourceItem item={item} index={index} Source={this.props.Source} last={index === this.props.Source.sourceslen - 1} />
    }
    render() {
        const { Source } = this.props;
        if (Source.sourceslen === 0) {
            return <Text style={[styles.sourceitem, { width: 50, marginLeft: 15 }]}>{' '}</Text>
        }
        return (
            <FlatList
                ref={(ref) => this.flatlist = ref}
                style={styles.sourcelist}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                initialNumToRender={20}
                removeClippedSubviews={false}
                data={[...Source.sources]}
                keyExtractor={(item, index) => index + item.aid}
                renderItem={this.renderItem}
            />
        )
    }
}

class SourceStore {

    sourceTypes = [];

    sourceTypesLength = 0;

    movieId = '';

    @observable
    playUrl = _Base;

    constructor(movieId, sourceTypes, sources) {
        this.movieId = movieId;
        this.sourceTypes = sourceTypes;
        this.sourceTypesLength = sourceTypes.length;
        this.sources = sources;
    }

    @observable
    selectedPosition = 0;

    @observable
    movieIndex = new Array(this.sourceTypesLength).fill(0);

    @computed
    get currentIndex() {
        return this.movieIndex[this.selectedPosition];
    }

    @computed
    get type() {
        return this.sourceTypes[this.selectedPosition].type || '';
    }

    @computed
    get name() {
        return this.sourceTypes[this.selectedPosition].name || '';
    }

    @computed
    get desc() {
        return this.sourceTypes[this.selectedPosition].desc || '';
    }

    @computed
    get basePlayUrl() {
        return this.sources[this.currentIndex].playUrl || '';
    }

    @observable
    sources = [];

    @computed
    get sourceslen() {
        return this.sources.length;
    }

    @action
    getRealUrl = async (Url, isKan360 = false) => {
        if (Url.includes('play.g3proxy.lecloud') || isKan360) {
            return await fetch(Url)
                .then((response) => {
                    if (response.ok) {
                        return response.url;
                    }
                })
                .catch((err) => {
                    console.warn(err)
                })
        } else {
            return Url
        }
    }

    @action
    getKanKanInfo = async (id, token) => {
        return await fetch(`https://newplayer.lsmmr.com/parse.php?h5url=null&id=${id}&dysign=${token}&script=1`, {
            headers: {
                Referer: 'https://newplayer.dongyaodx.com'
            }
        })
            .then((response) => {
                if (response.ok) {
                    let text = response.text();
                    if (text[0]) {
                        let reg = /\/\/\[parseArea\]([\s\S]*)\/\/\[\/parseArea\]/g;
                        const [base, parseArea] = reg.exec(text);
                        return parseArea;
                    }
                    return '';
                }
            })
            .catch((err) => {
                console.warn(err);
                return '';
            })
    }

    @action
    getToken = async (id) => {
        let time = (new Date()).valueOf();
        //alert(`${_Base}token?_=${time}&id=${id}`)
        return await fetch(`${_Base}token?_=${time}&id=${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                ToastAndroid.show(data.token, ToastAndroid.SHORT);
                return data.token;
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    getMovieInfo = async (Url) => {
        return await fetch(Url, {
            headers: {
                'Referer': 'http://m.kankanwu.com',
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    @action
    getPlayerInfo = async (ikanReg, getUrl) => {
        let document = {
            getElementById: {
                value: null
            },
            domain: 'newplayer.dongyaodx.com'
        }
        function md5(string) { function md5_RotateLeft(lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)) } function md5_AddUnsigned(lX, lY) { var lX4, lY4, lX8, lY8, lResult; lX8 = (lX & 0x80000000); lY8 = (lY & 0x80000000); lX4 = (lX & 0x40000000); lY4 = (lY & 0x40000000); lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF); if (lX4 & lY4) { return (lResult ^ 0x80000000 ^ lX8 ^ lY8) } if (lX4 | lY4) { if (lResult & 0x40000000) { return (lResult ^ 0xC0000000 ^ lX8 ^ lY8) } else { return (lResult ^ 0x40000000 ^ lX8 ^ lY8) } } else { return (lResult ^ lX8 ^ lY8) } } function md5_F(x, y, z) { return (x & y) | ((~x) & z) } function md5_G(x, y, z) { return (x & z) | (y & (~z)) } function md5_H(x, y, z) { return (x ^ y ^ z) } function md5_I(x, y, z) { return (y ^ (x | (~z))) } function md5_FF(a, b, c, d, x, s, ac) { a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac)); return md5_AddUnsigned(md5_RotateLeft(a, s), b) }; function md5_GG(a, b, c, d, x, s, ac) { a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac)); return md5_AddUnsigned(md5_RotateLeft(a, s), b) }; function md5_HH(a, b, c, d, x, s, ac) { a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac)); return md5_AddUnsigned(md5_RotateLeft(a, s), b) }; function md5_II(a, b, c, d, x, s, ac) { a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac)); return md5_AddUnsigned(md5_RotateLeft(a, s), b) }; function md5_ConvertToWordArray(string) { var lWordCount; var lMessageLength = string.length; var lNumberOfWords_temp1 = lMessageLength + 8; var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64; var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16; var lWordArray = Array(lNumberOfWords - 1); var lBytePosition = 0; var lByteCount = 0; while (lByteCount < lMessageLength) { lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition)); lByteCount++ } lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition); lWordArray[lNumberOfWords - 2] = lMessageLength << 3; lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29; return lWordArray }; function md5_WordToHex(lValue) { var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount; for (lCount = 0; lCount <= 3; lCount++) { lByte = (lValue >>> (lCount * 8)) & 255; WordToHexValue_temp = "0" + lByte.toString(16); WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2) } return WordToHexValue }; function md5_Utf8Encode(string) { string = string.replace(/\r\n/g, "\n"); var utftext = ""; for (var n = 0; n < string.length; n++) { var c = string.charCodeAt(n); if (c < 128) { utftext += String.fromCharCode(c) } else if ((c > 127) && (c < 2048)) { utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128) } else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128) } } return utftext }; var x = Array(); var k, AA, BB, CC, DD, a, b, c, d; var S11 = 7, S12 = 12, S13 = 17, S14 = 22; var S21 = 5, S22 = 9, S23 = 14, S24 = 20; var S31 = 4, S32 = 11, S33 = 16, S34 = 23; var S41 = 6, S42 = 10, S43 = 15, S44 = 21; string = string + "6d80e2c8f1a4cbbc4a295910ad0d5f47"; string = md5_Utf8Encode(string); x = md5_ConvertToWordArray(string); a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476; for (k = 0; k < x.length; k += 16) { AA = a; BB = b; CC = c; DD = d; a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478); d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756); c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB); b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE); a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF); d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A); c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613); b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501); a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8); d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF); c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1); b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE); a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122); d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193); c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E); b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821); a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562); d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340); c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51); b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA); a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D); d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453); c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681); b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8); a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6); d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6); c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87); b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED); a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905); d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8); c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9); b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A); a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942); d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681); c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122); b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C); a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44); d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9); c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60); b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70); a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6); d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA); c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085); b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05); a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039); d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5); c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8); b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665); a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244); d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97); c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7); b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039); a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3); d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92); c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D); b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1); a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F); d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0); c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314); b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1); a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82); d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235); c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB); b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391); a = md5_AddUnsigned(a, AA); b = md5_AddUnsigned(b, BB); c = md5_AddUnsigned(c, CC); d = md5_AddUnsigned(d, DD) } return (md5_WordToHex(a) + md5_WordToHex(c) + md5_WordToHex(b) + md5_WordToHex(d)).toLowerCase() }
        let s = eval(ikanReg).replace(/\('e'\+'2'\)/g, '');
        eval(s);
        let base = 'https://newplayer.dongyaodx.com/';
        let time = (new Date()).valueOf();
        let Url = `${base}parse.php?h5url` + eval(`'` + getUrl.replace(/\('e2'\)/g, '')) + `&script=1&_=${time}`;
        return await fetch(Url, {
            headers: {
                'Referer': base,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Mobile Safari/537.36'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    @action
    regIkan = (s) => {
        let document = {
            getElementById: {
                value: null
            }
        }
        let a = eval(s).replace(/\('e'\+'2'\)/g, '');
        alert(a)
        let reg = /([\s\S]*)eval/g
        const [_html, ikan2] = reg.exec(ikan);
        eval(ikan2);
        return e1r.join('');
    }

    @action
    //获取优酷utid
    getUtid = async () => {
        return await fetch('https://log.mmstat.com/eg.js',{
            headers:{
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Mobile Safari/537.36'                
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
            })
            .then((response)=>{
                let reg = /Etag\=([\s\S]*);goldlog/g
                const [_html, utid] = reg.exec(response);
                return utid;
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    getYouku = async (params) => {
        let time = (new Date()).valueOf();
        let { vid, ccode } = params;
        let utid = await this.getUtid();
        return await fetch(`https://ups.youku.com/ups/get.json?vid=${vid}&ccode=${ccode}&client_ip=192.168.1.1&utid=${utid}&client_ts=${time}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                return data.data.stream[data.data.stream.length - 1].m3u8_url;
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    getQQ = async (params) => {
        let Url = "https://h5vv.video.qq.com/getinfo?callback=&charge=0&vid=" + params.vid + "&defaultfmt=auto&otype=json&guid=" + params.guid + "&platform=" + params.platform + "&defnpayver=1&appVer=" + params.appver + "&sdtfrom=v1010&host=v.qq.com&ehost=" + encodeURIComponent(params.pageUrl) + "&_rnd=" + params.rnd + "&defn=" + params.fmt + "&fhdswitch=0&show1080p=1&" + (params.dltype == 3 ? "isHLS=1&dtype=3&sphls=1" : "isHLS=0") + "&newplatform=" + params.platform + "&defsrc=1&_qv_rmt=" + params.q1 + "&_qv_rmt2=" + params.q2;
        return await fetch(Url)
            .then((response) => {
                alert(JSON.stringify(response))
                if (response.ok) {
                    return response.json();
                }
            })
            .then((g) => {
                
                let firstUrl = g.vl.vi[0].ul.ui[uidx].url + params.filename.split("|")[0] + "?sdtfrom=v1010&guid=" + params.guid + "&vkey=" + g.vl.vi[0].fvkey;
                return firstUrl;
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    regKankanUrl = async (s) => {
        let reg = /\/\/\[parseArea\]([\s\S]*)\/\/\[\/parseArea\]/g;
        const [base, parseArea] = reg.exec(s);
        if (parseArea.includes('youku')) {
            //youku
            let reg = /params\=([\s\S]*);[\s\S]*vParser\=/g
            const [base, res] = reg.exec(parseArea);
            let params = JSON.parse(res);
            let url = await this.getYouku(params);
            return url;
        } else if (parseArea.includes('qq')) {
            //qq
            let reg = /params\=([\s\S]*);[\s\S]*vParser\=/g
            const [base, res] = reg.exec(parseArea);
            
            let params = eval('(' + res + ')');
            //alert(JSON.stringify(params))
            let url = await this.getQQ(params);
            return url;
        } else if (parseArea.includes('vParse_Error')) {
            return '解析失败'
        } else {
            let reg = /vParse_Play\(([\s\S]*)\);/g
            const [base, res] = reg.exec(parseArea);
            let _res = eval('(' + res + ')');
            return _res.urls[0].u;
        }

    }

    @action
    getKankan = async (Url) => {
        let html = await this.getMovieInfo(Url);
        //let reg = /urlplay1\D+'(\w+)';\D+tm\D+'(\d+)';\D+sign\D+'(\w+)';\D+refer\D+'(\S+)';\D+eval([\s\S]*)\nif\(is_mobile\D+getScript\(([\s\S]*)\);\n}/g;
        let reg = /eval([\s\S]*)\nif\(is_mobile[\s\S]*xmlurl([\s\S]*)\+'}',/g;
        const [_html, ikanReg, getUrl] = reg.exec(html);
        let playInfo = await this.getPlayerInfo(ikanReg, getUrl);
        let url = await this.regKankanUrl(playInfo);
        let realUrl = await this.getRealUrl(url);
        return realUrl;
    }

    @action
    getKan360Url = async (Url) => {
        return await fetch(`http://120.55.16.187/newmovie/btmovie/vparse?url=${Url}`)
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                //alert(JSON.stringify(data.body))
                return data.body.videoInfo[data.body.videoInfo.length - 1].url;
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    getKan360 = async (Url) => {
        let playlist = await this.getKan360Url(Url);
        let realUrl = await this.getRealUrl(playlist, true);
        return realUrl;
    }

    @action
    getInfos = async () => {
        return await fetch(this.basePlayUrl)
            .then((response) => {
                if (response.ok) {
                    return response.headers.map
                }
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    getMoviePlay = async () => {
        let headers = await this.getInfos();
        const { jsurl: [jsUrl], infourl: [infoUrl] } = headers;
        //ToastAndroid.show(infoUrl, ToastAndroid.SHORT);
        const [Url, referUrl, type, name] = infoUrl.split('####');
        switch (type) {
            case 'kankan':
                return await this.getKankan(Url);
                break;
            case 'kan360':
                return await this.getKan360(Url);
                break;
            default:
                break;
        }
    }

    @action
    getUrl = async (movieIndex) => {
        let playUrl = '';
        this.movieIndex[this.selectedPosition] = movieIndex;
        switch (this.type) {
            case 'kankan':
            case 'kan360':
                playUrl = await this.getMoviePlay();
                break;
            case 'btpan':
                playUrl = this.basePlayUrl;
                break;
            default:
                break;
        }
        this.playUrl = playUrl;
        ToastAndroid.show(playUrl, ToastAndroid.SHORT);
    }

    @action
    getSource = (value, position) => {
        this.selectedPosition = position;
        //this.sources = [{}];
        fetchData('videosource', {
            par: {
                movieId: this.movieId,
                type: this.type,
                name: this.name
            }
        },
            (data) => {
                this.sources = data.body;
                LayoutAnimation.spring();
            }
        )
    }
}

@observer
export default class MovieDetail extends PureComponent {

    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

    }

    scrollTop = new Animated.Value(0);

    @observable movieId = '';

    doubanId = null;

    @observable DoubanisNull = false;

    @observable data = {};

    @observable isMore = false;

    @observable isRender = false;

    @computed get status() {
        return this.data.status;
    }

    @computed get updateDate() {
        return this.data.updateDate;
    }

    @computed get img() {
        return this.isRender ? this.data.img : '...';
    }

    @computed get release() {
        return this.data.release;
    }

    @computed get area() {
        return this.data.area;
    }

    @computed get name() {
        return this.data.name || '加载中..';
    }

    @computed get type() {
        //return this.isRender ? this.data.type.replace(/(\s*$)/g, "").split(' ') : [''];
        return this.DoubanisNull ? (this.data.type.split(' ').filter((el) => !!el)) : this.Doubandata.genres;
        //return this.Doubandata.genres || [''];
    }

    @computed get sourceTypes() {
        return this.data.sourceTypes || [{}];
    }

    @computed get sources() {
        return this.data.sources || [];
    }

    @computed
    get Source() {
        return new SourceStore(this.movieId, this.sourceTypes, this.sources);
    }

    @observable Doubandata = {};

    @computed get score() {
        return this.DoubanisNull ? this.data.score : (this.DoubanisRender ? this.Doubandata.rating.average : 0);
        //return this.DoubanisRender?this.Doubandata.rating.average:0;
    }

    @computed get summary() {
        return this.DoubanisNull ? this.data.desc : this.Doubandata.summary;
    }

    @computed get casts() {
        return this.DoubanisNull ? (this.data.actors ? this.data.actors.split(' ').filter((el) => !!el) : ['无数据']) : this.Doubandata.casts;
    }

    @computed get directors() {
        return this.DoubanisNull ? ['无数据'] : this.Doubandata.directors || [''];
    }

    @observable DoubanisRender = false;

    @observable Commentdata = {};

    @computed get CommentList() {
        return this.Commentdata.interests || [];
    }

    @computed get CommentTotal() {
        return this.Commentdata.total || 0;
    }

    @observable CommentisRender = false;

    @action
    getData = () => {
        fetchData('video', {
            par: {
                videoId: this.movieId,
                st: '',
                sn: ''
            }
        },
            (data) => {
                this.data = data.body;
                this.isRender = true;
                this.doubanId = data.body.doubanId;
                LayoutAnimation.spring();
                if (this.doubanId) {
                    this.getDoubanData();
                    this.getComments();
                } else {
                    this.DoubanisNull = true;
                }
            }
        )
    }
    @action
    getDoubanData = () => {
        fetchData('douban_subject', {
            par: {
                id: this.doubanId
            }
        },
            (data) => {
                this.Doubandata = data;
                this.DoubanisRender = true;
                LayoutAnimation.spring();
            }
        )
    }
    @action
    getComments = () => {
        fetchData('get_comments', {
            headers: {
                'User-Agent': 'api-client/1 com.douban.frodo'
            },
            par: {
                id: this.doubanId
            }
        },
            (data) => {
                this.Commentdata = data;
                this.CommentisRender = true;
                LayoutAnimation.spring();
            }
        )
    }
    componentDidMount() {
        const { params: { movieId } } = this.props.navigation.state;
        this.movieId = movieId;
        this.getData();
    }
    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }
    onScroll = (e) => {
        // Animated.event(
        //     [{ e:{nativeEvent: { contentOffset: { y: this.scrollTop } } }}],
        //     { useNativeDriver: true }
        // )
        this.scrollTop.setValue(e.nativeEvent.contentOffset.y);
    }
    play = () => {
        const { getUrl, currentIndex } = this.Source;
        getUrl(currentIndex);
    }
    expand = () => {
        LayoutAnimation.spring();
        this.isMore = !this.isMore;
    }
    render() {
        const { navigation } = this.props;
        //const { params: { movieId } } = navigation.state;
        return (
            <View style={styles.content}>
                <View style={styles.appbar}>
                    <Touchable
                        style={styles.btn}
                        onPress={this.goBack}
                    >
                        <Icon name='keyboard-arrow-left' size={30} color='#fff' />
                    </Touchable>
                    <View style={styles.apptitle}>
                        <Animated.Text style={[styles.apptitletext, {
                            opacity: this.scrollTop.interpolate({
                                inputRange: [$.STATUS_HEIGHT + 40, $.STATUS_HEIGHT + 41],
                                outputRange: [1, 0]
                            })
                        }]} numberOfLines={1}>影视详情</Animated.Text>
                        <Animated.Text style={[styles.apptitletext, {
                            opacity: this.scrollTop.interpolate({
                                inputRange: [$.STATUS_HEIGHT + 40, $.STATUS_HEIGHT + 41],
                                outputRange: [0, 1]
                            })
                        }]} numberOfLines={1}>{this.name}</Animated.Text>
                    </View>
                    <Touchable
                        style={styles.btn}
                    >
                        <Icon name='favorite-border' size={20} color='#fff' />
                    </Touchable>
                    <Animated.View style={[styles.fullcon, { backgroundColor: _.Color }, {
                        opacity: this.scrollTop.interpolate({
                            inputRange: [$.STATUS_HEIGHT, $.STATUS_HEIGHT + 50],
                            outputRange: [0, 1]
                        })
                    }]} ><Shadow /></Animated.View>
                </View>
                <Animated.ScrollView
                    stickyHeaderIndices={[]}
                    //scrollEventThrottle={1} // <-- 设为1以确保滚动事件的触发频率足够密集
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollTop } } }],
                        //{ useNativeDriver: true } // <-- 加上这一行
                    )}
                    showsVerticalScrollIndicator={false}
                    style={styles.content}>
                    <Animated.Image
                        resizeMode='cover'
                        blurRadius={3.5}
                        source={{ uri: this.img }}
                        style={[styles.bg_place, {
                            backgroundColor: _.Color, transform: [{
                                scale: this.scrollTop.interpolate({
                                    inputRange: [0, $.STATUS_HEIGHT + 50],
                                    outputRange: [1, 1.3]
                                })
                            }]
                        }]} />
                    <View style={[styles.viewcon, styles.row, { marginTop: $.STATUS_HEIGHT + 50 }]}>
                        <View style={styles.poster}><Image source={{ uri: this.img }} style={[styles.fullcon, styles.borR]} /></View>
                        <View style={styles.postertext}>
                            <Text style={[styles.title, { color: _.Color }]}>{this.name}</Text>
                            <Star style={styles.score} score={this.score} />
                            {
                                this.isRender && <Text style={styles.status}>{this.status}</Text>
                            }
                            <Text style={styles.subtitle}>{this.area} / {this.release}</Text>
                            <Text style={styles.subtitle}>{this.updateDate} 更新</Text>
                            <View style={styles.sourceType}>
                                <Text style={styles.pickertitle}>来源 / </Text>
                                <Text style={[styles.pickertitle, { color: _.Color }]}>{this.Source.desc}</Text>
                                <Icon name='expand-more' size={20} color={_.Color} />
                                <Picker
                                    style={styles.picker}
                                    selectedValue={'pos' + this.Source.selectedPosition}
                                    onValueChange={this.Source.getSource}
                                    mode='dropdown'>
                                    {
                                        this.Source.sourceTypes.map((el, i) => <Picker.Item color={'#666'} key={i} label={el.desc + el.type || ''} value={'pos' + i} />)
                                    }
                                </Picker>
                            </View>
                            <TouchableOpacity onPress={this.play} activeOpacity={.7} style={[styles.playbtn, { backgroundColor: _.Color }]}>
                                <Icon name='play-arrow' size={20} color='#fff' />
                                <Text style={styles.playtext}>播放</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.viewcon}>
                        <Video
                            source={{ uri: this.Source.playUrl }}
                            style={styles.backgroundVideo}
                            resizeMode="contain"
                            controls={true}
                            repeat={true}
                            paused={false}
                        />
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title={`剧集(${this.Source.sourceslen})`} />
                        <MovieSource Source={this.Source} />
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title='导演 / 主演' />
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.con}>
                            {
                                this.directors.map((el, i) => (
                                    <CastItem DoubanisNull={this.DoubanisNull} director={true} key={i} item={el} />
                                ))
                            }
                            {
                                (this.DoubanisRender || this.DoubanisNull) && this.casts.map((el, i) => (
                                    <CastItem DoubanisNull={this.DoubanisNull} key={i} item={el} />
                                ))
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title='剧情介绍'>
                            {
                                (this.DoubanisRender || this.DoubanisNull) &&
                                <TouchableOpacity
                                    onPress={this.expand}
                                    style={styles.view_more}
                                >
                                    <Text style={styles.view_moretext}>{this.isMore ? '收起' : '展开'}</Text>
                                    <Icon name={this.isMore ? 'expand-less' : 'expand-more'} size={20} color={_.Color} />
                                </TouchableOpacity>
                            }
                        </SortTitle>
                        <View style={styles.con}>
                            {
                                (this.DoubanisRender || this.DoubanisNull)
                                    ?
                                    <Text numberOfLines={this.isMore ? 0 : 5} style={styles.text}>{this.summary}</Text>
                                    :
                                    <Loading size='small' text='' />
                            }
                        </View>
                        <View style={styles.con}>
                            {
                                (this.DoubanisRender || this.DoubanisNull) && this.type.map((el, i) => (
                                    <TypeItem key={i} item={el} />
                                ))
                            }
                        </View>
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title={`热评(${this.CommentTotal})`} />
                        <View style={styles.con}>
                            <CommentList isRender={this.CommentisRender || this.DoubanisNull} data={this.CommentList} />
                        </View>
                        {
                            this.CommentisRender &&
                            <Touchable
                                onPress={() => navigation.navigate('Comment', { id: this.doubanId, total: this.CommentTotal })}
                                style={styles.commentbtn}>
                                <Text style={{ fontSize: 16, color: _.Color }}>查看更多评论</Text>
                            </Touchable>
                        }
                    </View>
                </Animated.ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    bg_place: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        resizeMode: 'cover',
        height: $.WIDTH * 9 / 16
    },
    video_place: {
        height: $.WIDTH * 9 / 16,
        backgroundColor: '#000',
    },
    movieTitle: {
        fontSize: 16,
        color: '#333',
        padding: 15,
        backgroundColor: '#fff'
    },
    viewcon: {
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderRadius: 3,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: 'row'
    },
    view_hd: {
        height: 15,
        borderLeftWidth: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    view_title: {
        fontSize: 15,
        color: '#333',
        flex: 1
    },
    con: {
        paddingHorizontal: 15,
        paddingBottom: 5,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    text: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20
    },
    fullScreen: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        height: $.WIDTH * 9 / 16
    },
    appbar: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        paddingTop: $.STATUS_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10
    },
    fullcon: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
    },
    borR: {
        borderRadius: 3,
    },
    btn: {
        width: 48,
        height: 48,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    apptitle: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        zIndex: 1
    },
    apptitletext: {
        position: 'absolute',
        fontSize: 16,
        color: '#fff',
    },
    poster: {
        padding: 10,
        borderRadius: 3,
        backgroundColor: '#f1f1f1',
        width: 110,
        height: 160,
        marginHorizontal: 10
    },
    postertext: {
        flex: 1,
        marginRight: 10,
        marginLeft: 5,
    },
    title: {
        fontSize: 18,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        paddingTop: 3
    },
    sptext: {
        fontStyle: 'italic',
        color: '#666'
    },
    playbtn: {
        height: 34,
        paddingRight: 15,
        paddingLeft: 10,
        borderRadius: 17,
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    playtext: {
        fontSize: 14,
        color: '#fff'
    },
    castitem: {
        alignItems: 'center',
        marginRight: 10,
        width: 60,

    },
    castimgwrap: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        overflow: 'hidden'
    },
    castimg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute'
    },
    casttitle: {
        position: 'absolute',
        fontSize: 30,
        color: '#999'
    },
    castname: {
        fontSize: 14,
        color: '#666',
    },
    typeitem: {
        backgroundColor: '#f1f1f1',
        height: 30,
        paddingHorizontal: 15,
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 10,
        marginRight: 10
    },
    typename: {
        fontSize: 14,
        minWidth: 20,
        color: '#666'
    },
    star: {
        marginVertical: 5
    },
    status: {
        fontSize: 10,
        paddingHorizontal: 5,
        marginVertical: 5,
        paddingVertical: 1,
        borderRadius: 1,
        alignSelf: 'flex-start',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,.4)'
    },
    director: {
        position: 'absolute',
        right: 0,
        top: 0,
        fontSize: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        fontWeight: 'bold',
        borderRadius: 8,
        color: '#fff'
    },
    commentbtn: {
        marginHorizontal: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view_more: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    view_moretext: {
        fontSize: 13,
        color: '#999'
    },
    sourcelist: {
        paddingHorizontal: 15
    },
    sourceitem: {
        backgroundColor: '#f1f1f1',
        minWidth: 50,
        maxWidth: 150,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        marginVertical: 5,
        marginRight: 10,
        padding: 10,
        overflow: 'hidden',
        alignItems: 'center',
    },
    sourceType: {
        paddingTop: 3,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    pickertitle: {
        fontSize: 14,
        color: '#666',
    },
    picker: {
        width: 120,
        height: 30,
        left: 30,
        padding: 0,
        opacity: 0,
        position: 'absolute'
    },
    backgroundVideo: {
        height: 200,
        backgroundColor: '#000',
        marginHorizontal: 10,
    },
    sourcedot: {
        position: 'absolute',
        right: 4,
        top: 4,
        width: 5,
        height: 5,
        borderRadius: 5,
        opacity: 0
    }
})