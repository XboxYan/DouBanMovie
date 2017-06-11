/**
 * Icon
 */

import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

const Icon = (props) => (
    <View style={props.style}>
        <View style={[styles.icocon,{opacity:props.active?0:1}]}>{props.icon}</View>
        <View style={[styles.icocon,{opacity:props.active?1:0}]}>{props.iconActive}</View>
    </View>
)

export default Icon;

const styles = StyleSheet.create({
  icocon:{
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top:0,
    justifyContent:'center',
    alignItems: 'center',
  }

});