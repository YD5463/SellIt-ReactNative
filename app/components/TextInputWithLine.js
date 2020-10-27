import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Text from "./Text";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

function TextInputWithLine({
  label,
  value,
  onChangeText,
  iconName,
  textInputStyle,
  color = "#E2E2E2",
  iconSize = 25,
  showLabel = true,
  Icon = MaterialCommunityIcons,
  ...otherProps
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {value && showLabel ? (
        <Text style={[styles.label, { color: colors.medium }]}>
          {t(label, { defaultValue: label })}
        </Text>
      ) : (
        <Text style={styles.label}></Text>
      )}
      <View style={[styles.underline, { borderColor: color }]}>
        {iconName && (
          <View style={{ paddingLeft: 5, paddingRight: 10 }}>
            <Icon name={iconName} size={iconSize} color={color} />
          </View>
        )}
        <TextInput
          style={[
            textInputStyle ? textInputStyle : styles.input,
            { color: colors.black },
          ]}
          value={value}
          placeholder={t(label, { defaultValue: label })}
          onChangeText={onChangeText}
          {...otherProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    height: 80,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    fontSize: 18,
  },
  underline: {
    borderBottomWidth: 1,
    alignSelf: "stretch",
    paddingTop: 10,
    flexDirection: "row",
  },
});

export default TextInputWithLine;
