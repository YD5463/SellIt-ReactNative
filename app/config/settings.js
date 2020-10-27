const settings = {
  dev: {
    apiUrl: "http://192.168.237.1:9000/api",
  },
  production: {
    apiUrl: "https://yad2-backend.herokuapp.com/api/",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.production;
};

export default getCurrentSettings();
