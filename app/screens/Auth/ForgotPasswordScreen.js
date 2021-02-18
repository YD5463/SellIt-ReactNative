import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import ActivityIndicator from "../../components/ActivityIndicator";
import useApi from "../../hooks/useApi";
import users from "../../api/users";
import routes from "../../navigation/routes";
import { useToast } from "react-native-styled-toast";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
});

function ForgotPasswordScreen({ navigation }) {
  const forgotPasswordApi = useApi(users.forgot_password);
  const { toast } = useToast();

  const handleSubmit = async (values) => {
    await forgotPasswordApi.request(values.email);
    if (!forgotPasswordApi.error) {
      navigation.navigate(routes.LOGIN);
      toast({ message: "New password sent to your email..." });
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <ActivityIndicator visible={forgotPasswordApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder={t("E-mail Address")}
            textContentType="emailAddress"
          />
          <ErrorMessage
            error="Email not exists, please try again..."
            visible={forgotPasswordApi.error}
          />
          <SubmitButton title="Restore Password" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default ForgotPasswordScreen;
