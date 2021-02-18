import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import AudioListItem from "../../components/chat/AudioListItem";
import ListItemSeparator from "./../../components/lists/ListItemSeparator";
import { Audio } from "expo-av";
import Icon from "../../components/Icon";
import colors from "../../config/colors";

const maxPickedItems = 10;

function AudioPicker({ navigation, route }) {
  const [currSong, setCurrSong] = useState();
  const [playingSongUri, setPlayingSongUri] = useState();
  const [pickedAudio, setPickedAudio] = useState([]);

  const { contactName, sendAudio } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.audio,
      },
      title: `Sending to ${contactName}`,
    });
  });
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

  const onSend = () => {
    sendAudio(audioList);
    navigation.goBack();
  };
  const onPickItem = (item) => {
    if (pickedAudio.length < maxPickedItems) {
      setPickedAudio([...pickedAudio, item]);
    }
  };
  const unpickItem = (item) => {
    setPickedAudio(pickedAudio.filter((audio) => audio.uri !== item.uri));
  };
  console.log(pickedAudio);

  return (
    <View style={styles.container}>
      <FlatList
        data={audioList}
        keyExtractor={(audio) => audio.uri}
        renderItem={({ item }) => (
          <AudioListItem
            pickItem={() => onPickItem(item)}
            unpickItem={() => unpickItem(item)}
            songData={item}
            playSong={() => playSong(item.uri)}
            pauseSong={() => currSong.pauseAsync()}
            isPlayingSong={playingSongUri === item.uri}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
      {pickedAudio.length !== 0 && (
        <View style={styles.send}>
          <TouchableOpacity onPress={onSend}>
            <Icon
              name="send"
              size={60}
              iconColor="white"
              backgroundColor={colors.primary}
              iconSizeRatio={0.5}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  send: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
});

export default AudioPicker;
