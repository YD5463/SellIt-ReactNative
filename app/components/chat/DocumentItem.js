import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../Text";

function DocumentItem({ documentData, addItem, removeItem }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default DocumentItem;
