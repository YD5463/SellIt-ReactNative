import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "./../components/Screen";
import { useTheme } from "react-native-paper";
import * as ScreenOrientation from "expo-screen-orientation";
import { DeviceMotion } from "expo-sensors";

function ViewImageScreen({ route, navigation }) {
  const { imageUri } = route.params;
  const { colors } = useTheme();
  const [deg, setdeg] = useState("0deg");
  DeviceMotion.addListener(({ rotation }) => {
    const sign = rotation.alpha >= 0 ? "+" : "-";
    const alpha = Math.abs(rotation.alpha);
    console.log(alpha);
    const curr_deg = alpha > 3 || (alpha > 0 && alpha < 0.5) ? "90" : "0";
    setdeg(`${sign}${curr_deg}deg`);
  });
  console.log(deg);
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
        <View
          style={{
            transform: [{ rotate: deg }],
          }}
        >
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: imageUri }}
          />
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
