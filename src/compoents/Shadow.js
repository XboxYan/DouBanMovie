/**
 * Shadow
 */

import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

const Shadow = (props) => (
    <Image resizeMode='cover' blurRadius={4} style={styles.bg} source={require('../img/bg.png')} />
)

export default Shadow;

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
    },
});