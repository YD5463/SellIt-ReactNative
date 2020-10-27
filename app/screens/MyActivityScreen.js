import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { BarChart, XAxis } from "react-native-svg-charts";
import Text from "../components/Text";
import Screen from "./../components/Screen";
import { useTheme } from "react-native-paper";
import colors from "../config/colors";
import auth from "../api/auth";
import useApi from "./../hooks/useApi";
import { useTranslation } from "react-i18next";

function MyActivityScreen(props) {
  const getActivityApi = useApi(auth.getUserActivity);
  const [labels, setLabels] = useState();
  const { t } = useTranslation();
  useEffect(() => {
    getActivityApi.request();
    setLabels(getWeekDays());
  }, []);

  const avg = getActivityApi.data.reduce((a, b) => a + b, 0);
  const dispaly_avg = { h: avg / 60 - (avg % 60), m: avg % 60 };
  return (
    <Screen style={styles.container}>
      <View style={styles.avg_text}>
        {Object.keys(dispaly_avg).map(
          (measure) =>
            dispaly_avg[measure] > 0 && (
              <View key={measure} style={{ flexDirection: "row" }}>
                <Text style={styles.average}>{dispaly_avg[measure]}</Text>
                <Text style={styles.measure}>{t(measure)}</Text>
              </View>
            )
        )}
        <Text style={styles.average__title}>{t("average_title")}</Text>
        <Text style={styles.description}>{t("average_description")}</Text>
      </View>
      <BarChart
        contentInset={{ top: 30, bottom: 30 }}
        style={{ height: 200 }}
        data={getActivityApi.data}
        svg={{ fill: colors.blue }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  average: {
    color: colors.primary,
    fontSize: 33,
  },
  measure: {
    color: colors.primary,
    fontSize: 15,
    alignSelf: "baseline",
  },
  description: {
    color: colors.medium,
  },
  average__title: {
    color: colors.medium,
    fontWeight: "bold",
  },
  avg_text: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
  },
});

function getWeekDays(locale) {
  const baseDate = new Date(Date.now());
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "long" }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}
export default MyActivityScreen;
