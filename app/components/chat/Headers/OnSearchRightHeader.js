import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function OnSearchRightHeader({ scrollNext, scrollPrev }) {
  return (
    <View style={styles.container}>
      <View style={{ paddingRight: 20 }}>
        <TouchableOpacity onPress={scrollNext}>
          <MaterialIcons name="keyboard-arrow-up" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={scrollPrev}>
        <MaterialIcons name="keyboard-arrow-down" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 15,
  },
});

export default OnSearchRightHeader;
