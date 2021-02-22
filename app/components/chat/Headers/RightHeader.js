import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

function RightHeader(props) {
  return (
    <View style={styles.rightHeader}>
      <View style={styles.headerIcon}>
        <TouchableWithoutFeedback>
          <MaterialCommunityIcons name="video" size={26} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.headerIcon}>
        <TouchableWithoutFeedback>
          <MaterialIcons name="call" size={24} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback>
        <Ionicons name="md-more" size={24} color="white" />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
  },
  headerIcon: {
    paddingRight: 15,
  },
});

export default RightHeader;
