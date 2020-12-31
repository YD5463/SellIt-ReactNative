import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import useApi from "./../hooks/useApi";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Text from "../components/Text";
import Message from "./../components/Message";
import { TextInput } from "react-native";

const seedMessages = [
  { text: "how are you?", isFrom: true, date: "01-30-2020::11:30:22", _id: 1 },
  { text: "im great!!", isFrom: false, date: "01-30-2020::12:30:22", _id: 2 },
  {
    text: "did you start the assignment?",
    isFrom: false,
    date: "01-30-2020::12:30:55",
    _id: 3,
  },
  { text: "not yet...", isFrom: false, date: "01-30-2020::12:45:22", _id: 4 },
  { text: "bye bye!!!", isFrom: false, date: "01-30-2020::12:46:22", _id: 66 },
  { text: "see ya bro", isFrom: true, date: "01-30-2020::12:55:22", _id: 67 },
];

function MessagesScreen({ navigation }) {
  const contactName = "Avi Leve";
  const contactId = 123;
  const contactImageUri =
    "http://192.168.68.110:9000/assets/c9e425db06fe2c64c1921fe8a96229a1_full.jpg";
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [draftMessage, setDraftMessage] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerRight: () => (
        <View style={styles.rightHeader}>
          <Text style={{ color: "white", paddingRight: 5 }}>{contactName}</Text>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: contactImageUri }}
                style={styles.contactImage}
              />
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View style={styles.leftHeader}>
          <TouchableWithoutFeedback>
            <Ionicons name="md-more" size={24} color="white" />
          </TouchableWithoutFeedback>
          <View style={styles.headerIcon}>
            <TouchableWithoutFeedback>
              <MaterialIcons name="call" size={24} color="white" />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.headerIcon}>
            <TouchableWithoutFeedback>
              <MaterialCommunityIcons name="video" size={26} color="white" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      ),
      title: "",
    });
  });
  useEffect(() => {
    setMessages(seedMessages);
  }, []);
  return (
    <ImageBackground
      source={{
        uri:
          "https://i.pinimg.com/originals/79/5c/ab/795cabc4647f73b365e2e6eabd0f34dc.png",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
        >
          <View style={{ height: "91%", width: "100%" }}>
            <FlatList
              data={messages}
              keyExtractor={(message) => message._id}
              renderItem={({ item }) => <Message meesageData={item} />}
            />
          </View>
          <View style={styles.allKeyboard}>
            <TouchableOpacity>
              <View
                style={[styles.micophone, { backgroundColor: colors.primary }]}
              >
                <MaterialCommunityIcons
                  name="microphone"
                  size={24}
                  color="white"
                />
              </View>
            </TouchableOpacity>
            <View style={styles.keyboard}>
              <TextInput
                onChangeText={(text) => setDraftMessage(text)}
                value={draftMessage}
                selectionColor={colors.primary}
              />
              <TouchableOpacity>
                <MaterialIcons
                  name="insert-emoticon"
                  color={colors.medium}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {},
  contactImage: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
  },
  headerIcon: {
    paddingLeft: 15,
  },
  keyboard: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    width: "80%",
    height: 45,
    borderRadius: 40,
    paddingLeft: 8,
    paddingRight: 8,
  },
  allKeyboard: {
    justifyContent: "flex-end",
    paddingRight: 10,
    flexDirection: "row",
  },
  micophone: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default MessagesScreen;
