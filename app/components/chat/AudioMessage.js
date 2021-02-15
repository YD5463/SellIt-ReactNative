import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import colors from "../../config/colors";

function AudioMessage({ content, dateTime, isFrom = false }) {
  const { colors } = useTheme();
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState();
  console.log(content);

  const playSound = async () => {
    setPlaying(true);
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: content });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  const pauseSound = () => {
    setPlaying(false);
  };
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View
      style={[
        styles.container,
        !isFrom ? styles.toMessage : styles.fromMessage,
      ]}
    >
      <TouchableOpacity onPress={playSound}>
        <View style={{ paddingLeft: 10 }}>
          <FontAwesome5
            name={!sound ? "play" : "stop"}
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
  toMessage: {
    alignItems: "flex-end",
    backgroundColor: colors.white,
  },
  fromMessage: {
    backgroundColor: colors.primary,
  },
});

export default AudioMessage;
