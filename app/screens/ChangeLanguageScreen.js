import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import TextInputWithLine from "../components/TextInputWithLine";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import languageMapper from "../utility/languageMapper";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

function ChangeLanguageScreen(props) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const getOptions = () =>
    languageMapper.get_langs_by_codes(new Set(i18n.languages));
  const [query, setQuery] = useState("");
  const [languagesOptions, setLanguageOptions] = useState(getOptions());
  const onSearch = (newQuery) => {
    setQuery(newQuery);

    if (newQuery === "") return setLanguageOptions(getOptions());
    const filteredOptions = languagesOptions.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(query.toLowerCase())
    );
    setLanguageOptions(
      filteredOptions.sort((a, b) => a.name.localeCompare(b.name))
    );
  };
  const changeLanguage = (language_code) => {
    i18n.changeLanguage(language_code);
  };

  return (
    <Screen>
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
        data={languagesOptions}
        keyExtractor={(l) => l.code}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => changeLanguage(item.code)}>
            <View style={styles.language}>
              <View style={{ flexDirection: "column" }}>
                <Text>{item.name}</Text>
                <Text style={{ color: colors.hardLight }}>
                  {item.nativeName}
                </Text>
              </View>
              {i18n.language.startsWith(item.code) && (
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
  language: {
    width: "100%",
    height: 70,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "flex-start",
    flexDirection: "row",
  },
});

export default ChangeLanguageScreen;
