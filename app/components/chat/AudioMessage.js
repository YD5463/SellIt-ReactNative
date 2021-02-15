import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import colors from "../../config/colors";
import Text from "../Text";

function AudioMessage({ content, dateTime, isFrom = false }) {
  const { colors } = useTheme();
  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  console.log(content);

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: content });
    sound.setOnPlaybackStatusUpdate((status) =>
      setPosition(status.positionMillis / status.durationMillis)
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  const pauseSound = () => {
    sound.pauseAsync();
  };
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  let animation = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: position,
      duration: 50,
    }).start();
  }, [position]);

  const left = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });
  return (
    <View
      style={[
        styles.container,
        !isFrom ? styles.toMessage : styles.fromMessage,
      ]}
    >
      <View style={styles.progressBar}>
        <Animated.View style={[styles.dot, { left: left }]} />
      </View>

      <View style={styles.btn}>
        <TouchableOpacity
          onPress={!sound || !sound.isPlaying ? playSound : pauseSound}
        >
          <FontAwesome5
            name={!sound || !sound.isPlaying ? "play" : "stop"}
            size={28}
            color={colors.medium}
          />
        </TouchableOpacity>
      </View>
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
    paddingRight: 5,
    paddingLeft: 10,
  },
  toMessage: {
    alignItems: "flex-end",
    backgroundColor: colors.white,
  },
  fromMessage: {
    backgroundColor: colors.primary,
  },
  progressBar: {
    flexDirection: "row",
    height: 3,
    width: "70%",
    backgroundColor: colors.medium,
    alignSelf: "center",
  },
  btn: {
    paddingLeft: 10,
    justifyContent: "center",
  },
  dot: {
    width: 13,
    height: 13,
    backgroundColor: colors.medium,
    borderRadius: 8,
    position: "absolute",
    top: -5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AudioMessage;
