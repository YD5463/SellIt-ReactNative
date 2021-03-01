import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/Settings/AccountScreen";
import AccountListingsScreen from "../screens/Listings/AccountListingsScreen";
import EditProfileScreen from "./../screens/Settings/EditProfileScreen";
import OrderedListingsScreen from "../screens/Listings/OrderedListingsScreen";
import ChatNavigator from "./ChatNavigator";
import routes from "./routes";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      options={{ headerShown: false }}
      component={AccountScreen}
    />
    <Stack.Screen
      name={routes.CHAT}
      options={{ headerShown: false }}
      component={ChatNavigator}
    />
    <Stack.Screen
      name={routes.ACCOUNT_LISTINGS}
      component={AccountListingsScreen}
    />
    <Stack.Screen
      name={routes.ORDERED_ITEMS}
      component={OrderedListingsScreen}
    />
    <Stack.Screen name={routes.EDIT_PROFILE} component={EditProfileScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
