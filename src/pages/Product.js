import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableNativeFeedback,
  View,
  Button,
} from 'react-native';

import {connect} from 'react-redux';
import {getItemsByCategory} from '../public/redux/actions/items';

class Product extends React.Component {
  state = {
    categories: [],
    itemList: [],
    displayCategories: '',
    search: '',
  };

  componentDidMount = async () => {
    const {navigation} = this.props;
    const id = navigation.getParam('id');

    await this.props.dispatch(getItemsByCategory(id));
    await this.setState({itemList: this.props.items});
    console.log('items', this.state.itemList);
  };
  handleDetailClick = id => {
    //itemをDetailへ渡す
    this.props.navigation.navigate('Detail', {id: id});
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          style={{width: 'auto'}}
          data={this.state.itemList}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View>
                {console.log('data ', item)}
                <TouchableNativeFeedback
                  onPress={() => this.handleDetailClick(item.id)}>
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
      </View>
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

function mapStateToProps(state) {
  return {
    items: state.items.items,
  };
}

export default connect(mapStateToProps)(Product);
