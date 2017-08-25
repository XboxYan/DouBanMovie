/*
*
Search
*
*/

import React, { PureComponent } from 'react';
import {
    Text,
    Button,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    BackHandler,
    UIManager,
    FlatList,
    LayoutAnimation,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react/native';
import _ from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Touchable from '../../compoents/Touchable';
import Loading from '../../compoents/Loading';
import LoadView from '../../compoents/LoadView';
import Star from '../../compoents/Star';
import AnimatedView from '../../compoents/AnimatedView';
import SearchStore from '../../util/SearchStore';
import fetchData from '../../util/Fetch';

const MovieEmpty = () => (
	<View style={styles.content}>
		<Text>没有找到影片！</Text>
	</View>
)

class MovieItem extends PureComponent {
	onSearch = () => {
        const { navigation, keyworads } = this.props;
        navigation.navigate('MovieDetail',{movieId:this.props.item.movieId})
		//navigator.push({ name: VideoContentView, item: this.props.item });
	}
	render() {
		const { item } = this.props;
		return (
			<Touchable
				onPress={this.onSearch}
				style={styles.movieitem}>
				<Image
					style={styles.movieimg}
					defaultSourceStyle={styles.movieimg}
					source={{ uri: item.img }}
				/>
				<View style={styles.movietext}>
                    <Text numberOfLines={1} style={styles.moviename}>{item.name}</Text>
                    <Star score={item.score} isShowNum={false} />
                    <Text style={styles.status}>{item.status||'无'}</Text>
                    <Text style={styles.lastUpdateTime}>{item.lastUpdateTime}</Text>
                    <Text style={styles.movieType}>{item.movieTypeName}</Text>
				</View>
			</Touchable>
		)
	}
}

@observer
class SearchResult extends PureComponent {
    pageIndex = 1;

	@observable isRender = false;

	@observable searchwords = '';

	@observable pageSize = 10;

    @observable data = [];
    
    @observable currentPage = [];

	@observable isRender = false;


	@computed get isEnding() {
		return this.currentPage.length < this.pageSize;
    }
    
    @computed get totalResults() {
        return this.data.length;
    }

	renderItem = ({ item, index }) => {
		return <MovieItem item={item} keyworads={this.searchwords} navigation={this.props.navigation} />
	}
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.searchwords != this.props.searchwords) {
			this.isRender = false;
			this.pageIndex = 1;
			this.data = [];
			this.searchwords = nextProps.searchwords;
			this.getData();
		}
	}

	componentDidMount() {
		const { searchwords } = this.props;
		this.searchwords = searchwords;
		this.getData();
	}

    @action
	getData = () => {
		fetchData('search', {
			par: {
				page:this.pageIndex,
				keywords: this.searchwords,
				pageSize: this.pageSize
			}
		}, (data) => {
            this.data = [...this.data, ...data.body];
            this.currentPage = data.body;
			this.isRender = true;
		})
	}
    @action
	loadMore = () => {
		if (!this.isEnding) {
			this.pageIndex = this.pageIndex + 1;
			this.getData();
		}
	}

	renderFooter = () => {
		if (this.totalResults > 0) {
			return <LoadView isEnding={this.isEnding} />;
		} else {
			return <MovieEmpty />;
		}
	}
    render(){
        if (!this.isRender) {
			return <Loading size='small' text='正在努力搜索中...' />
		}
        return (
            <FlatList
				style={styles.content}
				numColumns={1}
				ListFooterComponent={this.renderFooter}
				data={this.data}
				onEndReached={this.loadMore}
                onEndReachedThreshold={0.1}
                getItemLayout={(data, index) => ( {length: 140, offset: 140 * index, index} )}
				keyExtractor={(item, index) => 'key' + item.movieId}
				renderItem={this.renderItem}
			/>
        )
    }
}

const SortTitle = observer((props) => (
    <View style={[styles.view_hd, { borderColor: _.Color }]}>
        <Text style={styles.view_title}>{props.title}</Text>
        {
            props.children || null
        }
    </View>
))

@observer
class SearchHistory extends PureComponent {

    componentWillUpdate(){
        LayoutAnimation.easeInEaseOut();
    }

    onClear(){
        SearchStore.onclear();
    }

    render(){
        const {onSubmit} = this.props;
        return(
            <AnimatedView style={styles.search_h}>
                <SortTitle title='搜索历史'>
                    {
                        SearchStore.size>0&&<TouchableOpacity onPress={this.onClear} style={styles.search_h_clear}><Text style={styles.search_h_text}>清空</Text></TouchableOpacity>
                    }
                </SortTitle>
                {
                    SearchStore.size===0?
                    <Text style={styles.search_h_null}>暂无历史记录~</Text>:
                    <View style={styles.search_h_list}>
                    {
                        SearchStore.latest.map((el,i)=>(
                            <TouchableOpacity
                                onPress={()=>onSubmit(el)}
                                key={'key'+i} 
                                style={styles.search_h_item}
                            >
                                <Text numberOfLines={1} style={styles.search_h_el}>{el}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    </View>
                }          
            </AnimatedView>
        )
    }
}

const SearchCon = (props) => (
    <ScrollView style={styles.content}>
        <SearchHistory onSubmit={props.onSubmit}/>
        {
            //<SearchHot onSubmit={props.onSubmit} keywords={props.keywords} keywordsisRender={props.keywordsisRender}/>
        }
    </ScrollView>
)

@observer
export default class Search extends PureComponent {
    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    @observable text = '';

    @observable searchwords = '';
    
    @observable isSearch = false;

    @computed get isEmpty(){
        return this.text.length === 0;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBack); 
		storage.save({
			key: 'SearchHistory',
			data: SearchStore.list,
			expires: null
		});
    }
    
    onSubmit = () => {
        this.onSearch(this.text);
    }

    onSet = (text) => {
        this.text = text;
        this.onSearch(text);
    }

    onSearch = (value) => {
        if(value){
            SearchStore.add(value);
            this.isSearch = true;
            this.searchwords = value;
        }else{
            ToastAndroid.show('请输入内容!', ToastAndroid.SHORT);
        }
    }

    onEdit = (text) => {
        this.text = text;
        if(this.isEmpty){
            this.isSearch = false;
        }
    }

    goBack = () => {
		const { navigation } = this.props;
		navigation.goBack();
    }
    
    onBack = () => {
        const {navigation} = this.props;
        if(!this.isEmpty){
            this.text = '';
            this.isSearch = false;
            return true;
        }else{
            navigation.goBack();
            return true;
        }      
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={[styles.top, { backgroundColor: _.Color }]}>
                    <Touchable
                        style={styles.btn}
                        onPress={this.goBack}
                    >
                        <Icon name='keyboard-arrow-left' size={30} color='#fff' />
                    </Touchable>
                    <TextInput
                        style={styles.searchtext}
                        value={this.text}
                        selectionColor={_.Color}
                        underlineColorAndroid='transparent'
                        onSubmitEditing={this.onSubmit}
                        onChangeText={this.onEdit}
                        placeholder='搜索导演、影片、演员、类型'
                        returnKeyLabel='搜索'
                        placeholderTextColor='#909090'
                    />
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={[styles.btn, styles.searchbtn]}
                        onPress={this.onSubmit}
                    >
                        <Text style={styles.searchbtntext}>搜索</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.isSearch ?
                        <SearchResult navigation={this.props.navigation} searchwords={this.searchwords} />
                        :
                        <SearchCon onSubmit={this.onSet} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    top: {
        paddingTop: $.STATUS_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        width: 48,
        height: 48,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchbtn: {
        marginRight: 5,
    },
    searchbtntext: {
        color: '#fff',
        fontSize: 16
    },
    searchtext: {
        flex: 1,
        height: 36,
        borderRadius: 3,
        marginHorizontal: 5,
        paddingVertical: 0,
        fontSize: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cancel: {
		height: 48,
        paddingRight:10,
		justifyContent: 'center',
		alignItems: 'center',
	},
    canceltext:{
        fontSize:16,
        color:'#474747'
    },
    search_h:{
        backgroundColor:'#fff',
        padding:10,
    },
    search_h_top:{
        flexDirection:'row',
        alignItems:'center',
        height:30
    },
    search_h_title:{
        flex:1,
        fontSize:13,
        color:'#9b9b9b',
    },
    search_h_clear:{
        height:30,
        justifyContent: 'center',
		alignItems: 'center',
    },
    search_h_text:{
        fontSize:14,
        color:'#474747'
    },
    search_h_list:{
        paddingTop:10,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    search_h_item:{
        backgroundColor: '#f1f1f1',
        height: 30,
        paddingHorizontal: 15,
        borderRadius: 15,
        justifyContent: 'center',
        marginRight: 10,
        marginBottom: 10
    },
    search_h_el:{
        maxWidth:120,
        fontSize:14,
        color: '#666'
    },
    search_h_null:{
        textAlign:'center',
        color:'#909090',
        fontSize:14,
        padding:10
    },
    view_hd: {
        height: 15,
        borderLeftWidth: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginVertical: 10,
    },
    view_title: {
        fontSize: 15,
        color: '#333',
        flex: 1
    },
    movieitem: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		padding: 10,
		//borderBottomWidth: 1,
		borderColor: '#ececec',
	},
	movieimg: {
		width: 85,
        height: 120,
        borderRadius:3,
        backgroundColor:'#f1f1f1',
		resizeMode: 'cover'
	},
	movietext: {
		flex: 1,
		marginLeft: 15
	},
	moviename: {
		fontSize: 16,
        color: '#474747',
        marginBottom:3
    },
    status: {
        fontSize: 10,
        paddingHorizontal: 5,
        marginVertical: 5,
        paddingVertical: 1,
        borderRadius: 1,
        alignSelf: 'flex-start',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,.4)'
    },
    lastUpdateTime:{
        fontStyle:'italic',
        color:'#666',
        fontSize:14,
    },
    movieType:{
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 15,
        paddingVertical:5,
        alignSelf: 'flex-start',
        borderRadius: 15,
        fontSize:14,
        color:'#666',
        marginVertical:5
    }
})