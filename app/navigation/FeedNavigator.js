import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/Listings/ListingsScreen";
import ListingDetailsScreen from "../screens/Listings/ListingDetailsScreen";
import ViewImageScreen from "./../screens/ViewImageScreen";
import MyCartScreen from "../screens/Listings/MyCartScreen";
import CheckoutScreen from "../screens/Listings/CheckoutScreen";
import AddPaymentMethodScreen from "../screens/Listings/AddPaymentMethodScreen";
import AddAddressScreen from "../screens/Listings/AddAddressScreen";
import OptionsPickerScreen from "./../screens/OptionsPickerScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.LISTINGS} component={ListingsScreen} />
    <Stack.Screen
      name={routes.LISTING_DETAILS}
      component={ListingDetailsScreen}
    />
    <Stack.Screen name={routes.LISTING_IMAGE} component={ViewImageScreen} />
    <Stack.Screen name={routes.MY_CART} component={MyCartScreen} />
    <Stack.Screen name={routes.CHECKOUT} component={CheckoutScreen} />
    <Stack.Screen
      name={routes.ADD_PAYMENT}
      component={AddPaymentMethodScreen}
    />
    <Stack.Screen name={routes.ADD_ADDRESS} component={AddAddressScreen} />
    <Stack.Screen
      name={routes.OPTIONS_PICKER}
      component={OptionsPickerScreen}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
