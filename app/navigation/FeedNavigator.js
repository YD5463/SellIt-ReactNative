import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ViewImageScreen from "./../screens/ViewImageScreen";
import MyCartScreen from "./../screens/MyCartScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="ViewListingImage" component={ViewImageScreen} />
    <Stack.Screen name="CartDetails" component={MyCartScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
