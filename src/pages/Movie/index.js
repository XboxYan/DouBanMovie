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
    getRealUrl = async (Url,isKan360=false) => {
        if (Url.includes('play.g3proxy.lecloud')||isKan360) {
            return await fetch(Url)
                .then((response) => {
                    if (response.ok) {
                        return response.url;
                    }
                })
                .catch((err) => {
                    console.warn(err)
                })
        }else{
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
    getMovieInfo = async (Url, referUrl) => {
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
    getPlayerInfo = async (ikan, urlplay1, tm, sign, refer, getUrl) => {
        let base = 'https://newplayer.dongyaodx.com/';
        let time = (new Date()).valueOf();
        //let Url = 'https://newplayer.dongyaodx.com/'+eval(getUrl)+`${ikan}&_=${time}`;
        let Url = base+eval(getUrl)+`${ikan}&_=${time}`;
        //alert(Url)
        //let Url = `https://newplayer.dongyaodx.com/parse.php?h5url=null&id=${id}&tm=${tm}&sign=${sign}&script=1&userlink=${userlink}&zhu77=${ikan}&_=${time}`;
        return await fetch(Url, {
            headers: {
                'Referer': base
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
        let ikan = eval(s);
        let reg = /([\s\S]*)eval/g
        const [_html, ikan2] = reg.exec(ikan);
        eval(ikan2);
        return e1r.join('');
    }

    @action
    getYouku = async (params) => {
        let time = (new Date()).valueOf();
        let {vid,ccode} = params;
        return await fetch(`https://ups.youku.com/ups/get.json?vid=${vid}&ccode=${ccode}&client_ip=192.168.1.1&utid=cAlRDrkhxlcCAbdecTFBOi1U&client_ts=${time}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                return data.data.stream[data.data.stream.length-1].m3u8_url;
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    getQQ = async (params) => {
        let Url = "https://h5vv.video.qq.com/getinfo?callback=?&charge=0&vid=" + params.vid + "&defaultfmt=auto&otype=json&guid=" + params.guid + "&platform=" + params.platform + "&defnpayver=1&appVer=" + params.appver + "&sdtfrom=v1010&host=v.qq.com&ehost=" + encodeURIComponent(params.pageUrl) + "&_rnd=" + params.rnd + "&defn=" + params.fmt + "&fhdswitch=0&show1080p=1&" + (params.dltype == 3 ? "isHLS=1&dtype=3&sphls=1": "isHLS=0") + "&newplatform=" + params.platform + "&defsrc=1&_qv_rmt=" + params.q1 + "&_qv_rmt2=" + params.q2;
        return await fetch(Url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((g)=> {
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
            let params = JSON.parse(res);
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
    getKankan = async (Url, referUrl) => {
        //const [base,id] = Url.split('id=');
        //let _referUrl = referUrl.replace(/www/g,'m');
        //let _Url = Url.replace(/.php/g,'1.php');
        let html = await this.getMovieInfo(Url, referUrl);
        //alert(html)
        //console.log(html)
        let reg = /urlplay1\D+'(\w+)';\D+tm\D+'(\d+)';\D+sign\D+'(\w+)';\D+refer\D+'(\S+)';\D+eval([\s\S]*)\nif\(is_mobile\D+getScript\(([\s\S]*)\+document[\s\S]*flashvars/g;
        const [_html, id, tm, sign, refer, ikanReg, getUrl] = reg.exec(html);
        let ikan = this.regIkan(ikanReg);
        alert(ikan)
        let playInfo = await this.getPlayerInfo(ikan, id, tm, sign, refer, getUrl);
        //alert(html)
        //let token = await this.getToken(id);
        //let url = await this.getKanKanInfo(id,token);
        let url = await this.regKankanUrl(playInfo);
        let realUrl = await this.getRealUrl(url);
        // let url = '';
        // let regSite = /site->(\S+)}{vid/g;
        // let site = regSite.exec(xml);
        // if(site&&site[1]=='youku'){
        //     let regVid = /vid->(\S+)}{stype/g;
        //     let vid = regVid.exec(xml)[1];
        //     let playlist = await this.getYouku(vid);
        //     url = playlist[playlist.length-1].m3u8_url;
        // }else{
        //     let regUrl = /defa->(\S+)}{deft/g;
        //     let playlist = regUrl.exec(xml)[1].split('|');
        //     url = playlist[playlist.length-1]
        //     url = await this.getLetv(url,Url)
        // }

        // switch (this.name) {
        //     case 'leyun':
        //     case 'letv':
        //     case 'leshi':
        //     case 'lev':
        //         playlist = await this.getLetv(playlist,Url);
        //         //url = baseurl.replace(/\?/,'.m3u8?');
        //         break;
        //     case 'youku':
        //         playlist = playlist.m3u8_url;
        //         break;
        //     case 'iqy':
        //     case 'qiyi':
        //         break;
        //     default:
        //         playlist = await this.getLetv(playlist,Url);
        //         break;
        // }
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
                return data.body.videoInfo[data.body.videoInfo.length-1].url;
            })
            .catch((err) => {
                console.warn(err)
            })
    }

    @action
    getKan360 = async (Url) => {
        let playlist = await this.getKan360Url(Url);
        let realUrl = await this.getRealUrl(playlist,true);
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