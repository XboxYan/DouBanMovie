import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from '../theme';

@observer
class StarCurrent extends PureComponent {
    width = new Animated.Value(0);
    componentWillUpdate(nextProps, nextState) {
        if (this.props.score != nextProps.score) {
            Animated.timing(
                this.width,
                {
                    toValue: nextProps.score * 7,
                    //duration: 500,
                    //useNativeDriver: true
                }
            ).start();
        }

    }
    componentDidMount() {
        if (this.props.score) {
            Animated.timing(
                this.width,
                {
                    toValue: this.props.score * 7,
                    //duration: 500,
                    //useNativeDriver: true
                }
            ).start();
        }
    }

    render() {
        return (
            <Animated.View style={[styles.star, { width: this.width }]}>
                <Image source={require('../img/star.png')} tintColor={_.Color} style={styles.star} />
            </Animated.View>
        )
    }
}

@observer
export default class Picker extends PureComponent {

    @observable visible = false;

    @action
    setVisible = () => {
        this.visible = !this.visible;
    }

    render() {
        const { label, selectedValue, onValueChange } = this.props;
        return (
            <View style={[styles.starcon, style]}>
                {label}
                <Modal
                    transparent={true}
                    visible={this.visible}
                    onRequestClose={this.setVisible}
                >
                    <TouchableOpacity style={styles.full} activeOpacity={1} onPress={this.setVisible}>
                        <View style={styles.con}>
                            {
                                React.Children.map(this.props.children, (child,index) => child )
                            }
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    starcon: {
        flexDirection: 'row',
        height: 20,
        alignItems: 'center'
    },
    full: {
        position:'absolute',
        left:0,
        top:0,
        right:0,
        bottom:0
    },
    con: {
        
    }
});