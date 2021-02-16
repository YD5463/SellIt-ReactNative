import React from "react";
import { View, StyleSheet } from "react-native";
import ImageMessage from "./ImageMessage";
import AudioMessage from "./AudioMessage";
import TextMessage from "./TextMessage";
import Text from "../Text";

import moment from "moment";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import colors from "../../config/colors";

function RenderMessage({ item, lastMessageDate, userId }) {
  const { dateTime } = item;
  const messageDate = moment(dateTime);
  const isFrom = userId === item.fromUserId;
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
    if (item.contentType === "text")
      return <TextMessage meesageData={item} isFrom={isFrom} />;
    else if (item.contentType === "audio")
      return (
        <AudioMessage
          content={item.content}
          userId={userId}
          dateTime={item.dateTime}
          isFrom={isFrom}
        />
      );
    else return <ImageMessage meesageData={item} isFrom={isFrom} />;
  };

  return (
    <>
      {firstMesageInDate() && (
        <View style={styles.dispalyDate}>
          <Text style={styles.dateText}>{dispalyDate()}</Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          isFrom ? styles.fromMessage : styles.toMessage,
        ]}
      >
        {render()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    maxWidth: "48%",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  dispalyDate: {
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 30,
    width: 100,
    maxWidth: 150,
    backgroundColor: "#AEE7FF",
    borderRadius: 5,
  },
  toMessage: {
    alignSelf: "flex-end",
    backgroundColor: colors.white,
  },
  fromMessage: {
    backgroundColor: colors.primary,
  },
  dateText: {
    padding: 5,
    fontSize: 15,
    color: colors.medium,
  },
});

export default RenderMessage;
