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
    LayoutAnimation,
    View,
} from 'react-native';
import { observable, action, computed} from 'mobx';
import { observer } from 'mobx-react/native';
import _ from '../../theme';
import fetchData from '../../util/Fetch';
import Loading from '../../compoents/Loading';

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

    @observable data = [];

    @observable isRender = false;

    @observable Doubandata = [];

    @observable DoubanisRender = false;

    @action
    getData = () => {
        fetchData('video',{
            par:{
                videoId:this.movieId
            }
        },
            (data)=>{
                this.data = data.body;
                this.isRender = true;
            }
        )
    }
    @action
    getDoubanData = () => {
        fetchData('douban_subject',{
            par:{
                id:this.doubanId
            }
        },
            (data)=>{
                this.Doubandata = data;
                this.DoubanisRender = true;
                LayoutAnimation.spring();
            }
        )
    }
    componentDidMount() {
        const { params:{movieId,doubanId} } = this.props.navigation.state;
        this.movieId = movieId;
        this.doubanId = doubanId;
        this.getData();
        this.getDoubanData();
    }
    render(){
        const { navigation } = this.props;
        const { params } = navigation.state;
        return (
            <View style={styles.content}>
                <View style={styles.video_place}/>
                <Text style={styles.movieTitle}>{this.DoubanisRender?this.Doubandata.title:'加载中..'}</Text>
                <ScrollView style={styles.content}>
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
    content:{
        flex:1,
    },
    video_place:{
        height:$.WIDTH*9/16,
        backgroundColor:'#000',
    },
    movieTitle:{
        fontSize:16,
        color:'#333',
        padding:15,
        backgroundColor:'#fff'
    },
    viewcon: {
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderRadius:3,
        marginHorizontal:10,
        marginTop:10
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
    summary:{
        paddingHorizontal: 15,
        paddingBottom:10
    },
    text:{
        fontSize:14,
        color:'#666',
        lineHeight:20
    }
})