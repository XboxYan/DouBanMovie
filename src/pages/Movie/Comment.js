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
import CommentList from '../../compoents/CommentList';

@observer
export default class Comment extends PureComponent {

    page = 1;

    id = '';

    @observable isRender = false;

    @observable pageSize = 30;

    @observable data = [];

    @observable total = 0;

    @computed get isEnding(){
        return this.data.length >= this.total;
    }

    componentDidMount() {
        const { params:{id,total} } = this.props.navigation.state;
        this.id = id;
        this.total = total;
        this.getData();
    }

    @action
    getData = () => {
        fetchData('get_comments', {
            headers:{
                'User-Agent':'api-client/1 com.douban.frodo/4.9.0(88) Android/25 cm_victara motorola XT1085  rom:android'
            },
            par: {
                id: this.id,
				count:this.pageSize,
				start:(this.page-1)*this.pageSize,
            }
        },
            (data)=>{
				this.isRender = true;
                this.data = [...this.data,...data.interests];
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
                <Appbar navigation={navigation} title={`全部${this.total}条热评`} />
                <CommentList 
					style={styles.commentview}
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
    },
	commentview:{
		backgroundColor:'#fff',
		padding:10
	}
})