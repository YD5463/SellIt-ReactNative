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
// import io from "socket.io-client";
import authStorage from "../auth/storage";
import ActivityIndicator from "../components/ActivityIndicator";

function MessagesScreen({ navigation, route }) {
  const [socket, setSocket] = useState();
  const [userId, setUserId] = useState();

  const { contactName, contactId } = route.params;
  const contactImageUri = route.params.contactProfileImage
    ? route.params.contactProfileImage.url
    : null;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messageListRef = useRef();

  const sendMessage = (message) => {
    //call the api
    const newMessages = [
      ...messages,
      {
        content: message,
        contentType: "text",
        fromUserId: userId,
        toUserId: contactId,
        dateTime: Date.now(),
      },
    ];
    setMessages(newMessages);
    // socket.emit("chat message", { message, contactId });
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
    const user = await authStorage.getUser();
    setUserId(user.userId);
    setLoading(true);
    const reponse = await messagesApi.getMessages(contactId);
    setLoading(false);
    if (reponse.ok) setMessages(reponse.data);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <ImageBackground
      source={require("../assets/chatBackground.png")}
      style={styles.backgroundImage}
    >
      <>
        <ActivityIndicator visible={loading} />
        <View>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
          >
            <View style={{ height: "91%", width: "100%" }}>
              <AudioMessage
                userId={userId}
                audoiUri="https://voca.ro/1kNy14XL2EuZ"
                date={new Date()}
              />
              <FlatList
                ref={messageListRef}
                onContentSizeChange={() => messageListRef.current.scrollToEnd()}
                data={messages}
                keyExtractor={(message) => message.dateTime}
                renderItem={({ item, index }) =>
                  item.contentType === "text" ? (
                    <TextMessage
                      userId={userId}
                      meesageData={item}
                      lastMessageDate={
                        index !== 0 ? messages[index - 1].dateTime : null
                      }
                    />
                  ) : (
                    <AudioMessage userId={userId} {...item} />
                  )
                }
              />
            </View>
            <Keyboard sendMessage={sendMessage} sendRecording={sendRecording} />
          </KeyboardAvoidingView>
        </View>
      </>
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
