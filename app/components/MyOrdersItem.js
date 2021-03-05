import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./Text";
import moment from "moment";
import colors from "../config/colors";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

function MyOrdersItem({ orderData, onDetailPressed }) {
  console.log(orderData);
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ color: colors.black, flex: 1 }}
          >{`Order: #${orderData._id.substring(0, 6)}`}</Text>
          <Text style={{ color: colors.medium, fontSize: 15 }}>
            {moment(orderData.purchaseTime).format("DD-mm-yyyy")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text style={{ color: colors.medium }}>Quantity:</Text>
          <Text style={{ color: colors.black, flex: 1 }}>{3}</Text>
          <Text style={{ color: colors.medium }}>Total Amount: </Text>
          <Text style={{ color: colors.black }}>{orderData.listingsPrice}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onDetailPressed} style={{ flex: 1 }}>
          <View style={styles.detailsView}>
            <Text style={{ color: colors.black }}>Details</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ color: colors.secondary, textAlign: "center" }}>
          Delivered
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "100%",
    height: 165,
    padding: 20,
  },
  detailsView: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.medium,
  },
});

export default MyOrdersItem;
