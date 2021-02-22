import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import useApi from "../../hooks/useApi";
import chats from "../../api/chat";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import { useTheme } from "react-native-paper";
import ListItemSeparator from "../../components/lists/ListItemSeparator";
import ActivityIndicator from "../../components/ActivityIndicator";
import ContactChat from "../../components/chat/Items/ContactChat";
import BackArrow from "../../components/BackArrow";
import Text from "../../components/Text";
import { useTranslation } from "react-i18next";
import SearchBar from "./../../components/SearchBar";

function ChatsListScreen({ navigation }) {
  const [chatsList, setChatsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const { colors } = useTheme();

  const initData = async () => {
    setLoading(true);
    const res = await chats.getChats();
    setLoading(false);
    setChatsList(res.data);
  };
  useEffect(() => {
    initData();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerRight: () => <View style={{ flexDirection: "row" }}></View>,
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <BackArrow onBack={() => navigation.goBack()} size={28} />
          <Text style={styles.leftHeaderTitle}>Chats</Text>
        </View>
      ),
      title: "",
    });
  });
  const searchFilter = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={[styles.container, { backgroundColor: colors.white }]}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <SearchBar
            search={searchQuery}
            onChange={searchFilter}
            width="85%"
            backgroundColor={colors.boldLight}
          />
        </View>
        {!loading && chatsList.length === 0 && <Text>No chats to diaply</Text>}

        <FlatList
          data={chatsList}
          keyExtractor={(item) => item.contactId}
          renderItem={({ item }) => (
            <ContactChat
              contactName={item.contactName}
              contactProfileImage={item.contactProfileImage}
              lastMessage={item.messages[item.messages.length - 1]}
              onPress={() => navigation.navigate(routes.MESSAGES, item)}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          extraData={chatsList}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  leftHeaderTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ChatsListScreen;
