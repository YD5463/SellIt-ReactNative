import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { Image } from "react-native-expo-image-cache";
import storage from "../auth/storage";

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
  {
    title: "Ordered Products",
    icon: {
      name: "cart-outline",
      backgroundColor: "blue",
    },
    targetScreen: routes.ORDERED_ITEMS,
  },
];

const optionsItem = {
  title: "settings",
  icon: {
    name: "settings",
    backgroundColor: "gray",
    IconComponent: MaterialIcons,
  },
};

function AccountScreen({ navigation }) {
  useEffect(() => {
    if (menuItems.length === 2)
      menuItems.push({
        ...optionsItem,
        onPress: () => navigation.openDrawer(),
      });
  }, []);
  const { logOut } = useAuth();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [user, setUser] = useState({});
  const updateUser = async () => {
    const updatedUser = await storage.getUser();
    setUser(updatedUser);
  };
  useEffect(() => {
    updateUser();
    const unsubscribe = navigation.addListener("focus", () => {
      updateUser();
    });
    return unsubscribe;
  });
  return (
    <Screen style={{ backgroundColor: colors.light }}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          IconComponent={
            user.profile_image ? (
              <Image
                uri={user.profile_image.url}
                preview={{
                  uri: user.profile_image.thumbnailUrl,
                }}
                style={{ width: 55, height: 55, borderRadius: 30 }}
                tint="light"
              />
            ) : (
              <Icon
                name="account"
                size={55}
                backgroundColor={colors.medium}
                iconSizeRatio={0.7}
              />
            )
          }
          onPress={() => {
            navigation.push(routes.EDIT_PROFILE, { user });
          }}
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
                  IconComponent={item.icon.IconComponent}
                />
              }
              onPress={
                item.onPress
                  ? item.onPress
                  : () =>
                      navigation.navigate(item.targetScreen, {
                        user: user,
                      })
              }
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
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
