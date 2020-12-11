import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import Text from "../components/Text";
import { useTheme } from "react-native-paper";
import {
  Form,
  SubmitButton,
  FormField,
  ErrorMessage,
  FormPickerWithManyOptions,
} from "../components/forms";
import * as Yup from "yup";
import useApi from "./../hooks/useApi";
import checkout from "../api/checkout";
import { useToast } from "react-native-styled-toast";
import TextInputWithLine from "./../components/TextInputWithLine";
import address from "../api/address";
import ActivityIndicator from "../components/ActivityIndicator";
import { useTranslation } from "react-i18next";
import Screen from "../components/Screen";
import GoBackButton from "../components/GoBackButton";
import { Ionicons } from "@expo/vector-icons";
import routes from "../navigation/routes";

Yup.addMethod(Yup.string, "integer", function () {
  return this.matches(/^\d+$/, "The field should have digits only");
});

const validationSchema = Yup.object().shape({
  city: Yup.string().required(),
  state: Yup.string().optional(),
  postal_code: Yup.string().optional().integer(),
  country: Yup.string().required(),
  street: Yup.string().required(),
});

function AddAddressScreen({ navigation }) {
  const { colors } = useTheme();
  const addAddressApi = useApi(checkout.addAdresss);
  const getSupportedCountries = useApi(address.getCountries);
  const getSupportedCities = useApi(address.getCities);
  const getSupportedStates = useApi(address.getStates);

  const { toast } = useToast();
  const { t } = useTranslation();
  console.log(getSupportedCountries.data);
  useEffect(() => {
    getSupportedCities.request();
    getSupportedCountries.request();
    getSupportedStates.request();
  }, []);

  const handleSubmit = async (values) => {
    await addAddressApi.request(values);
    if (addAddressApi.error) return;
    toast({ message: "Add Address Succfully!" });
    navigation.goBack();
  };
  return (
    <>
      <ActivityIndicator
        visible={
          getSupportedCities.loading ||
          getSupportedCountries.loading ||
          getSupportedStates.loading
        }
      />
      <Screen style={{ padding: 10 }}>
        <GoBackButton onPress={() => navigation.goBack()} />
        <View style={[styles.container, { backgroundColor: colors.white }]}>
          <Form
            initialValues={{
              city: "",
              state: "",
              postal_code: "",
              country: "",
              street: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField
              TextInputComponent={TextInputWithLine}
              name="street"
              label="Street"
            />
            {!getSupportedCountries.loading && (
              <FormPickerWithManyOptions
                name="country"
                onPress={(params) => {
                  navigation.navigate(routes.OPTIONS_PICKER, params);
                }}
                options={getSupportedCountries.data}
              />
            )}
            <ErrorMessage
              visible={
                addAddressApi.error ||
                getSupportedCities.error ||
                getSupportedCountries.error ||
                getSupportedStates.error
              }
              error="Somthing went worng,please try again..."
            />
            <View style={{ paddingTop: 18 }}>
              <SubmitButton borderRadius={10} color="hardBlue" title="Add" />
            </View>
          </Form>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    marginTop: "auto",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    borderRadius: 15,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  underline: {
    borderBottomWidth: 1,
    alignSelf: "stretch",
    paddingTop: 10,
    flexDirection: "row",
  },
});

export default AddAddressScreen;
