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

function OrderedListingsScreen({ navigation }) {
  const getOrderedListingsApi = useApi(transactions.getOrderedListings);
  const getStatusesApi = useApi(transactions.getStatuses);
  const [currStatus, setCurrStatus] = useState();
  const [orders, setOrders] = useState([]);
  const init = async () => {
    await getOrderedListingsApi.request();
    const response = await getStatusesApi.request();
    const defualtStatus = response.data[0]._id;
    if (response.ok) setCurrStatus(defualtStatus);
  };
  useEffect(() => {
    setOrders(
      getOrderedListingsApi.data.filter((order) => order.status === currStatus)
    );
  }, [currStatus]);

  useEffect(() => {
    init();
  }, []);
  const { colors } = useTheme();

  const getBackground = (status) => {
    console.log(currStatus, status);
    return currStatus === status ? { backgroundColor: colors.primary } : {};
  };
  const getColor = (status) =>
    currStatus === status ? { color: colors.white } : { color: colors.black };

  return (
    <>
      <ActivityIndicator
        visible={getOrderedListingsApi.loading || getStatusesApi.loading}
      />
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
            {getStatusesApi.data.map((status) => (
              <TouchableOpacity
                key={status._id}
                style={[styles.element, getBackground(status._id)]}
                onPress={() => setCurrStatus(status._id)}
              >
                <Text style={getColor(status._id)}>{status.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            data={orders}
            keyExtractor={(order) => order._id}
            renderItem={({ item }) => (
              <MyOrdersItem
                orderData={item}
                onDetailPressed={() =>
                  navigation.navigate(routes.ODRER_DETAILS, { orderData: item })
                }
                statuses={getStatusesApi.data}
              />
            )}
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
