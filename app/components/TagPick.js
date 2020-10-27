import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Text from "./Text";
import { useTheme } from "react-native-paper";

function TagPick({ tagName, onPress }) {
  const [picked, setPicked] = useState(false);
  const { colors } = useTheme();
  const backgroundColor = picked ? colors.secondary : colors.white;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setPicked(!picked);
        onPress(tagName, picked);
      }}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.tag}>{tagName}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginLeft: 0,
  },
  tag: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
  },
});

export default TagPick;
