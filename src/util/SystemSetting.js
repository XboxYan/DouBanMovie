import {NativeModules} from 'react-native'
import {PureComponent} from 'react';
import { observable, action, computed, autorun} from 'mobx';

const SystemSettingNative = NativeModules.SystemSetting;

// 使用mobx实现
// 已经在Global.js中实例化了一个，使用时，直接systemSetting.brightness=0.34即可实现亮度调节
// 同时提供saveBright()和restoreBright()实现亮度恢复功能
// 音量使用与brightness一样
export default class SystemSetting{
    @observable brightness;
    @observable volume;
    saveBri = 0 ;
    inited = false;

    async init(){
        if(!this.inited){
            const val = await SystemSettingNative.getBrightness();
            this.saveBri = val;
            this.brightness = val;
            this.saveScreenMode = await SystemSettingNative.getScreenMode();

            autorun(() => {
                const val = this.brightness;
                if(this.inited){
                    this.brightness = this._validValue(val, 0, 1);
                    SystemSettingNative.setBrightness(this.brightness);
                }
            })

            this.volume = await SystemSettingNative.getVolume();

            autorun(() => {
                const val = this.volume;
                if(this.inited){
                    this.volume = this._validValue(val, 0, 1);
                    SystemSettingNative.setVolume(this.volume);
                }
            })
        }
        this.inited = true;
    }

    /** 保存当前亮度，配合restore()实现亮度恢复 */
    async saveBright(){
        this.saveScreenMode = await SystemSettingNative.getScreenMode();
        this.saveBri =  await SystemSettingNative.getBrightness();
    }

    /** 恢复亮度，恢复到最近一次调用save()时的亮度 */
    @action
    restoreBright(){
        this.brightness = this.saveBri;
        SystemSettingNative.setScreenMode(this.saveScreenMode);
    }

    changeScreenModeToManual(){
        SystemSettingNative.setScreenMode(0);
    }

    _validValue(val, floor, ceil){
        if(floor < ceil){
            return val < floor ? floor : ( val > ceil ? ceil : val);
        }
        return val;
    }
}
