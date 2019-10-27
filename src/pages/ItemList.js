import React, {Fragment} from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

import ItemCard from '../components/ItemCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

class ItemList extends React.Component {
  toItemDetails = id => {
    this.props.navigation.navigate('Detail', {id: id});
  };

  render() {
    return (
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={{width: 'auto'}}
        data={this.props.items}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => {
          return (
            <View>
              {console.log('data ', item)}
              <TouchableNativeFeedback
                onPress={() => this.toItemDetails(item.id)}>
                <View
                  style={{
                    flex: 1,
                    marginVertical: 20,
                    marginHorizontal: 15,
                    borderRadius: 15,
                    backgroundColor: '#ced6e0',
                    elevation: 15,
                    flexWrap: 'wrap',
                  }}>
                  <View style={{height: 200, maxwidth: '100%'}}>
                    <Image
                      source={{uri: item.image}}
                      resizeMode="contain"
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: '#f5d372',
                      alignItems: 'center',
                      bottom: 0,
                    }}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          );
        }}
      />
    );
  }
}

export default withNavigation(ItemList);
