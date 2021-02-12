import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import useBackButton from "./../hooks/useBackButton";

function CameraScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef();
  const [blinking, setBlinking] = useState();
  const [captures, setCaptures] = useState([]);
  const [flash, setFlash] = useState();
  const [photoUrl, setPhotoUrl] = useState();
  useBackButton(() => setPhotoUrl(null));

  const initData = async () => {
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    setHasPermission(audio.status === "granted" && camera.status === "granted");
  };
  const onPress = async () => {
    setBlinking(true);
    const photo = await cameraRef.current.takePictureAsync();
    setTimeout(() => setBlinking(false), 1000);
    const new_captures = [...captures, photo];
    setCaptures(new_captures);
    setPhotoUrl(photo.uri);
  };
  const onRotate = () => {};
  const onFlash = () => {};
  useEffect(() => {
    initData();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return photoUrl ? (
    <Image source={{ uri: photoUrl }} style={styles.camera} />
  ) : (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        />
      </View>
      <View style={{ alignItems: "center", paddingBottom: 15 }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ padding: 15 }}>
            <TouchableOpacity onPress={() => setFlash(!flash)}>
              <MaterialCommunityIcons
                name={flash ? "flash" : "flash-off"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.takeShotsBtn}></View>
          </TouchableOpacity>
          <View style={{ padding: 15 }}>
            <TouchableOpacity onPress={onRotate}>
              <Ionicons name="ios-reverse-camera" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ color: "white" }}>
          Hold to record, tap to to capture photo
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  takeShotsBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
  },
});

export default CameraScreen;
