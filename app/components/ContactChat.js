import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ListItem from "./lists/ListItem";

function ContactChat({ item, onPress }) {
  return (
    <View style={styles.container}>
      {item.contactProfileImage ? (
        <ListItem
          image={item.contactProfileImage.url}
          title={item.contactName}
          subTitle={item.lastMessage.content}
          onPress={onPress}
          iconName=""
        />
      ) : (
        <ListItem
          title={item.contactName}
          subTitle={item.lastMessage.content}
          onPress={onPress}
          iconName=""
          IconComponent={() => (
            <FontAwesome name="user" color="white" size={30} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ContactChat;
