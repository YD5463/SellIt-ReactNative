import React, { useContext } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import AuthContext from "../../auth/context";
import Screen from "../../components/Screen";
import CheckInput from "../../components/CheckInput";
import Themes from "../../navigation/navigationTheme";

function ChangeThemeScreen(props) {
  const { theme, setTheme } = useContext(AuthContext);
  return (
    <Screen style={styles.container}>
      {Object.keys(Themes).map((label) => (
        <CheckInput
          key={label}
          label={label}
          setChecked={(label) => setTheme(label)}
          checked={theme === label}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChangeThemeScreen;
