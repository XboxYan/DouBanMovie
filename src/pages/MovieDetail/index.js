/*
*
MovieDetail
*
*/

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Animated,
    Image,
    LayoutAnimation,
    View,
} from 'react-native';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react/native';
import _ from '../../theme';
import fetchData from '../../util/Fetch';
import Loading from '../../compoents/Loading';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Touchable from '../../compoents/Touchable';

const SortTitle = observer((props) => (
    <View style={[styles.view_hd, { borderColor: _.Color }]}>
        <Text style={styles.view_title}>{props.title}</Text>
    </View>
))

const CastItem = observer((props) => (
    <TouchableOpacity activeOpacity={.7} style={styles.castitem}>
        <View style={[styles.castimg, { backgroundColor: '#f1f1f1' }]}><Image resizeMode='cover' style={styles.castimg} source={{ uri: props.item.avatars ? props.item.avatars.medium : '...' }} /></View>
        <Text numberOfLines={2} style={[styles.castname, props.item.name && { marginTop: 10 }]}>{props.item.name}</Text>
    </TouchableOpacity>
))

const TypeItem = observer((props) => (
    <TouchableOpacity activeOpacity={.7} style={styles.typeitem}>
        <Text style={styles.typename}>{props.item}</Text>
    </TouchableOpacity>
))

@observer
export default class MovieDetail extends Component {

    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    scrollTop = new Animated.Value(0);

    @observable data = {};

    @observable isRender = false;

    @computed get status() {
        return this.data.status;
    }

    @computed get updateDate() {
        return this.data.updateDate;
    }

    @computed get score() {
        return this.data.score;
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

    @computed get type() {
        return this.isRender ? this.data.type.replace(/(\s*$)/g, "").split(' ') : [''];
    }

    @observable Doubandata = {};

    @computed get summary() {
        return this.Doubandata.summary || this.data.desc;
    }

    @computed get name() {
        return this.Doubandata.title;
    }

    @computed get casts() {
        return this.Doubandata.casts || [''];
    }

    @computed get directors() {
        return this.Doubandata.directors || [''];
    }

    @observable DoubanisRender = false;

    @action
    getData = (movieId) => {
        fetchData('video', {
            par: {
                videoId: movieId
            }
        },
            (data) => {
                this.data = data.body;
                this.isRender = true;
                LayoutAnimation.spring();
                this.getDoubanData(data.body.doubanId);
            }
        )
    }
    @action
    getDoubanData = (doubanId) => {
        fetchData('douban_subject', {
            par: {
                id: doubanId
            }
        },
            (data) => {
                this.Doubandata = data;
                this.DoubanisRender = true;
                LayoutAnimation.spring();
            }
        )
    }
    componentDidMount() {
        const { params: { movieId } } = this.props.navigation.state;
        //this.movieId = movieId;
        //this.doubanId = doubanId;
        this.getData(movieId);
        //this.getDoubanData();
    }
    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }
    onScroll = (e) => {
        this.scrollTop.setValue(e.nativeEvent.contentOffset.y);
    }
    render() {
        //const { navigation } = this.props;
        //const { params:{ item:{img,name}} } = navigation.state;
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
                    <Animated.View style={[styles.fullcon, { backgroundColor: _.Color }, {
                        opacity: this.scrollTop.interpolate({
                            inputRange: [0, $.STATUS_HEIGHT + 50],
                            outputRange: [0, 1]
                        })
                    }]} />
                </View>
                <ScrollView onScroll={this.onScroll} showsVerticalScrollIndicator={false} style={styles.content}>
                    <Animated.Image
                        resizeMode='cover'
                        blurRadius={4}
                        source={{ uri: this.img }}
                        style={[styles.bg_place, {
                            backgroundColor: _.Color, transform: [{
                                translateY: this.scrollTop.interpolate({
                                    inputRange: [$.STATUS_HEIGHT, $.STATUS_HEIGHT + 50],
                                    outputRange: [0, 15]
                                })
                            }]
                        }]} />
                    <View style={{ height: $.STATUS_HEIGHT + 50 }} />
                    <View style={[styles.viewcon, styles.row]}>
                        <View style={styles.poster}><Image source={{ uri: this.img }} style={[styles.fullcon, styles.borR]} /></View>
                        <View style={styles.postertext}>
                            <Text style={[styles.title, { color: _.Color }]}>{this.name}</Text>
                            <Text style={styles.subtitle}><Text style={styles.sptext}>地区/ </Text>{this.area}</Text>
                            <Text style={styles.subtitle}><Text style={styles.sptext}>状态/ </Text>{this.status}</Text>
                            <Text style={styles.subtitle}><Text style={styles.sptext}>评分/ </Text>{this.score}</Text>
                            <Text style={styles.subtitle}><Text style={styles.sptext}>上映/ </Text>{this.release}</Text>
                            <Text style={styles.subtitle}><Text style={styles.sptext}>最近更新/ </Text>{this.updateDate}</Text>
                            <TouchableOpacity activeOpacity={.7} style={[styles.playbtn, { backgroundColor: _.Color }]}>
                                <Icon name='play-arrow' size={20} color='#fff' />
                                <Text style={styles.playtext}>播放</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title='类型' />
                        <View style={styles.con}>
                            {
                                this.type.map((el, i) => (
                                    <TypeItem key={i} item={el} />
                                ))
                            }
                        </View>
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title='导演' />
                        <View style={styles.con}>
                            {
                                this.directors.map((el, i) => (
                                    <CastItem key={i} item={el} />
                                ))
                            }
                        </View>
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title='主演' />
                        <View style={styles.con}>
                            {
                                this.casts.map((el, i) => (
                                    <CastItem key={i} item={el} />
                                ))
                            }
                        </View>
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title='剧情介绍' />
                        <View style={styles.con}>
                            {
                                this.DoubanisRender
                                    ?
                                    <Text style={styles.text}>{this.summary}</Text>
                                    :
                                    <Loading size='small' text='' />
                            }
                        </View>
                    </View>
                </ScrollView>
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
        marginRight: 10,
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
        marginLeft: 5
    },
    title: {
        fontSize: 18,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#333',
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
        width: 60
    },
    castimg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden'
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
        marginVertical: 5,
        marginRight: 10
    },
    typename: {
        fontSize: 14,
        minWidth: 20,
        color: '#666'
    }
})