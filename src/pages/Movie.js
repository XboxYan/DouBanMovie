/*
*
Movie
*
*/

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';
import { observable, action, computed} from 'mobx';
import { observer } from 'mobx-react/native';
import _ from '../theme';
import { TabNavigator, TabBarTop } from "react-navigation";
import TabItem from '../compoents/TabItem';
import AppTop from '../compoents/AppTop';

//TabNavigatorConfig
const TabNavigatorConfig = {
    tabBarComponent:TabBarTop,
    tabBarPosition:'top',
    lazy:true,
    backBehavior:'none',
    tabBarOptions:{
        pressColor:'none',
        borderless:false,
        style:{
            backgroundColor:'transparent',
            height:44
        },
        indicatorStyle:{
            backgroundColor:'#fff',
            borderRadius:2,
            bottom:1
        },
    },
    
}

const Tab1 = observer(() => <Text>{_.Color}</Text>);
const Tab2 = observer(() => <Text>2222</Text>);
const Tab3 = observer(() => <Text>3333</Text>);
const Tab4 = observer(() => <Text>4444</Text>);

//Root
const Tab = TabNavigator({
    Tab1: { screen: Tab1 },
    Tab2: { screen: Tab2 },
    Tab3: { screen: Tab3 },
    Tab4: { screen: Tab4 },
},TabNavigatorConfig);

@observer
export default class Movie extends Component {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => <TabItem label='影视' icon='album' active={focused} />,
    }
    render(){
        return (
            <View style={[styles.content,{backgroundColor:_.Color}]}>
                <AppTop title='影视' />
                <Tab />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:1,
    }
})