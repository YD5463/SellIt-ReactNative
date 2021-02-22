import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Clipboard,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import RightHeader from "../../components/chat/Headers/RightHeader";
import LeftHeader from "../../components/chat/Headers/LeftHeader";
import Keyboard from "../../components/chat/Keyboard";
import messagesApi from "../../api/messages";
import authStorage from "../../auth/storage";
import ActivityIndicator from "../../components/ActivityIndicator";
import RenderMessage from "../../components/chat/Messages/RenderMessage";
import moment from "moment";
import routes from "../../navigation/routes";
import contentTypes from "../../config/contentTypes";
// import io from "socket.io-client";
// import * as ImagePicker from "expo-image-picker";
import OnPickingRightHeader from "./../../components/chat/Headers/OnPickingRightHeader";
// import Clipboard from "@react-native-clipboard/clipboard";

function MessagesScreen({ navigation, route }) {
  // const [socket, setSocket] = useState();
  const [userId, setUserId] = useState();
  const [pickedMessages, setPickedMessages] = useState([]);

  const { contactName, contactId } = route.params;
  const contactImageUri = route.params.contactProfileImage
    ? route.params.contactProfileImage.url
    : null;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allowCopy, setAllowCopy] = useState(true);

  const messageListRef = useRef();

  const generateMessage = (contentType, content, other = {}) => {
    return {
      content: content,
      contentType: contentType,
      dateTime: moment().toString(),
      fromUserId: userId,
      toUserId: contactId,
      ...other,
    };
  };
  const sendMessage = (message) => {
    //call the api
    const newMessage = generateMessage(contentTypes.TEXT, message);
    setMessages([...messages, newMessage]);
    // socket.emit("chat message", { message, contactId });
  };
  const sendRecording = (uri, duration) => {
    console.log("duration: ", duration);
    const newMessage = generateMessage(contentTypes.AUDIO, uri, {
      duration: duration,
    });
    setMessages([...messages, newMessage]);
    // socket.emit("chat message", "this.state.chatMessage");
  };
  const sendImage = (imageData) => {
    const newMessage = generateMessage(contentTypes.IMAGE, imageData.uri);
    setMessages([...messages, newMessage]);
  };
  const sendAudio = (audioDataList) => {
    const newMessages = [];
    for (let audioData of audioDataList) {
      //todo: add custom music audio message
      newMessages.push(
        generateMessage(contentTypes.AUDIO, audioData.uri, {
          name: audioData.filename.slice(0, -4),
          duration: audioData.duration,
        })
      );
    }
    setMessages([...messages, ...newMessages]);
  };
  const sendContact = (contactListData) => {
    const newMessages = [];
    for (let contactData of contactListData) {
      newMessages.push(
        generateMessage(contentTypes.CONTACT, contactData.name, contactData)
      );
    }
    setMessages([...messages, ...newMessages]);
  };
  const sendDocument = (documentData) => {};
  const onPickMessage = (item) => {
    if (item.contentType !== contentTypes.TEXT) setAllowCopy(false);
    setPickedMessages([...pickedMessages, item]);
  };
  const onUnpickMessage = (item) => {
    setAllowCopy(true);
    setPickedMessages(
      pickedMessages.filter((m) => {
        if (m.contentType !== contentTypes.TEXT) setAllowCopy(false);
        return m.content !== item.content || m.dateTime !== item.dateTime;
      })
    );
  };

  const onDeleteMessages = () => {
    //call api with picked messaegs array...
    setMessages(messages.filter((m) => !pickedMessages.includes(m)));
    setPickedMessages([]);
  };
  const onCopy = () => {
    Clipboard.setString("hello world");
    setPickedMessages([]);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerRight: () =>
        pickedMessages.length === 0 ? (
          <RightHeader />
        ) : (
          <OnPickingRightHeader
            allowCopy={allowCopy}
            onDelete={onDeleteMessages}
            onCopy={onCopy}
          />
        ),
      headerLeft: () => (
        <LeftHeader
          contactImageUri={contactImageUri}
          contactName={contactName}
          onBack={() => navigation.goBack()}
          pickedCount={pickedMessages.length}
          onResetPicked={() => setPickedMessages([])}
        />
      ),
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
    navigation.navigate(routes.DOCUMENT_PICKER, {
      contactName,
      sendDocument,
    });
  };
  const onCamera = () => {
    console.log("onCamera");
    navigation.navigate(routes.CAMERA, { sendImage });
  };
  const onGallery = () => {
    console.log("onGallery");
    //use image picker here
  };
  const onAudio = () => {
    console.log("onAudio");
    navigation.navigate(routes.AUDIO_PICKER, { contactName, sendAudio });
  };
  const onLocation = () => {};
  const onContact = () => {
    navigation.navigate(routes.CONTACTS_LIST, { contactName, sendContact });
  };

  return (
    <ImageBackground
      source={require("../../assets/chatBackground.png")}
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
                    pickMessage={onPickMessage}
                    unpickMessage={onUnpickMessage}
                    isPicked={pickedMessages.includes(item)}
                    pickedCount={pickedMessages.length}
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
