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
