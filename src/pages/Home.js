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
import AppTop from '../compoents/AppTop';

export default class Home extends PureComponent {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => <TabItem label='推荐' icon='fire' active={focused} />,
    }
    render() {
        return (
            <View style={styles.content}>
                <AppTop title='推荐' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:1
    }
})