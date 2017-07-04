import React, { PureComponent } from 'react';
import {
	StyleSheet,
	Text,
	ActivityIndicator,
	View,
} from 'react-native';

import _ from '../theme';
import { observer } from 'mobx-react/native';

@observer
export default class extends PureComponent {
    render(){
        const {isEnding} = this.props;
        return(
            <View style={styles.loadview}>
                {
                    isEnding?
                    <View style={styles.loadmore}>
                        <Text style={styles.loadtext}>-E-N-D-</Text>
                    </View>
                    :
                    <View style={styles.loadmore}>
                        <ActivityIndicator size='small' color={_.Color} />
                        <Text style={styles.loadtext}>正在加载...</Text>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadview:{
		padding:20,
		alignItems: 'center',
	},
	loadtext:{
		color:'#999',
		fontSize:14,
		paddingHorizontal:5
	},
	loadmore:{
		flexDirection:'row',
		justifyContent: 'center',
	}
})