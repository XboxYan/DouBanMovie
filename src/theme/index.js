import { observable,action} from 'mobx';
class Themes {
    @observable
    Color = 'dodgerblue';

    @action
    SetTheme = (color) => {
        this.Color = color;
    }
}

let Store = new Themes();
export default Store;
