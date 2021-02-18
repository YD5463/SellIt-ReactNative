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
import TextMessage from "../../components/chat/TextMessage";
import useApi from "../../hooks/useApi";
import AudioMessage from "../../components/chat/AudioMessage";
import LeftHeader from "../../components/chat/LeftHeader";
import RightHeader from "../../components/chat/RightHeader";
import Keyboard from "../../components/chat/Keyboard";
import messagesApi from "../../api/messages";
// import io from "socket.io-client";
import authStorage from "../../auth/storage";
import ActivityIndicator from "../../components/ActivityIndicator";
import RenderMessage from "../../components/chat/RenderMessage";
import moment from "moment";
import routes from "../../navigation/routes";
import ImageMessage from "../../components/chat/ImageMessage";

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

  const addMessage = (contentType, content, other = {}) => {
    setMessages([
      ...messages,
      {
        content: content,
        contentType: contentType,
        dateTime: moment().toString(),
        fromUserId: userId,
        toUserId: contactId,
        ...other,
      },
    ]);
  };
  const sendMessage = (message) => {
    //call the api
    addMessage("text", message);
    // socket.emit("chat message", { message, contactId });
  };
  const sendRecording = (uri, duration) => {
    console.log("duration: ", duration);
    addMessage("audio", uri, { duration: duration });
    // socket.emit("chat message", "this.state.chatMessage");
  };
  const sendImage = (imageData) => {
    addMessage("image", imageData.base64);
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
  const onDocument = () => {
    console.log("onDocument");
  };
  const onCamera = () => {
    console.log("onCamera");
  };
  const onGallery = () => {
    console.log("onGallery");
  };
  const onAudio = () => {
    console.log("onAudio");
  };
  const onLocation = () => {};
  const onContact = () => {};
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
            <View style={{ height: "89%", width: "100%" }}>
              <FlatList
                ref={messageListRef}
                onContentSizeChange={() => messageListRef.current.scrollToEnd()}
                data={messages}
                keyExtractor={(message) => message.dateTime}
                renderItem={({ item, index }) => (
                  <RenderMessage
                    item={item}
                    userId={userId}
                    lastMessageDate={
                      index !== 0 ? messages[index - 1].dateTime : null
                    }
                  />
                )}
              />
            </View>
            <Keyboard
              sendMessage={sendMessage}
              sendRecording={sendRecording}
              onPressCamera={() =>
                navigation.navigate(routes.CAMERA, { sendImage })
              }
              buttonsCallback={{
                onDocument,
                onCamera,
                onGallery,
                onAudio,
                onLocation,
                onContact,
              }}
            />
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
