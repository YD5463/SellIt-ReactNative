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
import routes from "./routes";
const Stack = createStackNavigator();

function ChatNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.CHATS} component={ChatsListScreen} />
      <Stack.Screen name={routes.MESSAGES} component={MessagesScreen} />
      <Stack.Screen
        name={routes.CAMERA}
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={routes.AUDIO_PICKER} component={AudioPicker} />
      <Stack.Screen name={routes.CONTACTS_LIST} component={ContactScreen} />
      <Stack.Screen
        name={routes.DOCUMENT_PICKER}
        component={DocumentPickerScreen}
      />
      <Stack.Screen
        name={routes.CHANGE_BACKGROUND}
        component={ChangeBakcgroundScreen}
      />
      <Stack.Screen
        name={routes.BACKFROUND_GALLERY}
        component={BakcgroundGallery}
      />
      <Stack.Screen
        name={routes.BACKGROUND_PREVIEW}
        component={BackgroundPreviewScreen}
      />
    </Stack.Navigator>
  );
}

export default ChatNavigator;
