import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import Text from "./Text";

function Alert({
  visible,
  setVisible,
  title,
  subTitle,
  confirmText,
  onConfirm,
  AdditionalComponent = () => <></>,
}) {
  const { t } = useTranslation();
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      MainComponent={() => (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subTitle}</Text>
          <AdditionalComponent />
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <View style={{ marginRight: 25 }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  onConfirm();
                }}
              >
                <Text style={{ color: colors.blue }}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={{ color: colors.primary }}>{t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "88%",
    top: "25%",
    padding: 20,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    marginTop: 10,
    color: colors.hardLight,
    fontSize: 16,
  },
  text: {
    color: colors.primary,
  },
});

export default Alert;
