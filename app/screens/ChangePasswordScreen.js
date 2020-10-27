import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, ActivityIndicator, Keyboard } from "react-native";
import TextInputWithLine from "./../components/TextInputWithLine";
import { useTheme } from "react-native-paper";
import Screen from "./../components/Screen";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import users from "../api/users";
import Text from "../components/Text";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(5).label("Password"),
  repeat_password: Yup.string().required().min(5).label("Password"),
  current_password: Yup.string().required().min(5).label("Current password"),
});

function ChangePasswordScreen({ navigation }) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handle_submit = async (values, { resetForm }) => {
    setError("");
    if (values.password !== values.repeat_password)
      return setError("Passwords doesn't match");
    if (values.password === values.current_password)
      return setError("The new password is the same as the current password");
    setLoading(true);
    const response = await users.change_password(values);
    setLoading(false);
    resetForm();
    Keyboard.dismiss();
    if (!response.ok) return setError("Current password is invalid.");
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigation.goBack();
    }, 4000);
  };
  const { t } = useTranslation();
  return (
    <>
      <ActivityIndicator animating={loading} size="large" />
      <Screen style={styles.container}>
        <Form
          validationSchema={validationSchema}
          initialValues={{
            current_password: "",
            password: "",
            repeat_password: "",
          }}
          onSubmit={handle_submit}
        >
          <FormField
            name="current_password"
            width="100%"
            iconName="lock"
            label="current_password"
            color={colors.hardLight}
            TextInputComponent={TextInputWithLine}
            secureTextEntry
          />
          <FormField
            name="password"
            width="100%"
            label="new_password"
            iconName="key-variant"
            color={colors.hardLight}
            TextInputComponent={TextInputWithLine}
            secureTextEntry
          />
          <FormField
            name="repeat_password"
            width="100%"
            label="new_password_again"
            iconName="repeat"
            color={colors.hardLight}
            TextInputComponent={TextInputWithLine}
            Icon={FontAwesome}
            secureTextEntry
          />
          <ErrorMessage error={error} visible={error !== "" && !success} />
          <SubmitButton title={t("save")} />
          {success && (
            <Text style={styles.success_message}>
              Password updated succfully
            </Text>
          )}
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  success_message: {
    fontWeight: "bold",
    color: "#78E194", //green
    fontSize: 20,
    textAlign: "center",
  },
});

export default ChangePasswordScreen;
