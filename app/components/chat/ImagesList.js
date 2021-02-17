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
  const [offset, setOffset] = useState();
  const [loading, setLoading] = useState(true);

  const getImages = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      await getPartImages();
    }
  };
  const getPartImages = async () => {
    const res = await MediaLibrary.getAssetsAsync(
      offset ? { after: offset, first: 100 } : { first: 100 }
    );
    setPhotos([...photos, ...res.assets]);
    setOffset(res.endCursor);
    setLoading(res.hasNextPage);
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
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ImagesList;
