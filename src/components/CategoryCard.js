import React, {Component} from 'react';
import {Image, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from 'react-native-elements';

export default class CategoryCard extends Component {
  render(props) {
    const {height, width} = Dimensions.get('window');
    return (
      <Card
        style={{
          width: width / 2 - 10,
          height: height / 3,
          borderColor: '#F5D372',
          marginBottom: 20,
          padding: 0,
        }}>
        <Card cardBody>
          <Image
            source={{uri: this.props.category.image}}
            style={{height: height / 3 - 30, width: width / 2, flex: 1}}
          />
        </Card>
        <Card footer style={{backgroundColor: '#F5D372'}}>
          <Text>{this.props.category.name}</Text>
        </Card>
      </Card>
    );
  }
}
