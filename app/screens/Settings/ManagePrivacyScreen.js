import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/Text";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

function ManagePrivacyScreen(props) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("privacyTitle")}</Text>
      <Text style={[styles.subTitle, { color: colors.medium }]}>
        {t("privacyExplain")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 18,
    paddingRight: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "300",
  },
  subTitle: {
    fontSize: 16,
  },
});

export default ManagePrivacyScreen;
