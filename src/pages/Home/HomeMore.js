/*
*
HomeMore
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    Button,
    StyleSheet,
    View,
} from 'react-native';
import { observable, action, computed} from 'mobx';
import { observer } from 'mobx-react/native';
import fetchData from '../../util/Fetch';
import Appbar from '../../compoents/Appbar';
import MovieList from '../../compoents/MovieList';

@observer
export default class HomeMore extends PureComponent {

    page = 1;

    id = '';

    @observable isRender = false;

    @observable pageSize = 20;

    @observable data = [];

    @observable _data = [];

    @computed get isEnding(){
        return this._data.length < this.pageSize;
    }

    componentDidMount() {
        const { params:{id} } = this.props.navigation.state;
        this.id = id;
        this.getData();
    }

    @action
    getData = () => {
        fetchData('more_douban_topic_items',{
            par:{
                id:this.id,
                page:this.page,
                pageSize:this.pageSize
            }
        },
            (data)=>{
                this._data = data.body;
                this.data = [...this.data,...this._data];
                this.isRender = true;
            }
        )
    }

    @action
    loadMore = () => {
        if(!this.isEnding){
            this.page = this.page+1;
            this.getData();
        }
    }

    render() {
        const { navigation } = this.props;
        const { params } = navigation.state;
        return (
            <View style={styles.content}>
                <Appbar navigation={navigation} title={params.title} />
                <MovieList 
                    isRender={this.isRender} 
                    data={this.data} 
                    navigation={navigation} 
                    isEnding={this.isEnding}
                    onEndReached={this.loadMore}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:1
    }
})