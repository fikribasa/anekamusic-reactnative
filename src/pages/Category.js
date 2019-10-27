/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableNativeFeedback,
  View,
  Button,
} from 'react-native';
import SearchBar from '../components/SearchBar';
// import DataHome from '../assets/DataHome';

/////////Redux
import {connect} from 'react-redux';

import {getCategories, addCategory} from '../public/redux/actions/categories';

class Category extends Component {
  state = {
    // data: DataHome,

    branchList: [],
    categoryList: [],

    categoryImage: '',
    categoryName: '',

    branchLocation: '',
  };

  componentDidMount = async () => {
    await this.props.dispatch(getCategories());
    await this.setState({categoryList: this.props.categories});
  };
  handleItemClick = id => {
    //itemをDetailへ渡す
    this.props.navigation.navigate('Product', {id: id});
  };

  render() {
    return (
      <View>
        <SearchBar />
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          style={{width: '100%'}}
          data={this.state.categoryList}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flex: 1,
                  marginVertical: 20,
                  marginHorizontal: 15,
                  borderRadius: 15,
                  backgroundColor: '#ced6e0',
                  elevation: 15,
                }}>
                <TouchableNativeFeedback
                  onPress={() => this.handleItemClick(item.id)}>
                  <View>
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
                        padding: 15,
                        backgroundColor: '#f5d372',
                        alignItems: 'center',
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

////

////
function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
  };
}

//make this component available to the app
export default connect(mapStateToProps)(Category);
