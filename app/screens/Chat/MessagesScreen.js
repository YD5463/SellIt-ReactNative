import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Clipboard,
  Text,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import RightHeader from "../../components/chat/Headers/RightHeader";
import LeftHeader from "../../components/chat/Headers/LeftHeader";
import Keyboard from "../../components/chat/Keyboard";
import authStorage from "../../auth/storage";
import ActivityIndicator from "../../components/ActivityIndicator";
import RenderMessage from "../../components/chat/Messages/RenderMessage";
import moment from "moment";
import routes from "../../navigation/routes";
import contentTypes from "../../config/contentTypes";
// import io from "socket.io-client";
// import * as ImagePicker from "expo-image-picker";
import OnPickingRightHeader from "./../../components/chat/Headers/OnPickingRightHeader";
import location from "../../utility/location";
import MoreOptionsModal from "../../components/chat/MoreOptionsModal";
import OnSearchRightHeader from "../../components/chat/Headers/OnSearchRightHeader";
import OnSearchLeftHeader from "../../components/chat/Headers/OnSearchLeftHeader";
import BackArrow from "./../../components/BackArrow";
import Alert from "../../components/Alert";
import CheckBox from "@react-native-community/checkbox";
import colors from "../../config/colors";
import Background from "./../../components/chat/Background";
import cache from "../../utility/cache";
import settings from "../../config/settings";
// import io from "socket.io-client";

function MessagesScreen({ navigation, route }) {
  const [userData, setUserData] = useState();
  const [pickedMessages, setPickedMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { contactName, contactId, socket } = route.params;
  const contactImageUri = route.params.contactProfileImage
    ? route.params.contactProfileImage.url
    : null;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState(route.params.messages);
  const [loading, setLoading] = useState(false);
  const [allowCopy, setAllowCopy] = useState(true);
  const [moreVisible, setMoreVisible] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [highlightedMessages, setHighlightedMessages] = useState([]);
  const [searchIndex, setSearchIndex] = useState(0);
  const [highlightMode, setHighlightMode] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [blockOption, setBlackOption] = useState(false);
  const [background, setBackground] = useState();
  const messageListRef = useRef();

  //------------------------message sending----------------------
  const generateMessage = (contentType, content, other = {}) => {
    return {
      content: content,
      contentType: contentType,
      dateTime: new Date().getTime(),
      fromUserId: userData.userId,
      toUserId: contactId,
      isSent: false,
      ...other,
    };
  };
  const sendMessage = (message) => {
    const newMessage = generateMessage(contentTypes.TEXT, message);
    const messageIndex = messages.length;
    socket.emit("send message", newMessage, (res) => {
      //!make binary search based on the dateTime insted
      if (messages.length === messageIndex) {
        newMessage.isSent = true;
        setMessages([...messages, newMessage]);
      } else {
        messages[messageIndex].isSent = true;
        setMessages(messages);
      }
    });
    setMessages([...messages, newMessage]);
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
  // ----------------message picking------------------------
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
  const joinPickedMessages = () => {
    if (pickedMessages.length === 1) return pickedMessages[0].content;
    let joinedMessages = "";
    for (let message of pickedMessages) {
      const name =
        message.toUserId === userData.userId ? userData.name : contactName;
      const time = moment(message.dateTime).format("DD.M,HH:mm");
      joinedMessages += `[${time}] ${name}: ${message.content}\n`;
    }
    return joinedMessages;
  };
  const onCopy = () => {
    Clipboard.setString(joinPickedMessages());
    setPickedMessages([]);
  };
  //----------------options calbbacks--------------
  const onBackSearch = () => {
    setSearchMode(false);
    setHighlightedMessages([]);
    setHighlightMode(false);
    setSearchQuery("");
  };
  const onSubmitSearch = () => {
    setHighlightMode(true);
    const searchWords = searchQuery.split(" ");
    const indexes = [];
    messages.forEach((element, index) => {
      if (element.contentType !== contentTypes.TEXT) return;
      for (let word of searchWords) {
        if (element.content.includes(word)) return indexes.push(index);
      }
    });
    setHighlightedMessages(indexes);
  };
  const onScrollPrev = () => {
    if (highlightedMessages.length === searchIndex + 1) return;
    messageListRef.current.scrollToIndex({
      index: highlightedMessages[searchIndex + 1],
      animated: true,
    });
    setSearchIndex(searchIndex + 1);
  };
  const onScrollNext = () => {
    if (searchIndex - 1 < 0) return;
    messageListRef.current.scrollToIndex({
      index: highlightedMessages[searchIndex - 1],
      animated: true,
    });
    setSearchIndex(searchIndex - 1);
  };

  //-----------------headers-----------------------
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerRight: () => {
        if (searchMode)
          return (
            <OnSearchRightHeader
              scrollNext={onScrollNext}
              scrollPrev={onScrollPrev}
            />
          );
        return pickedMessages.length === 0 ? (
          <RightHeader onMore={() => setMoreVisible(true)} />
        ) : (
          <OnPickingRightHeader
            allowCopy={allowCopy}
            onDelete={onDeleteMessages}
            onCopy={onCopy}
          />
        );
      },
      headerLeft: () =>
        searchMode ? (
          <BackArrow onBack={onBackSearch} size={28} />
        ) : (
          <LeftHeader
            contactImageUri={contactImageUri}
            contactName={contactName}
            onBack={() => navigation.goBack()}
            pickedCount={pickedMessages.length}
            onResetPicked={() => setPickedMessages([])}
          />
        ),
      title: "",
      headerTitle: () =>
        searchMode && (
          <OnSearchLeftHeader
            searchVal={searchQuery}
            setSearchVal={setSearchQuery}
            onSubmit={onSubmitSearch}
          />
        ),
    });
  });
  //--------atchment modal options callbacks----------------------
  const onDocument = () =>
    navigation.navigate(routes.DOCUMENT_PICKER, {
      contactName,
      sendDocument,
    });
  const onCamera = () => navigation.navigate(routes.CAMERA, { sendImage });
  const onGallery = () => {
    console.log("onGallery");
    //use image picker here
  };
  const onAudio = () =>
    navigation.navigate(routes.AUDIO_PICKER, { contactName, sendAudio });

  const onLocation = async () => {
    console.log("onLocation");
    const curr_location = await location.getLocation();
    const newMessage = generateMessage(contentTypes.LOCATION, curr_location);
    setMessages([...messages, newMessage]);
  };
  const onContact = () =>
    navigation.navigate(routes.CONTACTS_LIST, { contactName, sendContact });
  //------------more options modal callbacks----------------
  const onSearch = () => setSearchMode(true);
  const onBackground = () => navigation.navigate(routes.CHANGE_BACKGROUND);
  const onReport = () => setReportVisible(true);
  //-----------init--------------------------
  const initBackground = async () => {
    const cachedBackground = await cache.get(settings.ChatBackground, false);
    setBackground(cachedBackground);
  };

  const initData = async () => {
    setLoading(true);
    const user = await authStorage.getUser();
    await initBackground();
    setUserData(user);
    setLoading(false);
  };
  useEffect(() => {
    socket.on("receive message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  useEffect(() => {
    initData();
    const unsubscribe = navigation.addListener("focus", () => {
      initBackground();
    });
    return unsubscribe;
  }, []);
  return (
    <Background background={background}>
      <>
        <ActivityIndicator visible={loading} />
        <View>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
          >
            <MoreOptionsModal
              visible={moreVisible}
              setVisible={setMoreVisible}
              Callbacks={{ onSearch, onBackground, onReport }}
            />
            <Alert
              visible={reportVisible}
              setVisible={setReportVisible}
              title={t("reportTitle")}
              subTitle={t("reportSubTitle")}
              confirmText={t("report")}
              onConfirm={() => console.log("report")}
              AdditionalComponent={() => (
                <View style={styles.blockView}>
                  <CheckBox
                    value={blockOption}
                    onValueChange={setBlackOption}
                  />
                  <Text style={styles.blockText}>{t("block")}</Text>
                </View>
              )}
            />
            <View style={{ height: "89%", width: "100%" }}>
              {userData && (
                <FlatList
                  ref={messageListRef}
                  onContentSizeChange={() =>
                    messageListRef.current.scrollToEnd()
                  }
                  data={messages}
                  keyExtractor={(message) => message.dateTime.toString()}
                  renderItem={({ item, index }) => (
                    <RenderMessage
                      searchQuery={
                        highlightMode && item.contentType === contentTypes.TEXT
                          ? searchQuery
                          : ""
                      }
                      item={item}
                      isFrom={userData.userId === item.fromUserId}
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
              )}
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
    </Background>
  );
}

const styles = StyleSheet.create({
  blockText: {
    color: colors.hardLight,
    fontSize: 16,
  },
  blockView: {
    flexDirection: "row",
    paddingTop: 15,
    marginRight: 25,
    alignItems: "center",
  },
});

export default MessagesScreen;
