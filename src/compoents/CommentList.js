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
import Star from './Star';

const CommentEmpty = () => (
	<View style={styles.flexcon}>
		<Text>暂无评论</Text>
	</View>
)

const CommentItem = (props) => (
	<View style={styles.commentitem}>
		<Image 
			style={styles.commentimg}
			source={{uri:props.item.user.avatar}}
			defaultSource={require('../img/img_place.png')}
		/>
		<View style={styles.commenttext}>
			<Text style={styles.commentname}>{props.item.user.name}</Text>
			<Text style={styles.commenttime}>{props.item.create_time}</Text>
			<Text style={styles.commentpage}>{props.item.comment}</Text>
			<Star style={styles.star} score={props.item.rating?props.item.rating.value*2:0} isShowNum={false}/>
		</View>
	</View>
)

export default class extends PureComponent {

	constructor(props) {
		super(props);
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
	}

	renderItem = ({ item, index }) => {
		return <CommentItem item={item} navigation={this.props.navigation} />
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
			return <CommentEmpty />;
		}
	}
	render() {
		const { data,style, isRender,onEndReached=()=>{} } = this.props;
		if (!isRender) {
			return <Loading size='small' text='' />
		}
		if(data.length==0){
			return <Text style={styles.empty}>暂无评论</Text>
		}
		return (
			<FlatList
				style={[styles.content,style]}
				numColumns={1}
				ListFooterComponent={this.renderFooter}
				data={[...data]}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.1}
				keyExtractor={(item, index) => index+item.id}
				renderItem={this.renderItem}
			/>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	commentitem: {
		marginTop:10,
		paddingBottom:5,
		flexDirection:'row'
	},
	commentimg: {
		width: 40,
		height:40,
		borderRadius:20,
		resizeMode: 'cover'
	},
	commenttext: {
		marginLeft:15,
		flex:1
	},
	commentname: {
		fontSize: 15,
		color: '#333',
	},
	commentpage:{
		fontSize: 14,
		color: '#666',
		marginTop:10
	},
	commenttime:{
		marginTop:5,
		fontSize:14,
		color:'#999',
		fontStyle:'italic'
	},
	star:{
		position:'absolute',
		width:70,
		top:0,
		right:0,
	},
	label: {
		textAlign: 'center',
		fontSize: 10,
		marginTop: 3,
	},
	commentloadcontent: {
		flex: 1,
		paddingHorizontal: 5,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	commentloadtext: {
		height: 10,
	},
	flexcon:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty:{
		flex:1,
		padding:10,
		textAlign:'center',
		fontSize: 14,
		color: '#666'
	}
});