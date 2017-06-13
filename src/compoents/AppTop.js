/**
 * AppTop
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from '../theme';
import Touchable from './Touchable';

@observer
export default class AppTop extends Component {

	componentDidMount(){
		setTimeout(()=>{
			//_.SetTheme('#6b52ae')
		},2000)
	}

	render() {
		const { title } = this.props;
		return (
			<View style={[styles.apptop,{backgroundColor:_.Color}]}>
				<Text style={styles.title}>{title}</Text>
				<Touchable style={styles.ico}>
					<Icon name='schedule' size={20} color='#fff' />
				</Touchable>
				<Touchable style={styles.ico}>
					<Icon name='search' size={24} color='#fff' />
				</Touchable>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	apptop: {
		paddingTop: $.STATUS_HEIGHT,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 5,
	},
	title: {
		flex: 1,
		fontSize:16,
		color:'#fff',
		marginLeft:20
	},
	ico: {
		width: 44,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
	},

});
