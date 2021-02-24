import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

function OnSearchLeftHeader({ onSubmit, searchVal, setSearchVal }) {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          placeholder="Search"
          value={searchVal}
          onChangeText={setSearchVal}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          style={{ color: "white" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  input: {
    marginLeft: 5,
    borderBottomWidth: 1,
    alignSelf: "stretch",
    borderBottomColor: "white",
    width: "80%",
  },
});

export default OnSearchLeftHeader;
