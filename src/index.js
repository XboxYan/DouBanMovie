import './util/Global';
import React, { PureComponent } from 'react';
import {
    AppRegistry,
    View,
    StatusBar
} from 'react-native';

import App from './App';

//非开发环境去掉log
if (!__DEV__) {
    global.console = {
        info: () => { },
        log: () => { },
        warn: () => { },
        error: () => { },
    };
}

class DouBan extends PureComponent {

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor='transparent' />
                <App />
            </View>
        )
    }
}

AppRegistry.registerComponent('DouBanMovie', () => DouBan);
