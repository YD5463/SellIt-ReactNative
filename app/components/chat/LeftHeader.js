import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

function LeftHeader(props) {
  return (
    <View style={styles.leftHeader}>
      <TouchableWithoutFeedback>
        <Ionicons name="md-more" size={24} color="white" />
      </TouchableWithoutFeedback>
      <View style={styles.headerIcon}>
        <TouchableWithoutFeedback>
          <MaterialIcons name="call" size={24} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.headerIcon}>
        <TouchableWithoutFeedback>
          <MaterialCommunityIcons name="video" size={26} color="white" />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
  },
  headerIcon: {
    paddingLeft: 15,
  },
});

export default LeftHeader;
