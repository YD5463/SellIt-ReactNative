import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import useApi from "../../hooks/useApi";
import Screen from "../../components/Screen";
import transactions from "../../api/transactions";
import ActivityIndicator from "../../components/ActivityIndicator";

function OrderedListingsScreen(props) {
  const getOrderedListingsApi = useApi(transactions.getOrderedListings);
  useEffect(() => {
    getOrderedListingsApi.request();
  }, []);
  return (
    <>
      <ActivityIndicator visible={getOrderedListingsApi.loading} />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OrderedListingsScreen;
