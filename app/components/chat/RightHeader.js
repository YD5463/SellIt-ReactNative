import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Text from "../Text";
import Icon from "../Icon";
import colors from "../../config/colors";

function RightHeader({ contactImageUri, contactName, onBack }) {
  return (
    <View style={styles.rightHeader}>
      <Text style={{ color: "white", paddingRight: 5 }}>{contactName}</Text>
      <TouchableOpacity onPress={onBack}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {contactImageUri ? (
            <Image
              source={{ uri: contactImageUri }}
              style={styles.contactImage}
            />
          ) : (
            <Icon
              name="user"
              iconColor={colors.white}
              IconComponent={FontAwesome}
              backgroundColor={colors.medium}
            />
          )}
          <AntDesign name="arrowright" size={24} color="white" />
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
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
  },
  headerIcon: {
    paddingLeft: 15,
  },
});

export default RightHeader;
