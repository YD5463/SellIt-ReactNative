import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import defaultStyles from "../config/styles";
function SearchBar({
  onChange,
  search,
  width = "100%",
  backgroundColor = "white",
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor, width: width },
      ]}
    >
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
    padding: 5,
  },
});

export default SearchBar;
