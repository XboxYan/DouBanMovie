import React, { PureComponent, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    ScrollView
} from 'react-native';

import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react/native';

@observer
export default class Swiper extends PureComponent {
    @observable realWidth = $.WIDTH;

    scrollX = new Animated.Value(0);

    @action
    onLayout = ({ nativeEvent: e }) => {
        this.realWidth = e.layout.width;
    }

    render() {
        const {style} = this.props;
        const len = React.Children.count(this.props.children);
        return (
            <Animated.ScrollView
                ref={(viewpager) => this.viewpager = viewpager}
                style={[styles.content,style]}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
                )}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                pagingEnabled={true}
                onLayout={this.onLayout}
            >
                {
                    React.Children.map(this.props.children, (child, index) =>
                        <Animated.View style={[styles.content, { width: this.realWidth,
                            opacity:this.scrollX.interpolate({
                                inputRange: [(index-1)*this.realWidth,index*this.realWidth,(index+1)*this.realWidth],
                                outputRange: [.6, 1, .6]
                            }),
                            zIndex:this.scrollX.interpolate({
                                inputRange: [(index-1)*this.realWidth,index*this.realWidth,(index+1)*this.realWidth],
                                outputRange: [0, 1, 0]
                            }),
                            transform:[{
                                scale:this.scrollX.interpolate({
                                    inputRange: [(index-1)*this.realWidth,index*this.realWidth,(index+1)*this.realWidth],
                                    outputRange: [.8, .92, .8]
                                })
                            },{
                                translateX:this.scrollX.interpolate({
                                    inputRange: [(index-1)*this.realWidth,index*this.realWidth,(index+1)*this.realWidth],
                                    outputRange: [-65, 0, 65]
                                })
                        }] }]}>{child}</Animated.View>
                    )
                }
            </Animated.ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  content: {
    flex:1,
  },
})
