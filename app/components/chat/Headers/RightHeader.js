import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

function RightHeader(props) {
  const options = [
    {
      icon: "video",
      IconComponent: MaterialCommunityIcons,
      callback: () => {},
    },
    {
      IconComponent: MaterialIcons,
      icon: "call",
      callback: () => {},
    },
    {
      IconComponent: Ionicons,
      icon: "md-more",
      callback: () => {},
    },
  ];
  return (
    <View style={styles.rightHeader}>
      {options.map((item, index) => (
        <View
          style={index === options.length - 1 ? {} : styles.headerIcon}
          key={item.icon}
        >
          <TouchableWithoutFeedback onPress={item.callback}>
            <item.IconComponent name={item.icon} size={25} color="white" />
          </TouchableWithoutFeedback>
        </View>
      ))}
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
