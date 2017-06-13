/**
 * Loading
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import _ from '../theme';
import { observer } from 'mobx-react/native';

@observer
export default class Loading extends Component {
  render(){
      const {height,size,color=_.Color,text='正在加载...',textColor='#666'} = this.props;
      return(
          <View style={[styles.content,height&&{height:height}]}>
            <ActivityIndicator color={color} size={size||'large'} />
            <Text style={[styles.loadtext,{color:textColor}]}>{text}</Text>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  content: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  loadtext:{
    fontSize:12,
    marginTop:10,
  }
});
