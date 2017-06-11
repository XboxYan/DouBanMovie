/*
*
Home
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    Button,
    StyleSheet,
    View,
} from 'react-native';

import TabItem from '../compoents/TabItem';

class AppTop extends PureComponent {
    render(){
        return (
            <View>
            
            </View>
        )
    }
}

export default class Home extends PureComponent {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => <TabItem label='推荐' icon='whatshot' active={focused} />,
    }
    render() {
        return (
            <View style={styles.content}>
                <AppTop/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:1
    }
})