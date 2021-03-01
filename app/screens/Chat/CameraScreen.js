import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  StatusBar,
  BackHandler,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

import ResizableImage from "../../components/ResizableImage";
import colors from "../../config/colors";
import ImagesList from "../../components/chat/ImagesList";
import contentTypes from "../../config/contentTypes";

//todo: move this...
// const APP_ASSETS_URI = "file://Sellit";

function CameraScreen({ navigation, route }) {
  const { sendImage } = route.params;
  const [photo, setPhoto] = useState();
  const [pictureTaken, setPictureTaken] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [autoFocus, setAutoFocus] = useState(Camera.Constants.AutoFocus.on);
  const [zoom, setZoom] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState(
    Camera.Constants.WhiteBalance.auto
  );
  const [focusDepth, setFocusDepth] = useState(0);
  const [flashIconName, setFlashIconName] = useState("flash");

  const cameraRef = useRef();

  const onBackPress = () => {
    if (!photo) navigation.goBack();
    else setPhoto(null);
    return true;
  };
  const UpdateBackHandler = () => {
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  };

  const init = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => UpdateBackHandler(), [photo]);

  useEffect(() => {
    init();
    return UpdateBackHandler();
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
  const saveAssets = async (type, filename) => {
    const photo = await cameraRef.current.takePictureAsync();
    const dir = `${FileSystem.documentDirectory}${type}`;
    const uri = `${dir}//${filename}`;
    try {
      FileSystem.makeDirectoryAsync(dir);
    } catch (e) {
      console.log("bugggg ", e);
    }
    await FileSystem.moveAsync({
      from: photo.uri,
      to: uri,
    });
    return uri;
  };
  const onTakePicture = async () => {
    setPictureTaken(true);
    const photo = await cameraRef.current.takePictureAsync();
    photo.uri = await saveAssets(contentTypes.IMAGE, photo.name);
    setPictureTaken(false);
    setPhoto(photo);
  };
  const onSend = () => {
    sendImage(photo);
    navigation.goBack();
  };
  const onFlash = () => {
    if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.off);
      setFlashIconName("flash-off");
    } else if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.auto);
      setFlashIconName("flash-auto");
    } else {
      setFlashMode(Camera.Constants.FlashMode.auto);
      setFlashIconName("flash");
    }
  };
  //todo:change send button to use Icon component

  return (
    <View style={[styles.container]}>
      <StatusBar hidden />
      {!photo ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flashMode}
          zoom={zoom}
          whiteBalance={whiteBalance}
          focusDepth={focusDepth}
        >
          <View style={{ flex: 1 }}></View>
          <View style={styles.images}>
            <ImagesList onPress={(photo) => setPhoto(photo)} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.reverseButton} onPress={onFlip}>
              <Ionicons name="ios-reverse-camera" size={35} color="white" />
            </TouchableOpacity>
            <View style={styles.takePicturePos}>
              <TouchableOpacity onPress={onTakePicture}>
                <View style={styles.takePictureBtn}></View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={onFlash}>
                <MaterialCommunityIcons
                  name={flashIconName}
                  color="white"
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>
          <ResizableImage uri={photo.uri} style={styles.resultImage} />
          <View style={styles.sendView}>
            <TouchableOpacity onPress={onSend}>
              <View
                style={[styles.sendBtn, { backgroundColor: colors.primary }]}
              >
                <MaterialCommunityIcons name="send" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
  takePicturePos: {},
  resultImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  sendBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sendView: {
    position: "absolute",
    left: 5,
    bottom: 15,
  },
  images: {
    width: "100%",
    marginBottom: 20,
  },
});

export default CameraScreen;
