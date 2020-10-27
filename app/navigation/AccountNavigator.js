import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import AccountListingsScreen from "./../screens/AccountListingsScreen";
import EditProfileScreen from "./../screens/EditProfileScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      options={{ headerShown: false }}
      component={AccountScreen}
    />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Listings" component={AccountListingsScreen} />
    <Stack.Screen name="ProfileEdit" component={EditProfileScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
