import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";

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
import { MaterialIcons } from "@expo/vector-icons";
import Cart from "../components/Cart";
// import Slider from "@react-native-community/slider";

function ListingsScreen({ navigation }) {
  const { colors } = useTheme();
  const [filterdCategories, setFilterdCategories] = useState(new Set());
  const [categoriesMap, setCategoriesMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [originalListing, setOriginalListing] = useState([]);
  const [listing, setListing] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [cartSize, setCartSize] = useState(0);
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
    if (!picked) filterdCategories.add(categoriesMap[tagName]);
    else {
      filterdCategories.delete(categoriesMap[tagName]);
    }
    setFilterdCategories(filterdCategories);
    setListing(getFilteredListing(search, filterdCategories));
  };

  const getFilteredListing = (search, filterdCategories) => {
    return originalListing.filter((listing) => {
      let res = true;
      if (filterdCategories.size !== 0)
        res = res && filterdCategories.has(listing.categoryId);
      if (search !== "")
        res = res && listing.title.toLowerCase().includes(search.toLowerCase());
      return res;
    });
  };
  const searchFilter = (val) => {
    setSearch(val);
    setListing(getFilteredListing(val, filterdCategories));
  };
  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen style={[styles.screen, { backgroundColor: colors.light }]}>
        <View style={styles.head}>
          <Cart
            elementsNumber={cartSize}
            onPress={() => navigation.navigate(routes.MY_CART, { cart })}
          />

          <SearchBar search={search} onChange={searchFilter} width="85%" />
          <View style={{ marginLeft: 5 }}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <MaterialIcons name="sort" size={30} color={colors.medium} />
            </TouchableWithoutFeedback>
          </View>
        </View>

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
        <View style={{ padding: 20 }}>
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
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
                thumbnailUrl={item.images[0].thumbnailUrl}
                OnAddToCart={() => {
                  const key = item._id;
                  if (!cart[key]) cart[key] = { ...item, quantity: 0 };
                  cart[key].quantity++;
                  setCart(cart);
                  setCartSize(cartSize + 1);
                }}
                OnBuy={() => {}} //navigate
              />
            )}
            extraData={filterdCategories}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 8,
  },
  search: {
    height: 20,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    padding: 3,
  },
});

export default ListingsScreen;
