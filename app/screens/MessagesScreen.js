import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
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
import AudioMessage from "./../components/chat/AudioMessage";
import LeftHeader from "./../components/chat/LeftHeader";
import RightHeader from "./../components/chat/RightHeader";
import Keyboard from "../components/chat/Keyboard";
import messagesApi from "../api/messages";
import io from "socket.io-client";
import authStorage from "../auth/storage";

function MessagesScreen({ navigation, route }) {
  const [socket, setSocket] = useState();
  const { contactName, contactId } = route.params;
  const contactImageUri = route.params.contactProfileImage.url;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const getMessagesApi = useApi(messagesApi.getMessages);
  const messageListRef = useRef();

  const sendMessage = (message) => {
    //call the api
    const newMessages = [
      ...messages,
      { text: message, isFrom: true, date: Date.now() },
    ];
    setMessages(newMessages);
    socket.emit("chat message", message);
  };
  const sendRecording = (uri) => {
    setMessages([
      ...messages,
      { audoiUri: uri, isFrom: true, date: Date.now() },
    ]);
    // socket.emit("chat message", "this.state.chatMessage");
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
    const token = await authStorage.getToken();
    const sock = io("http://192.168.68.110:9000", {
      query: { token, peerId: contactId },
    });
    const messages = await getMessagesApi.request("user id");
    setMessages(messages);
    sock.on("chat message", (msg) => {
      const newMessages = [
        ...messages,
        { text: msg, isFrom: false, date: Date.now() },
      ];
      setMessages(newMessages);
    });
    setSocket(sock);
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
              ref={messageListRef}
              onContentSizeChange={() => messageListRef.current.scrollToEnd()}
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
