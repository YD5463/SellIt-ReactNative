import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as Contacts from "expo-contacts";
import ContactItem from "../../components/chat/Items/ContactItem";
import ListItemSeparator from "./../../components/lists/ListItemSeparator";
import colors from "../../config/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Text from "../../components/Text";
import ActivityIndicator from "./../../components/ActivityIndicator";
import Icon from "./../../components/Icon";

function ContactScreen({ navigation, route }) {
  const { sendContact } = route.params;

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pickedItems, setPickedItems] = useState([]);

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
            <Text
              style={styles.pickedCount}
            >{`${pickedItems.length} Picked`}</Text>
          </View>
        </View>
      ),
      title: "",
    });
  });

  const init = async () => {
    const permission = await Contacts.requestPermissionsAsync();
    if (permission.granted) {
      setLoading(true);
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Emails,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
        ],
      });
      data.sort((a, b) => a.name.localeCompare(b.name));
      setLoading(false);
      setContacts(data);
    }
  };
  const onSend = () => {
    sendContact(pickedItems);
    navigation.goBack();
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      {contacts.length === 0 && !loading ? (
        <Text>No contacts to display</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(contact) => contact.id}
          renderItem={({ item }) => (
            <ContactItem
              contactData={item}
              addItem={() => setPickedItems([...pickedItems, item])}
              removeItem={() =>
                setPickedItems(pickedItems.filter((c) => c.id !== item.id))
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      )}
      {pickedItems.length !== 0 && (
        <View style={styles.send}>
          <TouchableOpacity onPress={onSend}>
            <Icon
              name="send"
              size={60}
              iconColor="white"
              backgroundColor={colors.primary}
              iconSizeRatio={0.5}
            />
          </TouchableOpacity>
        </View>
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
  send: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
});

export default ContactScreen;
