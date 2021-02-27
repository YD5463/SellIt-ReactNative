import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import colors from "../../../config/colors";
import Text from "../../Text";
import moment from "moment";
import Icon from "../../Icon";
import contentTypes from "../../../config/contentTypes";
import DefualtUserImage from "../ReusableIcons/DefualtUserImage";

const imageSize = 60;

function ContactChat({
  lastMessage,
  contactProfileImage,
  contactName,
  onPress,
  diff,
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  //todo: move this function to a reusable place
  const displayContent = () => {
    const type = lastMessage.contentType;
    let text = "";
    let icon = "";
    if (type === contentTypes.TEXT) {
      text = lastMessage.content;
    } else if (type === contentTypes.IMAGE) {
      text = "Picture";
      icon = "image";
    } else if (type === contentTypes.AUDIO) {
      text = lastMessage.content.duration;
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

        {icon !== "" && (
          <MaterialCommunityIcons name={icon} size={25} color={colors.light} />
        )}
      </View>
    );
  };
  const displayTime = () => {
    const date = moment(lastMessage.dateTime);
    const yesterday = moment().subtract(1, "day");
    const today = moment();
    if (moment(date).isSame(today, "day")) return date.format("HH:mm");
    else if (moment(date).isSame(yesterday, "day")) return "yesterday";
    return date.format("MM.DD.YYYY");
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <>
        <View style={styles.container}>
          {contactProfileImage ? (
            <Image
              uri={contactProfileImage.url}
              preview={{
                uri: contactProfileImage.thumbnailUrl,
              }}
              style={styles.image}
              tint="light"
            />
          ) : (
            <DefualtUserImage size={imageSize} />
          )}
          <View style={styles.messageDataView}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.contactName}>{contactName}</Text>

              <View style={styles.extraDataView}>
                <Text style={styles.messageDateTime}>{displayTime()}</Text>
                {diff !== 0 && (
                  <View style={styles.diff}>
                    <Text style={styles.diffText}>{diff.toString()}</Text>
                  </View>
                )}
              </View>
            </View>
            {displayContent()}
          </View>
        </View>
      </>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    paddingTop: 8,
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
  diff: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  diffText: {
    fontSize: 14,
    color: "white",
  },
  extraDataView: {
    position: "absolute",
    right: 20,
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
    paddingBottom: 10,
  },
  messageDataView: {
    flexDirection: "column",
    marginLeft: 10,
  },
});

export default ContactChat;
