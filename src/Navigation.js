/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Category from './pages/Category';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Register from './pages/Register';
import Splash from './pages/Splash';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Product from './pages/Product';
import SearchResultScreen from './pages/SearchResultScreen';
import Transaction from './pages/Transaction';

// import oldProduct from './pages/Product.old';

class Navigation extends Component {
  render() {
    return <AppContainer />;
  }
}
//////////////////////

const HomeTabNavigator = createBottomTabNavigator(
  {
    Category: {
      screen: Category,
      navigationOptions: {
        tabBarLabel: () => (
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 5,
            }}>
            Browse
          </Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Entypo name="folder-music" color={tintColor} size={25} />
        ),
      },
    },
    Wishlist: {
      screen: Wishlist,
      navigationOptions: {
        tabBarLabel: () => (
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 5,
            }}>
            Wishlist
          </Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Entypo name="heart-outlined" color={tintColor} size={25} />
        ),
      },
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarLabel: () => (
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 5,
            }}>
            Cart
          </Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <AntDesign name="shoppingcart" color={tintColor} size={25} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: () => (
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 5,
            }}>
            Profile
          </Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <AntDesign name="user" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        color: 'black',
        height: 60,
      },
      activeTintColor: '#f5d372',
    },
  },
);
///////////////////////////

const AppStacknavigator = createStackNavigator({
  Splash: {
    screen: Splash,

    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Product: {
    screen: Product,
    navigationOptions: {
      title: `Choose Product`,
    },
  },

  Detail: {
    screen: Detail,

    navigationOptions: {
      title: `Detail`,
    },
  },

  Wishlist: {
    screen: Wishlist,
    navigationOptions: {
      header: null,
    },
  },
  Category: {
    screen: HomeTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  SearchResultScreen: {
    screen: SearchResultScreen,
  },
  Transaction: {
    screen: Transaction,
  },
});
const AppContainer = createAppContainer(AppStacknavigator);
export default Navigation;

// export default createAppContainer(BottomTabs);
