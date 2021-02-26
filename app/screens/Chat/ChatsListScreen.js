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
import io from "socket.io-client";
import storage from "../../auth/storage";

function ChatsListScreen({ navigation }) {
  const [chatsList, setChatsList] = useState([]);
  const [originalChats, setOriginalList] = useState();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [socket, setSocket] = useState();

  const initData = async () => {
    setLoading(true);
    const token = await storage.getToken();
    const clientSocket = io("http://192.168.68.112:9000", {
      auth: { token: token },
    });
    clientSocket.on("ExistingMessages", (chats) => {
      setLoading(false);
      setChatsList(chats);
      setOriginalList(chats);
    });
    setSocket(clientSocket);
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
    if (query === "") return setChatsList(originalChats);
    setSearchQuery(query);
    const filtered = chatsList.filter((chat) => {
      return chat.contactName.toLowerCase().includes(query.toLowerCase()); //todo: make the search more smart
    });
    setChatsList(filtered);
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
              onPress={() =>
                navigation.navigate(routes.MESSAGES, { ...item, socket })
              }
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
