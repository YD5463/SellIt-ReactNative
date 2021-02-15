import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
// import { Audio } from "expo-av";
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from "react-native-audio-recorder-player";
import colors from "../../config/colors";

function AudioMessage({ isFrom, audoiUri: audioUri, date }) {
  const { colors } = useTheme();
  const [record, setRecord] = useState();
  const [playing, setPlaying] = useState();
  console.log(audioUri);

  return (
    <View
      style={[
        styles.container,
        !isFrom ? styles.toMessage : styles.fromMessage,
      ]}
    >
      <TouchableOpacity>
        <View style={{ paddingLeft: 10 }}>
          <FontAwesome5 name={"play"} size={28} color={colors.medium} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
  },
  toMessage: {
    alignItems: "flex-end",
    backgroundColor: colors.white,
  },
  fromMessage: {
    backgroundColor: colors.primary,
  },
});

export default AudioMessage;
