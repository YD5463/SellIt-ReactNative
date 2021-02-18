import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import AudioListItem from "../../components/chat/AudioListItem";
import ListItemSeparator from "./../../components/lists/ListItemSeparator";
import { Audio } from "expo-av";

function AudioPicker(props) {
  const [currSong, setCurrSong] = useState();
  const [playingSongUri, setPlayingSongUri] = useState();

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
  const playSong = async (uri) => {
    console.log("im here");
    if (currSong) {
      await currSong.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync({ uri: uri });
    // sound.setOnPlaybackStatusUpdate((status) =>
    //   setPosition(status.positionMillis / status.durationMillis)
    // );
    setCurrSong(sound);
    setPlayingSongUri(uri);
    await sound.playAsync();
  };

  useEffect(() => {
    initAudio();
  }, []);
  useEffect(() => {
    return currSong
      ? () => {
          currSong.unloadAsync();
        }
      : undefined;
  }, [currSong]);

  return (
    <View style={styles.container}>
      <FlatList
        data={audioList}
        keyExtractor={(audio) => audio.uri}
        renderItem={({ item }) => (
          <AudioListItem
            songData={item}
            playSong={() => playSong(item.uri)}
            pauseSong={() => currSong.pauseAsync()}
            isPlayingSong={playingSongUri === item.uri}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AudioPicker;
