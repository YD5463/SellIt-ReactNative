import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import useApi from "./../hooks/useApi";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Text from "../components/Text";
import TextMessage from "../components/chat/TextMessage";
import { TextInput } from "react-native";
//import { io } from "socket.io-client";
import { Audio } from "expo-av";
import AudioMessage from "./../components/chat/AudioMessage";
import LeftHeader from "./../components/chat/LeftHeader";
import RightHeader from "./../components/chat/RightHeader";

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
  const [draftMessage, setDraftMessage] = useState("");
  const [recording, setRecording] = useState();
  const [secondsRecord, setSecondsRecord] = useState(0);

  const sendMessage = () => {
    //call the api
    setMessages([
      ...messages,
      { text: draftMessage, isFrom: true, date: Date.now() },
    ]);
    setDraftMessage("");
  };

  const startRecording = async () => {
    countRecordSecondsTime();
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };
  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    clearInterval(timer);
    setTimer(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setMessages([
      ...messages,
      { audoiUri: uri, isFrom: true, date: Date.now() },
    ]);
    console.log("Recording stopped and stored at", uri);
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
          <View style={styles.allKeyboard}>
            <View style={[styles.keyboard, { height: initHeight }]}>
              <View style={{ paddingRight: 10 }}>
                <TouchableOpacity>
                  <MaterialIcons
                    name="insert-emoticon"
                    color={colors.medium}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder={"Type a message..."}
                  placeholderTextColor={colors.medium}
                  onChangeText={(text) => setDraftMessage(text)}
                  value={draftMessage}
                  selectionColor={colors.primary}
                  multiline
                  numberOfLines={10}
                  style={{ maxHeight: 5 * initHeight }}
                />
              </View>
            </View>
            {recording && <Text>{secondsRecord}</Text>}
            {draftMessage.length > 0 ? (
              <TouchableOpacity onPress={sendMessage}>
                <View
                  style={[
                    styles.micophone,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <MaterialCommunityIcons name="send" size={24} color="white" />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPressIn={startRecording}
                onPressOut={stopRecording}
              >
                <View
                  style={[
                    styles.micophone,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="microphone"
                    size={24}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
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
  keyboard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "80%",
    borderRadius: 40,
    paddingLeft: 8,
    paddingRight: 8,
  },
  allKeyboard: {
    paddingLeft: 10,
    flexDirection: "row",
  },
  micophone: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default MessagesScreen;
