import React, { useState, useRef } from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Text from "../Text";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

const initHeight = 45;
const onRecordSize = 90;
function Keyboard({ sendMessage, sendRecording }) {
  const { colors } = useTheme();
  const [draftMessage, setDraftMessage] = useState("");
  const [recording, setRecording] = useState();
  const [secondsRecord, setSecondsRecord] = useState(0);
  const animatedMicrophone = useRef(new Animated.Value(50)).current;
  const [counterInterval, setCounterInterval] = useState();
  let sec = 0;
  const { t } = useTranslation();
  const startRecording = async () => {
    //countRecordSecondsTime();
    setSecondsRecord(0);
    sec = 0;
    Animated.timing(animatedMicrophone, {
      toValue: 100,
      duration: 1500,
    }).start();
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
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
    const counter = setInterval(() => {
      setSecondsRecord(++sec);
    }, 1000);
    setCounterInterval(counter);
  };
  const stopRecording = async () => {
    Animated.timing(animatedMicrophone, {
      toValue: 50,
      duration: 1500,
    }).start();
    if (counterInterval) clearInterval(counterInterval);
    setCounterInterval(undefined);
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    sendRecording(uri);
    console.log("Recording stopped and stored at", uri);
  };
  // console.log(animatedMicrophone);
  const formatTime = (time) => {
    return `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
      time % 60
    ).padStart(2, "0")}`;
  };
  return (
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
          {recording ? (
            <Text style={{ color: colors.medium }}>
              {formatTime(secondsRecord)}
            </Text>
          ) : (
            <TextInput
              placeholder={t("keyboardPlaceholder")}
              placeholderTextColor={colors.medium}
              onChangeText={(text) => setDraftMessage(text)}
              value={draftMessage}
              selectionColor={colors.primary}
              multiline
              numberOfLines={10}
              style={{ maxHeight: 5 * initHeight }}
            />
          )}
        </View>

        <TouchableOpacity>
          <Entypo name="attachment" size={24} color={colors.medium} />
        </TouchableOpacity>
        <View style={{ paddingLeft: 15, paddingRight: 10 }}>
          <TouchableOpacity>
            <FontAwesome name="camera" size={24} color={colors.medium} />
          </TouchableOpacity>
        </View>
      </View>
      {draftMessage.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            sendMessage(draftMessage);
            setDraftMessage("");
          }}
        >
          <View style={[styles.micophone, { backgroundColor: colors.primary }]}>
            <MaterialCommunityIcons name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording}>
          <Animated.View
            style={[
              styles.micophone,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <MaterialCommunityIcons name="microphone" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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

export default Keyboard;
