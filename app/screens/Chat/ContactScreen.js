import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as Contacts from "expo-contacts";
import ContactItem from "./../../components/chat/ContactItem";
import ListItemSeparator from "./../../components/lists/ListItemSeparator";
import colors from "../../config/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Text from "../../components/Text";

function ContactScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const getPlatformBack = () =>
    Platform.OS === "android" ? "md-arrow-round-back" : "ios-arrow-back";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerRight: () => (
        <View style={{ padding: 10 }}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="magnify" size={30} color="white" />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name={getPlatformBack()} size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.headerTextView}>
            <Text style={{ color: "white" }}>Contact To Send</Text>
            <Text style={styles.pickedCount}>0 Picked</Text>
          </View>
        </View>
      ),
      title: "",
    });
  });

  const init = async () => {
    const permission = await Contacts.requestPermissionsAsync();
    if (permission.granted) {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Emails,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
        ],
      });
      setContacts(data);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <View style={styles.container}>
      {contacts.length === 0 ? (
        <Text>No contacts to display</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(contact) => contact.id}
          renderItem={({ item }) => <ContactItem contactData={item} />}
          ItemSeparatorComponent={ListItemSeparator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  leftHeader: {
    padding: 10,
    flexDirection: "row",
  },
  pickedCount: {
    color: "white",
    fontSize: 13,
  },
  headerTextView: {
    paddingLeft: 15,
  },
});

export default ContactScreen;
