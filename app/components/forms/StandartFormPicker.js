import React from "react";
import { View, StyleSheet, Picker, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import Text from "../Text";
import { useTheme } from "react-native-paper";
function StandartFormPicker({ items, name, label }) {
  const { values, setFieldValue } = useFormikContext();
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, color: colors.medium }}>{label}</Text>
      <TouchableOpacity></TouchableOpacity>
      <Picker
        selectedValue={values[name]}
        onValueChange={(item) => setFieldValue(name, item)}
        mode="dialog"
      >
        {items.map((item) => (
          <Picker.Item key={item.label} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default StandartFormPicker;
