import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";
import defaultStyles from "../config/styles";

function AppText({ children, style, ...otherProps }) {
  const { colors } = useTheme();
  return (
    <Text
      style={[defaultStyles.text, { color: colors.font }, style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

export default AppText;
