/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import Color from "color";
import getImgSource from '../../utils/getImgSource.js';

// import components
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1
  },
  contentContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  cardImg: { borderRadius: 4 },
  card: {
    marginVertical: 6,
    height: 100,
    resizeMode: "cover"
  },
  cardOverlay: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Color(Colors.overlayColor).alpha(0.2),
    overflow: "hidden"
  },
  cardContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 4
  },
  cardTitle: {
    padding: 16,
    fontWeight: "500",
    fontSize: 18,
    color: Colors.white,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

export default class CategoriesA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [
        {
          key: 1,
          imageUri: require("../../assets/img/pizza_3.jpg"),
          name: "Pizza"
        },
        {
          key: 2,
          imageUri: require("../../assets/img/meat_1.jpg"),
          name: "Grill"
        },
        {
          key: 3,
          imageUri: require("../../assets/img/spaghetti_2.jpg"),
          name: "Pasta"
        },
        {
          key: 4,
          imageUri: require("../../assets/img/soup_1.jpg"),
          name: "Soups"
        },
        {
          key: 5,
          imageUri: require("../../assets/img/salad_1.jpg"),
          name: "Salads"
        },
        {
          key: 6,
          imageUri: require("../../assets/img/cake_2.jpg"),
          name: "Dessert"
        }
      ]
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  keyExtractor = (item, index) => index.toString();

  renderCategoryItem = ({ item, index }) => (
    <ImageBackground
      key={index}
      source={getImgSource(item.imageUri)}
      imageStyle={styles.cardImg}
      style={styles.card}
    >
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={this.navigateTo("Category")}
          style={styles.cardContainer}
          // borderless
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  render() {
    const { categories } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <FlatList
            data={categories}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCategoryItem}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      </SafeAreaView>
    );
  }
}
