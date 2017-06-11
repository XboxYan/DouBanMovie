import React, { Component } from 'react'
import {
	Text,
	View,
	ActivityIndicator,
	Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper';
import Image from './Image';
import Touchable from './Touchable';
import VideoContentView from '../pages/Movie/VideoContentView';

const styles = {
	wrapper: {
		height: $.WIDTH * 9 / 16,
	},
	img: {
		flex: 1,
		width: '100%',
		resizeMode: 'cover'
	},
	imgwrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadView: {
		flex: 1,
		backgroundColor: '#f1f1f1'
	}
}


export default class extends Component {

	render() {
		const { isRender, imgList, navigator } = this.props;
		return (
			<View style={styles.wrapper}>
				{
					isRender ?
						<Swiper autoplay={true} height={$.WIDTH * 9 / 16} loop={true}>
							{
								imgList.map((item, i) => 
									<Touchable
										onPress={() => navigator.push({ name: VideoContentView, item: item })}
										key={item.assetId} 
										style={styles.imgwrap}>
										<Image
											source={{ uri:Base+(item.imageList.length>0?item.imageList[0].posterUrl:'') }}
											defaultSource={require('../../img/banner_moren.png')}
											style={styles.img}
										/>
									</Touchable>
								)
							}
						</Swiper>
						:
						<View style={styles.loadView}></View>
				}
			</View>
		)
	}
}