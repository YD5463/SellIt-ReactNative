import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

function CameraScreen({ navigation, route }) {
  const { sendImage } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [autoFocus, setAutoFocus] = useState(Camera.Constants.AutoFocus.on);
  const [zoom, setZoom] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState(
    Camera.Constants.WhiteBalance.auto
  );
  const [focusDepth, setFocusDepth] = useState(0);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const onFlip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const onTakePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync({ base64: true });
    sendImage(photo);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        flashMode={flashMode}
        zoom={zoom}
        whiteBalance={whiteBalance}
        focusDepth={focusDepth}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.reverseButton} onPress={onFlip}>
            <Ionicons name="ios-reverse-camera" size={35} color="white" />
          </TouchableOpacity>
          <View style={{ alignSelf: "center", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={onTakePicture}>
              <View style={styles.takePictureBtn}></View>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  reverseButton: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  takePictureBtn: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

export default CameraScreen;
