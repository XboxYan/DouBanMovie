/*
*
Home
*
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    UIManager,
    LayoutAnimation,
    View,
} from 'react-native';

import AppTop from '../compoents/AppTop';
import MovieContent from './Movie/MovieContent';
import Movie from './Movie.js';

import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react/native';
import _ from '../theme';
import ScrollViewPager from 'react-native-scrollviewpager';


const tabBarOptions = {
    tabconStyle: {
        justifyContent: 'center',
        //paddingHorizontal:15
    },
    style: {
        backgroundColor: _.Color,
    },
    scrollEnabled: true,
    tabStyle: {
        height: 34,
        paddingHorizontal: 15,
        //width:100
    },
    labelStyle: {
        fontSize: 15,
        color: '#fff',
    },
    activeTintColor:'#fff',
    indicatorStyle: {
        backgroundColor: '#fff',
        height: 3,
        marginBottom:2,
        borderRadius:2,
        width: 20
    }
}

const tabs = [
    {
        name: '热播',
        id: 0
    },
    {
        name: '电影',
        id: 1
    },
    {
        name: '电视',
        id: 2
    },
    {
        name: '动漫',
        id: 3
    },
    {
        name: '综艺',
        id: 4
    },
    {
        name: '微电影',
        id: 5
    },
    {
        name: '少儿',
        id: 6
    },
]

@observer
export default class Home extends PureComponent {
    
    componentDidMount() {
    
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.content}>
                <AppTop title='推荐' navigation={navigation} />
                <ScrollViewPager tabBarOptions={tabBarOptions} >
                    <Movie tablabel={'豆瓣榜单'} navigation={this.props.navigation} />
                    {
                        tabs.map((el,i)=>(
                            <MovieContent tablabel={el.name} key={i} id={el.id} navigation={this.props.navigation} />
                        ))
                    }
                </ScrollViewPager>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
})