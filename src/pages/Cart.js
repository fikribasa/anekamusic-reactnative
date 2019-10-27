import React, {Fragment} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
// import ItemCard from '../Components/ItemCard';

import {Card, CardItem, Body, Icon, Left, Right} from 'native-base';

// import FooterComponent from '../Components/FooterComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {
  getCart,
  editCart,
  deleteCart,
  clearCart,
} from '../public/redux/actions/cart';
import AsyncStorage from '@react-native-community/async-storage';

import {NavigationEvents} from 'react-navigation';

// import Cart from './Cart';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartList: [],
      user: {
        id: '',
        name: '',
        email: '',
      },
      token: '',
      header: '',
      total: 0,

      receipt: false,
    };
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(value => {
      // console.log(value);
      if (value !== null) {
        value = parseInt(value);
        this.setState({user: {...this.state.user, id: value}});
      }
    });

    await AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        this.setState({token: value});
      }
    });

    const header = {headers: {authorization: 'Bearer ' + this.state.token}};
    this.setState({header: header});

    await this.props.dispatch(getCart(this.state.user.id, this.state.header));
    await this.setState({cart: this.props.cart});
  };

  editQuantity = async (user, item, branch, quantity) => {
    const data = {
      item,
      branch,
      quantity,
    };
    if (quantity > 0) {
      await this.props.dispatch(editCart(user, data, this.state.header));
      await this.setState({cart: this.props.cart});
    } else {
      await this.props.dispatch(
        deleteCart(user, item, branch, this.state.header),
      );
      await this.setState({cart: this.props.cart});
    }
  };

  //count total price/////////////////////////////////////////////////
  total = () => {
    let tot = 0;
    this.state.cart.map(item => {
      tot += item.quantity * item.price;
    });
    return tot;
  };

  render() {
    const {height, width} = Dimensions.get('window');
    console.log('width', width);

    return (
      <Fragment>
        <View style={styles.container}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontWeight: '700',
              marginTop: 10,
            }}>
            My Cart
          </Text>
          <View
            style={{
              marginVertical: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 0.6,
            }}
          />

          <SafeAreaView style={styles.container}>
            <FlatList
              data={this.props.cart}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      style={{width: 60, height: 60, resizeMode: 'contain'}}
                      source={{
                        uri: `${item.image}`,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginLeft: 10,
                      }}>
                      <Text style={styles.title}>{item.item}</Text>
                      <Text style={styles.title}>{item.branch}</Text>
                      <Text style={styles.title}>
                        Rp.{' '}
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        left: 5,
                        textAlign: 'center',
                      }}>
                      <Text
                        style={styles.title}
                        button
                        onPress={() => {
                          this.editQuantity(
                            this.state.user.id,
                            item.itemID,
                            item.branchID,
                            (item.quantity += 1),
                          );
                        }}
                        style={{
                          paddingBottom: 0,
                          flexWrap: 'nowrap',
                          textAlign: 'center',
                        }}>
                        +
                      </Text>
                      <Text
                        style={{
                          paddingBottom: 0,
                          paddingTop: 0,
                          flexWrap: 'nowrap',
                          textAlign: 'center',
                          marginVertical: 5,
                        }}>
                        {item.quantity}
                      </Text>
                      <Text
                        style={styles.status}
                        button
                        onPress={() => {
                          this.editQuantity(
                            this.state.user.id,
                            item.itemID,
                            item.branchID,
                            (item.quantity -= 1),
                          );
                        }}
                        style={{
                          paddingBottom: 0,
                          paddingTop: 0,
                          flexWrap: 'nowrap',
                          textAlign: 'center',
                        }}>
                        -
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>

          <View style={{flexDirection: 'row', marginHorizontal: 16}}>
            <View
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                width: '50%',
                height: 30,
                borderRadius: 15,
                backgroundColor: '#f8f8f8',
                position: 'absolute',
                bottom: 10,
                left: 0,
              }}>
              <Text>
                Total : Rp.{' '}
                {this.total()
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
            <View
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                width: '50%',
                height: 30,
                borderRadius: 15,
                backgroundColor: '#ee6e73',
                position: 'absolute',
                bottom: 10,
                right: 0,
              }}>
              <Text onPress={() => alert('checkout')}>CheckOut</Text>
            </View>
          </View>
        </View>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
  };
}

export default connect(mapStateToProps)(Cart);

//////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  status: {
    fontSize: 12,
  },
  title: {
    fontSize: 14,
  },
});
