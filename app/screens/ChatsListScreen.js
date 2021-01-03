import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ListItem } from "../components/lists";
import useApi from "./../hooks/useApi";
import chats from "../api/chat";
import routes from "../navigation/routes";
import Screen from "./../components/Screen";
import { useTheme } from "react-native-paper";
import ListItemSeparator from "./../components/lists/ListItemSeparator";
import ActivityIndicator from "../components/ActivityIndicator";

function ChatsListScreen({ navigation }) {
  const getChatsApi = useApi(chats.getChats);
  const { colors } = useTheme();
  const initData = async () => {
    await getChatsApi.request();
  };
  useEffect(() => {
    initData();
  }, []);
  console.log(getChatsApi.data);
  return (
    <>
      <ActivityIndicator visible={getChatsApi.loading} />
      <Screen style={[styles.container, { backgroundColor: colors.light }]}>
        <FlatList
          data={getChatsApi.data}
          keyExtractor={(item) => item.contactId}
          renderItem={({ item }) => (
            <ListItem
              image={item.contactProfileImage}
              title={item.contactName}
              subTitle={item.lastMessage.text}
              onPress={() => navigation.navigate(routes.MESSAGES, item)}
              iconName=""
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatsListScreen;
