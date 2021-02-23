import * as Location from "expo-location";

const getLocation = async () => {
  try {
    const { granted } = await Location.requestPermissionsAsync();
    if (!granted) return null;
    const { coords } = await Location.getLastKnownPositionAsync();
    return coords;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default { getLocation };
