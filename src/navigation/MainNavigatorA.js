/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// import SignUp screen
import SignUp from "../screens/signup/SignUpA";

// import ForgotPassword
// import ForgotPassword from "../screens/forgotpassword/ForgotPasswordA";

// import HomeNavigator
import HomeNavigator from "./HomeNavigatorA";

// import Product screen
import Product from "../screens/product/ProductA";

// import Categories screen
import Category from "../screens/categories/CategoryA";
import Categories from "../screens/categories/CategoriesA";

// import colors
import Colors from "../theme/colors";



// create MainNavigator
const MainNavigatorA = createStackNavigator(
  {
    // HomeNavigator
    HomeNavigator: {
      screen: HomeNavigator,
      navigationOptions: { header: null }
    },

    // Categories screen
    Categories: {
      screen: Categories,
      navigationOptions: {
        title: "All Categories",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },
    Category: {
      screen: Category,
      navigationOptions: {
        title: "Pizza",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },
    // Product screen
    Product: {
      screen: Product,
      navigationOptions: { header: null }
    },

  },
  {
    headerMode: "screen", // 'float' | 'none' | 'screen'
    headerLayoutPreset: "center",
    headerBackTitleVisible: "false",
    defaultNavigationOptions: {
      headerTintColor: Colors.black
    }
  }
);


const MySwitchNavigator = createSwitchNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Create Account",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      }
    }
  },
  MainNavigatorA,
});

export default createAppContainer(MySwitchNavigator);
