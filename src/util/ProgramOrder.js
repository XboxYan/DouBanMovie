/* @flow */

import { observable,action,computed,autorun} from 'mobx';
import moment from 'moment';
import notification from '../Notification';

import fetchData from './Fetch';



class ProgramOrder {
    //orderId和programId分别索引一次
    @observable programsOidMap = new Map();//key:orderId  value:program;
    @observable programsPidMap = new Map();//key:programId  value:program;

    @observable time = moment();

    constructor(){
        this.refresh();
    }

    // 预约状态的节目单
    @computed get orderPrograms(){
        return this.programsOidMap.values().filter((prog)=>this.time.diff(moment(prog.startTime)) < 0).sort((a, b) => a.startTime > b.startTime);
    }

    //过期的节目单（已经过了预约时间的
    @computed get outDateProgram(){
        return this.programsOidMap.values().filter((prog)=>this.time.diff(moment(prog.startTime)) > 0).sort((a, b) => a.startTime < b.startTime);
    }

    //最近的一次预约时间（毫秒）
    @computed get nextOrderTime(){
        if(this.orderPrograms.length > 0){
            return moment(this.orderPrograms[0].startTime).diff(this.time);
        }
        return 0;
    }

    deleteByProgram(program:Object){
        const orderId = program.orderId ? program.orderId : this.programsPidMap.get(program.programId).orderId;
        return this.delete(orderId);
    }

    @action
    delete(orderId:String){
        fetchData('DelProgramOrder',{
            par:{
                orderId: orderId
            }
        },(data)=>{
            if(data.success){
                const program = this.programsOidMap.get(orderId);
                if(program){
                    this.programsOidMap.delete(orderId);
                    this.programsPidMap.delete(program.programId);
                }
            }
  		})
    }

    add(program:Object){
        return fetchData('AddProgramOrder',{
            par:{
                programId: program.programId
            }
        },(data)=>{
            data.success=1;
            if(data.success){
                program.orderId = data.programList[0]?data.programList[0].orderId:'111111';
                if(program.startDateTime && !program.startTime ){
                    program.startTime = moment(program.startDateTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
                }
                this._addOrderInfo(program);
            }
  		})
    }

    hasOrdered(programId:String){
        return this.programsPidMap.has(programId);
    }

    trigger(program:Object){
        return this.hasOrdered(program.programId) ? this.deleteByProgram(program) : this.add(program);
    }

    @action
    refresh(){
        fetchData('GetProgramOrder',{},(data)=>{
            const datas = data.programList ? data.programList : [];
            this.programsOidMap.clear();
            this.programsPidMap.clear();
            datas.forEach((program) => {
                this._addOrderInfo(program)
            })
            this._updateTime();

            autorun(()=>{
                if(this.orderPrograms.length > 0){
                    const program = this.orderPrograms[0];
                    notification.sendLocalNotification(program);
                }
            })
  		})
    }

    @action
    _addOrderInfo(program){
        this.programsOidMap.set(program.orderId, program)
        this.programsPidMap.set(program.programId, program)
    }

    @action
    _updateTime(){
        this.timer && clearTimeout(this.timer);
        if(this.nextOrderTime > 0){
            this.timer = setTimeout(()=>{
                this.time = this.time(moment());
            }, this.nextOrderTime);
        }
    }
}

const programOrder = new ProgramOrder();

module.exports = programOrder;
