import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import defaultStyles from "../config/styles";
function SearchBar({ onChange, search }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <MaterialCommunityIcons name="magnify" size={35} color={colors.medium} />
      <TextInput
        onChangeText={onChange}
        value={search}
        style={defaultStyles.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flexDirection: "row",
    width: "100%",
    padding: 5,
  },
});

export default SearchBar;
