import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import AccountListingsScreen from "./../screens/AccountListingsScreen";
import EditProfileScreen from "./../screens/EditProfileScreen";
import OrderedListingsScreen from "./../screens/OrderedListingsScreen";
import ChatNavigator from "./ChatNavigator";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      options={{ headerShown: false }}
      component={AccountScreen}
    />
    <Stack.Screen
      name="Chat"
      options={{ headerShown: false }}
      component={ChatNavigator}
    />
    <Stack.Screen name="Listings" component={AccountListingsScreen} />
    <Stack.Screen name="Orderd Listings" component={OrderedListingsScreen} />
    <Stack.Screen name="ProfileEdit" component={EditProfileScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
