import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import AccountListingsScreen from "./../screens/AccountListingsScreen";
import EditProfileScreen from "./../screens/EditProfileScreen";
import OrderedListingsScreen from "./../screens/OrderedListingsScreen";
import ChatsListScreen from './../screens/ChatsListScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      options={{ headerShown: false }}
      component={AccountScreen}
    />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Chats" component={ChatsListScreen} />
    <Stack.Screen name="Listings" component={AccountListingsScreen} />
    <Stack.Screen name="Orderd Listings" component={OrderedListingsScreen} />
    <Stack.Screen name="ProfileEdit" component={EditProfileScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
