/*
*
Live
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    Button,
    View,
} from 'react-native';

import { TabNavigator, TabBarTop } from "react-navigation";
import TabItem from '../compoents/TabItem';

//TabNavigatorConfig
const TabNavigatorConfig = {
    tabBarComponent:TabBarTop,
    tabBarPosition:'top',
    lazy:true,
    backBehavior:'none',
    tabBarOptions:{
        indicatorStyle:{
            backgroundColor:'#fff',
            borderRadius:2
        }
    },
    
}

const Tab1 = () => <Text>1111</Text>;
const Tab2 = () => <Text>2222</Text>;
const Tab3 = () => <Text>3333</Text>;
const Tab4 = () => <Text>4444</Text>;

//Root
const Tab = TabNavigator({
    Tab1: { screen: Tab1 },
    Tab2: { screen: Tab2 },
    Tab3: { screen: Tab3 },
    Tab4: { screen: Tab4 },
},TabNavigatorConfig);

export default class Live extends PureComponent {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => <TabItem label='直播' icon='track-changes' active={focused} />,
    }
    render(){
        return <Tab />
    }
}