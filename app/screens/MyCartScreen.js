import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ViewCartItem from "../components/ViewCartItem";
import Screen from "./../components/Screen";
import { useTheme } from "react-native-paper";
import Text from "../components/Text";
import { ListItemSeparator } from "../components/lists";
import AppButton from "../components/Button";
import cache from "../utility/cache";
import settings from "../config/settings";
import routes from "../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { backgroundColor } from "styled-system";

function MyCartScreen({ route, navigation }) {
  const getSum = (cart) => {
    let sum = 0;
    for (const [id, details] of Object.entries(cart))
      sum += details.quantity * details.price;
    return sum;
  };
  const { cart } = route.params;
  const { colors } = useTheme();
  const [editedCart, setEditedCart] = useState(cart);
  const setCart = (newCart) => {
    setEditedCart(newCart);
    cache.store(settings.CartCacheKey, newCart);
  };
  const [sum, setSum] = useState(getSum(cart));
  return cart && cart.length > 0 ? (
    <Screen style={[styles.container, { backgroundColor: colors.light }]}>
      <View style={{ paddingBottom: 15 }}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.itemsNumber}>{`${
          Object.keys(editedCart).length
        } items`}</Text>
      </View>
      <ListItemSeparator height={2} colorName="medium" />
      <View style={{ height: "60%" }}>
        <FlatList
          data={Object.keys(editedCart)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ViewCartItem
              item={editedCart[item]}
              onMinus={(itemId) => {
                setSum(sum - editedCart[itemId].price);
                if (--editedCart[itemId].quantity === 0)
                  delete editedCart[itemId];
                setCart(editedCart);
              }}
              onPlus={(itemId) => {
                setSum(sum + editedCart[itemId].price);
                editedCart[itemId].quantity++;
                setCart(editedCart);
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <ListItemSeparator height={2} colorName="boldLight" />
          )}
        />
      </View>
      <ListItemSeparator height={2} colorName="boldLight" />
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.medium }}>Sub Total</Text>
        </View>
        <Text style={styles.total}>{`$${sum}`}</Text>
      </View>
      <AppButton
        title="check out"
        onPress={() =>
          navigation.navigate(routes.CHECKOUT, { listings: editedCart })
        }
        color="darkGray"
        borderRadius={15}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBack}>Countinue Shooping</Text>
      </TouchableOpacity>
    </Screen>
  ) : (
    <Screen style={[styles.emptyCart, { backgroundColor: colors.light }]}>
      <View style={[styles.mainCircle, { backgroundColor: colors.white }]}>
        <MaterialCommunityIcons
          name="basket"
          size={150}
          color={colors.primary}
        />
      </View>
      <Text style={[styles.emptyCartTitle, { color: colors.medium }]}>
        Cart Empty
      </Text>
      <Text style={[styles.emptyCartSubTitle, { color: colors.medium }]}>
        Go Ahaed, pick some product you like and get back here to complete the
        buying proccess...
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingBottom: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  itemsNumber: {
    fontSize: 18,
    fontWeight: "500",
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "stretch",
    textAlign: "center",
  },
  goBack: {
    fontSize: 20,
    textAlign: "center",
  },
  mainCircle: {
    width: 275,
    height: 275,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10%",
  },
  emptyCartTitle: {
    fontSize: 30,
    fontWeight: "600",
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  emptyCartSubTitle: {
    paddingTop: 15,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
  },
});

export default MyCartScreen;
