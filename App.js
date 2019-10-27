/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Navigation from './src/Navigation';

/////////Redux
import {Provider} from 'react-redux';
import store from './src/public/redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

console.disableYellowBox = true;
