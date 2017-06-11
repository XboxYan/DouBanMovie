/**
 * Loading
 */

import React, { PureComponent,PropTypes } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Loading extends PureComponent {

  static PropTypes = {
    color:PropTypes.string,
    text:PropTypes.string,
    textColor:PropTypes.string,
    height:PropTypes.number
  }

  static defaultProps = {
    text:'正在加载...',
    color:'red',
    textColor:'#666'
  }

  render(){
      const {height,size,color,text,textColor} = this.props;
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
    marginTop:10
  }

});
