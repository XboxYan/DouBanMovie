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

@observer
export default class MovieDetail extends Component {

    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    movieId = '';

    doubanId = '';

    scrollTop = new Animated.Value(0);

    @observable data = {};

    @observable isRender = false;

    @observable Doubandata = {};

    @computed get name() {
        return this.Doubandata.title
    }

    @observable DoubanisRender = false;

    @action
    getData = () => {
        fetchData('video', {
            par: {
                videoId: this.movieId
            }
        },
            (data) => {
                this.data = data.body;
                this.isRender = true;
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
    componentDidMount() {
        const { params: { item:{movieId,doubanId} } } = this.props.navigation.state;
        this.movieId = movieId;
        this.doubanId = doubanId;
        this.getData();
        this.getDoubanData();
    }
    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }
    onScroll = (e) => {
        this.scrollTop.setValue(e.nativeEvent.contentOffset.y);
    }
    render() {
        const { navigation } = this.props;
        const { params:{ item:{img,name}} } = navigation.state;
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
                        <Animated.Text style={[styles.apptitletext,{
                            opacity: this.scrollTop.interpolate({
                                inputRange: [$.STATUS_HEIGHT + 40,$.STATUS_HEIGHT + 41],
                                outputRange: [1, 0]
                            }) 
                        }]} numberOfLines={1}>影视详情</Animated.Text>
                        <Animated.Text style={[styles.apptitletext,{
                            opacity: this.scrollTop.interpolate({
                                inputRange: [$.STATUS_HEIGHT + 40, $.STATUS_HEIGHT + 41],
                                outputRange: [0, 1]
                            }) 
                        }]} numberOfLines={1}>{this.name||name}</Animated.Text>
                    </View>
                    <Animated.View style={[styles.fullcon, { backgroundColor: _.Color }, { 
                        opacity: this.scrollTop.interpolate({
                            inputRange: [0, $.STATUS_HEIGHT + 50],
                            outputRange: [0, 1]
                        }) 
                    }]} />
                </View>
                <ScrollView onScroll={this.onScroll} showsVerticalScrollIndicator={false} style={styles.content}>
                    <Image resizeMode='cover' blurRadius={4} source={{ uri: img }} style={[styles.bg_place,{ backgroundColor: _.Color }]} />
                    <View style={{ height: $.STATUS_HEIGHT + 50 }} />
                    <View style={[styles.viewcon,styles.row]}>
                        <View style={styles.poster}><Image source={{ uri: img }} style={[styles.fullcon,styles.borR]} /></View>
                        <View style={styles.postertext}>
                            <Text style={[styles.title,{color:_.Color}]}>{this.name||name}</Text>
                            <TouchableOpacity>
                                <Text>播放</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title='简介' />
                        <View style={styles.summary}>
                            {
                                this.DoubanisRender
                                    ?
                                    <Text style={styles.text}>{this.Doubandata.summary}</Text>
                                    :
                                    <Loading size='small' text='' />
                            }
                        </View>
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title='简介' />
                        <View style={styles.summary}>
                            {
                                this.DoubanisRender
                                    ?
                                    <Text style={styles.text}>{this.Doubandata.summary}</Text>
                                    :
                                    <Loading size='small' text='' />
                            }
                        </View>
                    </View>
                    <View style={styles.viewcon}>
                        <SortTitle title='简介' />
                        <View style={styles.summary}>
                            {
                                this.DoubanisRender
                                    ?
                                    <Text style={styles.text}>{this.Doubandata.summary}</Text>
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
    row:{
        flexDirection:'row'
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
    summary: {
        paddingHorizontal: 15,
        paddingBottom: 10
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
        zIndex:10
    },
    fullcon: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
    },
    borR:{
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
        marginRight:10,
        justifyContent: 'center',
        alignSelf:'stretch',
        zIndex: 1
    },
    apptitletext:{
        position: 'absolute',
        fontSize: 16,
        color: '#fff',
    },
    poster:{
        padding:10,
        borderRadius:3,
        backgroundColor:'#f1f1f1',
        width:110,
        height:160,
        marginHorizontal:10
    },
    postertext:{
        flex:1,
        marginRight:10,
        marginLeft:5
    },
    title:{
        fontSize:16,
        color:'#333'
    }
})