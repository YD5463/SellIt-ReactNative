import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useTheme } from "react-native-paper";

function AppButton({ title, onPress, color = "primary", borderRadius = 25 }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color], borderRadius }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: colors.white }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
