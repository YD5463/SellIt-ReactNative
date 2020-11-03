import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export default {
  light: {
    ...DefaultTheme,
    space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
    colors: {
      ...DefaultTheme.colors,
      ...colors,
      background: "#fff",
      font: "#000000",
      primary: colors.primary,
      secondary: colors.secondary,
      black: colors.black,
      white: colors.white,
      medium: colors.medium,
      light: colors.light,
      dark: colors.dark,
      danger: colors.danger,
      blue: colors.blue,
      hardLight: colors.hardLight,
      boldLight: "#C0C0C0",
      muted: "#F0F1F3",
      success: "#7DBE31",
      error: "#FC0021",
      orange: "#FFAF22",
    },
  },
  dark: {
    ...DefaultTheme,
    space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
    colors: {
      ...DefaultTheme.colors,
      primary: colors.blue,
      background: "#000000",
      font: "#fff",
      secondary: colors.primary,
      black: colors.white,
      white: colors.black,
      medium: colors.light,
      light: "#101010",
      dark: colors.hardLight,
      danger: colors.danger,
      blue: colors.blue,
      hardLight: colors.medium,
      boldLight: colors.light,
      muted: "#F0F1F3",
      success: "#7DBE31",
      error: "#FC0021",
      orange: "#FFAF22",
    },
  },
};
