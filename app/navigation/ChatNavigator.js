import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "./../screens/MessagesScreen";
import ChatsListScreen from "./../screens/ChatsListScreen";
import CameraScreen from "./../screens/CameraScreen";
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
    </Stack.Navigator>
  );
}

export default ChatNavigator;
