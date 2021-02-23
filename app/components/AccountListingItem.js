import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Text from "./Text";
import colors from "../config/colors";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

function AccountListingItem({ listing, onEdit, onDelete }) {
  // console.log(listing.images[0].url);
  const showText = (text, maxLen) => {
    if (text.length > maxLen) {
      return `${text.slice(0, maxLen)}...`;
    }
    return text;
  };
  return (
    <View style={styles.container}>
      <Image
        tint="light"
        preview={{ uri: listing.images[0].thumbnailUrl }}
        source={{ uri: listing.images[0].url }}
        style={styles.image}
      />

      <View style={styles.texts}>
        <Text style={styles.title}>{showText(listing.title, 15)}</Text>
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

      <View style={{ padding: 15 }}>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity onPress={onDelete}>
            <MaterialCommunityIcons
              name="delete"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onEdit}>
          <FontAwesome name="edit" size={28} color={colors.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    marginTop: 1,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  price: {
    color: colors.secondary,
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: colors.medium,
    paddingLeft: 10,
    fontSize: 16,
  },
  texts: {
    flexDirection: "column",
    padding: 10,
    flex: 1,
  },
});

export default AccountListingItem;
