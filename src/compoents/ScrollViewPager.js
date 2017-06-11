import React, { PropTypes,PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    UIManager,
    LayoutAnimation,
    InteractionManager,
    ScrollView,
    Image,
    TouchableOpacity,
    View,
} from 'react-native';

import ViewPager from './ViewPager';
import Touchable from './Touchable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loading from './Loading';

export default class ScrollViewPager extends PureComponent {
    static PropTypes = {
        isShowMore:PropTypes.bool,
        pageIndex:PropTypes.num
    }

    static defaultProps = {
        isShowMore:true,
        pageIndex:0
    }
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: props.pageIndex,
            initialWidth:0
        }
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    //记录tab的宽度
    tabswidth = [];
    //记录tab的位置
    tabsdir = [];
    //记录滚动位置
    xoffset = 0;
    //实际滚动条宽度
    scrollWidth = 0;

    onPageSelected = (pageIndex) => {
        this.xScroll(pageIndex);
        LayoutAnimation.configureNext({
            duration: 200,
            update: {
                type: 'easeInEaseOut'
            }
        });
    }
    xScroll = (pageIndex) => {
        this.setState({pageIndex});
        if(this.tabsdir[pageIndex]+this.tabswidth[pageIndex]-this.scrollWidth>this.xoffset){
            this.xoffset=this.tabsdir[pageIndex]+this.tabswidth[pageIndex]-this.scrollWidth+30;
            let last = this.tabsdir.length-1;
            let max = this.tabsdir[last]+this.tabswidth[last]-this.scrollWidth;
            this.xoffset=this.xoffset>=max?max:this.xoffset;
            this.tabbar.scrollTo({x: this.xoffset, y: 0, animated: true});
        }else if(this.xoffset>this.tabsdir[pageIndex]){
            this.xoffset=this.tabsdir[pageIndex]-30;
            this.xoffset=this.xoffset>=0?this.xoffset:0;
            this.tabbar.scrollTo({x: this.xoffset, y: 0, animated: true});
        }
    }

    onSetPage = (pageIndex) => {
        this.xScroll(pageIndex);
        this.viewpager.setPage(pageIndex);
    }

    onlayout = (e,i)=> {
        let {width,x} = e.nativeEvent.layout;
        this.tabswidth[i]=width;
        this.tabsdir[i]=x;
        if(i===this.state.pageIndex){
            this.setState({initialWidth:width});
            LayoutAnimation.configureNext({
                duration: 200,
                update: {
                    type: 'easeInEaseOut'
                }
            });
        }
        if(this.props.pageIndex!=0){
            this.xScroll(this.props.pageIndex);
        }
    }

    scrollayout = (e) => {
        this.scrollWidth = e.nativeEvent.layout.width;
    }

    scrollEnd = (e) => {
        this.xoffset = e.nativeEvent.contentOffset.x;
    }
    
    render() {
        const { pageIndex,initialWidth } = this.state;
        const {navigator,bgColor,hideBorder,tabbarHeight,tabbarStyle,tablineStyle,tabbarActiveStyle,tablineHidden,isShowMore} = this.props;
        const tablabel = React.Children.map(this.props.children,child=>child.props.tablabel);
        return (
            <View style={{flex:1}}>
                <View style={[styles.scrolltabbar,{backgroundColor:bgColor},hideBorder&&{borderBottomWidth:0}]}>
                    <ScrollView
                        onLayout={this.scrollayout}
                        bounces={false}
                        ref={(tabbar) => this.tabbar = tabbar}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={this.scrollEnd}
                        horizontal={true}
                    >
                        {
                            tablabel.map((item,i)=>(
                                <Touchable onLayout={(e)=>this.onlayout(e,i)} key={i} onPress={()=>{this.onSetPage(i)}} style={[styles.tabbaritem,{height:tabbarHeight}]}><Text numberOfLines={2} style={[styles.tabbartext,tabbarStyle,(pageIndex===i)&&tabbarActiveStyle]}>{item}</Text></Touchable>
                            ))
                        }
                        {
                            !tablineHidden&&<View style={[styles.tabline,tablineStyle, { width:this.tabswidth[pageIndex]||initialWidth,left: this.tabsdir[pageIndex] }]}></View>
                        }
                    </ScrollView>
                </View>
                <ViewPager
                    ref={(viewpager) => this.viewpager = viewpager}
                    onPageSelected={this.onPageSelected}
                    initialPage={pageIndex}
                >
                    {this.props.children}
                </ViewPager>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    scrolltabbar: {
        alignItems:'stretch',
        flexDirection:'row',
        borderBottomWidth:1/3,
        borderBottomColor:'#ececec',
    },
    tabbaritem: {
        paddingHorizontal: 15,
        alignItems:'center',
        justifyContent: 'center',
    },
    tabline: {
        height: 3,
        borderRadius: 1,
        width: 0,
        position: 'absolute',
        bottom: 0,
        left:-100,
        backgroundColor: '#fff',
    },
    tabbartext: {
        fontSize: 14,
        opacity: 1,
        textAlign:'center',
        color: '#fff'
    },
});