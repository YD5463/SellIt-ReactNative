import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import moment from "moment";
import { useTheme } from "react-native-paper";
import colors from "../../config/colors";

function TextMessage({ meesageData, isFrom }) {
  const { content, dateTime } = meesageData;

  const { colors } = useTheme();
  return (
    <View style={styles.messageView}>
      <Text style={styles.message}>{content}</Text>
      <Text style={styles.messageTime}>{moment(dateTime).format("HH:mm")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageView: {
    alignItems: "center",
    flexDirection: "row",
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
});

export default TextMessage;
