import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

function ImageIdicator({ current, numElements }) {
  return (
    <View style={styles.container}>
      {[...Array(numElements)].map((e, i) => {
        const backgroundColor = i === current ? colors.blue : colors.medium;
        return (
          <View
            style={[styles.elementIndictor, { backgroundColor }]}
            key={i}
          ></View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  elementIndictor: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default ImageIdicator;
