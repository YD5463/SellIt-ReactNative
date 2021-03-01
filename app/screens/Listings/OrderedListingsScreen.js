import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import useApi from "../../hooks/useApi";
import Screen from "../../components/Screen";
import transactions from "../../api/transactions";
import ActivityIndicator from "../../components/ActivityIndicator";
import EmptyList from "../../components/EmptyList";
import { FontAwesome } from "@expo/vector-icons";
import routes from "../../navigation/routes";

function OrderedListingsScreen({ navigation }) {
  const getOrderedListingsApi = useApi(transactions.getOrderedListings);
  useEffect(() => {
    getOrderedListingsApi.request();
  }, []);
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
        <Screen style={styles.container}>
          <FlatList
            data={getOrderedListingsApi.data}
            keyExtractor={(order) => order._id}
            renderItem={({ item }) => (
              <View>
                <Text>Item 1</Text>
              </View>
            )}
          />
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OrderedListingsScreen;
