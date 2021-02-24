import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

function RightHeader({ onMore, onCall = () => {}, onVideo = () => {} }) {
  const options = [
    {
      icon: "video",
      IconComponent: MaterialCommunityIcons,
      callback: onVideo,
    },
    {
      IconComponent: MaterialIcons,
      icon: "call",
      callback: onCall,
    },
    {
      IconComponent: Ionicons,
      icon: "md-more",
      callback: onMore,
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
            <View style={{ height: 25 }}>
              <item.IconComponent name={item.icon} size={25} color="white" />
            </View>
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
    paddingRight: 20,
  },
  headerIcon: {
    paddingRight: 25,
  },
});

export default RightHeader;
