import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/Chat/MessagesScreen";
import ChatsListScreen from "../screens/Chat/ChatsListScreen";
import CameraScreen from "../screens/Chat/CameraScreen";
import AudioPicker from "./../screens/Chat/AudioPicker";
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
    </Stack.Navigator>
  );
}

export default ChatNavigator;
