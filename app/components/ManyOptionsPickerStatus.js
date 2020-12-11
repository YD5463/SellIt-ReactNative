import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import Text from "./Text";

function ManyOptionsPickerStatus({
  onPress,
  chosenOption,
  setOption,
  options,
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() =>
          onPress({
            originalOptions: options,
            onChange: (item) => setOption(item.name),
            isChoosenOption: (option) => option.name === chosenOption.name,
            subtitleKey: "codeName",
          })
        }
      >
        <View style={[styles.input, { backgroundColor: colors.light }]}>
          <Ionicons name="ios-arrow-down" size={28} color={colors.black} />
          <View style={{ paddingRight: 10 }}>
            <Text style={[styles.label, { color: colors.medium }]}>
              {chosenOption}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  input: {
    flexDirection: "row",
    width: "50%",
    height: 45,
    borderRadius: 7,
    padding: 8,
    alignItems: "center",
  },
});

export default ManyOptionsPickerStatus;
