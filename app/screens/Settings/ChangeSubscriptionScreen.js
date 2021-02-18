import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import { ListItemSeparator } from "../../components/lists";
import { useTheme } from "react-native-paper";

const data = [
  { name: "Marketing", description: "Some desc..." },
  { name: "Updatadts", description: "Some desc..." },
  { name: "Nothing", description: "Some desc..." },
];
function ChangeSubscriptionScreen(props) {
  const [subscription, setSubscription] = useState(data[0].name);
  const { colors } = useTheme();
  return (
    <Screen style={styles.container}>
      <Text style={styles.headLine}>Email Notifications:</Text>
      <FlatList
        data={data}
        keyExtractor={(option) => option.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSubscription(item.name)}>
            <View
              style={[
                styles.item,
                {
                  backgroundColor:
                    item.name === subscription ? colors.blue : colors.white,
                },
              ]}
            >
              <Text style={styles.title}>{item.name}</Text>
              <Text style={[{ color: colors.boldLight }, styles.description]}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  headLine: {
    fontWeight: "bold",
    fontSize: 25,
  },
  item: {
    borderRadius: 30,
    flexDirection: "column",
    width: "100%",
    height: 100,
    paddingLeft: 20,
    paddingTop: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
  },
  description: {
    fontSize: 18,
    marginLeft: 20,
  },
});

export default ChangeSubscriptionScreen;
