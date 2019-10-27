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

import {getUserTransactions} from '../public/redux/actions/transactions';
import AsyncStorage from '@react-native-community/async-storage';

class Transaction extends React.Component {
  state = {
    userTransactions: [],
    id: '',
    user: {},

    token: '',
    header: '',
  };

  convertTimeStamp = timeStamp => {
    timeStamp.toString();
    return timeStamp.slice(0, 10);
  };
  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(value => {
      if (value !== null) {
        value = parseInt(value);
        this.setState({user: {...this.state.user, id: value}});
      }
    });
    await AsyncStorage.getItem('userName').then(value => {
      if (value !== null) {
        value = parseInt(value);
        this.setState({user: {...this.state.user, name: value}});
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
      getUserTransactions(this.state.user.id, this.state.header),
    );
    await this.setState({userTransactions: this.props.userTransactions});
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
          History Transaction
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
            data={this.props.userTransactions}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.item}>
                  {/* <Image
                      style={{width: 60, height: 60, resizeMode: 'contain'}}
                      source={{
                        uri: `${item.image}`,
                      }}
                    /> */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      marginLeft: 10,
                    }}>
                    <Text style={styles.title}>
                      {this.convertTimeStamp(item.date)}
                    </Text>
                  </View>
                  {item.transactionitems.map((item, index) => {
                    return (
                      <View key={index}>
                        <Text>{item.itemName}</Text>
                        <Text>{item.location}</Text>
                        <Text>{item.quantity}</Text>
                        <Text>
                          Rp.{' '}
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Text>
                      </View>
                    );
                  })}
                  <Text>
                    Total : Rp.
                    {Object.values(item.transactionitems)
                      .reduce(
                        (total, {price, quantity}) => total + price * quantity,
                        0,
                      )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              );
            }}
          />
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    userTransactions: state.transactions.userTransactions,
  };
}

export default withNavigation(connect(mapStateToProps)(Transaction));

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
