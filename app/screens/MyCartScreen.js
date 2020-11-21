import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ViewCartItem from "../components/ViewCartItem";
import Screen from "./../components/Screen";
import { useTheme } from "react-native-paper";
import Text from "../components/Text";
import { ListItemSeparator } from "../components/lists";
import AppButton from "../components/Button";

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
  console.log(cart);
  return (
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
                if (--editedCart[itemId].quantity === 0)
                  delete editedCart[itemId];
                setEditedCart(editedCart);
              }}
              onPlus={(itemId) => {
                editedCart[itemId].quantity++;
                setEditedCart(editedCart);
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
        <Text style={styles.total}>{`$${getSum(cart)}`}</Text>
      </View>
      <AppButton
        title="check out"
        onPress={() => {}}
        color="darkGray"
        borderRadius={15}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBack}>Countinue Shooping</Text>
      </TouchableOpacity>
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
});

export default MyCartScreen;
