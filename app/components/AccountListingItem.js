import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Text from "./Text";
import { color } from "react-native-reanimated";
import colors from "../config/colors";

function AccountListingItem({ listing, onPress }) {
  // console.log(listing.images[0].url);
  const showText = (text, maxLen) => {
    if (text.length > maxLen) {
      return `${text.slice(0, maxLen)}...`;
    }
    return text;
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          tint="light"
          preview={{ uri: listing.images[0].thumbnailUrl }}
          source={{ uri: listing.images[0].url }}
          style={styles.image}
        />
        <View style={styles.texts}>
          <Text style={styles.title}>{showText(listing.title, 20)}</Text>
          {listing.description ? (
            <Text style={styles.description}>
              {showText(listing.description, 28)}
            </Text>
          ) : (
            <Text style={[styles.description, { color: colors.danger }]}>
              Description Is Missing
            </Text>
          )}
          <Text style={styles.price}>{`${listing.price}$`}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    marginTop: 10,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  price: {
    color: colors.secondary,
    alignSelf: "flex-end",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: colors.medium,
    paddingLeft: 10,
    fontSize: 18,
  },
  texts: {
    flexDirection: "column",
    padding: 10,
  },
});

export default AccountListingItem;
