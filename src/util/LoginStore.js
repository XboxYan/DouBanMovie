import { observable,action,computed} from 'mobx';
class LoginStore {
    @observable
    loginState=false;

    @observable
    userInfo=null;

    @action
    setState = (loginState) => {
        this.loginState = loginState
    }

    @action
    setUserInfo = (userInfo) => {
        this.userInfo = userInfo
    }

    @computed get userCode(){
        return this.userInfo ? this.userInfo.userCode : '';
    }

    @computed get hasLogined(){
        return !!this.userInfo;
    }
}

let Store = new LoginStore();
module.exports = Store;
