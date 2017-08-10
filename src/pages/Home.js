/*
*
Home
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    UIManager,
    LayoutAnimation,
    Image,
    TouchableOpacity,
    View,
} from 'react-native';

import TabItem from '../compoents/TabItem';
import AppTop from '../compoents/AppTop';
import Loading from '../compoents/Loading';
import MovieList from '../compoents/MovieList';
import Swiper from '../compoents/Swiper';

import fetchData from '../util/Fetch';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react/native';
import _ from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieTitle = observer((props) => (
    <View style={[styles.view_hd, { borderColor: _.Color }]}>
        <Text style={styles.view_title}>{props.title}</Text>
        <TouchableOpacity
            disabled={!!!props.title}
            activeOpacity={.8}
            onPress={() => props.navigation.navigate('MovieMore', { id: props.id, title: props.title })}
            style={styles.view_more}
        >
            <Text style={styles.view_moretext}>更多</Text>
            <Icon name='navigate-next' size={20} color={_.Color} />
        </TouchableOpacity>
    </View>
))

const BannerItem = observer((props) => (
    <TouchableOpacity
        activeOpacity={.9}
        onPress={() => props.navigation.navigate('MovieDetail', { movieId: props.data.vid })}
        style={styles.banner}
    >
        <Image style={styles.bannerimg} source={{ uri: props.data.img }} />
        <Text style={styles.bannertext}>{props.data.desc||' '}</Text>
    </TouchableOpacity>
))

@observer
export default class Home extends PureComponent {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => <TabItem label='推荐' icon='fire' active={focused} />,
    }

    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    @observable data = {};

    @observable isRender = false;

    @computed get bannerDatas() {
        return this.data.bannerDatas || [{}];
    }

    @computed get viewItemModels() {
        return this.data.viewItemModels || [{}, {}, {}, {}, {}, {}];
    }

    getHot = () => {
        fetchData('hotPlay', {
            par: {
                type: 2
            }
        },
            (data) => {
                //LayoutAnimation.spring();
                this.data = data.body;
                this.isRender = true;
                LayoutAnimation.spring();
                
            }
        )
    }

    componentDidMount() {
        this.getHot();
    }

    componentWillUpdate() {
        //LayoutAnimation.easeInEaseOut();
    }

    render() {
        const { navigation } = this.props;
        let [movie, tv, dongman, zongyi, wei, shaoer] = this.viewItemModels;
        return (
            <View style={styles.content}>
                <AppTop title='推荐' />
                <ScrollView style={styles.content}>
                    <Swiper dotColor={_.Color} style={styles.bannerWrap}>
                        {
                            this.bannerDatas.map((el, i) => <BannerItem navigation={navigation} data={el} key={i + el.id} />)
                        }
                    </Swiper>
                    <View style={styles.viewcon}>
                        <MovieTitle title={movie.title || ''} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={movie.videos} navigation={navigation} />
                    </View>
                    <View style={styles.viewcon}>
                        <MovieTitle title={tv.title || ''} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={tv.videos} navigation={navigation} />
                    </View>
                    <View style={styles.viewcon}>
                        <MovieTitle title={dongman.title || ''} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={dongman.videos} navigation={navigation} />
                    </View>
                    <View style={styles.viewcon}>
                        <MovieTitle title={zongyi.title || ''} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={zongyi.videos} navigation={navigation} />
                    </View>
                    <View style={styles.viewcon}>
                        <MovieTitle title={wei.title || ''} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={wei.videos} navigation={navigation} />
                    </View>
                    <View style={styles.viewcon}>
                        <MovieTitle title={shaoer.title || ''} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={shaoer.videos} navigation={navigation} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    viewcon: {
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        minHeight: 150,
        overflow:'hidden'
    },
    view_hd: {
        height: 16,
        borderLeftWidth: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
        marginLeft: 10
    },
    view_title: {
        fontSize: 16,
        color: '#333',
        flex: 1
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
    bannerWrap:{
        backgroundColor:'#fff'
    },
    banner: {
        flex: 1,
        height: $.WIDTH * 9 / 16,
        borderRadius:3,
        backgroundColor:'#f1f1f1',
        overflow:'hidden'
    },
    bannerimg: {
        width:'100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius:3
    },
    bannertext:{
        fontSize:16,
        color:'#fff',
        paddingHorizontal:10,
        paddingVertical:7,
        position:'absolute',
        //backgroundColor:'rgba(0,0,0,.3)',
        textShadowColor :'#000',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 20,
        left:0,
        right:0,
        bottom:0,
        //borderBottomLeftRadius: 3,
        //borderBottomRightRadius: 3,
    }
})