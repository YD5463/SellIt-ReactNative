import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import Text from "./Text";
import { TouchableOpacity } from "react-native-gesture-handler";

function AddElementInput({ onPress, elementName }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor: colors.light }]}>
        <AntDesign name="pluscircle" color={colors.pink} size={40} />
        <Text style={styles.text}>{`Add New ${elementName}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    height: 60,
    width: "100%",
    marginBottom: 7,
    borderRadius: 25,
  },
  text: {
    fontSize: 21,
    paddingLeft: 10,
  },
});

export default AddElementInput;
