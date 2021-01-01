import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import TextMessage from "../components/chat/TextMessage";
import useApi from "./../hooks/useApi";
import Text from "../components/Text";
//import { io } from "socket.io-client";

import AudioMessage from "./../components/chat/AudioMessage";
import LeftHeader from "./../components/chat/LeftHeader";
import RightHeader from "./../components/chat/RightHeader";
import Keyboard from "../components/chat/Keyboard";
import messagesApi from "../api/messages";

function MessagesScreen({ navigation, route }) {
  let socket;
  const {
    contactName,
    contactProfileImage: contactImageUri,
    contactId,
  } = route.params;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const getMessagesApi = useApi(messagesApi.getMessages);

  const sendMessage = (message) => {
    //call the api
    setMessages([
      ...messages,
      { text: message, isFrom: true, date: Date.now() },
    ]);
  };
  const sendRecording = (uri) => {
    setMessages([
      ...messages,
      { audoiUri: uri, isFrom: true, date: Date.now() },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerRight: () => (
        <RightHeader
          contactImageUri={contactImageUri}
          contactName={contactName}
          onBack={() => navigation.goBack()}
        />
      ),
      headerLeft: () => <LeftHeader />,
      title: "",
    });
  });
  const initData = async () => {
    const messages = await getMessagesApi.request("user id");
    setMessages(messages);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <ImageBackground
      source={require("../assets/chatBackground.png")}
      style={styles.backgroundImage}
    >
      <View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
        >
          <View style={{ height: "91%", width: "100%" }}>
            <FlatList
              data={messages}
              keyExtractor={(message) => message.date.toString()}
              renderItem={({ item }) =>
                item.text ? (
                  <TextMessage meesageData={item} />
                ) : (
                  <AudioMessage {...item} />
                )
              }
            />
          </View>
          <Keyboard sendMessage={sendMessage} sendRecording={sendRecording} />
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default MessagesScreen;
