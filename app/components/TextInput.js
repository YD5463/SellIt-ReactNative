import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import { useTheme } from "react-native-paper";

function AppTextInput({
  icon,
  width = "100%",
  color = "light",
  iconSize = 20,
  ...otherProps
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { width, backgroundColor: colors[color] }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={iconSize}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
