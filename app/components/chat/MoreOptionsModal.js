import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Text from "../Text";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";

function MoreOptionsModal({ visible, setVisible, Callbacks }) {
  const { t } = useTranslation();

  const options = [
    { name: t("add_contact"), onPress: () => {} },
    { name: t("search"), onPress: Callbacks.onSearch },
    { name: t("background"), onPress: () => {} },
    { name: t("notification"), onPress: () => {} },
    { name: t("report"), onPress: () => {} },
  ];
  return (
    <Modal
      visible={visible}
      animationType="fade"
      setVisible={setVisible}
      MainComponent={() => (
        <View style={styles.container}>
          <FlatList
            data={options}
            keyExtractor={(option) => option.name}
            renderItem={({ item }) => (
              <View style={{ width: "100%", padding: 15 }}>
                <TouchableOpacity onPress={item.onPress}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    top: 5,
    width: "50%",
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default MoreOptionsModal;
