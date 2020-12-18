import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

function GoBackButton({ onPress, withAlertBefore = true }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const handlePress = () => {
    if (!withAlertBefore) onPress();
    else {
      Alert.alert(
        t("exitTitle"),
        t("exitSubTitle"),
        [
          {
            text: t("cancel"),
            onPress: () => {},
            style: "cancel",
          },
          { text: t("ok"), onPress: onPress },
        ],
        { cancelable: false }
      );
    }
  };
  return (
    <View style={[styles.goBack, { borderColor: colors.turquoise }]}>
      <TouchableOpacity onPress={handlePress}>
        <Ionicons name="ios-arrow-back" size={24} color={colors.turquoise} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  goBack: {
    width: 40,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.4,
    marginBottom: 17,
  },
});

export default GoBackButton;
