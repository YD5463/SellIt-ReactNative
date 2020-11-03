import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import Text from "./Text";

function Cart({ onPress, elementsNumber }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.contiener, { backgroundColor: colors.boldLight }]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <MaterialCommunityIcons name="cart-outline" size={32} color="white" />
      </TouchableWithoutFeedback>
      <View style={[styles.number, { backgroundColor: colors.blue }]}>
        <Text style={{ color: colors.white }}>{elementsNumber}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contiener: {
    width: 50,
    height: 50,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  number: {
    borderRadius: 15,
    width: 25,
    height: 25,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -6,
    right: -5,
  },
});

export default Cart;
