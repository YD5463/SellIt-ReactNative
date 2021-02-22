import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Text from "../../Text";
import colors from "../../../config/colors";
import DefualtUserImage from "../ReusableIcons/DefualtUserImage";
import BackArrow from "../../BackArrow";

function LeftHeader({
  contactImageUri,
  contactName,
  onBack,
  ContactDetailScreen,
}) {
  return (
    <View style={styles.leftHeader}>
      <BackArrow onBack={onBack} />
      <TouchableOpacity onPress={ContactDetailScreen}>
        <View style={styles.leftHeader}>
          {contactImageUri ? (
            <Image
              source={{ uri: contactImageUri }}
              style={styles.contactImage}
            />
          ) : (
            <DefualtUserImage size={40} />
          )}
          <Text style={styles.contactName}>{contactName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contactImage: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    paddingLeft: 15,
  },
  contactName: {
    color: "white",
    paddingLeft: 5,
  },
});

export default LeftHeader;
