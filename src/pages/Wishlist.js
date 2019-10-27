import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import {Button} from 'react-native-elements';

import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {getWishlist, deleteWishlist} from '../public/redux/actions/wishlist';
import AsyncStorage from '@react-native-community/async-storage';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: [],
      user: {
        id: '',
        name: '',
        email: '',
      },

      token: '',
      header: '',
    };
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(value => {
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

    await this.props.dispatch(
      getWishlist(this.state.user.id, this.state.header),
    );
    await this.setState({wishlist: this.props.wishlist});
  };

  handleDetailClick = id => {
    this.props.navigation.navigate('Detail', {id: id});
    this._toastaddcart;
  };

  handleDelete = async (user, item) => {
    await this.props.dispatch(deleteWishlist(user, item, this.state.header));
    await this.setState({
      wishlist: this.props.wishlist,
    });
    this._toastremove();
  };
  _toastaddcart = () => {
    //function to make Toast With Duration, Gravity And Offset
    ToastAndroid.showWithGravityAndOffset(
      'Added To Cart',
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50, //yOffset
    );
  };

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

  render() {
    return (
      <React.Fragment>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: '700',
            marginTop: 10,
          }}>
          My Wishlist
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
            data={this.props.wishlist}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.item}>
                  <View
                    style={{flexDirection: 'row', flex: 1}}
                    onPress={() => this.handleDetailClick(item.id)}>
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
                      <Text style={styles.title}>{item.name}</Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          marginHorizontal: 10,
                          justifyContent: 'space-between',
                          backgroundColor: '#FFFDE7',
                        }}>
                        <Button
                          title="Delete"
                          type="clear"
                          onPress={() => this.handleDelete(item.id)}>
                          {/* <Feather name="delete" color="#FF0000" size={30} /> */}
                        </Button>

                        <Button
                          title="Move to Cart"
                          type="clear"
                          onPress={() => this.handleDetailClick(item.id)}>
                          {/* <MaterialIcons
                            name="add-shopping-cart"
                            color="#0033CC"
                            size={30}
                          /> */}
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.wishlist,
  };
}

export default withNavigation(connect(mapStateToProps)(Wishlist));

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
