import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import TextInputWithLine from "../components/TextInputWithLine";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "../components/Text";
import { useTheme } from "react-native-paper";
import Screen from "../components/Screen";
import { useTranslation } from "react-i18next";
import languageMapper from "../utility/languageMapper";

function OptionsPickerScreen({ route, navigation }) {
  const { t, i18n } = useTranslation();
  let originalOptions,
    onChange,
    isChoosenOption,
    subtitleKey,
    titleKey = "name",
    BackOnChoose = false;

  if (!route.params) {
    originalOptions = languageMapper.get_langs_by_codes(
      new Set(i18n.languages)
    );
    onChange = (item) => {
      i18n.changeLanguage(item.code);
    };
    isChoosenOption = (item) => i18n.language.startsWith(item.code);
    subtitleKey = "nativeName";
  } else {
    originalOptions = route.params.originalOptions;
    onChange = route.params.onChange;
    isChoosenOption = route.params.isChoosenOption;
    subtitleKey = route.params.subtitleKey;
    if (route.params.titleKey) titleKey = route.params.titleKey;
    BackOnChoose = true;
  }

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState(originalOptions);
  const { colors } = useTheme();

  const onSearch = (newQuery) => {
    setOptions(originalOptions);
    setQuery(newQuery);

    if (newQuery === "") return;
    const filteredOptions = originalOptions.filter(
      (option) =>
        option[titleKey].toLowerCase().includes(query.toLowerCase()) ||
        option[subtitleKey].toLowerCase().includes(query.toLowerCase())
    );
    setOptions(
      filteredOptions.sort((a, b) => a[titleKey].localeCompare(b[titleKey]))
    );
  };
  return (
    <Screen style={{ paddingLeft: 10, paddingRight: 10 }}>
      <View style={styles.container}>
        <TextInputWithLine
          label="search"
          value={query}
          onChangeText={onSearch}
          iconName="magnify"
          color={colors.hardLight}
          iconSize={38}
          textInputStyle={styles.search}
          showLabel={false}
        />
      </View>
      <View style={{ height: 10 }}></View>
      <FlatList
        data={options}
        keyExtractor={(l) => l[titleKey]}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              onChange(item);
              if (BackOnChoose) {
                BackOnChoose = false;
                navigation.goBack();
              }
            }}
          >
            <View style={styles.option}>
              <View style={{ flexDirection: "column" }}>
                <Text>{item[titleKey]}</Text>
                {subtitleKey && (
                  <Text style={{ color: colors.hardLight }}>
                    {item[subtitleKey]}
                  </Text>
                )}
              </View>
              {isChoosenOption(item) && (
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color={colors.blue}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  search: {
    fontSize: 21,
  },
  option: {
    width: "100%",
    height: 70,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "flex-start",
    flexDirection: "row",
  },
});

export default OptionsPickerScreen;
