import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as Localization from "expo-localization";
import Text from "../Text";
import { useTheme } from "react-native-paper";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  iconName = "chevron-right",
  padding = 15,
}) {
  const { colors } = useTheme();

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View
          style={[styles.container, { backgroundColor: colors.white, padding }]}
        >
          {IconComponent}
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text
                style={{
                  color: colors.medium,
                }}
                numberOfLines={2}
              >
                {subTitle}
              </Text>
            )}
          </View>
          <View
            style={{
              transform: [{ scaleX: Localization.isRTL ? -1 : 1 }],
            }}
          >
            <MaterialCommunityIcons
              color={colors.medium}
              name={iconName}
              size={25}
            />
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
