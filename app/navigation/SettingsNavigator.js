import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChangePasswordScreen from "./../screens/ChangePasswordScreen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AccountNavigator from "./AccountNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeLanguageScreen from "./../screens/ChangeLanguageScreen";
import { useTranslation } from "react-i18next";
import ChangeThemeScreen from "./../screens/ChangeThemeScreen";
import { TouchableWithoutFeedback, View } from "react-native";
import { useTheme } from "react-native-paper";
import MyActivityScreen from "./../screens/MyActivityScreen";
import ChangeSubscriptionScreen from "./../screens/ChangeSubscriptionScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const getComponentWithBack = (Screen, name) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator initialRouteName={name}>
      <Stack.Screen
        name={name}
        component={Screen}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: { color: colors.black },
        }}
      />
    </Stack.Navigator>
  );
};

const screens = [
  {
    screenName: "Account",
    titleKey: "Account",
    iconName: "account-circle",
    targetScreen: AccountNavigator,
    Icon: MaterialCommunityIcons,
  },
  {
    screenName: "Change Password",
    titleKey: "password",
    iconName: "shield-lock-outline",
    targetScreen: () =>
      getComponentWithBack(ChangePasswordScreen, "Change Password"),
    Icon: MaterialCommunityIcons,
  },
  {
    screenName: "Change Language",
    titleKey: "language",
    iconName: "translate",
    targetScreen: () =>
      getComponentWithBack(ChangeLanguageScreen, "Change Language"),
    Icon: MaterialCommunityIcons,
  },
  {
    screenName: "Change Subscription",
    titleKey: "notification",
    iconName: "notifications",
    targetScreen: () =>
      getComponentWithBack(ChangeSubscriptionScreen, "Change Subscription"),
    Icon: MaterialIcons,
  },
  {
    screenName: "My Activity",
    titleKey: "myActivity",
    iconName: "watch-later",
    targetScreen: MyActivityScreen,
    Icon: MaterialIcons,
  },
  {
    screenName: "Help",
    titleKey: "help",
    targetScreen: ChangePasswordScreen,
    iconName: "help-outline",
    Icon: MaterialIcons,
  },
  {
    screenName: "About",
    titleKey: "about",
    iconName: "information-outline",
    targetScreen: ChangePasswordScreen,
    Icon: MaterialCommunityIcons,
  },
  {
    screenName: "Change Theme",
    titleKey: "theme",
    iconName: "color-lens",
    targetScreen: () => getComponentWithBack(ChangeThemeScreen, "Change Theme"),
    Icon: MaterialIcons,
  },
];

const SettingsNavigator = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <Drawer.Navigator initialRouteName="Account" drawerType="slide" dr>
      {screens.map((screen) => (
        <Drawer.Screen
          key={screen.screenName}
          name={screen.screenName}
          component={screen.targetScreen}
          options={{
            drawerLabel: t(screen.titleKey),
            drawerIcon: () => (
              <screen.Icon
                name={screen.iconName}
                size={40}
                color={colors.medium}
              />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default SettingsNavigator;
