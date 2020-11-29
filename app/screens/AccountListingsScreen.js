import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import useApi from "./../hooks/useApi";
import myApi from "../api/my";
import ActivityIndicator from "../components/ActivityIndicator";
import AccountListingItem from "./../components/AccountListingItem";
import routes from "../navigation/routes";

function AccountListingsScreen({ route, navigation }) {
  const getListingApi = useApi(myApi.getMyListings);
  useEffect(() => {
    getListingApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingApi.loading} />

      {!getListingApi.loading && getListingApi.data !== null && (
        <View style={styles.container}>
          <FlatList
            data={getListingApi.data}
            renderItem={({ item }) => (
              <AccountListingItem
                listing={item}
                onPress={() =>
                  navigation.navigate(routes.LISTING_EDIT, { listing: item })
                }
              />
            )}
            keyExtractor={(listing) => listing._id}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AccountListingsScreen;
