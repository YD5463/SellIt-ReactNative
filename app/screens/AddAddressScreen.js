import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useToast } from "react-native-styled-toast";
import { useTheme } from "react-native-paper";
import * as Yup from "yup";

import {
  Form,
  SubmitButton,
  FormField,
  ErrorMessage,
  FormPickerWithManyOptions,
} from "../components/forms";
import useApi from "./../hooks/useApi";
import checkout from "../api/checkout";
import address from "../api/address";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import GoBackButton from "../components/GoBackButton";
import routes from "../navigation/routes";
import RectTextInput from "./../components/TextInputs/RectTextInput";

Yup.addMethod(Yup.string, "integer", function () {
  return this.matches(/^\d+$/, "The field should have digits only");
});

const validationSchema = Yup.object().shape({
  city: Yup.string().label("City").required(),
  state: Yup.string().label("State").optional(),
  postal_code: Yup.string().label("Postal Code").optional().integer(),
  country: Yup.string().required().label("Country"),
  street: Yup.string().required().label("Street"),
});

function AddAddressScreen({ navigation }) {
  const { colors } = useTheme();
  const addAddressApi = useApi(checkout.addAdresss);
  const getSupportedCountries = useApi(address.getCountries);
  const getSupportedCities = useApi(address.getCities);
  const getSupportedStates = useApi(address.getStates);
  const [relevantCountries, setRelevantCountries] = useState();
  const [relevantStates, setRelevantStates] = useState();
  const [relevantCities, setRelevantCities] = useState();
  const formRef = useRef();
  const { toast } = useToast();
  const { t } = useTranslation();

  const init = async () => {
    await getSupportedCities.request();
    await getSupportedCountries.request();
    await getSupportedStates.request();
    setRelevantCountries(getSupportedCountries.data);
    setRelevantCities(getSupportedCities.data);
    setRelevantStates(getSupportedStates.data);
  };
  useEffect(() => {
    init();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    await addAddressApi.request(values);
    if (addAddressApi.error) return console.log("Error Accured!!!");
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
            innerRef={formRef}
          >
            <FormField
              TextInputComponent={RectTextInput}
              name="street"
              label="Street"
              maxLength={40}
            />
            <FormField
              TextInputComponent={RectTextInput}
              name="postal_code"
              label="Postal Code"
              keyboardType="numeric"
              maxLength={12}
            />

            <FormPickerWithManyOptions
              name="country"
              onPress={(params) => {
                navigation.navigate(routes.OPTIONS_PICKER, params);
              }}
              options={getSupportedCountries.data}
              label="Country"
            />
            <FormPickerWithManyOptions
              name="state"
              onPress={(params) => {
                navigation.navigate(routes.OPTIONS_PICKER, params);
              }}
              options={getSupportedStates.data}
              label="State"
            />

            <FormPickerWithManyOptions
              name="city"
              onPress={(params) => {
                navigation.navigate(routes.OPTIONS_PICKER, params);
              }}
              options={getSupportedCities.data}
              label="City"
              
            />

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
    paddingLeft: 15,
    paddingRight: 15,
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
