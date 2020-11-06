import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ViewCartItem from "../components/ViewCartItem";
import Screen from "./../components/Screen";
import { useTheme } from "react-native-paper";

function MyCartScreen({ route }) {
  const { cart } = route.params;
  const { colors } = useTheme();

  return (
    <Screen style={[styles.container, { backgroundColor: colors.light }]}>
      <FlatList
        data={Object.keys(cart)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <ViewCartItem item={cart[item]} />}
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
    padding: 3,
  },
  sperator: {
    width: "100%",
    height: 2,
  },
});

export default MyCartScreen;
