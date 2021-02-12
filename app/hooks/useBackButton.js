import { useEffect } from "react";
import { BackHandler } from "react-native";

export default useBackButton = (handler) => {
  // Frustration isolated! Yay! 🎉
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handler);
    };
  }, [handler]);
};
