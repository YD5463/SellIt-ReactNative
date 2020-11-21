const settings = {
  dev: {
    apiUrl: "http://192.168.68.101:9000/api",
    CartCacheKey: "MyCart",
  },
  production: {
    apiUrl: "https://yad2-backend.herokuapp.com/api/",
    CartCacheKey: "MyCart",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.production;
};

export default getCurrentSettings();
