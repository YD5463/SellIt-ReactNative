import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import ViewCartItem from "../../components/ViewCartItem";
import Screen from "../../components/Screen";
import { useTheme } from "react-native-paper";
import Text from "../../components/Text";
import { ListItemSeparator } from "../../components/lists";
import AppButton from "../../components/Button";
import cache from "../../utility/cache";
import settings from "../../config/settings";
import routes from "../../navigation/routes";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { TouchableWithoutFeedback } from "react-native";

function MyCartScreen({ route, navigation }) {
  const getSum = (cart) => {
    let sum = 0;
    for (const [id, details] of Object.entries(cart))
      sum += details.quantity * details.price;
    return sum;
  };
  const { cart } = route.params;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [editedCart, setEditedCart] = useState(cart);
  const setCart = (newCart) => {
    setEditedCart(newCart);
    cache.store(settings.CartCacheKey, newCart);
  };
  const handleResetCart = async () => {
    Alert.alert(
      "Are You Sure you want to reset the cart?",
      "The cart can't be resoreted...",
      [
        {
          text: t("cancel"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: t("ok"),
          onPress: async () => {
            setEditedCart(null);
            await cache.remove(settings.CartCacheKey);
          },
        },
      ],
      { cancelable: false }
    );
  };
  const [sum, setSum] = useState(getSum(cart));
  return editedCart && Object.keys(editedCart).length > 0 ? (
    <Screen style={[styles.container, { backgroundColor: colors.light }]}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingBottom: 15, flex: 1 }}>
          <Text style={[styles.title, { color: colors["medium"] }]}>
            My Cart
          </Text>
          <Text style={[styles.itemsNumber, { color: colors.medium }]}>{`${
            Object.keys(editedCart).length
          } items`}</Text>
        </View>
        <TouchableWithoutFeedback onPress={handleResetCart}>
          <View style={styles.resetCartView}>
            <Text style={[styles.resetCartText, { color: colors["medium"] }]}>
              Reset Cart
            </Text>
            <Ionicons name="ios-trash" size={35} color={colors.medium} />
          </View>
        </TouchableWithoutFeedback>
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
              priceColor="lightGreen"
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
        color="hardBlue"
        borderRadius={15}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.goBack, { color: colors.medium }]}>
          {t("Countinue Shooping")}
        </Text>
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
        {t("emptyCartTitle")}
      </Text>
      <Text style={[styles.emptyCartSubTitle, { color: colors.medium }]}>
        {t("emptyCartSubTitle")}
      </Text>
      <View style={{ width: 200 }}>
        <AppButton title="Go Back" onPress={() => navigation.goBack()} />
      </View>
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
  resetCartView: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  resetCartText: {
    fontSize: 18,
    paddingRight: 7,
    fontWeight: "bold",
  },
});

export default MyCartScreen;
