import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Text from "../../Text";
import PickedSign from "../ReusableIcons/PickedSign";
import DefualtUserImage from "../ReusableIcons/DefualtUserImage";

const imageSize = 50;

function ContactItem({ contactData, addItem, removeItem }) {
  const [isPicked, setIspicked] = useState(false);
  const onPress = () => {
    isPicked ? removeItem() : addItem();
    setIspicked(!isPicked);
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.main}>
        <View>
          {contactData.imageAvailable ? <Image /> : <DefualtUserImage />}
          {isPicked && <PickedSign />}
        </View>
        <View style={styles.container}>
          <Text style={styles.name}>{contactData.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 15,
    flexDirection: "row",
  },
  container: {
    padding: 10,
  },
  name: {
    alignSelf: "flex-start",
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
});

export default ContactItem;
