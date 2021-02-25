import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import RenderMessage from "../../components/chat/Messages/RenderMessage";
import contentTypes from "../../config/contentTypes";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Text from "../../components/Text";
import cache from "../../utility/cache";
import settings from "../../config/settings";
import { useToast } from "react-native-styled-toast";
import Background from "./../../components/chat/Background";
import routes from "../../navigation/routes";

function BackgroundPreviewScreen({ navigation, route }) {
  const background = route.params;
  const { t } = useTranslation();
  const { toast } = useToast();

  const createDemoMessage = (text) => {
    return {
      content: t(text),
      contentType: contentTypes.TEXT,
      dateTime: moment().toString(),
    };
  };
  const setBackground = async () => {
    await cache.store(settings.ChatBackground, background);
    navigation.goBack();
    navigation.goBack();
    if (background) navigation.goBack();
    toast({ message: "Background has set" });
  };
  return (
    <Background background={background}>
      <View style={{ flex: 1 }}>
        <RenderMessage item={createDemoMessage("messageDemo1")} />
        <RenderMessage
          item={createDemoMessage("messageDemo2")}
          isFrom={true}
          lastMessageDate={moment().toString()}
        />
      </View>
      <TouchableOpacity onPress={setBackground}>
        <View style={styles.button}>
          <Text style={styles.textButton}>{t("setBackground")}</Text>
        </View>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 40,
    borderRadius: 8,
  },
  textButton: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    padding: 12,
  },
});

export default BackgroundPreviewScreen;
