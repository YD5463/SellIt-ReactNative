import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import moment from "moment";
import { useTheme } from "react-native-paper";
import colors from "../../config/colors";

function TextMessage({ meesageData, userId, lastMessageDate }) {
  const { content, dateTime } = meesageData;
  const isFrom = userId.toString() === meesageData.fromUserId.toString();
  const messageDate = moment(dateTime);

  const { colors } = useTheme();
  const firstMesageInDate = () =>
    !lastMessageDate ||
    moment.duration(messageDate.diff(moment(lastMessageDate))).asDays() > 0;
  const dispalyDate = () => {
    const today = moment();
    if (moment(messageDate).isSame(today, "day")) return "today";
    else if (moment(messageDate).isSame(today.subtract(1, "day"), "day"))
      return "yestardy";
    return messageDate.format("D in MMMM YYYY");
  };
  return (
    <>
      {firstMesageInDate() && (
        <View style={styles.dispalyDate}>
          <Text style={styles.dateText}>{dispalyDate()}</Text>
        </View>
      )}
      <View style={[styles.container, isFrom ? { alignSelf: "flex-end" } : {}]}>
        <View style={styles.messageView}>
          <View
            style={[
              {
                backgroundColor: isFrom ? colors.primary : colors.white,
                flexDirection: "row",
              },
            ]}
          >
            <Text style={styles.message}>{content}</Text>
            <Text style={styles.messageTime}>
              {moment(dateTime).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingTop: 15,
    maxWidth: "50%",
  },
  messageView: {
    height: 50,
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  message: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  messageTime: {
    fontSize: 13,
    color: colors.medium,
    alignSelf: "flex-end",
    marginRight: 8,
    marginLeft: 5,
  },
  dispalyDate: {
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 35,
    width: 50,
    maxWidth: 150,
    backgroundColor: "#AEE7FF",
    borderRadius: 5,
  },
  dateText: {
    fontSize: 15,
    color: colors.medium,
  },
});

export default TextMessage;
