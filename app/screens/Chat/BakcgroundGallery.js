import React, { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, FlatList, Image } from "react-native";

function BakcgroundGallery({ navigation, route }) {
  const { images, name, isColor } = route.params.item;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  });

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}} style={{ flex: 1 }}>
            {!isColor ? (
              <Image style={styles.element} source={{ uri: item }} />
            ) : (
              <View style={[styles.element, { backgroundColor: item }]} />
            )}
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  element: {
    width: "98%",
    height: 150,
    marginBottom: 3,
    marginRight: 3,

    flex: 1,
  },
});

export default BakcgroundGallery;
