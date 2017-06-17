/*
*
Home
*
*/

import React, { Component } from 'react';
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

import fetchData from '../util/Fetch';
import { observable, action, computed} from 'mobx';
import { observer } from 'mobx-react/native';
import _ from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

@observer
class MovieItem extends Component {
    componentWillUpdate(){
        //LayoutAnimation.easeInEaseOut();
    }
    render() {
        const {data} = this.props;
        return (
            <TouchableOpacity
                onPress={() => {}}
                activeOpacity={.7}
                style={styles.movieitem}>
                <Image
                    style={styles.movieimg}
                    source={{ uri: data.img }}
                />
                <View style={styles.movietext}>
                    <Text numberOfLines={1} style={styles.moviename}>{data.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const MovieTitle = observer((props) => (
    <View style={[styles.view_hd, { borderColor: _.Color }]}>
        <Text style={styles.view_title}>{props.title}</Text>
        <TouchableOpacity
            disabled={!!!props.title}
            onPress={()=>props.navigation.navigate('HomeMore',{id:props.id,title:props.title})}
            style={styles.view_more}
        >
            <Text style={styles.view_moretext}>更多</Text>
            <Icon name='navigate-next' size={20} color={_.Color} />
        </TouchableOpacity>
    </View>
))

@observer
export default class Home extends Component {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => <TabItem label='推荐' icon='fire' active={focused} />,
    }

    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    @observable data = {};

    @observable isRender = false;

    @computed get doubanList(){
        return this.data.doubanList;
    }

    @computed get suggestions(){
        return this.data.suggestions;
    }

    @computed get doubanTopicList(){
        return this.data.doubanTopicList||[,,,];
    }

    componentDidMount() {
        fetchData('index',{},
            (data)=>{
                this.data = data.body;
                this.isRender = true;
            }
        )
    }

    componentWillUpdate(){
        //LayoutAnimation.easeInEaseOut();
    }

    render() {
        const { navigation } = this.props;
        let [movie_score={},movie_free_stream={},movie_latest={},douban={}] = this.doubanTopicList;
        return (
            <View style={styles.content}>
                <AppTop title='推荐' />
                <ScrollView style={styles.content}>
                    <View style={styles.viewcon}>
                        <MovieTitle title={this.isRender?douban.name:''} id={douban.id} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={douban.subjects} />
                    </View>
                    <View style={styles.viewcon}>
                        <MovieTitle title={this.isRender?movie_free_stream.name:''} id={movie_free_stream.id} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={movie_free_stream.subjects} />
                    </View>
                    <View style={styles.viewcon}>
                        <MovieTitle title={this.isRender?movie_latest.name:''} id={movie_latest.id} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={movie_latest.subjects} />
                    </View>
                    <View style={styles.viewcon}>
                        <MovieTitle title={this.isRender?movie_score.name:''} id={movie_score.id} navigation={navigation} />
                        <MovieList isRender={this.isRender} data={movie_score.subjects} />
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
        minHeight:150
    },
    view_hd: {
        height: 16,
        borderLeftWidth: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
        marginLeft:10
    },
    view_title: {
        fontSize: 16,
        color: '#333',
        flex: 1
    },
    view_more: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    view_moretext: {
        fontSize: 13,
        color: '#999'
    },
})