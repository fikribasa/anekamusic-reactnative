import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }
  componentDidMount = () => {
    ///////ambil token buat cek bareng header
    // await AsyncStorage.getItem('token').then(value => {
    //   if (value !== null) {
    //     this.setState({token: value});
    //   }
    // });
    // const header = {headers: {authorization: 'Bearer ' + this.state.token}};
    // this.setState({header: header});
    ////////
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
  };
  setTimePassed = () => {
    this.props.navigation.navigate('Home');
  };

  //   setTimePassed = () => {
  //     this.state.isAuthenticated
  //       ? this.props.navigation.navigate('Home')
  //       : this.props.navigation.navigate('Login');
  //   };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Aneka Musik</Text>

        <Text style={styles.subheading}>
          A Destination of Quality Products.
        </Text>
      </View>
    );
  }
}
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC300',
  },
  splashImage: {
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    resizeMode: 'stretch',
  },
  heading: {
    textAlign: 'center',
    fontSize: 34,
    paddingBottom: 8,
    color: '#FDFEFE',
  },
  subheading: {
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 8,
    fontWeight: 'bold',
    color: '#FDFEFE',
  },
});
