/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component, Fragment } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import remove from "lodash/remove";
import { SafeAreaView, withNavigationFocus } from "react-navigation";

// import components
import ActionProductCardHorizontal from "../../components/cards/ActionProductCardHorizontalRemove";
import EmptyState from "../../components/emptystate/EmptyState";
import { Heading6, SmallText } from "../../components/text/CustomText";

// import colors
import Colors from "../../theme/colors";
import Constant from "../../theme/constant";

// FavoritesA Config
const EMPTY_STATE_ICON = "star-outline";

const { STORE_EMAIL_KEY_CURRENT } = Constant

// FavoritesA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  titleContainer: {
    paddingHorizontal: 16
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 24,
    fontWeight: "700"
  },
  productList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12
  },
  bottomTextInfo: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  }
});

// FavoritesA
class FavoritesA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        {
          id: "product1",
          imageUri: require("../../assets/img/sandwich_2.jpg"),
          name: "Subway sandwich",
          price: 8.49,
          quantity: 0,
          discountPercentage: 10
        },
        {
          id: "product2",
          imageUri: require("../../assets/img/pizza_1.jpg"),
          name: "Pizza Margarita 35cm",
          quantity: 0,
          price: 10.99
        },
        {
          id: "product3",
          imageUri: require("../../assets/img/cake_1.jpg"),
          name: "Chocolate cake",
          quantity: 0,
          price: 4.99
        }
      ]
    };
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };


  getProducts = async () => {
    try {
      const email = await AsyncStorage.getItem(STORE_EMAIL_KEY_CURRENT)
    
      if (email) {

        const value = await AsyncStorage.getItem(email)
        if(value !== null) {
          let itemValue = JSON.parse(value)
          itemValue = Object.values(itemValue)
          this.setState({ products: itemValue})
        } 

      } else {
        console.log(STORE_EMAIL_KEY_CURRENT + ' favorite : no  ', )
      }
      
    } catch(e) {
      // error reading value
      console.error(' asyncStorage.getItem fav error : ', e)
    }
  }

  componentDidMount = () => {    
    this.getProducts()
  }
  
 
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getProducts()
    }
  }


  swipeoutOnPressRemove = item => () => {
    this.onPressRemoveItem(item)

    let { products } = this.state;
    const index = products.indexOf(item);


    products = remove(products, n => products.indexOf(n) !== index);

    this.setState({
      products
    });
  };

  onPressRemoveItem = async (params) => {
    
    try {
      const email = await AsyncStorage.getItem(STORE_EMAIL_KEY_CURRENT)
    
      if (email) {

        const value = await AsyncStorage.getItem(email)
        if(value !== null) {
          let itemValue = JSON.parse(value)
          
          delete itemValue[params.name]

          await AsyncStorage.setItem(email, JSON.stringify(itemValue)) 

        } else {
          let itemValue = {}
          itemValue[params.name] = { name: params.name }
          await AsyncStorage.setItem(email, JSON.stringify(itemValue)) 
        }

      } else {
        console.log(STORE_EMAIL_KEY_CURRENT + ' favorite : no params ', )
      }
      
    } catch(e) {
      // error reading value
      console.error(' asyncStorage.getItem fav error : ', params, e)
    }

  };

  onPressRemove = item => () => {
    let { quantity } = item;
    quantity -= 1;

    const { products } = this.state;
    const index = products.indexOf(item);

    if (quantity < 0) {
      return;
    }
    products[index].quantity = quantity;

    this.setState({
      products: [...products]
    });
  };

  onPressAdd = item => () => {
    const { quantity } = item;
    const { products } = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.setState({
      products: [...products]
    });
  };

  keyExtractor = (item, index ) =>  {
    // item.id
    return index.toString()
  }

  renderProductItem = ({ item }) => (
    <ActionProductCardHorizontal
      key={item.id}
      onPress={this.navigateTo("Product")}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.swipeoutOnPressRemove(item)}
      imageUri={item.imageUri}
      title={item.name}
      price={item.price}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
      swipeoutDisabled={false}
      swipeoutOnPressRemove={this.swipeoutOnPressRemove(item)}
    />
  );

  render() {
    const { products } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Favorites</Heading6>
        </View>

        {
          products.length === 0 ? (
            <EmptyState
              showIcon
              iconName={EMPTY_STATE_ICON}
              title="Your Favorites List is Empty"
              message="Save your favorite food so you can always find it here and make order easier"
            />
          ) : (
            <Fragment>
              <FlatList
                data={products}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderProductItem}
                contentContainerStyle={styles.productList}
              />
              
              <View style={styles.bottomTextInfo}>
                <SmallText>Swipe left to remove items</SmallText>
              </View>
            </Fragment>
          )
        }
      </SafeAreaView>
    );
  }
}


export default withNavigationFocus(FavoritesA)