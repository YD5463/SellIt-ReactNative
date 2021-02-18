import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import AudioListItem from "../../components/chat/AudioListItem";
import ListItemSeparator from "./../../components/lists/ListItemSeparator";

function AudioPicker(props) {
  console.log("im here");
  const [audioList, setAudioList] = useState([]);
  const initAudio = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      const audio = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
      });
      setAudioList(audio.assets);
    }
  };
  useEffect(() => {
    initAudio();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={audioList}
        keyExtractor={(audio) => audio.uri}
        renderItem={({ item }) => <AudioListItem songData={item} />}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AudioPicker;
