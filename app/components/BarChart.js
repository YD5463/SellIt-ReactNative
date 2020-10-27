import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Text from "../components/Text";
function BarChart({ data, height, labels }) {
  const max = 51;
  return (
    <View style={styles.container}>
      {data.map((currElement, index) => (
        <TouchableWithoutFeedback key={index}>
          <>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.message}>
                <Text>{currElement}</Text>
              </View>
            </View>
            <View
              style={{
                height: height * (currElement / max),
                backgroundColor: colors.blue,
                width: 56,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{ width: 10, height, backgroundColor: colors.white }}
              ></View>
            </View>
          </>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  message: {
    backgroundColor: colors.medium,
    borderRadius: 30,
  },
});

export default BarChart;
