import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Footer extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          bottom: 0,
        }}>
        <Text style={{textAlign: 'center', fontSize: 20}}>©EasyShop 2019</Text>
      </View>
    );
  }
}
