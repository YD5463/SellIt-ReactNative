import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import colors from "../config/colors";
import Text from "./Text";
import moment from "moment";
import Icon from "./Icon";
import contentTypes from "../config/contentTypes";

const imageSize = 65;

function ContactChat({ item, onPress }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  //todo: move this function to a reusable place
  const displayContent = () => {
    const type = item.lastMessage.contentType;
    let text = "";
    let icon = "";
    if (type === contentTypes.TEXT) {
      text = item.lastMessage.content;
    } else if (type === contentTypes.IMAGE) {
      text = "Picture";
      icon = "image";
    } else if (type === contentTypes.AUDIO) {
      text = item.lastMessage.content.duration;
      icon = "microphone";
    } else {
      console.log("not supported");
      return null;
    }
    return (
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          name="check-all"
          size={25}
          color={colors.blue}
        />
        <Text style={styles.message}>{text}</Text>
        {icon ? (
          <MaterialCommunityIcons name={icon} size={25} color={colors.light} />
        ) : null}
      </View>
    );
  };
  const displayTime = () => {
    const date = moment(item.lastMessage.dateTime);
    const yesterday = moment().subtract(1, "day");
    const today = moment();
    if (moment(date).isSame(today, "day")) return date.format("HH:mm");
    else if (moment(date).isSame(yesterday, "day")) return "yesterday";
    return date.format("MM.DD.YYYY");
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {item.contactProfileImage ? (
          <Image
            uri={item.contactProfileImage.url}
            preview={{
              uri: item.contactProfileImage.thumbnailUrl,
            }}
            style={styles.image}
            tint="light"
          />
        ) : (
          <Icon
            name="user"
            iconColor={colors.white}
            IconComponent={FontAwesome}
            backgroundColor={colors.medium}
            size={imageSize}
          />
        )}
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.contactName}>{item.contactName}</Text>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.messageDateTime}>{displayTime()}</Text>
            </View>
          </View>
          {displayContent()}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    paddingTop: 0,
    alignItems: "center",
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },
  contactName: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 5,
    textAlign: "left",
    width: "90%",
  },
  message: {
    fontSize: 18,
    color: colors.medium,
    paddingLeft: 5,
  },
  messageDateTime: {
    color: colors.medium,
    fontSize: 15,
    textAlign: "right",
  },
});

export default ContactChat;
