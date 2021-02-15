import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
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
import Recorder from "./Recorder";

const initHeight = 45;

function Keyboard({ sendMessage, sendRecording }) {
  const { colors } = useTheme();
  const [draftMessage, setDraftMessage] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);

  let sec = 0;
  const { t } = useTranslation();

  const onSendTextMessage = () => {
    sendMessage(draftMessage);
    setDraftMessage("");
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
          {recordingTime !== 0 ? (
            <View>
              <Text>{recordingTime}</Text>
            </View>
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
        <TouchableOpacity onPress={onSendTextMessage}>
          <View style={[styles.micophone, { backgroundColor: colors.primary }]}>
            <MaterialCommunityIcons name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
      ) : (
        <Recorder
          setRecording={setRecordingTime}
          sendRecording={sendRecording}
        />
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
});

export default Keyboard;
