import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

function ListItemSeparator({ colorName = "light", height = 1 }) {
  const { colors } = useTheme();
  return (
    <View
      style={{ backgroundColor: colors[colorName], height, width: "100%" }}
    />
  );
}

export default ListItemSeparator;
