import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

function ImagesList({ onPress }) {
  const [photos, setPhotos] = useState([]);
  const [cursor, setCursor] = useState();
  const [loading, setLoading] = useState(true);

  const getImages = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      await getPartImages();
    }
  };
  const getPartImages = async () => {
    const after = cursor ? { after: cursor } : {};
    const res = await MediaLibrary.getAssetsAsync({
      first: 100000,
      mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
      ...after,
    });
    setPhotos([...photos, ...res.assets]);
    if (res.hasNextPage) setCursor(res.endCursor);
  };
  useEffect(() => {
    getImages();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item)}>
            <Image
              style={{ width: 70, height: 70, marginRight: 3 }}
              source={{ uri: item.uri }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(photo) => photo.uri}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ImagesList;
