import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ViewImageScreen from "./../screens/ViewImageScreen";
import MyCartScreen from "./../screens/MyCartScreen";
import CheckoutScreen from "./../screens/CheckoutScreen";
import AddPaymentMethodScreen from "./../screens/AddPaymentMethodScreen";
import AddAddressScreen from "./../screens/AddAddressScreen";
import OptionsPickerScreen from "./../screens/OptionsPickerScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="ViewListingImage" component={ViewImageScreen} />
    <Stack.Screen name="CartDetails" component={MyCartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
    <Stack.Screen name="AddAddress" component={AddAddressScreen} />
    <Stack.Screen name="OptionsPicker" component={OptionsPickerScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
