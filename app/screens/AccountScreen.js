import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { Image } from "react-native-expo-image-cache";
import useApi from "./../hooks/useApi";
import user from "../api/user";
import ActivityIndicator from "../components/ActivityIndicator";

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
    menuItems.push({ ...optionsItem, onPress: () => navigation.openDrawer() });
  }, []);
  const { logOut } = useAuth();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const getUpdatedUserApi = useApi(user.getUpdatedUser);
  useEffect(() => {
    getUpdatedUserApi.request();
    const unsubscribe = navigation.addListener("focus", () => {
      getUpdatedUserApi.request();
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <ActivityIndicator visible={getUpdatedUserApi.loading} />
      <Screen style={{ backgroundColor: colors.light }}>
        <View style={styles.container}>
          <ListItem
            title={getUpdatedUserApi.data.name}
            subTitle={getUpdatedUserApi.data.email}
            IconComponent={
              getUpdatedUserApi.data.profile_image ? (
                <Image
                  uri={getUpdatedUserApi.data.profile_image.url}
                  preview={{
                    uri: getUpdatedUserApi.data.profile_image.thumbnailUrl,
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
              navigation.push(routes.EDIT_PROFILE, {
                user: {
                  ...getUpdatedUserApi.data,
                  profile_image: getUpdatedUserApi.data.profile_image
                    ? getUpdatedUserApi.data.profile_image.url
                    : null,
                },
              });
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
                          user: {
                            ...getUpdatedUserApi.data,
                            profile_image:
                              getUpdatedUserApi.data.profile_image.url,
                          },
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
