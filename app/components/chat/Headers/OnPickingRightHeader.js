import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

function OnPickingRightHeader({
  onDelete,
  onForward,
  onReaply,
  allowCopy,
  onCopy,
}) {
  const options = [
    { icon: "forward", IconComponent: Entypo, callback: onForward },
    {
      icon: "content-copy",
      IconComponent: MaterialIcons,
      callback: onCopy,
      notAllow: !allowCopy,
    },
    { icon: "delete", IconComponent: MaterialIcons, callback: onDelete },
    { icon: "ios-star", IconComponent: Ionicons, callback: () => {} },
    { icon: "reply", IconComponent: Entypo, callback: onReaply },
  ];
  return (
    <View style={styles.container}>
      {options.map(
        (item, index) =>
          !item.notAllow && (
            <View
              style={index === options.length - 1 ? {} : styles.headerIcon}
              key={item.icon}
            >
              <TouchableOpacity onPress={item.callback}>
                <item.IconComponent name={item.icon} color="white" size={28} />
              </TouchableOpacity>
            </View>
          )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
  },
  headerIcon: {
    paddingRight: 15,
  },
});

export default OnPickingRightHeader;
