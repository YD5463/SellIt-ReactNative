import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "../components/Text";
import Screen from "./../components/Screen";
import Button from "./../components/Button";
import useApi from "./../hooks/useApi";
import user from "../api/user";
import ActivityIndicator from "../components/ActivityIndicator";
import Constants from "expo-constants";
import { Modal, useTheme } from "react-native-paper";
import CheckoutElement from "../components/CheckoutElement";
import AddElementInput from "../components/AddElementInput";

const address = [
  {
    city: "Jerusalem",
    state: "Israel",
    postal_code: "9778807",
    country: "Israel",
    street: "Yoel Fridler",
  },
  {
    city: "Jerusalem",
    state: "Israel",
    postal_code: "9778807",
    country: "Israel",
    street: "Sherman ohoks",
  },
];
const paymentMethods = [
  {
    card_number: "4545454545454",
    icon_url: "http://192.168.68.101:9000/assets/mastercard.jpg",
  },
];
const MAX_OPTIONS = 3;

function CheckoutScreen(props) {
  const getDeliveryAddressApi = useApi(user.getUserAddress);
  const getPaymentMethodsApi = useApi(user.getUserPaymentMethods);
  const [chosenAddress, setChoosenAddress] = useState(0);
  const [chosenPayment, setChoosenPayment] = useState(0);

  const { colors } = useTheme();
  useEffect(() => {
    getDeliveryAddressApi.request();
    getPaymentMethodsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator
        visible={getDeliveryAddressApi.loading || getPaymentMethodsApi.loading}
      />
      <Modal visible={true}>
          
      </Modal>
      <Screen style={[styles.container, { backgroundColor: colors.light }]}>
        <Text style={[styles.heading, { color: colors.black }]}>Checkout</Text>
        <View
          elevation={4}
          style={[styles.main, { backgroundColor: colors.white }]}
        >
          <Text style={styles.subTitle}>Delivery Address</Text>
          <FlatList
            data={address}
            keyExtractor={(address) => address.postal_code}
            renderItem={({ item, index }) => (
              <CheckoutElement
                isChosen={chosenAddress === index}
                data={item.street}
                title={`Address #${index + 1}`}
                onPress={() => {
                  setChoosenAddress(index);
                  console.log("im here");
                }}
              />
            )}
          />
          {address.length < MAX_OPTIONS && (
            <AddElementInput onPress={() => {}} elementName="Address" />
          )}
          <Text style={styles.subTitle}>Payment Method</Text>
          <FlatList
            data={paymentMethods}
            keyExtractor={(pm) => pm.card_number}
            renderItem={({ item, index }) => (
              <CheckoutElement
                isChosen={chosenPayment === index}
                data={item.card_number}
                icon={item.icon_url}
                isSecure={true}
                onPress={() => setChoosenPayment(index)}
              />
            )}
          />
          {address.length < MAX_OPTIONS && (
            <AddElementInput onPress={() => {}} elementName="Credit Card" />
          )}
        </View>
        <View style={{ marginTop: 25 }}>
          <Button
            title="Payment"
            onPress={() => navigation.navigate(routes.CHECKOUT)}
            color="pink"
            borderRadius={15}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: Constants.statusBarHeight + 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    paddingBottom: 15,
  },
  main: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    height: "75%",
    width: "100%",
    borderRadius: 15,
    padding: 13,
  },
  subTitle: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 22,
  },
});

export default CheckoutScreen;
