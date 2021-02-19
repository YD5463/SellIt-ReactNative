import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as Contacts from "expo-contacts";
import ContactItem from "./../../components/chat/ContactItem";
import ListItemSeparator from "./../../components/lists/ListItemSeparator";

function ContactScreen(props) {
  const [contacts, setContacts] = useState([]);

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
      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.id}
        renderItem={({ item }) => <ContactItem contactData={item} />}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ContactScreen;
