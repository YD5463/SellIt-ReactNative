import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../../config/colors";
import Icon from '../../Icon';

function PickedSign(props) {
  return (
    <View style={styles.pickedSign}>
      <Icon
        name="check"
        size={20}
        backgroundColor={colors.primary}
        iconColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pickedSign: {
    position: "absolute",
    left: -6,
    bottom: -6,
  },
});

export default PickedSign;
