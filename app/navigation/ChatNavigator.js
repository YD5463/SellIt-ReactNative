import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/Chat/MessagesScreen";
import ChatsListScreen from "../screens/Chat/ChatsListScreen";
import CameraScreen from "../screens/Chat/CameraScreen";
import AudioPicker from "./../screens/Chat/AudioPicker";
import ContactScreen from "./../screens/Chat/ContactScreen";
import DocumentPickerScreen from "../screens/Chat/DocumentPickerScreen";
import ChangeBakcgroundScreen from "./../screens/Chat/ChangeBakcgroundScreen";
import BakcgroundGallery from "./../screens/Chat/BakcgroundGallery";
import BackgroundPreviewScreen from "./../screens/Chat/BackgroundPreviewScreen";
const Stack = createStackNavigator();

function ChatNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chats" component={ChatsListScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AudioList" component={AudioPicker} />
      <Stack.Screen name="ContactList" component={ContactScreen} />
      <Stack.Screen name="DocumentPicker" component={DocumentPickerScreen} />
      <Stack.Screen
        name="Custom Background"
        component={ChangeBakcgroundScreen}
      />
      <Stack.Screen name="Background Gallery" component={BakcgroundGallery} />
      <Stack.Screen name="Preview" component={BackgroundPreviewScreen} />
    </Stack.Navigator>
  );
}

export default ChatNavigator;
