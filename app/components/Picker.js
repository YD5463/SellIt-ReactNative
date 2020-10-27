import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import defaultStyles from "../config/styles";
import PickerItem from "./PickerItem";
import Screen from "./Screen";
import colors from "../config/colors";
import { useTheme } from "react-native-paper";

function AppPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View
          style={[styles.container, { width, backgroundColor: colors.light }]}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem}</Text>
          ) : (
            <Text
              style={[
                styles.placeholder,
                { color: colors.medium },
              ]}
            >
              {placeholder}
            </Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <View style={styles.close}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialCommunityIcons
                name="close"
                size={50}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    flex: 1,
  },
  text: {
    flex: 1,
  },
  close: {
    alignItems: "flex-end",
    marginRight: 20,
    marginBottom: 15,
  },
});

export default AppPicker;
