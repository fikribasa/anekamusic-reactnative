import React, {Component} from 'react';
import {Image} from 'react-native';
import {Button, Icon} from 'native-base';
import {withNavigation} from 'react-navigation';

class LoginButton extends Component {
  toLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <Button
        bordered
        warning
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          margin: 5,
          borderColor: 'white',
          backgroundColor: 'white',
        }}
        onPress={this.toLogin}>
        <Icon name="person" style={{width: 40, height: 40, padding: 10}} />
      </Button>
    );
  }
}

export default withNavigation(LoginButton);
