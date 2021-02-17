const showText = (text, maxLen) => {
  if (text.length > maxLen) {
    return `${text.slice(0, maxLen)}...`;
  }
  return text;
};

const dispalyTimeFromSeconds = (recordingTime) =>
  `${String(Math.round(recordingTime / 60)).padStart(2, "0")}:${String(
    Math.round(recordingTime % 60)
  ).padStart(2, "0")}`;

const imageUriFromBase64 = (photo) => `data:image/jpg;base64,${photo.base64}`; //todo:check image Format(jpg,png...)

export default { showText, dispalyTimeFromSeconds };
