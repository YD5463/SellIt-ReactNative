import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";

function Message({ isFrom, meesageData }) {
  return (
    <View style={[styles.container, isFrom ? { alignItems: "flex-end" } : {}]}>
      <View style={styles.messageView}>
        <Text style={styles.message}>{meesageData.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  messageView: {
    width: 100,
    height: 50,
    alignItems: "center",
  },
  message: {
    paddingRight: 10,
  },
});

export default Message;
