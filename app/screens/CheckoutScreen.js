import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Modal, Alert } from "react-native";
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
import { useToast } from "react-native-styled-toast";
import { useTranslation } from "react-i18next";

const MAX_OPTIONS = 3;

function CheckoutScreen({ navigation }) {
  const getDeliveryAddressApi = useApi(user.getUserAddress);
  const getPaymentMethodsApi = useApi(checkout.getUserPaymentMethods);
  const [deliveries, setDeliveries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [chosenAddress, setChoosenAddress] = useState(0);
  const [chosenPayment, setChoosenPayment] = useState(0);
  const deletePaymentApi = useApi(checkout.deletePaymentMethod);
  const deleteAddressApi = useApi(checkout.deleteAddress);
  const [paymentIndexToDelete, setPaymentIndexToDelete] = useState(-1);
  const [addressIndexToDelete, setAddressIndexToDelete] = useState(-1);

  const { toast } = useToast();
  const { t } = useTranslation();

  const { colors } = useTheme();

  const getData = async () => {
    await getDeliveryAddressApi.request();
    console.log(getDeliveryAddressApi.data);
    setDeliveries(getDeliveryAddressApi.data);
    await getPaymentMethodsApi.request();
    setPayments(getPaymentMethodsApi.data);
  };

  useEffect(() => {
    getData();
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, []);
  // console.log(getPaymentMethodsApi.data);

  const handleDeletePayment = async () => {
    await deletePaymentApi.request(payments[paymentIndexToDelete].payemntId);
    if (!deletePaymentApi.error)
      setPayments(payments.splice(paymentIndexToDelete, 1));
    else toast({ message: "Error Accuured,Please try again", color: "red" });
  };
  const handleDeleteAddres = async () => {
    await deleteAddressApi.request(deliveries[addressIndexToDelete]._id);
    if (!deleteAddressApi.error)
      setDeliveries(deliveries.splice(addressIndexToDelete, 1));
    else toast({ message: "Error Accuured,Please try again", color: "red" });
  };

  useEffect(() => {
    if (paymentIndexToDelete === -1) return;
    handleDeletePayment();
  }, [paymentIndexToDelete]);

  useEffect(() => {
    if (addressIndexToDelete === -1) return;
    handleDeleteAddres();
  }, [addressIndexToDelete]);

  const onDelete = (index, titleKey, subTitleKey, updateIndex) => {
    updateIndex(-1);
    Alert.alert(
      t(titleKey),
      t(subTitleKey),
      [
        {
          text: t("cancel"),
          onPress: () => {},
          style: "cancel",
        },
        { text: t("ok"), onPress: () => updateIndex(index) },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ActivityIndicator
        visible={getDeliveryAddressApi.loading || getPaymentMethodsApi.loading}
      />
      <Screen style={{ backgroundColor: colors.light }}>
        <View style={styles.container}>
          <Text style={[styles.heading, { color: colors.black }]}>
            Checkout
          </Text>
          <View
            elevation={4}
            style={[styles.main, { backgroundColor: colors.white }]}
          >
            <View style={{ height: "48%" }}>
              <Text style={styles.subTitle}>Delivery Address</Text>

              <FlatList
                data={deliveries}
                keyExtractor={(address) => address.postal_code}
                renderItem={({ item, index }) => (
                  <CheckoutElement
                    isChosen={chosenAddress === index}
                    data={item.street}
                    title={`Address #${index + 1}`}
                    onPress={() => {
                      setChoosenAddress(index);
                    }}
                    onDelete={() =>
                      onDelete(
                        index,
                        "removeAddressTitle",
                        "removeAddressSubtitle",
                        setAddressIndexToDelete
                      )
                    }
                  />
                )}
              />
              {deliveries.length < MAX_OPTIONS && (
                <AddElementInput
                  onPress={() => navigation.navigate(routes.ADD_ADDRESS)}
                  elementName="Address"
                />
              )}
            </View>
            <Text style={styles.subTitle}>Payment Method</Text>

            <FlatList
              data={payments}
              keyExtractor={(pm) => pm.card_number}
              renderItem={({ item, index }) => (
                <CheckoutElement
                  isChosen={chosenPayment === index}
                  data={item.card_number}
                  icon={item.icon_url}
                  isSecure={true}
                  onPress={() => setChoosenPayment(index)}
                  onDelete={() =>
                    onDelete(
                      index,
                      "removePaymentTitle",
                      "removePaymentSubtitle",
                      setPaymentIndexToDelete
                    )
                  }
                />
              )}
            />

            {payments.length < MAX_OPTIONS && (
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
              color="pink"
              borderRadius={15}
            />
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
    height: "77%",
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
