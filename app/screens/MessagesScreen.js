import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import messagesApi from "../api/messages";
import useApi from "./../hooks/useApi";
//import storage from "../auth/storage";
import Text from "../components/Text";
import ActivityIndicator from "../components/ActivityIndicator";
import Icon from "../components/Icon";
import { useTheme } from "react-native-paper";

function MessagesScreen(props) {
  const { colors } = useTheme();
  const [messages, setMessages] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const getMessagesApi = useApi(messagesApi.getMessages);
  //const [currUser, setCurrUser] = useState();

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  const setData = async () => {
    await getMessagesApi.request();
    setMessages(getMessagesApi.data);
  };
  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    setData();
  }, messages);

  return (
    <>
      <ActivityIndicator visible={getMessagesApi.loading} />
      <Screen>
        {!getMessagesApi.loading && messages && messages.length === 0 && (
          <Text style={styles.zeroMessagesText}>
            There Is No Messages To Display
          </Text>
        )}

        <FlatList
          data={messages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.fromUser.name}
              subTitle={item.content}
              IconComponent={
                <Icon
                  name="account"
                  size={55}
                  backgroundColor={colors.medium}
                  iconSizeRatio={0.7}
                />
              }
              onPress={() => console.log("Message selected", item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            setData();
          }}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  zeroMessagesText: {
    alignSelf: "center",
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MessagesScreen;
