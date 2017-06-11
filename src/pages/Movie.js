/*
*
Movie
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    Button,
    View,
} from 'react-native';

import TabItem from '../compoents/TabItem';

export default class Movie extends PureComponent {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => <TabItem label='影视' icon='movie' active={focused} />,
    }
    render(){
        return <Text>这是影视</Text>
    }
}