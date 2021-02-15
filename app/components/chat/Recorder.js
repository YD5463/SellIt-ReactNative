import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import { Audio } from "expo-av";

function Recorder({ setRecording, sendRecording }) {
  const [audioRecord, setAudioRecord] = useState();

  const onStartRecord = async () => {
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
    setAudioRecord(recording);
  };

  const onStopRecord = async () => {
    setRecording(0);
    await audioRecord.stopAndUnloadAsync();
    const uri = audioRecord.getURI();
    sendRecording(uri);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPressIn={onStartRecord} onPressOut={onStopRecord}>
        <View style={styles.micophone}>
          <MaterialCommunityIcons name="microphone" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  micophone: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
});

export default Recorder;
