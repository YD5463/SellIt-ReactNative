import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import { useTheme } from "react-native-paper";

function TextMessage({ meesageData }) {
  const { isFrom, text } = meesageData;
  const { colors } = useTheme();
  return (
    <View style={[styles.container, !isFrom ? { alignItems: "flex-end" } : {}]}>
      <View
        style={[
          styles.messageView,
          { backgroundColor: isFrom ? colors.primary : colors.white },
        ]}
      >
        <Text style={styles.message}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingTop: 15,
  },
  messageView: {
    width: "50%",
    height: 35,
    borderRadius: 10,
    paddingLeft: 10,
  },
  message: {
    paddingRight: 10,
  },
});

export default TextMessage;
