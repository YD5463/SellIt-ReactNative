const showText = (text, maxLen) => {
  if (text.length > maxLen) {
    return `${text.slice(0, maxLen)}...`;
  }
  return text;
};

export default { showText };
