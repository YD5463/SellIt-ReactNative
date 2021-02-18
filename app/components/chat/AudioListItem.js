import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../../config/colors";
import Text from "../Text";
import Icon from "../Icon";
import helper from "../../utility/helper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AudioListItem({ sendFile, songData }) {
  const playSong = () => {};
  console.log(songData);

  return (
    <TouchableOpacity onPress={sendFile}>
      <View style={styles.container}>
        <View style={styles.pictureSize}>
          <MaterialCommunityIcons name="headphones" color="white" size={35} />
        </View>

        <View style={styles.detail}>
          <Text numberOfLines={1} style={styles.songName}>
            {songData.filename}
          </Text>
          {songData.author && <Text>{songData.author}</Text>}
          <View style={{ flexDirection: "row" }}>
            <Text>{songData.filesize}</Text>
            <Text style={styles.duration}>
              {helper.dispalyTimeFromSeconds(songData.duration)}
            </Text>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={playSong}>
          <Icon
            name="play"
            size={30}
            backgroundColor={colors.light}
            iconColor={colors.medium}
          />
        </TouchableWithoutFeedback>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  pictureSize: {
    width: 50,
    height: 50,
    borderRadius: 7,
    backgroundColor: colors.audio,
    justifyContent: "center",
    alignItems: "center",
  },
  songName: {
    fontSize: 15,
  },
  duration: {
    paddingTop: 5,
    fontSize: 11,
    color: colors.hardLight,
  },
  detail: {
    marginRight: 10,
    marginLeft: 15,
    flex: 1,
  },
});

export default AudioListItem;
