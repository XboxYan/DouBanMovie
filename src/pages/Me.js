/*
*
Me
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    Button,
    View,
} from 'react-native';

import TabItem from '../compoents/TabItem';

export default class Me extends PureComponent {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => <TabItem label='我' icon='face' active={focused} />,
    }
    render(){
        return <Text>这是我</Text>
    }
}