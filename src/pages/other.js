{
  this.state.itemstock ? (
    <Fragment>
      <Container
        style={{
          flex: 3,
          paddingBottom: 0,
          paddingLeft: 0,
          marginLeft: 0,
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}>
        {this.state.itemstock.map((item, index) => {
          return (
            <CardItem
              key={index}
              style={{
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}>
              <CardItem style={{alignSelf: 'flex-start'}}>
                <Text>{item.branch} : </Text>
              </CardItem>

              <CardItem
                style={{
                  alignItems: 'flex-start',
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  marginLeft: 0,
                }}>
                <Text>{item.quantity} unit(s)</Text>
                <Text>
                  Rp.
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
                {this.state.user.level > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.addToCart(
                        this.state.user.id,
                        this.state.id,
                        this.state.itemDetails.name,
                        item.branchID,
                        item.branch,
                        item.price,
                        1,
                      );
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        backgroundColor: 'orange',
                        borderRadius: 10,
                        padding: 5,
                      }}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </CardItem>
            </CardItem>
          );
        })}
      </Container>
    </Fragment>
  ) : (
    alert('error itemstock not loaded')
  );
}
