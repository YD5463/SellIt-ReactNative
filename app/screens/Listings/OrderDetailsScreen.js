import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Screen from "./../../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function OrderDetailsScreen({ navigation, route }) {
  const { orderData } = route.params;
  return (
    <Screen style={styles.container}>
      <View></View>
      <View style={styles.address}>
        <View style={{ padding: 8 }}>
          <MaterialCommunityIcons name="home" color={colors.medium} size={30} />
        </View>
        <View>
          <Text>Delivery Address</Text>
          <Text>{orderData.address}</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
  },
  address: {
    borderRadius: 10,
    backgroundColor: colors.white,
    width: "100%",
    flexDirection: "row",
  },
});

export default OrderDetailsScreen;
