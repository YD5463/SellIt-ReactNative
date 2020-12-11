import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Modal } from "react-native";
import Text from "../components/Text";
import Screen from "./../components/Screen";
import Button from "./../components/Button";
import useApi from "./../hooks/useApi";
import checkout from "../api/checkout";
import user from "../api/user";
import ActivityIndicator from "../components/ActivityIndicator";
import Constants from "expo-constants";
import { useTheme } from "react-native-paper";
import CheckoutElement from "../components/checkoutElement";
import AddElementInput from "../components/AddElementInput";
// import { Shapes } from "react-native-background-shapes";
import { LinearGradient } from "expo-linear-gradient";
import routes from "../navigation/routes";
import AddAddressScreen from "./AddAddressScreen";

const MAX_OPTIONS = 3;

function CheckoutScreen({ navigation }) {
  const getDeliveryAddressApi = useApi(user.getUserAddress);
  const getPaymentMethodsApi = useApi(checkout.getUserPaymentMethods);
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
      <LinearGradient
        colors={[colors.hardBlue, colors.light]}
        locations={[0.3, 0.5]}
        style={{ flex: 1 }}
      >
        <Screen>
          <View style={styles.container}>
            <Text style={[styles.heading, { color: "#FFFFFF" }]}>Checkout</Text>
            <View
              elevation={4}
              style={[styles.main, { backgroundColor: colors.white }]}
            >
              <View style={{ height: "50%" }}>
                <Text style={styles.subTitle}>Delivery Address</Text>
                {getDeliveryAddressApi.data.length > 0 && (
                  <FlatList
                    data={getDeliveryAddressApi.data}
                    keyExtractor={(address) => address.postal_code}
                    renderItem={({ item, index }) => (
                      <CheckoutElement
                        isChosen={chosenAddress === index}
                        data={item.street}
                        title={`Address #${index + 1}`}
                        onPress={() => {
                          setChoosenAddress(index);
                        }}
                      />
                    )}
                  />
                )}
                {getDeliveryAddressApi.data.length < MAX_OPTIONS && (
                  <AddElementInput
                    onPress={() => navigation.navigate(routes.ADD_ADDRESS)}
                    elementName="Address"
                  />
                )}
              </View>
              <Text style={styles.subTitle}>Payment Method</Text>
              {getPaymentMethodsApi.data.length > 0 && (
                <FlatList
                  data={getPaymentMethodsApi.data}
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
              )}
              {getPaymentMethodsApi.data.length < MAX_OPTIONS && (
                <View style={{ flex: 1 }}>
                  <AddElementInput
                    onPress={() => navigation.navigate(routes.ADD_PAYMENT)}
                    elementName="Credit Card"
                  />
                </View>
              )}
            </View>
            <View style={{ marginTop: 25 }}>
              <Button
                title="Payment"
                onPress={() => navigation.navigate(routes.CHECKOUT)}
                color="hardBlue"
                borderRadius={15}
              />
            </View>
          </View>
        </Screen>
      </LinearGradient>
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
