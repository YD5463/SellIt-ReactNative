import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "./Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "./Text";
import AppButton from "./Button";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

function EmptyList({
  IconComponent = MaterialCommunityIcons,
  icon,
  titleKey,
  subTitleKey,
  buttonHandler,
  buttonTitle = "goback",
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Screen style={[styles.emptyCart, { backgroundColor: colors.light }]}>
      <View style={[styles.mainCircle, { backgroundColor: colors.white }]}>
        <IconComponent name={icon} size={150} color={colors.primary} />
      </View>
      <Text style={[styles.emptyCartTitle, { color: colors.medium }]}>
        {t(titleKey)}
      </Text>
      <Text style={[styles.emptyCartSubTitle, { color: colors.medium }]}>
        {t(subTitleKey)}
      </Text>
      <AppButton
        title={t(buttonTitle)}
        onPress={buttonHandler}
        borderRadius={20}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainCircle: {
    width: 275,
    height: 275,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10%",
  },
  emptyCartTitle: {
    fontSize: 30,
    fontWeight: "600",
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  emptyCartSubTitle: {
    paddingTop: 15,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
  },
});

export default EmptyList;
