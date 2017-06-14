/**
 * Loading
 */

import React, { PureComponent } from 'react';
import {
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    Slider,
    PanResponder,
    Image,
    Text,
    UIManager,
    LayoutAnimation,
    StatusBar,
    View,
} from 'react-native';

import Touchable from './Touchable';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Orientation from 'react-native-orientation';
import { observable, action, computed} from 'mobx';
import { observer } from 'mobx-react/native';

@observer
class VideoBar extends PureComponent {

    componentWillMount() {

    }

    render(){
        const {setFullScreen,onSeek,onPlay,currentTime,duration,paused,isShow,isFull,shiftTime,shiftProgress,actionBar} = this.props;
        const showCurrentTime = currentTime + shiftTime;
        const showEndTime = duration + shiftTime;
        return(
            <View style={[styles.videobar,!isShow&&{bottom:-40}]}>
                <Touchable
                    onPress={onPlay}
                    style={styles.videobtn}
                >
                    <Icon name={paused?'play-arrow':'pause'} size={24} color='#fff' />
                </Touchable>
                <Text style={styles.videotime}>{moment.utc(showCurrentTime*1000).format("HH:mm:ss")}</Text>
                <Slider
                    style={styles.videoslider}
                    value={currentTime}
                    onValueChange={(value)=>onSeek(value,false)}
                    onSlidingComplete={(value)=>onSeek(value,true)}
                    maximumValue={duration}
                    maximumTrackTintColor={__IOS__?'rgba(255,255,255,.5)':$.COLORS.mainColor}
                    minimumTrackTintColor={__IOS__?$.COLORS.mainColor:'rgba(255,255,255,.5)'}
                    thumbTintColor='#fff'
                    thumbImage={require('../../img/thumbImage.png')}
                />
                <Text style={styles.videotime}>{moment.utc(showEndTime*1000).format("HH:mm:ss")}</Text>
                <View style={[!isFull&&styles.videoTextActive]}>{actionBar}</View>
                <Touchable
                    onPress={setFullScreen}
                    style={styles.videobtn}
                >
                    <Icon name={isFull?'fullscreen-exit':'fullscreen'} size={24} color='#fff' />
                </Touchable>
            </View>
        )
    }
}

@observer
class TipView extends PureComponent {
    Icon = () => {
        const { data,type } = this.props;
        const pos = Math.ceil(data*(type.length-1));
        return type[pos];
    }
    render(){
        const { data,isSet } = this.props;
        return (
            <View style={[styles.actionicon,!isSet&&{opacity:0}]}>
                <Icon name={this.Icon()} size={30} color='#fff' />
                <Text style={styles.actiontext}>{ Math.ceil(data*100)+'%' }</Text>
            </View>
        )
    }
}

@observer
export default class extends PureComponent {

    @observable isFull;
    @observable _isSet = false;
    @observable _isSetBright = false;
    @observable _isSetVolumn = false;
    @observable _currentTime = 0;
    @observable _currentBrightness = 0;
    @observable _currentVolume = 0;

    constructor(props) {
        super(props);
        this.state = {
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            isChange:true,
            isBuffering:true,
            isShowBar:true,
        };
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    onLoad = (data) => {
        //console.warn('onLoad')
        this.onShowBar();
        const { durationTV=0, shiftProgress=0 } = this.props;
        this.setState({
            duration: durationTV >0 ? durationTV : data.duration,
            paused:false
        });
    };

    onPlay = () => {
        this.onShowBar();
        this.setState({ paused: !this.state.paused });
    }

    onPause = () => {
        this.setState({ paused: true });
    }

    onProgress = (data) => {
        const { shiftProgress=0 } = this.props;
        const currentTime = data.currentTime + shiftProgress;
        if(this.state.isChange){
            this.setState({ currentTime: currentTime});
        }
        if(currentTime >= this.state.duration){
            this.onEnd();
        }
    };

    onEnd = () => {
        const {endFilter} = this.props;
        if(endFilter && endFilter()){
            return;//ignore
        }
        this.setState({ paused: true,currentTime:0 });
        this.video.seek(0);
    };

    onSeek = (value,isChange) => {
        this.onShowBar();
        const {seekFilter} = this.props;
        this.setState({
            isChange: isChange
        });
        if(seekFilter && seekFilter(value, isChange)){
            return;//ignore
        }
        this.setState({
            currentTime: value,
        });
        if(isChange){
            this.video.seek(value);
        }
    }

    onLoadStart = () => {
        //console.warn('onLoadStart')
    }

    onReady = () => {
        // this.setState({
        //     isBuffering:false
        // })
    }

    onError = () => {
        console.warn('onError')
    }

    onTimedMetadata = () => {
        //console.warn('onTimedMetadata')
    }

    onBuffer = (event) => {
        this.setState({
            isBuffering:event.isBuffering
        })
    }

    onPlaybackStalled = (event) => {
        // this.setState({
        //     isBuffering:true
        // })
    }
    onPlaybackResume = (event) => {
        // this.setState({
        //     isBuffering:false
        // })
    }

    onHideBar = (bool) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            isShowBar:bool
        })
    }

    onShowBar = () => {
        this.timer&&clearTimeout(this.timer);
        this.onHideBar(true);
        this.timer = setTimeout(()=>{
            this.onHideBar(false);
        },5000)
    }

    onPanResponderGrant = (evt, gestureState) => {
        this.$currentTime = this.state.currentTime;
        this._duration = this.state.duration;
        this.$currentBrightness = systemSetting.brightness;
        this.$currentVolume = systemSetting.volume;
        this.$isMoved = false;
    }

    onPanResponderMove = (evt, gestureState) => {

        if(Math.abs(gestureState.dx)>20||Math.abs(gestureState.dy)>20){
            !this.$isMoved&&(this.$isMoved = true);
        }
        
        if(Math.abs(gestureState.dx)>20){
            this._isSet = true;
        }

        if(Math.abs(gestureState.dy)>20&&gestureState.x0<$.WIDTH/2){
            this._isSetBright = true;
        }

        if(Math.abs(gestureState.dy)>20&&gestureState.x0>$.WIDTH/2){
            this._isSetVolumn = true;
        }

        //进度
        if(this._isSet&&Math.abs(gestureState.dy)<20){
            let current = this.$currentTime+gestureState.dx*.2;
            if(current < 0){
                current = 0;
            }
            if(current > this._duration){
                current = this._duration;
            }
            this._currentTime = current;
        }else{
            this._isSet = false;
        }
        
        //亮度
        if(this._isSetBright&&Math.abs(gestureState.dx)<20){
            systemSetting.changeScreenModeToManual();
            let currentBrightness = this.$currentBrightness-gestureState.dy*.005;
            if(currentBrightness < 0){
                currentBrightness = 0;
            }
            if(currentBrightness > 1){
                currentBrightness = 1;
            }
            systemSetting.brightness = currentBrightness;
            this._currentBrightness = currentBrightness;
        }else{
            this._isSetBright = false;
        }

        //音量
        if(this._isSetVolumn&&Math.abs(gestureState.dx)<20){
            let currentVolume = this.$currentVolume-gestureState.dy*.005;
            if(currentVolume < 0){
                currentVolume = 0;
            }
            if(currentVolume > 1){
                currentVolume = 1;
            }
            systemSetting.volume = currentVolume;
            this._currentVolume = currentVolume;
        }else{
            this._isSetVolumn = false;
        }

    }

    onPanResponderRelease = (evt, gestureState) => {
        if(this._isSet){
            this._isSet = false;
            this.setState({currentTime: this._currentTime});
            this.onSeek(this._currentTime, true);
            // this.video.seek(_currentTime);
        }
        if(this._isSetBright){
            this._isSetBright = false;
        }
        if(this._isSetVolumn){
            this._isSetVolumn = false;
        }
        if(!this.$isMoved){
            const {isShowBar} = this.state;
            if(isShowBar){
                this.timer&&clearTimeout(this.timer);
                this.onHideBar(false);
            }else{
                this.onShowBar();
            }
        }
    }

    componentDidMount(){
        systemSetting.saveBright();
        this.timer&&clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.onHideBar(false);
        },5000)
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: this.onPanResponderRelease,
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return false;
            },
        });
    }

    componentWillUnmount(){
        systemSetting.restoreBright();
        this.timer&&clearTimeout(this.timer);
    }

    @action
    setFullScreen = () => {
        if(this.isFull){
            Orientation.lockToPortrait();
        }else{
            Orientation.lockToLandscape();
        }
        this.isFull = !this.isFull;
    }

    render() {
        const {paused,currentTime,duration,isBuffering,isShowBar} = this.state;
        const {playUri,style,handleBack,shiftTime=0,title='',onSection,actionBar} = this.props;
        return (
            <View style={[styles.container,style,this.isFull?styles.fullScreen:{height:$.WIDTH*9/16}]}>
                <StatusBar hidden={this.isFull&&!isShowBar} />
                <Video
                    ref={(ref) => { this.video = ref }}
                    source={{ uri: playUri }}
                    resizeMode="contain"
                    style={styles.fullScreen}
                    playInBackground={false}
                    paused={paused}
                    onLoadStart={this.onLoadStart}
                    onBuffer={this.onBuffer}
                    onLoad={this.onLoad}
                    onPlaybackStalled={this.onPlaybackStalled}
                    onPlaybackResume={this.onPlaybackResume}
                    onTimedMetadata={this.onTimedMetadata}
                    onReadyForDisplay={this.onReady}
                    onProgress={this.onProgress}
                    onError={this.onError}
                    onEnd={this.onEnd}
                    repeat={false}
                />
                <ActivityIndicator color='#fff' size='small' style={ !isBuffering&&{opacity:0}} />
                <Text style={[styles.showTime,!this._isSet&&{opacity:0}]}>
                    <Text style={{color:$.COLORS.mainColor}}>{moment.utc((this._currentTime + shiftTime)*1000).format("HH:mm:ss")}</Text>
                    /{moment.utc((duration + shiftTime)*1000).format("HH:mm:ss")}
                </Text>
                <TipView data={this._currentBrightness} type={['brightness-5','brightness-4','brightness-6','brightness-7']} isSet={this._isSetBright} />
                <TipView data={this._currentVolume} type={['volume-off','volume-mute','volume-down','volume-up']} isSet={this._isSetVolumn} />
                <View {...this._panResponder.panHandlers} style={[styles.fullScreen,{zIndex:5}]}></View>
                <View style={[styles.videoTop,{top:this.isFull?$.STATUS_HEIGHT:0},!isShowBar&&{top:-50}]}>
                    <TouchableOpacity onPress={handleBack} style={styles.back} activeOpacity={.8}>
                        <Icon name='keyboard-arrow-left' size={30} color='#fff'/>
                    </TouchableOpacity>
                    <Text style={[styles.videoTitle,!this.isFull&&{opacity:0}]}>{title}</Text>
                </View>
                <VideoBar
                    paused={paused}
                    isShow={isShowBar}
                    shiftTime={shiftTime}
                    currentTime={currentTime}
                    duration={duration}
                    onSeek={this.onSeek}
                    onPlay={this.onPlay}
                    isFull={this.isFull}
                    onSection={onSection}
                    actionBar={actionBar}
                    setFullScreen={this.setFullScreen}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left:0,
        right:0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        zIndex:10,
        overflow: 'hidden',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    videobar:{
        position: 'absolute',
        zIndex:10,
        left: 0,
        bottom: 0,
        right: 0,
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,.5)'
    },
    videobtn:{
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoslider:{
        flex:1,
    },
    videotime:{
        fontSize:12,
        color:'#fff'
    },
    videoTop:{
        position:'absolute',
        left:0,
        right:0,
        height: 50,
        zIndex: 10,
        flexDirection:'row',
        alignItems: 'center',
    },
    back:{
        width: 50,
        height: 50,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0)',
    },
    videoTitle:{
        flex:1,
        fontSize:16,
        color:'#fff',
        backgroundColor:'rgba(0,0,0,0)'
    },
    showTime:{
        position: 'absolute',
        zIndex:4,
        backgroundColor:'rgba(0,0,0,.8)',
        color:'#fff',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:3
    },
    actionicon:{
        position: 'absolute',
        zIndex:4,
        width:80,
        height:80,
        borderRadius:5,
        backgroundColor:'rgba(0,0,0,.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actiontext:{
        marginTop:5,
        fontSize:14,
        color:'#fff'
    },
    videoTextActive:{
        width:0,
        paddingHorizontal:0
    },
});
