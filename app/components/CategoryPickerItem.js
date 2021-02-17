import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";

function CategoryPickerItem({
  item,
  onPress,
  iconSize = 80,
  labelStyle = {},
  iconSizeRatio,
  additionalStyle = {},
}) {
  return (
    <View style={[styles.container, additionalStyle]}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={iconSize}
          IconComponent={item.IconComponent}
          iconSizeRatio={iconSizeRatio}
        />
      </TouchableOpacity>
      <Text style={[styles.label, labelStyle]}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
