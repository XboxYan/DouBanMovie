import React, { PureComponent } from 'react';
import {
	StyleSheet,
	Text,
    Animated,
	View,
} from 'react-native';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from '../theme';

class StarBase  extends PureComponent {
    render(){
        const {sign} = this.props;
        return (
            <View style={styles.star}>
                <Icon name={sign} size={14} color='#eee' />
                <Icon name={sign} size={14} color='#eee' />
                <Icon name={sign} size={14} color='#eee' />
                <Icon name={sign} size={14} color='#eee' />
                <Icon name={sign} size={14} color='#eee' />
            </View>
        )
    }
}

@observer
class StarCurrent  extends PureComponent {
    width = new Animated.Value(0);
    componentWillUpdate(nextProps,nextState) {
        if(this.props.score!=nextProps.score){
            Animated.timing(
            this.width,
                {
                    toValue: nextProps.score*7,
                }
            ).start();
        }
        
    }
    render(){
        const {sign} = this.props;
        return (
            <Animated.View style={[styles.star,{width:this.width}]}>
                <Icon name={sign} size={14} color={_.Color} />
                <Icon name={sign} size={14} color={_.Color} />
                <Icon name={sign} size={14} color={_.Color} />
                <Icon name={sign} size={14} color={_.Color} />
                <Icon name={sign} size={14} color={_.Color} />
            </Animated.View>
        )
    }
}

@observer
export default class Star extends PureComponent {
	render() {
        const {score,style,sign='star'} = this.props;
		return (
			<View style={[styles.starcon,style]}>
                <StarBase sign={sign} />
				<StarCurrent score={score} sign={sign} />
				<Text style={[styles.score,{color:_.Color}]}>{score||'0.0'}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	starcon: {
		flexDirection:'row',
        height:20,
        alignItems:'center'
	},
	star: {
		flexDirection:'row',
		position: 'absolute',
        zIndex:10,
        overflow:'hidden'
	},
    score:{
        marginLeft:75,
        fontSize:13,
        paddingRight:10
    }
});