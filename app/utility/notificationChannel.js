import { Platform } from "react-native";
import { Notifications } from "expo";

const init = () => {
  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("success_action", {
      name: "Success Action",
      priority: "max",
      vibrate: [0, 250, 250, 250],
      sound: true,
    });
  }
};

export default { init };
