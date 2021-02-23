import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/Settings/AccountScreen";
import AccountListingsScreen from "../screens/Listings/AccountListingsScreen";
import EditProfileScreen from "./../screens/Settings/EditProfileScreen";
import OrderedListingsScreen from "../screens/Listings/OrderedListingsScreen";
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
