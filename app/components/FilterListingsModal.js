import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Slider,
  FlatList,
} from "react-native";
import colors from "../config/colors";
import Text from "../components/Text";

const minRate = 0;
const maxRate = 5;

function FilterListingsModal({
  visible,
  setVisible,
  minPrice,
  maxPrice,
  onFilterChanged,
}) {
  const [minPriceFilter, setMinPriceFilter] = useState(minPrice);
  const [maxPriceFilter, setMaxPriceFilter] = useState(maxPrice);

  if (!visible) return null;
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPressOut={() => {
          onFilterChanged(minPriceFilter, maxPriceFilter);
          setVisible(false);
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <Text style={styles.headText}>{`Price:`}</Text>
            <Text style={styles.text1}>{`Minimum Price:`}</Text>
            <Slider
              style={styles.slider}
              minimumValue={minPrice}
              maximumValue={maxPrice}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={setMinPriceFilter}
              value={minPrice}
            />
            <Text style={styles.text1}>{`Maximum Price:`}</Text>
            <Slider
              style={styles.slider}
              minimumValue={minPrice}
              maximumValue={maxPrice}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={setMaxPriceFilter}
              value={maxPrice}
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "70%",
    borderRadius: 15,
    position: "absolute",
    top: "25%",
    flex: 1,
    backgroundColor: colors.light,
  },
  slider: {
    width: "100%",
    height: 50,
  },
  text1: {
    padding: 10,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  headText: {
    paddingTop: 15,
    fontWeight: "bold",
  },
});

export default FilterListingsModal;
