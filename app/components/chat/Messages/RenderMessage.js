import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
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

function RenderMessage({
  item,
  lastMessageDate,
  userId,
  pickMessage,
  unpickMessage,
}) {
  const { dateTime } = item;
  const messageDate = moment(dateTime);
  const isFrom = userId === item.fromUserId;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isPicked, setIsPicked] = useState(false);

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
    if (item.contentType === contentTypes.TEXT)
      return <TextMessage meesageData={item} />;
    else if (item.contentType === contentTypes.AUDIO)
      return <AudioMessage content={item.content} duration={item.duration} />;
    else if (item.contentType === contentTypes.IMAGE)
      return <ImageMessage meesageData={item} />;
    else if (item.contentType === contentTypes.CONTACT)
      return <ContactMessage meesageData={item} />;
    return <View></View>; //location
  };
  const getWidth = () => {
    if (item.contentType === contentTypes.IMAGE) return { width: "75%" };
    else if (item.contentType === contentTypes.CONTACT) return { width: "70%" };
    return { maxWidth: "48%" };
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
          <TouchableWithoutFeedback
            onPress={() => {
              setIsPicked(false);
              unpickMessage(item);
            }}
          >
            <View style={styles.picked}></View>
          </TouchableWithoutFeedback>
        )}
        <TouchableOpacity
          onLongPress={() => {
            setIsPicked(true);
            pickMessage(item);
          }}
        >
          <View
            style={[
              styles.container,
              getWidth(),
              isFrom ? { alignSelf: "flex-end" } : {},
            ]}
          >
            <View style={[isFrom ? styles.fromMessage : styles.toMessage]}>
              {render()}

              <Text style={styles.messageTime}>
                {moment(dateTime).format("HH:mm")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
  },
  dateText: {
    padding: 5,
    fontSize: 15,
    color: colors.medium,
  },
  messageTime: {
    fontSize: 13,
    color: "#404040",
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
});

export default RenderMessage;
