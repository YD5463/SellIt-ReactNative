import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

function BackArrow({ onBack, size = 24 }) {
  return (
    <TouchableOpacity onPress={onBack}>
      <View style={styles.container}>
        {Platform.OS === "ios" ? (
          <Ionicons name="ios-arrow-back" size={size} color="white" />
        ) : (
          <AntDesign name="arrowleft" size={size} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    alignSelf: "center",
    paddingRight: 5,
  },
});

export default BackArrow;
