import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	Text,
	UIManager,
	ActivityIndicator,
	LayoutAnimation,
	FlatList,
	View,
} from 'react-native';

import Touchable from './Touchable';
import Loading from './Loading';
import Image from './Image';
import VideoContentView from '../pages/Movie/VideoContentView';


const MovieLoadView = () => (
	<View style={styles.movieloadcontent}>
		<View style={styles.movieitem}>
			<View style={styles.movieimgwrap} />
			<View style={styles.movieloadtext} />
		</View>
		<View style={styles.movieitem}>
			<View style={styles.movieimgwrap} />
			<View style={styles.movieloadtext} />
		</View>
		<View style={styles.movieitem}>
			<View style={styles.movieimgwrap} />
			<View style={styles.movieloadtext} />
		</View>
		<View style={styles.movieitem}>
			<View style={styles.movieimgwrap} />
			<View style={styles.movieloadtext} />
		</View>
		<View style={styles.movieitem}>
			<View style={styles.movieimgwrap} />
			<View style={styles.movieloadtext} />
		</View>
		<View style={styles.movieitem}>
			<View style={styles.movieimgwrap} />
			<View style={styles.movieloadtext} />
		</View>
	</View>
)

const MovieEmpty = () => (
	<View style={styles.flexcon}>
		<Text>没有找到影片！</Text>
	</View>
)

const MovieItem = (props) => (
	<Touchable
		onPress={() => props.navigator.push({ name: VideoContentView, item: props.item })}
		style={styles.movieitem}>
		<View style={styles.movieimgwrap}>
			<Image 
				style={styles.movieimg}
				source={{uri:Base+(props.item.imageList.length>0?props.item.imageList[0].posterUrl:'')}}
				defaultSource={require('../../img/poster_moren.png')}
			/>
		</View>
		<View style={styles.movietext}>
			<Text numberOfLines={1} style={styles.moviename}>{props.item.titleBrief}</Text>
		</View>
	</Touchable>
)

const LoadView = (props) => (
    <View style={styles.loadview}>
		{
			props.isEnding?
			<View style={styles.loadmore}>
				<Text style={styles.loadtext}>没有更多了 </Text>
			</View>
			:
			<View style={styles.loadmore}>
				<ActivityIndicator size='small' color={$.COLORS.mainColor} />
				<Text style={styles.loadtext}>正在加载影片...</Text>
			</View>
		}
    </View>
)

export default class extends PureComponent {

	constructor(props) {
		super(props);
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
	}

	renderItem = ({ item, index }) => {
		return <MovieItem item={item} navigator={this.props.navigator} />
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
		if (!isRender) {
			return <Loading size='small' text='' />
		}
		return (
			<FlatList
				style={styles.content}
				numColumns={3}
				ListFooterComponent={this.renderFooter}
				data={[...data]}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.1}
				keyExtractor={(item, index) => item.assetId}
				renderItem={this.renderItem}
			/>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		paddingHorizontal: 5,
	},
	movieitem: {
		width: ($.WIDTH - 28) / 3,
		marginHorizontal: 3,
	},
	movieimgwrap: {
		height: ($.WIDTH - 28) / 2,
		backgroundColor: '#f1f1f1'
	},
	movieimg: {
		width: '100%',
		flex: 1,
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
	loadview:{
		padding:20,
		alignItems: 'center',
	},
	loadtext:{
		color:'#ccc',
		fontSize:14,
		paddingHorizontal:5
	},
	loadmore:{
		flexDirection:'row',
		justifyContent: 'center',
	}
});