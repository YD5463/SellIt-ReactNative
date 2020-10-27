import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import logger from "../utility/logger";
import routes from "../navigation/routes";
import Text from "../components/Text";
import ProfileImagePicker from "./../components/ProfileImagePicker";
import { useTranslation } from "react-i18next";
import expoPushToken from "../api/expoPushToken";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
// import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

/*
    .test(
      "fileSize",
      "File is too large",
      (value) => !value || (value && value.size > 0)
    )
*/
const validationSchema = Yup.object().shape({
  profile_image: Yup.mixed().test(
    "fileFormat",
    "Unsupported Format",
    (value) =>
      !value ||
      ((value) => value && ["jpeg", "png", "jpg"].includes(value.type))
  ),
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  phone_number: Yup.string()
    .required()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
});

function RegisterScreen({ navigation }) {
  const loginApi = useApi(authApi.login);
  const { t } = useTranslation();
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await usersApi.register(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        // logger.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    if (!authToken) return;
    //auth.logIn(authToken);
    const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (granted) {
      //const token = await registerForPushNotificationsAsync();
      //expoPushToken.register(token);
    }
    navigation.navigate(routes.VALIDATE_EMAIL, {
      authToken,
      email: userInfo.email,
    });
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{
            name: "",
            email: "",
            password: "",
            phone_number: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <ProfileImagePicker name="profile_image" />
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <FormField
            keyboardType="numeric"
            name="phone_number"
            placeholder="Phone Number"
            icon="cellphone"
          />
          <SubmitButton title={t("register")} />
        </Form>
        <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
          <Text style={styles.login}>{t("login")}</Text>
        </TouchableOpacity>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  login: {
    alignSelf: "center",
    fontSize: 21,
    padding: 10,
  },
});

export default RegisterScreen;
