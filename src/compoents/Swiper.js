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

    @observable pageIndex = 0;

    @observable len = 1;

    @action
    onLayout = ({ nativeEvent: e }) => {
        this.realWidth = e.layout.width;
    }

    componentWillUpdate1(nextProps, nextState) {
        if (React.Children.count(this.props.children) != React.Children.count(nextProps.children)) {
            this.len = React.Children.count(nextProps.children);
            this.auto()
        }

    }

    componentDidMount() {
        this.len = React.Children.count(this.props.children);
        this.auto()
    }
    

    auto = () => {
        this.cleartimer();
        this.timer = setInterval(()=>{
            this.pageIndex+=1;
            (this.pageIndex>=this.len)&&(this.pageIndex = 0);
            this.viewpager.scrollTo({x:this.pageIndex*this.realWidth,animated: true})
        },5000)
    }

    scrollEnd = (e) => {
        let index = e.nativeEvent.contentOffset.x/this.realWidth;
        if(this.pageIndex!=index){
            this.pageIndex = index;
        }
        this.auto();
    }

    cleartimer = () => {
        this.timer&&clearInterval(this.timer);
    }

    componentWillUnmount() {
        this.cleartimer();
    }
     
    render() {
        const { style,dotColor } = this.props;
        return (
            <View style={[styles.content,style, { paddingBottom: 15 }]}>
                <ScrollView
                    ref={(viewpager) => this.viewpager = viewpager}
                    style={styles.content}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
                    )}
                    overScrollMode = 'always'
                    onTouchStart={this.cleartimer}
                    onMomentumScrollEnd={this.scrollEnd}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    pagingEnabled={true}
                    onLayout={this.onLayout}
                >
                    {
                        React.Children.map(this.props.children, (child, index) =>
                            <Animated.View style={[styles.content, {
                                width: this.realWidth,
                                opacity: this.scrollX.interpolate({
                                    inputRange: [(index - 1) * this.realWidth, index * this.realWidth, (index + 1) * this.realWidth],
                                    outputRange: [.6, 1, .6]
                                }),
                                transform: [{
                                    scale: this.scrollX.interpolate({
                                        inputRange: [(index - 1) * this.realWidth, index * this.realWidth, (index + 1) * this.realWidth],
                                        outputRange: [.8, .92, .8]
                                    })
                                }, {
                                    translateX: this.scrollX.interpolate({
                                        inputRange: [(index - 1) * this.realWidth, index * this.realWidth, (index + 1) * this.realWidth],
                                        outputRange: [-60, 0, 60]
                                    })
                                }]
                            }]}>{child}</Animated.View>
                        )
                    }
                </ScrollView>
                <View style={styles.dotwrap}>
                    {
                        React.Children.map(this.props.children, (child, index) =>
                            <Animated.View style={[styles.dot,{marginHorizontal: 3,
                                transform: [{
                                        translateY: this.scrollX.interpolate({
                                            inputRange: [(index - 2) * this.realWidth,(index - 1) * this.realWidth, index * this.realWidth, (index + 1) * this.realWidth, (index + 2) * this.realWidth],
                                            outputRange: [0, 0, -2, 0, 0]
                                        })
                                    }]
                                }]}>
                                <Animated.View style={[styles.dot,{backgroundColor:dotColor,
                                    opacity: this.scrollX.interpolate({
                                        inputRange: [(index - 1) * this.realWidth, index * this.realWidth, (index + 1) * this.realWidth],
                                        outputRange: [0, 1, 0]
                                    })
                                }]} />
                            </Animated.View>
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    dotwrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 10,
        backgroundColor: '#f1f1f1',
    }
})
