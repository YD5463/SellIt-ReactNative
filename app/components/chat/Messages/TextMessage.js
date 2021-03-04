import React from "react";
import { StyleSheet } from "react-native";
import Highlighter from "react-native-highlight-words";
import { useTheme } from "react-native-paper";
import Hyperlink from "react-native-hyperlink";
import Text from "../../Text";

function TextMessage({ meesageData, searchQuery }) {
  const { content } = meesageData;
  const { colors } = useTheme();
  return (
    <Hyperlink linkDefault={true} linkStyle={styles.link}>
      <Highlighter
        highlightStyle={{ backgroundColor: "yellow" }}
        searchWords={searchQuery.split(" ")}
        textToHighlight={content}
        style={styles.message}
        textComponent={Text}
      ></Highlighter>
    </Hyperlink>
  );
}

const styles = StyleSheet.create({
  message: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
  },
  link: {
    color: "#526FFF",
    borderBottomColor: "#526FFF",
    borderBottomWidth: 0.2,
  },
});

export default TextMessage;
