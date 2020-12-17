import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";
import { Image } from "react-native-expo-image-cache";
import { useTheme } from "react-native-paper";
import QuantityInput from "./QuantityInput";
import helper from "../utility/helper";
import globalColors from "../config/colors";

function ViewCartItem({ item, onMinus, onPlus, priceColor = "green" }) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        tint="light"
        preview={{ uri: item.images[0].thumbnailUrl }}
        uri={item.images[0].url}
      />
      <View style={{ flexDirection: "column", paddingLeft: 13 }}>
        <Text style={styles.title} numberOfLines={2}>
          {helper.showText(item.title, 19)}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[styles.description, { color: colors.medium }]}
            numberOfLines={2}
          >
            {item.description ? item.description : "No description..."}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={[styles.price, { color: colors[priceColor] }]}
          >{`$${item.price}`}</Text>
          <View style={{ paddingLeft: 70 }}>
            <QuantityInput
              onMinus={() => onMinus(item._id)}
              onPlus={() => onPlus(item._id)}
              quantity={item.quantity}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingBottom: 15,
    flexDirection: "row",
    width: "100%",
  },
  image: {
    width: 120,
    height: 140,
    borderRadius: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 21,
  },
  description: {
    fontSize: 18,
    fontWeight: "400",
    flex: 1,
  },
  price: {
    fontSize: 19,
    fontWeight: "400",
    fontWeight: "400",
  },
});

export default ViewCartItem;
