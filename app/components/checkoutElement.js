import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import Text from "./Text";

function CheckoutElement({
  title,
  data,
  icon,
  isChosen,
  isSecure = false,
  onPress,
}) {
  // if (!data) return <></>;
  const [text, setText] = useState();
  const getText = (data, isSecure) => {
    if (!isSecure) return data;
    let res = "*".repeat(data.length - 4);
    res += data.slice(data.length - 4);
    let spaced = res.match(/.{1,4}/g);
    return spaced.join(" ");
  };
  useEffect(() => {
    setText(getText(data, isSecure));
  });

  const { colors } = useTheme();
  const additional_style = { backgroundColor: colors.boldLight };
  if (isChosen) {
    additional_style.borderWidth = 2;
    additional_style.borderColor = colors.pink;
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, additional_style]}>
        <View style={{ flex: 1, flexDirection: !title ? "row" : "column" }}>
          {icon && (
            <View style={styles.icon}>
              <Fontisto name={icon} size={30} color="red" />
            </View>
          )}
          {title && (
            <Text style={{ color: colors.pink, fontWeight: "bold" }}>
              {getText(title, isSecure)}
            </Text>
          )}
          <Text style={[styles.text, { fontWeight: isChosen ? "bold" : "0" }]}>
            {text}
          </Text>
        </View>
        {isChosen && (
          <AntDesign name="checkcircle" size={30} color={colors.pink} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    height: 60,
    width: "100%",
    marginBottom: 7,
  },
  icon: {
    width: 45,
    height: 30,
  },
  text: {
    paddingLeft: 10,
    fontSize: 20,
  },
});

export default CheckoutElement;
