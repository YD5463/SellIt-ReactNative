import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import myApi from "../../api/my";
import listingsApi from "../../api/listings";

import ActivityIndicator from "../../components/ActivityIndicator";
import AccountListingItem from "../../components/AccountListingItem";
import routes from "../../navigation/routes";
import { useToast } from "react-native-styled-toast";
import EmptyList from "../../components/EmptyList";
import { FontAwesome } from "@expo/vector-icons";

function AccountListingsScreen({ route, navigation }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initData = async () => {
    setLoading(true);
    const res = await myApi.getMyListings();
    setLoading(false);
    if (res.ok) setListings(res.data);
    else
      toast({
        message: "Error accured...",
        intent: "ERROR",
      });
  };
  useEffect(() => {
    initData();
  }, []);
  const onDelete = async (listingId) => {
    const originalListings = listings;
    setListings(listings.filter((listing) => listing._id !== listingId));
    const res = await listingsApi.deleteListing(listingId);
    if (!res.ok) {
      setListings(originalListings);
      toast({
        message: "Error accured while delete...",
        intent: "ERROR",
      });
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      {listings.length === 0 && !loading ? (
        <EmptyList
          titleKey="emptyMylistingsTitle"
          subTitleKey="emptyMylistingsSubTitle"
          IconComponent={FontAwesome}
          icon="shopping-bag"
          buttonHandler={() => {
            navigation.goBack();
            navigation.navigate(routes.LISTING_EDIT);
          }}
          buttonTitle="createFirstListing"
        />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={listings}
            renderItem={({ item }) => (
              <AccountListingItem
                listing={item}
                onEdit={() =>
                  navigation.navigate(routes.LISTING_EDIT, { listing: item })
                }
                onDelete={() => onDelete(item._id)}
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
