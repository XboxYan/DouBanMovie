/*
*
HomeMore
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    Button,
    StyleSheet,
    View,
} from 'react-native';

import fetchData from '../../util/Fetch';
import Appbar from '../../compoents/Appbar';

export default class HomeMore extends PureComponent {

    render() {
        const { navigation } = this.props;
        const { params } = navigation.state;
        return (
            <View style={styles.content}>
                <Appbar navigation={navigation} title={params.title} />
                <Text>{params.id}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:1
    }
})