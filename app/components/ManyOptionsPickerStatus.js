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
  label,
  width = "100%",
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
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
        <View
          style={[
            styles.input,
            { backgroundColor: colors.light, width: width },
          ]}
        >
          <View style={{ paddingRight: 10, flex: 1 }}>
            <Text style={[styles.label, { color: colors.medium }]}>
              {chosenOption ? chosenOption : "Select Option..."}
            </Text>
          </View>
          <View style={{ paddingRight: 10 }}>
            <Ionicons name="ios-arrow-down" size={28} color={colors.black} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  input: {
    flexDirection: "row",
    height: 45,
    borderRadius: 7,
    paddingLeft: 15,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ManyOptionsPickerStatus;
