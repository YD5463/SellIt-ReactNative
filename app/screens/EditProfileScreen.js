import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Form, FormField, StandartFormPicker } from "../components/forms";
import * as Yup from "yup";
import TextInputWithLine from "./../components/TextInputWithLine";
import Screen from "./../components/Screen";
import ProfileImagePicker from "./../components/ProfileImagePicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import users from "../api/users";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { useToast } from "react-native-styled-toast";
// import { Snackbar } from "react-native-paper";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("E-mail Address"),
  bio: Yup.string().label("Bio"),
  phone: Yup.string().length(9).label("Phone Number"),
  gender: Yup.object().nullable().label("Gender"),
  profile_image: Yup.string().label("Profile Image"),
});

const textFields = {
  name: "Name",
  bio: "Bio",
  email: "E-mail Address",
  phone: "Phone Number",
};

function EditProfileScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { user } = route.params;
  const [goBack, setGoBack] = useState(false);
  const formRef = useRef();
  useEffect(() => {
    if (goBack) navigation.goBack();
  }, [goBack]);
  const { toast } = useToast();

  const handleSubmit = (user_info) => {
    console.log(user_info);
    users.editProfile(user_info);
    toast({ message: "The profile updated!" });
    navigation.goBack();
  };

  const handleBack = () => {
    Alert.alert(
      "Are you sure you to exit?",
      "the chnages you made wont be saved",
      [
        {
          text: "Cancel",
          onPress: () => setGoBack(false),
          style: "cancel",
      },
        { text: "OK", onPress: () => setGoBack(true) },
      ],
      { cancelable: false }
    );
  };
  const getValue = (value) => (value ? value : "");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ margin: 3 }}>
          <TouchableWithoutFeedback
            onPress={() => formRef.current.handleSubmit()}
          >
            <MaterialCommunityIcons
              name="check"
              size={30}
              color={colors.blue}
            />
          </TouchableWithoutFeedback>
        </View>
      ),
      headerLeft: () => (
        <View style={{ margin: 3 }}>
          <TouchableWithoutFeedback onPress={handleBack}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={35}
              color={colors.black}
            />
          </TouchableWithoutFeedback>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 200}
      >
        <Form
          initialValues={{
            name: user.name,
            email: user.email,
            bio: getValue(user.bio),
            phone: getValue(user.phone),
            gender: user.gender ? user.gender : null,
            profile_image: getValue(user.profile_image),
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          <ProfileImagePicker name="profile_image" />
          {Object.keys(textFields).map((name, i) => (
            <FormField
              key={i.toString()}
              name={name}
              TextInputComponent={TextInputWithLine}
              label={textFields[name]}
            />
          ))}
          <StandartFormPicker
            name="gender"
            label="Gender"
            items={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Decline to answer", value: null },
            ]}
          />
        </Form>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EditProfileScreen;
