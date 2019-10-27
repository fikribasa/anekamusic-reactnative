import React, {Component} from 'react';

import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import {logout} from '../public/redux/actions/user';
import {resetWishlist} from '../public/redux/actions/wishlist';
import {resetCart} from '../public/redux/actions/cart';

import {connect} from 'react-redux';

class LogoutButton extends Component {
  logout = () => {
    this.props.resetID();
    AsyncStorage.removeItem('userName');
    AsyncStorage.removeItem('id');
    AsyncStorage.removeItem('userEmail');
    AsyncStorage.removeItem('token');
    this.props.dispatch(logout());
    this.props.dispatch(resetWishlist());
    this.props.dispatch(resetCart());
    this.props.navigation.navigate('CategoryScreen');
    alert('Logout Success');
  };

  render() {
    return (
      <Button
        raised
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          margin: 5,
          color: 'red',
        }}
        onPress={this.logout}
      />
    );
  }
}

export default withNavigation(connect()(LogoutButton));
