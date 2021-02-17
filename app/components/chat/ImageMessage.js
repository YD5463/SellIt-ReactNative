import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

function ImageMessage({ meesageData }) {
  return (
    <TouchableWithoutFeedback onPress={() => console.log("im here")}>
      <Image
        style={styles.container}
        source={{ uri: `data:image/jpg;base64,${meesageData.content}` }}
      />
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
