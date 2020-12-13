import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import ManyOptionsPickerStatus from "../ManyOptionsPickerStatus";

function FormPickerWithManyOptions({ name, options, onPress, label, width }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <View style={styles.container}>
      <ManyOptionsPickerStatus
        onPress={onPress}
        chosenOption={values[name]}
        setOption={(value) => setFieldValue(name, value)}
        options={options}
        label={label}
        width={width}
      />
      <ErrorMessage visible={touched[name]} error={errors[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FormPickerWithManyOptions;
