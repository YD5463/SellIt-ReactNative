import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import Text from "../Text";
import { useTranslation } from "react-i18next";

function MoreOptionsModal({ visible, setVisible }) {
  const { t } = useTranslation();

  const options = [
    { name: "Add To Contacts", onPress: () => {} },
    { name: "Search", onPress: () => {} },
    { name: "Background", onPress: () => {} },
    { name: "Notications", onPress: () => {} },
  ];
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPressOut={() => {
          setVisible(false);
        }}
      >
        <TouchableWithoutFeedback>
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
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
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
