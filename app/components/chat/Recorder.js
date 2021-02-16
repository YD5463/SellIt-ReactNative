import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import { Audio } from "expo-av";

const maxTime = 120;

function Recorder({ setRecordingTime, sendRecording }) {
  const [audioRecord, setAudioRecord] = useState();
  const [duration, setDuration] = useState(0);

  const onStartRecord = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      recording.setOnRecordingStatusUpdate((status) => {
        if (status.isRecording) {
          const seconds = Math.round(status.durationMillis / 1000);
          setRecordingTime(seconds);
          setDuration(seconds);
          if (seconds >= maxTime) onStopRecord();
        } else setRecordingTime(0);
      });
      await recording.startAsync();
      setAudioRecord(recording);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const onStopRecord = async () => {
    setRecordingTime(0);
    try {
      await audioRecord.stopAndUnloadAsync();
      const uri = audioRecord.getURI();
      sendRecording(uri, duration);
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);
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
