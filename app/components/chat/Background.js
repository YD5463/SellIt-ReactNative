import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

function Background({ background, children }) {
  return background && background.isColor ? (
    <View style={[styles.container, { backgroundColor: background.image }]}>
      {children}
    </View>
  ) : (
    <ImageBackground
      source={
        background
          ? { uri: background.image }
          : require(`../../assets/chatBackground.jpg`)
      }
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default Background;
