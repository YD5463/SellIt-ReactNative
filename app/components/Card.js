import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import { useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

function Card({
  title,
  subTitle,
  imageUrl,
  onPress,
  thumbnailUrl,
  OnAddToCart,
  OnBuy,
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.white }]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.image}>
          <Image
            style={styles.image}
            tint="light"
            preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {subTitle}
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-end",
          top: -10,
          flexDirection: "column",
          left: -15,
        }}
      >
        <View style={[styles.buyNow, { backgroundColor: colors.orange }]}>
          <TouchableOpacity onPress={OnBuy}>
            <Text style={{ color: colors.white }}>Buy now</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.btn, { backgroundColor: colors.blue, marginTop: 5 }]}
        >
          <TouchableOpacity onPress={OnAddToCart}>
            <Text style={{ color: colors.white }}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    borderRadius: 30,
    height: 30,
  },
  buyNow: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    borderRadius: 20,
    height: 30,
  },
});

export default Card;
