import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import ImageIdicator from "./ImageIdicator";
import Text from "./Text";
import colors from "../config/colors";

function ImageListScroll({ images, onDoubleTap }) {
  const [imageNumber, setImageNumber] = useState(0);
  const [counterVisible, setCounterVisible] = useState(false);
  const [tapCounter, setTapCounter] = useState(0);
  const [tapTimeout, setTapTimeout] = useState();

  const onScrollEnd = (e) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    setImageNumber(Math.floor(contentOffset.x / viewSize.width));
  };
  const onPress = () => {
    setTapCounter(tapCounter + 1);
    if (tapCounter === 1) {
      setTapCounter(0);
      if (tapTimeout) clearTimeout(tapTimeout);
      console.log("double tap!");
      if (onDoubleTap) onDoubleTap(images[imageNumber]);
    } else {
      setTapTimeout(setTimeout(() => setTapCounter(0), 3000));
      setCounterVisible(true);
      setTimeout(() => setCounterVisible(false), 5000);
    }
  };
  useEffect(() => {
    setCounterVisible(true);
    const tiemout = setTimeout(() => setCounterVisible(false), 5000);
    return () => {
      clearTimeout(tiemout);
    };
  }, []);
  return (
    <>
      <FlatList
        horizontal
        data={images}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={onPress}>
            <View>
              <Image
                key={item.url}
                style={styles.image}
                preview={{ uri: item.thumbnailUrl }}
                tint="light"
                uri={item.url}
              />
              {counterVisible && (
                <View style={styles.imageNumber}>
                  <Text style={styles.text}>{`${imageNumber + 1}/${
                    images.length
                  }`}</Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(image) => image.url}
        showsHorizontalScrollIndicator={false}
        snapToInterval={Math.round(Dimensions.get("window").width)}
        decelerationRate="fast"
        pagingEnabled
        onMomentumScrollEnd={onScrollEnd}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 30,
        }}
      />
      {images.length > 1 && (
        <ImageIdicator current={imageNumber} numElements={images.length} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageNumber: {
    width: 40,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.medium,
    position: "absolute",
    top: 40,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Math.round(Dimensions.get("window").width),
    height: 300,
  },
  text: {
    fontSize: 13,
    color: colors.white,
  },
});

export default ImageListScroll;
