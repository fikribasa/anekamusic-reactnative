/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import {Container, Icon, CardItem} from 'native-base';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {connect} from 'react-redux';
import {getItemDetails} from '../public/redux/actions/items';
import {getCart, addCart} from '../public/redux/actions/cart';
import {
  getWishlist,
  addWishlist,
  deleteWishlist,
} from '../public/redux/actions/wishlist';
import AsyncStorage from '@react-native-community/async-storage';

import {ScrollView} from 'react-native-gesture-handler';
import {Table, Row, Rows} from 'react-native-table-component';

class Product extends React.Component {
  state = {
    itemDetails: {},
    itemstock: [],
    cart: [],
    wishlist: [],
    isWishlisted: false,
    isAddedtoCart: false,
    id: '',
    user: {
      id: '',
      level: '',
    },
    token: '',
    header: '',

    tableHead: ['Branch', 'Price', 'Quantity', 'Order'],
    tableData: [],
  };

  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(value => {
      // console.log(value);
      if (value !== null) {
        value = parseInt(value);
        this.setState({user: {...this.state.user, id: value}});
      }
    });

    await AsyncStorage.getItem('userLevel').then(value => {
      console.log('val', value);
      if (value !== null) {
        value = parseInt(value);
        this.setState({user: {...this.state.user, level: value}});
      }
    });

    await AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        this.setState({token: value});
      }
    });

    const header = {headers: {authorization: 'Bearer ' + this.state.token}};
    this.setState({header: header});

    const {navigation} = this.props;
    const id = navigation.getParam('id');
    this.setState({id: id});

    await this.props.dispatch(getItemDetails(this.state.id));
    await this.setState({itemDetails: this.props.itemDetails});
    await this.setState({itemstock: this.state.itemDetails.itemstock});

    //wishlist//////////////////////////////////////////////////////////
    await this.props.dispatch(
      getWishlist(this.state.user.id, this.state.header),
    );
    await this.setState({wishlist: this.props.wishlist});
    this.state.wishlist.map(item => {
      if (this.state.id == item.id) {
        this.setState({isWishlisted: true});
      }
      return null;
    });

    //cart///////////////////////////////////////////////////////
    await this.props.dispatch(getCart(this.state.user.id, this.state.header));
    await this.setState({cart: this.props.cart});
  };

  //wishlist//////////////////////////////////////////////////////
  addRemoveWishlist = async (user, item, command) => {
    if (command == 'add') {
      await this.props.dispatch(addWishlist(user, item, this.state.header));
      await this.setState({
        wishlist: this.props.wishlist,
        isWishlisted: true,
      });
      await this._toastadd();
    } else if (command == 'remove') {
      await this.props.dispatch(deleteWishlist(user, item, this.state.header));
      await this.setState({
        wishlist: this.props.wishlist,
        isWishlisted: false,
      });
      await this._toastremove();
    }
  };

  ///////////////////Toast////////////
  _toastremove = () => {
    //function to make Toast With Duration, Gravity And Offset
    ToastAndroid.showWithGravityAndOffset(
      'Removed from Wishlist',
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50, //yOffset
    );
  };
  _toastadd = () => {
    //function to make Toast With Duration, Gravity And Offset
    ToastAndroid.showWithGravityAndOffset(
      'Added to Wishlist',
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50, //yOffset
    );
  };

  _toastcartalready = () => {
    //function to make Toast With Duration, Gravity And Offset
    ToastAndroid.showWithGravityAndOffset(
      'The Item is Already in The Cart List',
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50, //yOffset
    );
  };
  _toastcartadd = () => {
    //function to make Toast With Duration, Gravity And Offset
    ToastAndroid.showWithGravityAndOffset(
      'Added to Cart',
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50, //yOffset
    );
  };

  //cart///////////////////////////////////////////////////////////
  addToCart = async (user, itemID, item, branchID, branch, price, quantity) => {
    await this.state.cart.map(cartitem => {
      if (cartitem != undefined) {
        // eslint-disable-line
        if (item == cartitem.item && branch == cartitem.branch) {
          // eslint-disable-line
          this.setState({isAddedtoCart: true});
        }
      }
      return null;
    });

    if (!this.state.isAddedtoCart) {
      const data = {
        itemID,
        item,
        price,
        branchID,
        branch,
        quantity,
      };

      await this.props.dispatch(addCart(user, data, this.state.header));

      await this.setState({
        cart: this.props.cart,
        isAddedtoCart: true,
      });

      this._toastcartadd();
      //   alert('Item has been added to cart.');
    } else {
      this._toastcartalready();
      this.setState({isAddedtoCart: false});
    }
  };

  render() {
    const {name, image, description} = this.state.itemDetails;
    const itemStock = this.state.itemDetails.itemstock;
    return (
      <ScrollView>
        <Image
          source={{uri: `${image}`}}
          style={{
            width: null,
            height: 250,
            resizeMode: 'contain',
            marginVertical: 10,
          }}
        />

        <Text style={{textAlign: 'center', fontSize: 20, marginVertical: 5}}>
          {name}
        </Text>
        {/* ////////////////////////////////////////////// */}
        <Table
          style={{marginHorizontal: 16}}
          borderStyle={{
            borderWidth: 2,
            borderColor: '#c8e1ff',
          }}>
          <Row
            data={this.state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
        </Table>

        <FlatList
          style={{width: '100%'}}
          data={this.state.itemstock}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles.item}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Text style={{flex: 1}}>{item.branch} </Text>
                  <Text style={{flex: 1}}>{item.quantity} </Text>
                  <Text style={{flex: 1}}>
                    Rp.
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                  {this.state.user.level > 0 ? (
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => {
                        this.addToCart(
                          this.state.user.id,
                          this.state.id,
                          this.state.itemDetails.name,
                          item.branchID,
                          item.branch,
                          item.price,
                          1,
                        );
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          backgroundColor: 'orange',
                          borderRadius: 10,
                          padding: 5,
                        }}>
                        Cart
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            );
          }}
        />

        {/* ////////////////////////////////////////////////////// */}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 5,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              width: null,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'orange',
              borderRadius: 15,
              marginHorizontal: 5,
            }}>
            {this.state.user.level > 0 ? (
              this.state.isWishlisted ? (
                <AntDesign
                  name="heart"
                  color="red"
                  size={25}
                  onPress={() =>
                    this.addRemoveWishlist(
                      this.state.user.id,
                      this.state.id,
                      'remove',
                    )
                  }
                />
              ) : (
                <AntDesign
                  name="heart"
                  color="grey"
                  size={25}
                  onPress={() =>
                    this.addRemoveWishlist(
                      this.state.user.id,
                      this.state.id,
                      'add',
                    )
                  }
                />
              )
            ) : null}
          </TouchableOpacity>
        </View>

        <Text style={styles.titledesc}>Description</Text>
        <Text style={styles.desc}>{description}</Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
  },
  item: {
    backgroundColor: '#f9c2ff',
    // paddingVertical: 20,
    borderWidth: 3,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
  title: {
    fontSize: 32,
  },
  head: {
    backgroundColor: '#F06292',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titledesc: {
    flex: 1,
    fontSize: 19,
    color: 'grey',
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  desc: {fontSize: 16, color: 'black', marginVertical: 4, marginHorizontal: 10},
});

function mapStateToProps(state) {
  return {
    itemDetails: state.items.itemDetails,
    cart: state.cart.cart,
    wishlist: state.wishlist.wishlist,
    user: state.user.user,
  };
}

export default connect(mapStateToProps)(Product);
