import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Button} from 'react-native-elements';

import {logout} from '../public/redux/actions/user';
import {resetWishlist} from '../public/redux/actions/wishlist';
import {resetCart} from '../public/redux/actions/cart';

import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {
  state = {
    profile: [],
    // user: {
    //   id: '',
    //   name: '',
    //   email: '',
    // },

    userName: '',
    userEmail: '',
    token: '',
    header: '',
  };

  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(value => {
      if (value !== null) {
        value = parseInt(value);
        this.setState({
          user: {...this.state.user},
        });
      }
    });
    await AsyncStorage.getItem('userName').then(value => {
      if (value !== null) {
        this.setState({
          userName: value,
        });
      }
    });
    await AsyncStorage.getItem('userEmail').then(value => {
      if (value !== null) {
        this.setState({
          userEmail: value,
        });
      }
    });
    await AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        this.setState({token: value});
      }
    });

    const header = {headers: {authorization: 'Bearer ' + this.state.token}};
    this.setState({header: header});
  };

  login = () => {
    this.props.navigation.navigate('Login');
  };
  logout = () => {
    AsyncStorage.removeItem('userName');
    AsyncStorage.removeItem('id');
    AsyncStorage.removeItem('userEmail');
    AsyncStorage.removeItem('token');
    this.props.dispatch(logout());
    this.props.dispatch(resetWishlist());
    this.props.dispatch(resetCart());
    this.props.navigation.navigate('Category');
    alert('Logout Success');
  };

  _toastWithDurationGravityOffsetHandler = () => {
    //function to make Toast With Duration, Gravity And Offset
    ToastAndroid.showWithGravityAndOffset(
      'Hi I am Toast with garavity and offset',
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50, //yOffset
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {console.log('user', this.props.user.name)}
        <View style={{}}>
          <Image
            source={require('../assets/avatar.png')}
            style={{
              width: 120,
              height: 120,
              marginTop: 80,
              marginBottom: 10,
              backgroundColor: 'blue',
              borderRadius: 50,
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: '#c9c9c9',
            height: 7,
            marginVertical: 10,
            width: '90%',
          }}></View>

        <Text style={{fontSize: 30, fontWeight: '600'}}>
          {this.state.userName}
        </Text>
        <Text style={{fontSize: 20, fontWeight: '400', color: '#8a7f79'}}>
          {this.state.userEmail}
        </Text>

        <View
          style={{
            backgroundColor: '#c9c9c9',
            height: 7,
            marginVertical: 10,
            width: '90%',
          }}></View>

        <View style={styles.bar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Transaction')}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text> History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Wishlist')}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text> WishList</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Cart')}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text> Cart</Text>
          </TouchableOpacity>
        </View>

        {!this.state.token ? (
          <View style={{position: 'absolute', bottom: 10}}>
            <Button title="Login" onPress={this.login} />
          </View>
        ) : (
          <View style={{position: 'absolute', bottom: 10}}>
            <Button
              buttonStyle={{backgroundColor: '#FF0000'}}
              title="Logout"
              onPress={this.logout}
            />
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}

export default withNavigation(connect(mapStateToProps)(Profile));

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  bar: {
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: '#F7DC6F',
    marginHorizontal: '4%',
    padding: 10,
  },
  button: {
    marginTop: 30,
    flexDirection: 'row',
    marginHorizontal: '4%',
    padding: 10,
    bottom: 10,
  },
});
