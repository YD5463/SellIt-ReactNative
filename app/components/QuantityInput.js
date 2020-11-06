import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Text from "./Text";

function QuantityInput({ onMinus, onPlus, quantity }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.boldLight }]}>
      <TouchableWithoutFeedback onPress={onMinus}>
        <AntDesign name="minus" size={20} color={colors.black} />
      </TouchableWithoutFeedback>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <TouchableWithoutFeedback onPress={onPlus}>
        <Entypo name="plus" size={20} color={colors.black} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  quantity: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default QuantityInput;
