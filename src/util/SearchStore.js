import { observable,action,computed} from 'mobx';
class SearchStore {
    @observable
    list=[];

    @computed
    get size(){
        return this.list.length;
    };

    @computed
    get latest(){
        return this.list.reverse();
    };

    constructor(){
        storage.load({
            key:'SearchHistory'
        })
        .then(data=>{
            this.list = data;
        })
    }

    @action
    onclear = () => {
        this.list.clear();
    }

    @action
    add = (value) => {
        const index =  this.list.findIndex((item)=>item===value);
        if(index>=0){
            this.list.splice(index,1)
        }
        this.list.push(value);
    }
}

let Store = new SearchStore();
module.exports = Store;
