import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "./Icon";
import Text from "./Text";
import { ErrorMessage } from "./forms";
import { useTheme } from "react-native-paper";
import colors from "../config/colors";

function ProfileImagePicker({ name }) {
  const { colors } = useTheme();
  const { setFieldValue, values, errors } = useFormikContext();
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) setFieldValue(name, result.uri);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={selectImage}>
        <View style={{ marginLeft: 30 }}>
          {values[name] && !errors[name] ? (
            <Image source={{ uri: values[name] }} style={styles.image} />
          ) : (
            <Icon
              name="account"
              size={100}
              backgroundColor={colors.medium}
              iconColor={colors.white}
              iconSizeRatio={0.7}
            />
          )}
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Change Profile Photo</Text>
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    color: colors.blue,
    fontWeight: "400",
  },
});

export default ProfileImagePicker;
