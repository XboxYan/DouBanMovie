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

import TabItem from '../compoents/TabItem';
import AppTop from '../compoents/AppTop';

export default class Live extends PureComponent {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => <TabItem label='直播' icon='blender' active={focused} />,
    }
    render(){
        return (
            <View style={{flex:1}}>
                <AppTop title='直播' />
                
            </View>
        )
    }
}