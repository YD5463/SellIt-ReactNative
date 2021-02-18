import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import useApi from "../../hooks/useApi";
import authApi from "../../api/auth";
import Button from "../../components/Button";
import { useTheme } from "react-native-paper";
import Screen from "../../components/Screen";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { ErrorMessage } from "../../components/forms";
import ActivityIndicator from "../../components/ActivityIndicator";
import { TouchableOpacity } from "react-native-gesture-handler";

function ValidateEmailScreen({ route }) {
  const { email } = route.params;
  const ValidateEmailApi = useApi(authApi.validateEmail);
  const resendCodeApi = useApi(authApi.resendValidationCode);
  const auth = useAuth();
  const { colors } = useTheme();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [codeExpired, setCodeExpired] = useState(false);
  useEffect(() => {
    const timerId = setInterval(() => {
      if (seconds <= 0) {
        if (minutes <= 0) setCodeExpired(true);
        else {
          setMinutes((m) => m - 1);
          setSeconds(59);
        }
      } else setSeconds((s) => s - 1);
    }, 5000);
    return () => clearInterval(timerId);
  }, [seconds, minutes]);

  const submit_code = async () => {
    await ValidateEmailApi.request(code, email);
    if (!ValidateEmailApi.error) auth.logIn(ValidateEmailApi.data);
  };
  const CELL_COUNT = 6;
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  return (
    <>
      <ActivityIndicator
        visible={ValidateEmailApi.loading || resendCodeApi.loading}
      />
      <Screen style={styles.screen}>
        <Text style={styles.title}>Email sent to {email}</Text>
        <CodeField
          ref={ref}
          {...props}
          value={code}
          onChangeText={(code) => {
            setCode(code);
            if (code.length === CELL_COUNT) submit_code();
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[
                styles.cell,
                { borderColor: colors.medium },
                isFocused && { borderColor: colors.black },
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View style={{ marginTop: 35, margin: 15 }}>
          <Button
            title="Verify"
            onPress={submit_code}
            color="blue"
            disable={code.length !== CELL_COUNT}
          />
        </View>
        {!codeExpired && (
          <Text style={{ fontSize: 18, alignSelf: "center" }}>
            {minutes}:{seconds < 10 && 0}
            {seconds}
          </Text>
        )}
        <ErrorMessage visible={codeExpired} error="The code has been expired" />
        <ErrorMessage
          visible={ValidateEmailApi.error}
          error="the code is worng,try again..."
        />
        <TouchableOpacity
          onPress={() => {
            resendCodeApi.request();
          }}
        >
          <Text
            style={{
              color: colors.secondary,
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Send to me new code
          </Text>
        </TouchableOpacity>
        <ErrorMessage
          error={ValidateEmailApi.error}
          visible={!ValidateEmailApi.loading}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  root: { flex: 1, padding: 20 },
  title: { fontSize: 25 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    fontSize: 30,
    borderBottomWidth: 3,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

export default ValidateEmailScreen;
