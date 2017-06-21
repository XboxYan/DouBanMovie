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
                    <Text style={styles.apptitle} numberOfLines={1}>{this.name||name}</Text>
                    <View style={[styles.fullcon, { backgroundColor: _.Color }, { opacity: 0 }]} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                    <View style={[styles.bg_place, { backgroundColor: _.Color }]}><Image resizeMode='cover' source={{ uri: img }} style={styles.bg_img} /></View>
                    <View style={{ height: $.STATUS_HEIGHT + 48 }} />
                    <View style={[styles.viewcon,styles.row]}>
                        <View style={styles.poster}><Image source={{ uri: img }} style={styles.fullcon} /></View>
                        <View style={styles.postertext}>
                            <Text style={styles.title}>{this.name||name}</Text>
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
        height: 200
    },
    bg_img: {
        width: '100%',
        height: '100%',
        opacity: .3,
        resizeMode: 'cover'
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
    },
    fullcon: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        borderRadius: 3,
        zIndex: 0
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
        fontSize: 16,
        color: '#fff',
        zIndex: 1
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
        marginRight:10
    }
})