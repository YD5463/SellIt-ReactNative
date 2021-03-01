import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "./../components/Screen";
import { useTheme } from "react-native-paper";
import * as ScreenOrientation from "expo-screen-orientation";
import ResizableImage from "./../components/ResizableImage";

function ViewImageScreen({ route, navigation }) {
  const { imageUri } = route.params;
  const { colors } = useTheme();
  useEffect(() => {
    const subs = ScreenOrientation.addOrientationChangeListener((listener) => {
      console.log(listener.orientationInfo.orientation);
    });
    return () => subs.remove();
  }, []);

  return (
    <Screen style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: colors.white }]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.closeIcon}>
            <MaterialCommunityIcons
              name="close"
              color={colors.black}
              size={35}
            />
          </View>
        </TouchableWithoutFeedback>
        <View>
          <ResizableImage style={styles.image} uri={imageUri} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  container: {
    flex: 1,
  },
  deleteIcon: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ViewImageScreen;
