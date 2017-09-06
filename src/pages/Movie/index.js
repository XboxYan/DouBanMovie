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
    BackHandler,
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
import Md5 from '../../util/Md5';
import CrytoJS,{Get,objToPara} from '../../util/CrytoJS';
import Loading from '../../compoents/Loading';
import Shadow from '../../compoents/Shadow';
import Star from '../../compoents/Star';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Touchable from '../../compoents/Touchable';
import CommentList from '../../compoents/CommentList';

const md5 = Md5;
const get = Get;

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
        const { Source: { getUrl, currentIndex, pos }, index, onplayRotate } = this.props;
        onplayRotate(true);
        getUrl(index);
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
        return <SourceItem item={item} index={index} Source={this.props.Source} onplayRotate={this.props.onplayRotate} last={index === this.props.Source.sourceslen - 1} />
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

    @observable pos = [-1,-1];

    @observable
    playUrl = '';

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
    getMovieInfo = async (Url,referUrl) => {
        return await fetch(Url, {
            headers: {
                'Referer': referUrl,
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
    getRealSite = async (Url) => {
        return await fetch(Url)
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
        let s = eval(ikanReg).replace(/\('e'\+'2'\)/g, '');
        let reg = /id\=(\w+)\&tm/g;
        let [a,b] = reg.exec(getUrl);
        eval(s);
        let dysign = await this.getToken(b);
        let base = 'https://newplayer.dongyaodx.com/';
        let time = (new Date()).valueOf();
        let Url = `${base}parse.php?dysign=${dysign}&h5url` + eval(`'` + getUrl.replace(/\('e2'\)/g, '')) + `&script=1&_=${time}`;
        return await fetch(Url, {
            headers: {
                'Referer': base,
                //'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Mobile Safari/537.36'
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
    //获取优酷utid
    getUtid = async () => {
        return await fetch('https://log.mmstat.com/eg.js')
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
            })
            .then((response) => {
                let reg = /Etag\="([\s\S]*)";goldlog/g
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
    getQQKey = async (params) => {
        var qstr = {
            charge: 0,
            vid: params.vid,
            filename: "",
            format: params.format,
            otype: "json",
            guid: params.guid,
            platform: params.platform,
            defnpayver: 0,
            appVer: params.appver,
            vt: params.vt,
            sdtfrom: "v1010",
            _rnd: params.rnd,
            _qv_rmt: params.q1,
            _qv_rmt2: params.q2
        };
        let Url = "https://h5vv.video.qq.com/getkey?callback=callback&charge=0&vid=" + params.vid + "&filename=" + params.filename.split("|")[0] + "&format=" + params.format + "&otype=json&guid=" + params.guid + "&platform=10901&defnpayver=0&appVer=" + params.appver + "&vt=" + params.vt + "&sdtfrom=v1010&_rnd=" + params.rnd + "&_qv_rmt=" + params.q1 + "&_qv_rmt2=" + params.q2;
        //alert(Url)
        return await fetch(Url)
            .then((response) => {
                if (response.ok) {
                    return response.text()
                }
            })
            .then((d) => {
                callback = a => a;
                let g = eval(d);
                return g.key;
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    getQQ = async (params) => {
        let Url = "https://h5vv.video.qq.com/getinfo?callback=callback&charge=0&vid=" + params.vid + "&defaultfmt=auto&otype=json&guid=" + params.guid + "&platform=" + params.platform + "&defnpayver=1&appVer=" + params.appver + "&sdtfrom=v1010&host=v.qq.com&ehost=" + encodeURIComponent(params.pageUrl) + "&_rnd=" + params.rnd + "&defn=" + params.fmt + "&fhdswitch=0&show1080p=1&" + (params.dltype == 3 ? "isHLS=1&dtype=3&sphls=1" : "isHLS=0") + "&newplatform=" + params.platform + "&defsrc=1&_qv_rmt=" + params.q1 + "&_qv_rmt2=" + params.q2;
        let key = await this.getQQKey(params);
        return await fetch(Url)
            .then((response) => {
                if (response.ok) {
                    return response.text()
                }
            })
            .then((d) => {
                callback = a => a;
                let g = eval(d);
                uidx = 0;
                for (var uix in g.vl.vi[0].ul.ui) {
                    if (!/\d+\.\d+\.\d+\.\d+/.test(g.vl.vi[0].ul.ui[uix].url) && 1 + 1 == 3) {
                        uidx = uix;
                        break;
                    };
                };
                let firstUrl = g.vl.vi[0].ul.ui[uidx].url + params.filename.split("|")[0] + "?sdtfrom=v1010&guid=" + params.guid + "&vkey=" + key;
                return firstUrl;
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    regKankanUrl = async (s) => {
        if(!s.includes('解析成功')){
            ToastAndroid.show('解析失败',ToastAndroid.SHORT);
            return ''
        }
        let reg = /\/\/\[parseArea\]([\s\S]*)\/\/\[\/parseArea\]/g;
        const [base, parseArea] = reg.exec(s);
        if (parseArea.includes('ups.youku.com')) {
            //youku
            let reg = /params\=([\s\S]*);[\s\S]*vParser\=/g
            const [base, res] = reg.exec(parseArea);
            let params = JSON.parse(res);
            let url = await this.getYouku(params);
            return url;
        } else if (parseArea.includes('h5vv.video.qq')) {
            //qq
            let reg = /params\=([\s\S]*);[\s\S]*vParser\=/g
            const [base, res] = reg.exec(parseArea);
            let params = eval('(' + res + ')');
            //alert(JSON.stringify(params))
            let url = await this.getQQ(params);
            return url;
        } else if (parseArea.includes('play_url')) {
            let reg = /play_url\='([\s\S]*)',file_type/g;
            const [base, res] = reg.exec(parseArea);
            return res
        }  else if (parseArea.includes('purl')) {
            let reg = /purl\s\=\s'([\s\S]*)';/g;
            const [base, res] = reg.exec(parseArea);
            return res
        } else {
            let reg = /vParse_Play\(([\s\S]*)\);/g
            const [base, res] = reg.exec(parseArea);
            
            let _res = eval('(' + res + ')');
            return _res.urls[0].u;
        }

    }

    @action
    getKankan = async (referUrl) => {
        let Realhtml = await this.getRealSite(referUrl);
        let realReg = /iframe[\s\S]*src\="([\s\S]*)&\?Next/g;
        //alert(Realhtml)
        const [RealSite, RealUrl] = realReg.exec(Realhtml);
        let html = await this.getMovieInfo(RealUrl,referUrl);
        //alert(html)
        //let reg = /urlplay1\D+'(\w+)';\D+tm\D+'(\d+)';\D+sign\D+'(\w+)';\D+refer\D+'(\S+)';\D+eval([\s\S]*)\nif\(is_mobile\D+getScript\(([\s\S]*)\);\n}/g;
        let reg = /eval([\s\S]*)\nif\(is_mobile[\s\S]*xmlurl([\s\S]*)\+'}',/g;
        const [_html, ikanReg, getUrl] = reg.exec(html);

        let playInfo = await this.getPlayerInfo(ikanReg, getUrl);
        //alert(playInfo)
        let url = await this.regKankanUrl(playInfo);
        let realUrl = await this.getRealUrl(url);
        return realUrl;
    }

    @action
    getKan360Url = async (Url) => {
        return await fetch(`${_Base}vparsev2?url=${Url}`)
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
    get47ksInfo = async (Url) => {
        return await fetch(`https://api.47ks.com/webcloud/?v=${Url}`,{
            headers: {
                'Referer': 'https://api.47ks.com',
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    get47ksgetk2 = async (k,Url) => {
        let _k = eval('(' + k + ')').k;
        return await fetch(`https://kr.47ks.com/getjson/?k=${_k}`,{
            headers: {
                'Referer': 'https://api.47ks.com/webcloud/?v='+Url,
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
            })
            .then((response) => {
                let res = eval(response);
                let k2 = '';
                let ep = '';
                let nip = '';
                if(res['code'] == 200){
                    k2 = res['key'];
                    ep = res['ep'];
                }else{
                    k2 = "null";
                    ep = "null";
                }
                return {k2,ep}
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    get47kssta = async (param,Url) => {
        //alert(objToPara(param))
        Object.assign(param,{'mode':'phone'});
        return await fetch('https://api.47ks.com/config/webmain.php',{
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-requested-with':'XMLHttpRequest',
                'Accept':'application/json, text/javascript, */*; q=0.01',
                'Referer':'https://api.47ks.com/webcloud/?v='+Url,
            },
            body:objToPara(param)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((response) => {
                return decodeURIComponent(response.url);
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    get47ks = async (Url) => {
        //47KS
        let html = await this.get47ksInfo(Url);
        let reg = /id\="get"\s*value\="(\w+)">[\s\S]*id\="tm"\svalue\="(\d+)">[\s\S]*ptiqy\s\=\s(\d);[\s\S]*config\/webmain\.php",\s([\s\S]*),[\s\S]*html5[\s\S]*getjson\/",\s([\s\S]*),[\s\S]*function\(kdata\)\{/g;
        const [_html, _get,tm,ptiqy,param,k] = reg.exec(html);
        //alert(param)
        const nip = ptiqy == 1?"127.0.0.1":"null";
        const {k2,ep} = await this.get47ksgetk2(k,Url);
        const _param = param.replace(/\$\("#get"\)\.val\(\)/g,`"${_get}"`).replace(/\$\("#tm"\)\.val\(\)/g,`"${tm}"`);
        const __param = eval('(' + _param + ')');
        let playUrl = await this.get47kssta(__param,Url);
        //let playlist = await this.getKan360Url(Url);
        let realUrl = await this.getRealUrl(playUrl, true);
        return realUrl;
    }

    @action
    getFlvInfo = async (Url) => {
        return await fetch(`https://api.vparse.org/?url=${Url}`,{
            headers: {
                'Referer': `http://www.52cbg.com/1.php?url=${Url}`,
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    getFlvsp = async (Url) => {
        //Flvsp解析
        let html = await this.getFlvInfo(Url);
        //alert(html)
        let reg = /;"\);([\s\S]*);\W\s+eval([\s\S]*)[\s\S]*var\sparseData\s\=\s([\s\S]*);[\s\S]*allowFullScreen/g;
        const [_html,w, iReg, param] = reg.exec(html);
        //let _w = w.replace(/\\\\/g,'');
        //let lastKey = 0;
        eval(w)
        let _lastKey = lastKey;
        let k = 0;
        let k4 = null;
        let document = {
            getElementById: {
                value: null
            },
            domain: 'api.vparse.org'
        }
        function unlink(x){};$_SERVER = {PHP_SELF:0};
        let s = eval(iReg).replace(/\('k'\+'2'\)/g, '')
        eval(s);
        //alert(JSON.stringify(s))
        console.warn(_lastKey)
        //alert(param.replace(/lastKey/g, _lastKey))
        let _param = eval('('+param.replace(/lastKey/g, _lastKey).replace(/\$\("#k"\).val\(\)/g,k).replace(/\$\("#k2"\)\.val\(\)/g, document.getElementById.value)+')');
        //alert('https://api.flvsp.com/parse.php?h5url=null&script=1&'+objToPara(_param))
        return await fetch('https://api.vparse.org/parse.php?h5url=null&script=1&'+objToPara(_param), {
            headers: {
                'Referer': 'https://api.vparse.org/',
            }
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    return response.text();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    @action
    getFlvUrl = async (Url) => {
        //点量解析
        return await fetch(`http://api.v2.flvurl.cn/parse/?singleOnly=true&appid=6170b6db0a881c18389f47d6d994340e&type=vod&url=${Url}`)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                if(response.code == 0){
                    return response.data.streams[response.data.streams.length-1].segs[0].url;
                }else{
                    ToastAndroid.show(response.message,ToastAndroid.SHORT);
                }
            })
            .catch((err) => {
                ToastAndroid.show('请求过于频繁，请稍后再试~',ToastAndroid.SHORT);
            })
    }

    @action
    getKan360 = async (Url) => {
        //let playInfo = await this.getFlvsp(Url);
        //alert(playInfo)
        //console.warn(playInfo)
        //let url =  await this.get47ks(Url);
        let url =  await this.getFlvUrl(Url);
        return url;
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
        //alert(infoUrl)
        switch (type) {
            case 'kankan':
                return await this.getKankan(referUrl);
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
        if(this.pos[0]===this.selectedPosition&&this.pos[1]===movieIndex){
            return;
        }else{
            this.pos[0] = this.selectedPosition;
            this.pos[1] = movieIndex;
        }
        let playUrl = '';
        this.movieIndex[this.selectedPosition] = movieIndex;
        //alert(this.basePlayUrl)
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

    scrollRotate = new Animated.Value(0);

    scrollRotateVideo = new Animated.Value(0);

    @observable movieId = '';

    @observable paused = true;

    @observable isShowVideo = false;

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

    @computed get release() {
        return this.data.release;
    }

    @computed get area() {
        return this.data.area;
    }

    @computed get name() {
        return this.data.name || ' ';
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

    @computed get img() {
        return this.DoubanisNull ? this.data.img : (this.DoubanisRender ? this.Doubandata.images.large : '...');
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
                id: this.doubanId,
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
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
        const { params: { movieId } } = this.props.navigation.state;
        this.movieId = movieId;
        this.getData();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }
    goBack = () => {
        if(this.isShowVideo){
            this.onplayRotate(false);
            this.scrollview.getNode().scrollTo({y:0});
        }else{
            const { navigation } = this.props;
            navigation.goBack();
        }
        return true;
    }
    onScroll = (e) => {
        this.scrollTop.setValue(e.nativeEvent.contentOffset.y);
    }
    play = () => {
        this.onplayRotate(true);
        const { getUrl, currentIndex } = this.Source;
        getUrl(currentIndex);     
    }
    expand = () => {
        LayoutAnimation.spring();
        this.isMore = !this.isMore;
    }

    @action
    onplayRotate = (value) => {
        Animated.parallel([//同时执行
            Animated.timing(
                this.scrollRotate,
                {
                    toValue: value?1:0,
                    duration: 500,
                    //useNativeDriver: true
                }                              
            ),
            Animated.timing(
                this.scrollRotateVideo,
                {
                    toValue: value?1:0,
                    duration: 500,
                    //useNativeDriver: true
                }                              
            )
        ]).start();
        this.isShowVideo = value;
        LayoutAnimation.easeInEaseOut();
        this.paused = !value;
    }

    onClose = () => {
        this.onplayRotate(false);
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
                    }]} />
                </View>
                <Animated.ScrollView
                    ref={(ref) => this.scrollview = ref}
                    stickyHeaderIndices={[]}
                    scrollEventThrottle={1} // <-- 设为1以确保滚动事件的触发频率足够密集
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollTop } } }],
                        { useNativeDriver: true } // <-- 加上这一行
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
                    <Animated.View style={[styles.videobox, {
                        marginTop: $.STATUS_HEIGHT + 50, transform: [{ perspective: 850 }, {
                            rotateX: this.scrollRotate.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg','180deg']
                            })
                        }]
                    }]}>
                        <View style={styles.videostart}>
                            <View style={styles.poster}>
                                <Image source={{ uri: this.img }} style={[styles.fullcon, styles.borR]} />
                                <TouchableOpacity onPress={this.play} activeOpacity={.8} style={[styles.playbtn, { backgroundColor: _.Color }]}>
                                    <Icon name='play-arrow' size={24} color='#fff' />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.postertext,!this.paused&&{height:($.WIDTH-40)*9/16}]}>
                                <Text style={[styles.title, { color: _.Color }]}>{this.name}</Text>
                                <Star style={styles.score} score={this.score} />
                                {
                                    this.status && <Text style={styles.status}>{this.status}</Text>
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
                            </View>
                        </View>
                        <Animated.View style={[styles.videoCon, {
                            zIndex: this.scrollRotateVideo.interpolate({
                                inputRange: [0,.499,.501, 1],
                                outputRange: [-1,-1,1, 1]
                            })
                        }]}>
                            <Video
                                ref={(ref) => this.video = ref}
                                source={{ uri: this.Source.playUrl }}
                                style={styles.backgroundVideo}
                                resizeMode="contain"
                                controls={true}
                                repeat={true}
                                paused={this.paused}
                            />
                            <TouchableOpacity style={styles.closebtn} onPress={this.onClose} >
                                <Icon name='clear' size={20} color='#fff' />
                            </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>
                    <View style={styles.viewcon}>
                        <SortTitle title={`剧集(${this.Source.sourceslen})`} />
                        <MovieSource Source={this.Source} onplayRotate={this.onplayRotate}/>
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
        marginHorizontal: 10,
        justifyContent:'center',
        alignItems: 'center'
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
        position:'absolute',
        zIndex:10,
        height: 34,
        width:34,
        borderRadius: 17,
        justifyContent:'center',
        alignItems: 'center',
        opacity:.9
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
        flex: 1,
        backgroundColor: '#000',
    },
    sourcedot: {
        position: 'absolute',
        right: 4,
        top: 4,
        width: 5,
        height: 5,
        borderRadius: 5,
        opacity: 0
    },
    videoCon: {
        position: 'absolute',
        left: 10,
        top: 10,
        right: 10,
        bottom: 10,
        backgroundColor: '#000',
        transform: [{ rotateX: '180deg' }]
    },
    closebtn:{
        position: 'absolute',
        right: 0,
        top: 0,
        padding:10
    },
    videobox: {
        marginBottom: 10,
        marginHorizontal: 10,
    },
    videostart:{
        paddingVertical: 10,
        backgroundColor:'#fff',
        borderRadius:3,
        flexDirection:'row'
    }
})