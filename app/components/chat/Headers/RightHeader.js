import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
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
        <TouchableHighlight
          onPress={item.callback}
          key={item.icon}
          style={styles.headerIcon}
          underlayColor={"#F5CCCD"}
          activeOpacity={0.7}
        >
          <item.IconComponent
            name={item.icon}
            size={25}
            color={`rgba(255, 255, 255, ${item.disable ? "0.5" : "1.0"})`}
          />
        </TouchableHighlight>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RightHeader;
