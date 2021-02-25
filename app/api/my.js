import client from "./client";

const endpoint = "/my";

const getMyListings = async () => client.get(`${endpoint}/listings`);

const getBackgrounds = () => {
  const lightCount = 14;
  const darkCount = 12;
  const lightImages = [];
  const darkImages = [];
  const serverUri = "http://192.168.68.112:9000";
  for (let i = 1; i <= lightCount; i++)
    lightImages.push(`${serverUri}/assets/light/${i}.jpg`);
  for (let i = 1; i <= darkCount; i++)
    darkImages.push(`${serverUri}/assets/dark/${i}.jpg`);
  const colors = [
    "#00FD98",
    "#93DBBE",
    "#00FFE6",
    "#00DEFF",
    "#00ABFF",
    "#CFBCE5",
    "#9A68D2",
    "#EFD969",
    "#F6F68B",
    "#FF3333",
    "#E15050",
    "#F68B8B",
    "#6F5A5A",
    "#FF9100",
    "#771414",
    "#00BCFF",
    "#2C47CE",
    "#76B59A",
    "#656565",
    "#000000",
    "#FFFFA1",
    "#C6C6A8",
    "#C7CCCD",
  ];
  return { light: lightImages, dark: darkImages, colors };
};
export default { getMyListings, getBackgrounds };
