import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

function GoBackButton({ onPress }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.goBack, { borderColor: colors.turquoise }]}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="ios-arrow-back" size={24} color={colors.turquoise} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  goBack: {
    width: 40,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.4,
    marginBottom: 17,
  },
});

export default GoBackButton;
