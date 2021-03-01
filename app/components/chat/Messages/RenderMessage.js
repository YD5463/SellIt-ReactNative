import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import ImageMessage from "./ImageMessage";
import AudioMessage from "./AudioMessage";
import TextMessage from "./TextMessage";
import Text from "../../Text";

import moment from "moment";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import colors from "../../../config/colors";
import contentTypes from "../../../config/contentTypes";
import ContactMessage from "./ContactMessage";
import LocationMessage from "./LocationMessage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const extraDataColor = "#404040";

function RenderMessage({
  item,
  lastMessageDate,
  pickMessage = () => {},
  unpickMessage = () => {},
  isPicked = false,
  pickedCount = 0,
  searchQuery = "",
  isFrom,
}) {
  const { dateTime, contentType, isSent } = item;
  const messageDate = moment(dateTime);
  const { t } = useTranslation();
  const { colors } = useTheme();

  const firstMesageInDate = () =>
    !lastMessageDate ||
    moment.duration(messageDate.diff(moment(lastMessageDate))).asDays() >= 1;

  const dispalyDate = () => {
    const today = moment();
    if (messageDate.isSame(today, "day")) return t("today");
    else if (messageDate.isSame(today.subtract(1, "day"), "day"))
      return t("yestardy");
    return messageDate.format("D in MMMM YYYY");
  };

  const render = () => {
    if (contentType === contentTypes.TEXT)
      return <TextMessage meesageData={item} searchQuery={searchQuery} />;
    else if (contentType === contentTypes.AUDIO)
      return <AudioMessage content={item.content} duration={item.duration} />;
    else if (contentType === contentTypes.IMAGE)
      return <ImageMessage meesageData={item} />;
    else if (contentType === contentTypes.CONTACT)
      return <ContactMessage meesageData={item} />;
    return <LocationMessage messageData={item} />;
  };
  const getWidth = () => {
    if (contentType === contentTypes.IMAGE) return { width: "75%" };
    else if (contentType === contentTypes.CONTACT) return { width: "70%" };
    else if (contentType === contentTypes.LOCATION) return { width: "70%" };
    return { maxWidth: "75%" };
  };

  return (
    <>
      {firstMesageInDate() && (
        <View style={styles.dispalyDate}>
          <Text style={styles.dateText}>{dispalyDate()}</Text>
        </View>
      )}
      <View>
        {isPicked && (
          <TouchableWithoutFeedback onPress={() => unpickMessage(item)}>
            <View style={styles.picked}></View>
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback
          onLongPress={() => pickMessage(item)}
          onPress={pickedCount === 0 ? () => {} : () => pickMessage(item)}
        >
          <View
            style={[
              styles.container,
              getWidth(),
              isFrom ? styles.fromMessage : styles.toMessage,
            ]}
          >
            {render()}
            <View style={styles.extraDataView}>
              <Text style={styles.messageTime}>
                {moment(dateTime).format("HH:mm")}
              </Text>
              {isFrom && (
                <MaterialCommunityIcons
                  name={isSent === false ? "progress-clock" : "check"}
                  size={16}
                  color={extraDataColor}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  dispalyDate: {
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 30,
    maxWidth: 150,
    backgroundColor: "#AEE7FF",
    borderRadius: 5,
  },
  toMessage: {
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  fromMessage: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  dateText: {
    padding: 5,
    fontSize: 15,
    color: colors.medium,
  },
  messageTime: {
    fontSize: 13,
    color: extraDataColor,
    alignSelf: "flex-end",
    marginRight: 8,
    marginLeft: 5,
  },
  picked: {
    backgroundColor: "#9BDFEC",
    zIndex: 5,
    width: 1000,
    position: "absolute",
    left: 0,
    top: 0,
    flex: 1,
    height: "100%",
    opacity: 0.5,
  },
  extraDataView: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default RenderMessage;
