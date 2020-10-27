import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

const menuItems = [
  {
    title: "myListings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: "primary",
    },
    targetScreen: routes.ACCOUNT_LISTINGS,
  },
  {
    title: "myMessages",
    icon: {
      name: "email",
      backgroundColor: "secondary",
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <Screen style={{ backgroundColor: colors.light }}>
      <View style={styles.container}>
        <View style={styles.options}>
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
            <SimpleLineIcons
              name="options-vertical"
              size={26}
              color={colors.medium}
            />
          </TouchableWithoutFeedback>
        </View>
        <ListItem
          title={user.name}
          subTitle={user.email}
          IconComponent={
            <Icon
              name="account"
              size={55}
              backgroundColor={colors.medium}
              iconSizeRatio={0.7}
            />
          }
          onPress={() => navigation.navigate(routes.EDIT_PROFILE, { user })}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={t(item.title)}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={colors[item.icon.backgroundColor]}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen, { user })}
            />
          )}
        />
      </View>
      <ListItem
        title={t("logout")}
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  options: {
    width: "100%",
    height: 40,
    paddingRight: 10,
    alignItems: "flex-end",
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
