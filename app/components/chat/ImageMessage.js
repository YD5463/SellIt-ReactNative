import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";
function ImageMessage({ meesageData, isFrom }) {
  return (
    <View style={styles.container}>
      <Image
        uri={meesageData.content}
        style={{ width: 60, height: 60, borderRadius: 15 }}
        tint="light"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ImageMessage;
