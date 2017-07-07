/**
 * AppBar
 */

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	Text,
	Platform,
	View,
	PixelRatio,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Touchable from './Touchable';
import { observer } from 'mobx-react/native';
import Shadow from './Shadow';
import _ from '../theme';

@observer
export default class AppBar extends PureComponent {
	goBack = () => {
		const { navigation } = this.props;
		navigation.goBack();
	}
	render() {
		const { onPress, title, navigation: { goBack } } = this.props;
		return (
			<View style={[styles.appbar, { backgroundColor: _.Color }]}>
				<Shadow />
				<Touchable
					style={styles.btn}
					onPress={this.goBack}
				>
					<Icon name='keyboard-arrow-left' size={30} color='#fff' />
				</Touchable>
				<Text style={styles.apptitle} numberOfLines={1}>{title}</Text>
				{
					this.props.children || <View style={styles.btn}></View>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	appbar: {
		paddingTop: $.STATUS_HEIGHT,
		flexDirection: 'row',
		alignItems: 'center',
	},
	btn: {
		width: 48,
		height: 48,
		zIndex: 1,
		backgroundColor: 'rgba(0,0,0,0)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	apptitle: {
		flex: 1,
		fontSize: 16,
		color: '#fff'
	}

});
