import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../components/Text";
import Screen from "./../components/Screen";
import { useTheme } from "react-native-paper";
import { Form, SubmitButton, FormField } from "../components/forms";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import RectTextInput from "./../components/TextInputs/RectTextInput";
import useApi from "./../hooks/useApi";
import checkout from "../api/checkout";
import { useToast } from "react-native-styled-toast";
import GoBackButton from "../components/GoBackButton";

Yup.addMethod(Yup.string, "integer", function () {
  return this.matches(/^\d+$/, "The field should have digits only");
});

const validationSchema = Yup.object().shape({
  card_number: Yup.string().required(), //TODO:add more checking here
  owner_name: Yup.string()
    .required()
    .test(
      "length",
      "Maximum Length",
      (name) => name && name.length < 20 && name.length > 1
    ),
  id_number: Yup.string().length(9).required().integer(),
  cvv: Yup.string().required().integer(),
  expired_date: Yup.string()
    .required()
    .matches(/[\d]{2}\/[\d]{2}/, "Invalid Date")
    .test("date", "Invalid Date", (text) => {
      if (!text) return false;
      const date = text.split("/");
      if (date.length != 2) return false;
      const only_digit = /^\d+$/;
      if (!only_digit.test(date[0]) || !only_digit.test(date[1])) return false;
      const month = parseInt(date[0], 10);
      const year = parseInt(date[1], 10);
      console.log(text, date);
      const curr_year = new Date().getFullYear().toString().substr(-2);
      if (month > 12 || month < 0 || year < curr_year || year > curr_year + 8)
        return false;
      return true;
    }),
});

function AddPaymentMethodScreen({ navigation }) {
  const { colors } = useTheme();
  const addPaymentApi = useApi(checkout.addPayemtMethods);
  const { toast } = useToast();

  const handleSubmit = async (values) => {
    await addPaymentApi.request(values);
    if (!addPaymentApi.error) {
      navigation.goBack();
      toast({ message: "Add Payment Succfully!" });
    }
  };

  return (
    <Screen style={[styles.container]}>
      <GoBackButton onPress={() => navigation.goBack()} />
      <View style={styles.paymentTypes}></View>
      <Text style={styles.title}>Add Payment Method</Text>
      <Form
        initialValues={{
          card_number: "",
          owner_name: "",
          id_number: "",
          cvv: "",
          expired_date: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          cardNumber={true}
          TextInputComponent={RectTextInput}
          label="Cart Number"
          keyboardType="numeric"
          maxLength={19}
          name="card_number"
          placeholder="Cart Number"
        />
        <FormField
          TextInputComponent={RectTextInput}
          label="Owner Name"
          maxLength={15}
          name="owner_namer"
          placeholder="Owner Name"
        />
        <FormField
          TextInputComponent={RectTextInput}
          label="Owner ID"
          keyboardType="numeric"
          maxLength={15}
          name="id_number"
          placeholder="Owner ID"
        />
        <View style={{ flexDirection: "row" }}>
          <FormField
            TextInputComponent={RectTextInput}
            keyboardType="numeric"
            maxLength={4}
            name="cvv"
            placeholder="CVV"
            label="CVV"
            secureTextEntry
            width="50%"
            twoInRow={true}
          />
          <FormField
            TextInputComponent={RectTextInput}
            keyboardType="numeric"
            maxLength={5}
            isDateInput={true}
            name="expired_date"
            placeholder="Expired Date"
            label="Expired Date"
            width="50%"
          />
        </View>
        <View style={{ paddingTop: 25 }}>
          <SubmitButton borderRadius={10} color="hardBlue" title="Add" />
        </View>
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 23,
    fontFamily: "Roboto",
    paddingTop: 15,
  },
  paymentTypes: {
    flexDirection: "row",
  },
});

export default AddPaymentMethodScreen;
