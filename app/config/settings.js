const cacheKeys = { CartCacheKey: "MyCart", ChatBackground: "ChatBackground" };

const settings = {
  dev: {
    apiUrl: "http://192.168.68.101:9000/api",
    ...cacheKeys,
  },
  production: {
    apiUrl: "https://yad2-backend.herokuapp.com/api/",
    ...cacheKeys,
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.production;
};

export default getCurrentSettings();
