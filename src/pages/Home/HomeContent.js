/*
*
HomeContent
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

export default class HomeContent extends PureComponent {
    componentDidMount(){
        alert(this.props.navigation)
    }
    render() {
        return (
            <View style={styles.content}>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:1
    }
})