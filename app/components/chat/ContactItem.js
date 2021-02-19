import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../../config/colors";
import Text from "../Text";
import Icon from "./../Icon";
import { FontAwesome } from "@expo/vector-icons";

const imageSize = 50;

function ContactItem({ contactData }) {
  return (
    <TouchableOpacity>
      <View style={styles.main}>
        {contactData.imageAvailable ? (
          <Image />
        ) : (
          <Icon
            name="user"
            iconColor={colors.white}
            IconComponent={FontAwesome}
            backgroundColor={colors.contactBackground}
            size={50}
          />
        )}
        <View style={styles.container}>
          <Text style={styles.name}>{contactData.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 15,
    flexDirection: "row",
  },
  container: {
    padding: 10,
  },
  name: {
    alignSelf: "flex-start",
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
});

export default ContactItem;
