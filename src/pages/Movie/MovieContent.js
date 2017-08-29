/*
*
Content
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    SectionList,
    UIManager,
    LayoutAnimation,
    InteractionManager,
    Image,
    TouchableOpacity,
    View,
} from 'react-native';

import TabItem from '../../compoents/TabItem';
import AppTop from '../../compoents/AppTop';
import Loading from '../../compoents/Loading';
import Swiper from '../../compoents/Swiper';

import fetchData from '../../util/Fetch';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react/native';
import _ from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieTitle = observer((props) => (
    <View style={styles.view_hd}>
        <View style={[styles.line, { backgroundColor: _.Color }]} />
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

const MovieItem = (props) => (
    <TouchableOpacity
        activeOpacity={.8}
        onPress={() => props.navigation.navigate('MovieDetail', { movieId: props.item.movieId })}
        style={styles.movieitem}>
        <Image
            style={styles.movieimg}
            source={{ uri: props.item.img }}
            defaultSource={require('../../img/img_place.png')}
        />
        <View style={styles.movietext}>
            <Text numberOfLines={1} style={styles.moviename}>{props.item.name}</Text>
        </View>
    </TouchableOpacity>
)

const MovieList = (props) => (
    <View style={styles.movielist}>
        {
            props.data.map((item, i) => <MovieItem key={item.movieId} item={item} navigation={props.navigation} />)
        }
    </View>
)

const BannerItem = observer((props) => (
    <TouchableOpacity
        activeOpacity={.9}
        onPress={() => props.navigation.navigate('MovieDetail', { movieId: props.data.vid })}
        style={styles.banner}
    >
        <Image style={styles.bannerimg} source={{ uri: props.data.img }} />
        <Text style={styles.bannertext}>{props.data.desc || ' '}</Text>
    </TouchableOpacity>
))

@observer
export default class extends PureComponent {
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

    @computed get sections() {
        return this.viewItemModels.map((el, i) => ({
            data: [el.videos],
            title: el.title,
            key: "section" + i
        }))
    }

    getHot = () => {
        fetchData('hotPlay', {
            par: {
                type: this.props.id
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
        InteractionManager.runAfterInteractions(() => {
            this.getHot();
        })
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    renderHeader = () => {
        return (
            <Swiper dotColor={_.Color} style={styles.bannerWrap}>
                {
                    this.bannerDatas.map((el, i) => <BannerItem navigation={this.props.navigation} data={el} key={i + el.id} />)
                }
            </Swiper>
        )
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.content}>
                {
                    this.isRender ?
                    <SectionList
                        ListHeaderComponent={this.renderHeader}
                        initialNumToRender={1}
                        renderItem={({ item }) => <MovieList data={item} navigation={navigation} />}
                        //stickySectionHeadersEnabled={true}
                        renderSectionHeader={({ section }) => <MovieTitle title={section.title} navigation={navigation} />}
                        keyExtractor={(item, index) => "item" + index}
                        //enableVirtualization={true}
                        //removeClippedSubviews={false}
                        sections={this.sections}
                    />
                    :
                    <Loading/>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    view_hd: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    line: {
        height: 15,
        width: 3,
        marginRight: 10,
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
    bannerWrap: {
        backgroundColor: '#fff'
    },
    banner: {
        flex: 1,
        height: $.WIDTH * 9 / 16,
        borderRadius: 3,
        backgroundColor: '#f1f1f1',
        overflow: 'hidden'
    },
    bannerimg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 3
    },
    bannertext: {
        fontSize: 16,
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 7,
        position: 'absolute',
        //backgroundColor:'rgba(0,0,0,.3)',
        textShadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 20,
        left: 0,
        right: 0,
        bottom: 0,
        //borderBottomLeftRadius: 3,
        //borderBottomRightRadius: 3,
    },
    movielist: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    movieitem: {
        width: ($.WIDTH - 40) / 3,
        marginHorizontal: 5,
    },
    movieimg: {
        width: '100%',
        height: ($.WIDTH - 40) / 2,
        flex: 1,
        borderRadius: 3,
        backgroundColor:'#f1f1f1',
        resizeMode: 'cover'
    },
    movietext: {
        alignItems: 'center',
        height: 40,
        flexDirection: 'row'
    },
    moviename: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        flex: 1
    },
})