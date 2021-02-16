import React from "react";
import { View, StyleSheet, Image } from "react-native";

function ImageMessage({ meesageData }) {
  return (
    <Image
      style={styles.container}
      source={{ uri: `data:image/jpg;base64,${meesageData.content}` }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    width: "85%",
    height: 300,
    borderRadius: 10,
  },
});

export default ImageMessage;
