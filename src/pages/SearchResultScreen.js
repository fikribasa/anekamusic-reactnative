import React, {Fragment} from 'react';

import ItemList from './ItemList';

import {connect} from 'react-redux';
import {getItemsByName} from '../public/redux/actions/items';
import {Text} from 'native-base';

class SearchResultScreen extends React.Component {
  state = {
    name: '',
  };
  componentDidMount = async () => {
    const {navigation} = this.props;
    const name = navigation.getParam('name');
    this.setState({name: name});
    console.log('navparamsearch', name);

    await this.props.dispatch(getItemsByName(name));
  };

  render() {
    return (
      <Fragment>
        <Text>{'Search result for keyword : ' + this.state.name}</Text>
        <ItemList items={this.props.items} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items.items,
  };
}

export default connect(mapStateToProps)(SearchResultScreen);
// export default SearchResultScreen ;
