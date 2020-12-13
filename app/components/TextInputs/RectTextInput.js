import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Text from "../Text";

function RectTextInput({
  label,
  value,
  onChangeText,
  width = "100%",
  twoInRow = false,
  cardNumber = false,
  isDateInput = false,
  ...otherProps
}) {
  const updateText = (text) => {
    if (isDateInput)
      onChangeText(text.replace(/\//g, "").replace(/(.{2})/g, "$1/"));
    else if (!cardNumber) onChangeText(text);
    else onChangeText(text.replace(/ /g, "").replace(/(.{4})/g, "$1 "));
  };
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { width: "100%" }]}>
      <Text style={[styles.label, { color: colors.black }]}>
        {t(label, { defaultValue: label })}
      </Text>

      <View
        style={[
          styles.inputView,
          {
            backgroundColor: colors.light,
            marginRight: twoInRow ? 15 : 0,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.black }]}
          value={value}
          placeholder={t(label, { defaultValue: label })}
          onChangeText={updateText}
          {...otherProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    paddingBottom: 8,
  },
  input: {
    fontSize: 16,
  },
  inputView: {
    height: 48,
    borderRadius: 9,
    paddingLeft: 15,
    justifyContent: "center",
  },
});

export default RectTextInput;
