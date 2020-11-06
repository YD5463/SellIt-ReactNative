import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Text from "./Text";
import { Image } from "react-native-expo-image-cache";
import { useTheme } from "react-native-paper";
import QuantityInput from "./QuantityInput";

function ViewCartItem({ item }) {
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
          {item.title}
        </Text>
        <Text
          style={[styles.description, { color: colors.medium }]}
          numberOfLines={2}
        >
          {item.description ? item.description : "No description..."}
        </Text>
        <View
          style={{
            alignItems: "flex-end",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={styles.price}>{`$${item.price}`}</Text>
          <View style={{ paddingLeft: 70 }}>
            <QuantityInput
              onMinus={() => {}}
              onPlus={() => {}}
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 23,
  },
  description: {
    fontSize: 18,
    fontWeight: "400",
  },
  price: {
    fontSize: 19,
    fontWeight: "400",
  },
});

export default ViewCartItem;
