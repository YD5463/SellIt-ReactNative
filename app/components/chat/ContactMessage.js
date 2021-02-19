import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

function ContactMessage({ meesageData }) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: colors.blue,
  },
});

export default ContactMessage;
