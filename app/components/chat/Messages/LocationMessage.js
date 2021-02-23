import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

function LocationMessage({ messageData }) {
  console.log(messageData);
  return (
    <View>
      <MapView
        image={true}
        onPress={() => console.log("pressed")}
        style={styles.map}
        initialRegion={{
          ...messageData.content,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      >
        <MapView.Marker coordinate={messageData.content} title="Location" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "95%",
    height: 150,
    margin: 7,
  },
});

export default LocationMessage;
