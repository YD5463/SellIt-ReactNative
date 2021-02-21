import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import colors from "../../../config/colors";
import Text from "../../Text";
import helper from "../../../utility/helper";

function AudioMessage({ content, duration }) {
  const { colors } = useTheme();
  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // console.log(content);

  const playSound = async () => {
    setIsPlaying(true);
    if (!sound) {
      console.log("Loading Sound");
      const { sound: createdSound } = await Audio.Sound.createAsync({
        uri: content,
      });
      createdSound.setOnPlaybackStatusUpdate((status) => {
        setPosition(status.positionMillis / status.durationMillis);
      });
      setSound(createdSound);
      await createdSound.playAsync();
    } else {
      console.log("Playing Sound");
      await sound.playAsync();
    }
  };

  const pauseSound = () => {
    setIsPlaying(false);
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
  const resetSound = async () => {
    await sound.setPositionAsync(0);
    await sound.pauseAsync();
  };
  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: position,
      duration: 10,
    }).start();
    if (position === 1) {
      resetSound();
      setPosition(0);
      setIsPlaying(false);
    }
  }, [position]);

  const left = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });
  return (
    <View style={[styles.container]}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.dot, { left: left }]} />
      </View>

      <View style={styles.btn}>
        <TouchableOpacity onPress={!isPlaying ? playSound : pauseSound}>
          <FontAwesome5
            name={!isPlaying ? "play" : "stop"}
            size={28}
            color={colors.medium}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.duration}>
        <Text style={{ fontSize: 13, color: "#404040" }}>
          {helper.dispalyTimeFromSeconds(duration)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 5,
    paddingLeft: 10,
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
  duration: {
    alignSelf: "flex-end",
    left: 3,
    bottom: -17,
    position: "absolute",
  },
});

export default AudioMessage;
