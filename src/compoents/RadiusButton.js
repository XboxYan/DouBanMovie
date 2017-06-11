import React, {
   Component,
   PropTypes,
  } from 'react';

import {
  StyleSheet,
  PixelRatio,
  Text,
  View,
  TouchableHighlight,
  Platform,
} from 'react-native';

class RadiusButton extends Component {

  static propTypes = {
    btnName:PropTypes.string,
    textStyle:Text.propTypes.style,
    btnStyle:TouchableHighlight.propTypes.style,
    underlayColor:TouchableHighlight.propTypes.underlayColor
  };

  static defaultProps = {
    btnName: 'Button',
    underlayColor: '#ffffff'
  };


  render() {
    return (
      <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
          <TouchableHighlight
              underlayColor={this.props.underlayColor}
              activeOpacity={0.5}
              style={[styles.btnDefaultStyle,this.props.btnDefined]}
              onPress={this.props.onPress}>
              <Text style={[styles.textDefaultStyle, this.props.textStyle]}>{this.props.btnName}</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnDefaultStyle: {
    justifyContent:'center',
    alignItems: 'center',
    flex:1,
    height:45,
    backgroundColor: 'orange',
    borderColor: '#ff8447',
    borderRadius: 5
    // borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
  },
  textDefaultStyle: {
    fontSize: 17,
    color: '#ffffff',
  },
});

module.exports = RadiusButton;