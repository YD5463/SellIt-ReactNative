import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

function RightHeader({
  onMore,
  onCall = () => {},
  onVideo = () => {},
  isLoopbackChat = true,
}) {
  const options = [
    {
      icon: "video",
      IconComponent: MaterialCommunityIcons,
      callback: onVideo,
      disable: isLoopbackChat,
    },
    {
      IconComponent: MaterialIcons,
      icon: "call",
      callback: onCall,
      disable: isLoopbackChat,
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
          <TouchableOpacity onPress={item.callback}>
            <View style={{ height: 25 }}>
              <item.IconComponent
                name={item.icon}
                size={25}
                color={`rgba(255, 255, 255, ${item.disable ? "0.5" : "1.0"})`}
              />
            </View>
          </TouchableOpacity>
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
