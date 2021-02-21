import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

function VideoMessage({ videoData }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() =>
          status.isPlaying
            ? video.current.pauseAsync()
            : video.current.playAsync()
        }
      >
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: videoData.uri }}
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: 350,
    flex: 1,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    flex: 1,
  },
});

export default VideoMessage;
