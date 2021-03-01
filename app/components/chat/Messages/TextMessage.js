import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../Text";
import Highlighter from "react-native-highlight-words";
import { useTheme } from "react-native-paper";
import colors from "../../../config/colors";

function TextMessage({ meesageData, searchQuery }) {
  const { content } = meesageData;

  const { colors } = useTheme();
  return (
    <Highlighter
      highlightStyle={{ backgroundColor: "yellow" }}
      searchWords={searchQuery.split(" ")}
      textToHighlight={content}
      style={styles.message}
      textComponent={Text}
    />
  );
}

const styles = StyleSheet.create({
  message: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
  },
});

export default TextMessage;
