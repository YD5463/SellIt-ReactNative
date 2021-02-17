import React from "react";
import { View, StyleSheet, Modal, FlatList } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import colors from "../../config/colors";
import CategoryPickerItem from "../CategoryPickerItem";

const options = [
  {
    name: "document",
    backgroundColor: "#384B95",
    icon: "md-document",
    IconComponent: Ionicons,
  },
  {
    name: "camera",
    backgroundColor: "#F6004A",
    icon: "camera",
    IconComponent: FontAwesome5,
  },
  {
    name: "gallery",
    backgroundColor: "#983398",
    icon: "md-photos",
    IconComponent: Ionicons,
  },
  {
    name: "audio",
    backgroundColor: "#EC8E12",
    icon: "headphones",
    IconComponent: MaterialCommunityIcons,
  },
  {
    name: "location",
    backgroundColor: "#3F9E3F",
    icon: "location-on",
    IconComponent: MaterialIcons,
  },
  {
    name: "contact",
    backgroundColor: "#41A1FF",
    icon: "person",
    IconComponent: MaterialIcons,
  },
];
function AttachmentModal({ visible }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <FlatList
          data={options}
          keyExtractor={(option) => option.name}
          numColumns={3}
          renderItem={({ item }) => (
            <CategoryPickerItem
              item={item}
              onPress={() => {}}
              iconSize={55}
              labelStyle={styles.label}
              iconSizeRatio={0.5}
            />
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "white",
    height: 220,
    position: "absolute",
    borderRadius: 15,
    bottom: 120,
  },
  label: {
    textAlign: "center",
    color: colors.medium,
    fontSize: 13,
  },
});

export default AttachmentModal;
