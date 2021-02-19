import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
// import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from "expo-media-library";

function DocumentPickerScreen({ sendDocument }) {
  const init = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      const audio = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.unknown,
      });
      console.log(audio.assets);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
});

export default DocumentPickerScreen;
