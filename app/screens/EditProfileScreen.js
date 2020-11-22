import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useContext,
} from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  Form,
  FormField,
  StandartFormPicker,
  ErrorMessage,
} from "../components/forms";
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
import useApi from "./../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import storage from "../auth/storage";
import { useTranslation } from "react-i18next";

const phone_regex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("E-mail Address"),
  bio: Yup.string().label("Bio"),
  phone_number: Yup.string()
    .matches(phone_regex, "Phone Number is'nt valid")
    .required(),
  gender: Yup.object().nullable().label("Gender"),
  profile_image: Yup.string().label("Profile Image"),
});

const textFields = {
  name: "Name",
  bio: "Bio",
  email: "E-mail Address",
  phone_number: "Phone Number",
};

function EditProfileScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { user } = route.params;
  const [goBack, setGoBack] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const formRef = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    if (goBack) navigation.goBack();
  }, [goBack]);
  const { toast } = useToast();

  const handleSubmit = async (user_info) => {
    setLoading(true);
    const res = await users.editProfile(user_info);
    if (!res.ok) return setError(res.data);
    setError(undefined);
    await storage.storeToken(res.data.token);
    setLoading(false);
    toast({ message: "The profile updated!" });
    setInterval(() => setGoBack(true), 400);
  };

  const handleBack = () => {
    Alert.alert(
      t("exitTitle"),
      t("exitSubTitle"),
      [
        {
          text: t("cancel"),
          onPress: () => setGoBack(false),
          style: "cancel",
        },
        { text: t("ok"), onPress: () => setGoBack(true) },
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
            onPress={() => {
              if (formRef.current.isValid && formRef.current.dirty)
                formRef.current.handleSubmit();
            }}
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
    <>
      <ActivityIndicator visible={loading} />
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
              phone_number: getValue(user.phone_number),
              gender: user.gender,
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
              label={t("gender")}
              items={[
                { label: t("male"), value: "male" },
                { label: t("female"), value: "female" },
                { label: t("decline"), value: "decline" },
              ]}
            />
            <ErrorMessage
              error={`Somthing went worng, please try again...${error}`}
              visible={error}
            />
          </Form>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EditProfileScreen;
