import React, { useState } from "react";
import ResizableImage from "../../ResizableImage";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

function ImageMessage({ meesageData }) {
  const [fullScreen, setFullScreen] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => setFullScreen(true)}>
      <Image style={styles.container} source={{ uri: meesageData.content }} />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    width: "95%",
    height: 300,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default ImageMessage;
