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

const seedMessages = [
  { text: "how are you?", isFrom: true, date: "01-30-2020::11:30:22", _id: 1 },
  { text: "im great!!", isFrom: false, date: "01-30-2020::12:30:22", _id: 2 },
  {
    text: "did you start the assignment?",
    isFrom: false,
    date: "01-30-2020::12:30:55",
    _id: 3,
  },
  { text: "not yet...", isFrom: false, date: "01-30-2020::12:45:22", _id: 4 },
  { text: "bye bye!!!", isFrom: false, date: "01-30-2020::12:46:22", _id: 66 },
  { text: "see ya bro", isFrom: true, date: "01-30-2020::12:55:22", _id: 67 },
];

const initHeight = 45;

function MessagesScreen({ navigation }) {
  let socket;
  const contactName = "Avi Leve";
  const contactId = 123;
  const contactImageUri =
    "http://192.168.68.110:9000/assets/c9e425db06fe2c64c1921fe8a96229a1_full.jpg";
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    //call the api
    setMessages([
      ...messages,
      { text: draftMessage, isFrom: true, date: Date.now() },
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
  useEffect(() => {
    setMessages(seedMessages);
  }, []);
  return (
    <ImageBackground
      source={{
        uri:
          "https://i.pinimg.com/originals/79/5c/ab/795cabc4647f73b365e2e6eabd0f34dc.png",
      }}
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
