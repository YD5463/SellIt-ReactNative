import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
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

function MessagesScreen({ navigation }) {
  const contactName = "Avi Leve";
  const contactId = 123;
  const contactImageUri =
    "http://192.168.68.110:9000/assets/c9e425db06fe2c64c1921fe8a96229a1_full.jpg";
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);

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
  useEffect(() => {}, []);
  return (
    <ImageBackground
      source={{
        uri:
          "https://i.pinimg.com/originals/79/5c/ab/795cabc4647f73b365e2e6eabd0f34dc.png",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={{ height: "90%", width: "100%" }}>
          <FlatList
            data={messages}
            keyExtractor={(message) => message._id}
            renderItem={({ item }) => <View></View>}
          />
        </View>
        <View style={styles.keyboard}>
          <TouchableOpacity>
            <MaterialIcons
              name="insert-emoticon"
              color={colors.medium}
              size={24}
            />
          </TouchableOpacity>
        </View>
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
    backgroundColor: "white",
    width: "80%",
    height: 45,
    borderRadius: 40,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "center",
  },
});

export default MessagesScreen;
