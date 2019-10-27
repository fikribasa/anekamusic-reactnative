/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Cover from '../assets/cover.jpg';
import Logo from '../assets/logo.png';
export default class Home extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../assets/cover.jpg')}>
        <Image
          source={require('../assets/logo.png')}
          style={{
            width: 240,
            height: 100,
            marginTop: 80,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontWeight: '900',
            marginTop: 10,
            fontFamily: 'CoChin',
          }}>
          {' '}
          Express Your Music{' '}
        </Text>

        <View
          style={{
            position: 'absolute',
            bottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Category')}
            style={{
              padding: 10,
              width: '80%',
              bottom: 60,
              position: 'absolute',
              alignItems: 'center',
              backgroundColor: 'white',
              opacity: 0.8,
            }}>
            <Text>Start Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text
              style={{
                marginTop: 8,
                fontSize: 16,
                fontWeight: '300',
                color: 'white',
                alignItems: 'center',
              }}>
              Already Have Account? {'\n'}Sign In Now{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
});
