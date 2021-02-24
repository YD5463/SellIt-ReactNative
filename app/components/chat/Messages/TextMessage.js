import React from "react";
import { View, StyleSheet } from "react-native";
// import Text from "../../Text";
import Highlighter from "react-native-highlight-words";
import { useTheme } from "react-native-paper";
import colors from "../../../config/colors";

function TextMessage({ meesageData, searchQuery }) {
  const { content } = meesageData;

  const { colors } = useTheme();
  return (
    <View style={styles.messageView}>
      <Highlighter
        highlightStyle={{ backgroundColor: "yellow" }}
        searchWords={searchQuery.split(" ")}
        textToHighlight={content}
        style={styles.message}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  messageView: {
    alignItems: "center",
    flexDirection: "row",
  },
  message: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
  },
  messageTime: {
    fontSize: 13,
    color: colors.medium,
    alignSelf: "flex-end",
    marginRight: 8,
    marginLeft: 5,
  },
});

export default TextMessage;
