import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import listingsApi from "../api/listings";
import categoriesApi from "../api/categories";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import TagPick from "../components/TagPick";
import { useTheme } from "react-native-paper";
import SearchBar from "./../components/SearchBar";

function ListingsScreen({ navigation }) {
  const { colors } = useTheme();
  const [filterdCategories, setFilterdCategories] = useState(new Set());
  const [categoriesMap, setCategoriesMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [originalListing, setOriginalListing] = useState([]);
  const [listing, setListing] = useState([]);
  const [search, setSearch] = useState("");

  const initData = async () => {
    setLoading(true);
    const categoryResponse = await categoriesApi.getCategories();
    const listingResponse = await listingsApi.getListings();
    setLoading(false);
    if (!categoryResponse.ok || !listingResponse.ok) return setError(true);
    setError(false);
    const newCategoriesMap = {};
    categoryResponse.data.forEach((c) => {
      newCategoriesMap[c.name] = c._id;
    });
    setCategoriesMap(newCategoriesMap);
    setOriginalListing(listingResponse.data);
    setListing(listingResponse.data);
  };
  useEffect(() => {
    initData();
  }, []);

  const onTagPickPressed = (tagName, picked) => {
    // console.log("tag selected");
    if (!picked) filterdCategories.add(categoriesMap[tagName]);
    else {
      filterdCategories.delete(categoriesMap[tagName]);
    }
    setFilterdCategories(filterdCategories);
    setListing(getFilteredListing());
  };

  const getFilteredListing = () => {
    if (filterdCategories.size === 0) return originalListing;
    return originalListing.filter((listing) =>
      filterdCategories.has(listing.categoryId)
    );
  };
  const searchFilter = (val) => {
    setSearch(val);
    if (val)
      setListing(
        originalListing.filter((listing) =>
          listing.title.toLowerCase().includes(val.toLowerCase())
        )
      );
    else setListing(getFilteredListing());
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen style={[styles.screen, { backgroundColor: colors.light }]}>
        <SearchBar search={search} onChange={searchFilter} />
        <View style={{ paddingBottom: 10 }}>
          <FlatList
            data={Object.keys(categoriesMap)}
            keyExtractor={(category) => category}
            renderItem={({ item }) => (
              <TagPick tagName={item} onPress={onTagPickPressed} />
            )}
            horizontal={true}
          />
        </View>
        {error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={initData} />
          </>
        )}
        {listing.length === 0 && (
          <AppText>No exiting listing with this filters.</AppText>
        )}
        <FlatList
          data={listing}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
          extraData={filterdCategories}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  search: {
    height: 20,
  },
});

export default ListingsScreen;
