import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "../components/Text";
import Screen from "./../components/Screen";
import Button from "./../components/Button";
import useApi from "./../hooks/useApi";
import user from "../api/user";
import ActivityIndicator from "../components/ActivityIndicator";
import Constants from "expo-constants";
import { useTheme } from "react-native-paper";

const address = [
  {
    city: "Jerusalem",
    state: "Israel",
    postal_code: "9778807",
    country: "Israel",
    street: "Yoel Fridler",
  },
];
const paymentMethods = [
  {
    card_number: "4545454545454",
    icon_url:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconsdb.com%2Fblack-icons%2Fvisa-icon.html&psig=AOvVaw18hP5PTYh6TUETkAaAbyB3&ust=1606758385864000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJC_n8ynqO0CFQAAAAAdAAAAABAD",
  },
];
function CheckoutScreen(props) {
  const getDeliveryAddressApi = useApi(user.getUserAddress);
  const getPaymentMethodsApi = useApi(user.getUserPaymentMethods);
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
      <Screen style={[styles.container, { backgroundColor: colors.light }]}>
        <Text style={styles.heading}>Checkout</Text>
        <View style={[styles.main, { backgroundColor: colors.white }]}>
          <Text style={styles.subTitle}>Delivery Address</Text>
          <FlatList
            data={address}
            keyExtractor={(address) => address.postal_code}
            renderItem={({ item }) => <Text>Address</Text>}
          />
          <Text style={styles.subTitle}>Payment Method</Text>
          <FlatList
            data={paymentMethods}
            keyExtractor={(pm) => pm.card_number}
            renderItem={({ item }) => <Text>Payment</Text>}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <Button
            title="Payment"
            onPress={() => navigation.navigate(routes.CHECKOUT)}
            color="darkGray"
            borderRadius={15}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 13,
    paddingTop: Constants.statusBarHeight + 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    paddingBottom: 15,
  },
  main: {
    zIndex: 2,
    height: "70%",
    width: "100%",
    borderRadius: 15,
  },
  subTitle: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 22,
  },
});

export default CheckoutScreen;
