import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "./../../components/Screen";
import Text from "../../components/Text";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import my from "../../api/my";
import routes from "../../navigation/routes";

const testUri =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png";

function ChangeBakcgroundScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [options, setOptions] = useState([]);
  useEffect(() => {
    const { light, dark, colors } = my.getBackgrounds();
    setOptions([
      { name: "Light", images: light },
      { name: "Dark", images: dark },
      { name: "Solid colors", images: colors, isColor: true },
      {
        name: "Gallery",
        images: [testUri],
      },
    ]);
  }, []);
  const onPressElement = (item) =>
    navigation.navigate(routes.BACKFROUND_GALLERY, { item });

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        numColumns={2}
        keyExtractor={(element) => element.name}
        renderItem={({ item }) => (
          <View style={styles.element}>
            <TouchableOpacity onPress={() => onPressElement(item)}>
              {item.isColor ? (
                <View
                  style={[{ backgroundColor: item.images[0] }, styles.image]}
                />
              ) : (
                <Image source={{ uri: item.images[0] }} style={styles.image} />
              )}
            </TouchableOpacity>
            <Text style={styles.elementTitle}>{item.name}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(routes.BACKGROUND_PREVIEW)}
      >
        <View style={styles.textView}>
          <MaterialCommunityIcons
            name="image-size-select-actual"
            size={30}
            color={colors.primary}
          />
          <Text style={styles.text}>Defualt Background</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  image: {
    width: Dimensions.get("screen").width / 2 - 25,
    height: 150,
    borderRadius: 15,
  },
  textView: {
    flexDirection: "row",
    padding: 10,
  },
  text: {
    paddingLeft: 15,
    textAlign: "center",
  },
  element: {
    margin: 10,
  },
  elementTitle: {
    paddingTop: 15,
  },
});

export default ChangeBakcgroundScreen;
