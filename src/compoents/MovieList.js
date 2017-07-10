import React, { PureComponent } from 'react';
import {
	StyleSheet,
	Text,
	UIManager,
	ActivityIndicator,
	TouchableOpacity,
	LayoutAnimation,
	Image,
	FlatList,
	View,
} from 'react-native';

import Loading from './Loading';
import LoadView from './LoadView';
import Image1 from './Image';

const MovieEmpty = () => (
	<View style={styles.flexcon}>
		<Text>没有找到影片！</Text>
	</View>
)

const MovieItem = (props) => (
	<TouchableOpacity
		activeOpacity={.8}
		onPress={() => props.navigation.navigate('MovieDetail',{movieId:props.item.movieId})}
		style={styles.movieitem}>
		<Image 
			style={styles.movieimg}
			source={{uri:props.item.img}}
			defaultSource={require('../img/img_place.png')}
		/>
		<View style={styles.movietext}>
			<Text numberOfLines={1} style={styles.moviename}>{props.item.name}</Text>
		</View>
	</TouchableOpacity>
)

export default class extends PureComponent {

	constructor(props) {
		super(props);
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
	}

	renderItem = ({ item, index }) => {
		return <MovieItem item={item} navigation={this.props.navigation} />
	}
	componentDidUpdate(nextProps, nextState) {
		//LayoutAnimation.easeInEaseOut();
	}

	renderFooter = () => {
		const { data } = this.props;
		if(data.length>0){
			const { onEndReached,isEnding=false } = this.props;
			if(onEndReached){
				return <LoadView isEnding={isEnding} />;
			}else{
				return null;
			}
		}else{
			return <MovieEmpty />;
		}
	}
	render() {
		const { data, isRender,onEndReached=()=>{} } = this.props;
		const height = ($.WIDTH - 40) / 2+40;
		if (!isRender) {
			return <Loading size='small' text='' />
		}
		return (
			<FlatList
				style={styles.content}
				numColumns={3}
				ListFooterComponent={this.renderFooter}
				data={[...data]}
				getItemLayout={(data, index) => ( {length: height, offset: height * index, index} )}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.2}
				keyExtractor={(item, index) => item.movieId}
				renderItem={this.renderItem}
			/>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		paddingHorizontal: 5,
		paddingTop:10,
	},
	movieitem: {
		width: ($.WIDTH - 40) / 3,
		marginHorizontal: 5,
	},
	movieimg: {
		width: '100%',
		height:($.WIDTH - 40) / 2,
		flex: 1,
		borderRadius:3,
		resizeMode: 'cover'
	},
	movietext: {
		alignItems: 'center',
		height: 40,
		flexDirection: 'row'
	},
	moviename: {
		fontSize: 14,
		color: '#333',
		textAlign: 'center',
		flex: 1
	},
	label: {
		textAlign: 'center',
		fontSize: 10,
		marginTop: 3,
	},
	movieloadcontent: {
		flex: 1,
		paddingHorizontal: 5,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	movieloadtext: {
		height: 10,
	},
	flexcon:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});