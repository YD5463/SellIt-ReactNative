import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";

function AudioMessage({ isFrom, audoiUri, date }) {
  const { colors } = useTheme();
  const [record, setRecord] = useState();
  const [playing, setPlaying] = useState();
  const playRecord = async () => {
    setPlaying(true);
    if (!record) {
      const { sound } = await Audio.Sound.createAsync(audoiUri);
      setRecord(sound);
      console.log("Playing Sound");
      await sound.playAsync();
    } else await record.playAsync();
  };
  const stopRecord = async () => {
    setPlaying(false);
    await record.stopAsync();
  };
  useEffect(() => {
    return () => record && record.unloadAsync();
  }, []);
  const isPlaying = () => {
    if (record && record.getStatusAsync().isDoneRecording) {
      stopRecord();
      return false;
    }
    return playing;
  };
  return (
    <View
      style={[
        styles.container,
        !isFrom
          ? { alignItems: "flex-end", backgroundColor: colors.white }
          : { backgroundColor: colors.primary },
      ]}
    >
      <TouchableOpacity onPress={!isPlaying() ? playRecord : stopRecord}>
        <View style={{ paddingLeft: 10 }}>
          <FontAwesome5
            name={!isPlaying() ? "play" : "stop"}
            size={28}
            color={colors.medium}
          />
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
});

export default AudioMessage;
