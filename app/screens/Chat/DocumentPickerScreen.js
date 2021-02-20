import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";

function DocumentPickerScreen({ sendDocument }) {
  const [documents, setDocuments] = useState([]);

  const init = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      const doc = await DocumentPicker.getDocumentAsync();
      console.log(doc.name);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        keyExtractor={(doc) => doc.uri}
        renderItem={({ item }) => <View></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DocumentPickerScreen;
