import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from '../theme';

@observer
export default class TabItem extends Component {
	render() {
		const { icon, active, label } = this.props;
		const Color = active?_.Color:'#777';
		return (
			<View style={[styles.tabitem]}>
				<Icon name={icon} size={24} color={Color} />
				<Text style={[styles.label, { color: Color }]}>{label}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	tabitem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		textAlign: 'center',
		fontSize: 10,
		marginTop: 3,
	}
});