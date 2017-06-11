/**
 * AppTop
 */

import React, { PureComponent,PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default class AppTop extends PureComponent {

  static PropTypes = {
    color:PropTypes.string,
    text:PropTypes.string,
  }

  static defaultProps = {
    text:'搜索'
  }

  render(){
    const {text} = this.props;
    return(
      <View style={styles.apptop}> 
          <TouchableOpacity activeOpacity={.8} style={styles.search}>
            <Image style={styles.searchbtn} source={require('../../img/icon_search.png')} />
            <Text style={styles.searchtext}>{text}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.8} style={styles.history}>
            <Image style={styles.historybtn} source={require('../../img/icon_remote.png')} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.8} style={styles.history}>
            <Image style={styles.historybtn} source={require('../../img/icon_history.png')} />
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  apptop:{
    paddingTop:$.STATUS_HEIGHT,
    alignItems: 'center',
    backgroundColor:'#fff',
    flexDirection:'row',
    paddingHorizontal:5,
  },
  search: {
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    height:30,
    backgroundColor:'#f2f2f2',
    marginHorizontal:20,
    paddingHorizontal:18,
    borderRadius:15,
  },
  searchtext:{
    fontSize:12,
    marginLeft:5,
    color:$.COLORS.subColor
  },
  searchbtn:{
    width:14,
    height:14
  },
  history:{
    width:40,
    height:40,
    justifyContent:'center',
    alignItems: 'center',
  },
  historybtn:{
    width:24,
    height:24
  }

});
