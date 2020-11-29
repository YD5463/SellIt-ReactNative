import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import languageSupport from "./app/utility/languageSupport";
import { AsyncStorage } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import auth from "./app/api/auth";
import { ThemeProvider } from "styled-components";
import { ToastProvider } from "react-native-styled-toast";
import MyActivityScreen from "./app/screens/MyActivityScreen";
import BarChart from "./app/components/BarChart";
import CheckoutScreen from "./app/screens/CheckoutScreen";
languageSupport.init();

export default function App() {
  //return <BarChart data={[10, 20, 30, 40, 50]} height={200} />;
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState("light");
  const setLastTheme = async () => {
    let lastTheme = await AsyncStorage.getItem("theme");
    if (!lastTheme) lastTheme = "light";
    setTheme(lastTheme);
  };
  useEffect(() => {
    setLastTheme();
    return () => {
      auth.userLeftApp();
    };
  }, []);
  const saveTheme = (new_theme) => {
    setTheme(new_theme);
    AsyncStorage.setItem("theme", new_theme);
  };
  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };
  // return <ValidateEmailScreen />;
  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );
  return (
    <ThemeProvider theme={navigationTheme[theme]}>
      <AuthContext.Provider
        value={{ user, setUser, setTheme: saveTheme, theme }}
      >
        <PaperProvider theme={navigationTheme[theme]}>
          <ToastProvider position="BOTTOM" offset={40}>
            {/* <OfflineNotice />
            <NavigationContainer
              ref={navigationRef}
              theme={navigationTheme[theme]}
              linking={{
                config: {
                  screens: {
                    login: "login/",
                    listingDetail: "listings/:id",
                  },
                },
                prefixes: ["sellIt://", "http://sellIt.com"],
              }}
            >
              {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer> */}
            <CheckoutScreen />
          </ToastProvider>
        </PaperProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
