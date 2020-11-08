const settings = {
  dev: {
    apiUrl: "http://10.0.0.11:9000/api",
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
