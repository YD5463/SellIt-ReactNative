import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import Button from "../components/Button";
import routes from "../navigation/routes";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { Audio } from "expo-av";

function WelcomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [song, setSong] = useState();
  const playSong = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/song.mp3"),
      {
        shouldPlay: true,
        isLooping: true,
      }
    );
    setSong(sound);
  };
  useEffect(() => {
    // playSong();
    return () => {
      if (song) song.stopAsync();
    };
  }, []);

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title={t("login")}
          onPress={() => {
            song.stopAsync();
            navigation.navigate(routes.LOGIN);
          }}
        />
        <Button
          title={t("register")}
          color="secondary"
          onPress={() => {
            song.stopAsync();
            navigation.navigate(routes.REGISTER);
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
