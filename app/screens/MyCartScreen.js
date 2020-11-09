import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ViewCartItem from "../components/ViewCartItem";
import Screen from "./../components/Screen";
import { useTheme } from "react-native-paper";
import Text from "../components/Text";
function MyCartScreen({ route }) {
  const { cart } = route.params;
  const { colors } = useTheme();

  return (
    <Screen style={[styles.container, { backgroundColor: colors.light }]}>
      <View style={{ paddingBottom: 15 }}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.itemsNumber}>{`${
          Object.keys(cart).length
        } items`}</Text>
      </View>
      <View style={[styles.line, { backgroundColor: colors.medium }]} />
      <FlatList
        data={Object.keys(cart)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ViewCartItem
            item={cart[item]}
            onMinus={(itemId) => {
              if (--cart[itemId].quantity) delete cart[itemId];
            }}
            onPlus={(itemId) => cart[itemId].quantity++}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={[styles.sperator, { backgroundColor: colors.boldLight }]}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  sperator: {
    width: "100%",
    height: 2,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  itemsNumber: {
    fontSize: 18,
    fontWeight: "500",
  },
  line: {
    height: 2,
    width: "100%",
  },
});

export default MyCartScreen;
