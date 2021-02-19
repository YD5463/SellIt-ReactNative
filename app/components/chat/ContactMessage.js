import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import colors from "../../config/colors";
import Text from "../Text";
import DefualtUserImage from "./DefualtUserImage";
import * as Contacts from "expo-contacts";
import { useTranslation } from 'react-i18next';

function ContactMessage({ meesageData }) {
  const {t} = useTranslation();
  const onPress = () => {
    Alert.alert(
      t("sendContactTitle"),
      t("sendContactSubTitle"),
      [
        {
          text: t("cancel"),
          onPress: () => {},
          style: "cancel",
        },
        { text: t("ok"), onPress: () => Contacts.addContactAsync(meesageData) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.dataView}>
          <DefualtUserImage />
          <Text style={styles.text}>{meesageData.content}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    borderRadius: 15,
    padding: 15,
  },
  text: {
    color: colors.light,
    padding: 10,
  },
  dataView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ContactMessage;
