import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import Text from "./Text";
import { useTranslation } from "react-i18next";

function CheckInput({ setChecked, checked, label }) {
  const { t } = useTranslation();
  let additionalStyle = {};
  if (checked)
    additionalStyle = {
      backgroundColor: colors.blue,
      borderColor: colors.white,
    };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setChecked(label)}>
        <View style={styles.themeOption}>
          <Text style={styles.text}>{t(label)}</Text>
          <View style={[styles.circle, additionalStyle]}>
            {checked && (
              <MaterialCommunityIcons
                name="check"
                size={20}
                color={colors.white}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#E2E2E2",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    flex: 1,
  },
  themeOption: {
    flexDirection: "row",
    margin: 15,
  },
});

export default CheckInput;
