import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import useApi from "../../hooks/useApi";
import Screen from "../../components/Screen";
import transactions from "../../api/transactions";
import ActivityIndicator from "../../components/ActivityIndicator";
import EmptyList from "../../components/EmptyList";
import { FontAwesome } from "@expo/vector-icons";
import routes from "../../navigation/routes";
import MyOrdersItem from "../../components/MyOrdersItem";
import { useTheme } from "react-native-paper";

const statuses = ["Delivered", "Proccessing", "Cancelled"];

function OrderedListingsScreen({ navigation }) {
  const getOrderedListingsApi = useApi(transactions.getOrderedListings);
  const [currStatus, setCurrStatus] = useState(statuses[0]);
  useEffect(() => {
    getOrderedListingsApi.request();
  }, []);
  const { colors } = useTheme();

  const getBackground = (status) =>
    currStatus === status ? { backgroundColor: colors.primary } : {};
  const getColor = (status) =>
    currStatus === status ? colors.white : colors.black;

  return (
    <>
      <ActivityIndicator visible={getOrderedListingsApi.loading} />
      {getOrderedListingsApi.data.length === 0 &&
      !getOrderedListingsApi.loading ? (
        <EmptyList
          titleKey="No existing buyed listing"
          subTitleKey="Go ahead to buy for your self some of our best products"
          IconComponent={FontAwesome}
          icon="shopping-bag"
          buttonHandler={() => {
            navigation.goBack();
            navigation.navigate(routes.LISTINGS);
          }}
          buttonTitle="Go Shooping"
        />
      ) : (
        <Screen style={[styles.container, { backgroundColor: colors.light }]}>
          <View style={styles.bar}>
            {statuses.map((status) => (
              <TouchableOpacity
                key={status}
                style={[styles.element, getBackground(status)]}
                onPress={() => setCurrStatus(status)}
              >
                <Text style={getColor(status)}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            data={getOrderedListingsApi.data}
            keyExtractor={(order) => order._id}
            renderItem={({ item }) => <MyOrdersItem orderData={item} />}
          />
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  element: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 7,
    paddingRight: 20,
    paddingLeft: 20,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
});

export default OrderedListingsScreen;
