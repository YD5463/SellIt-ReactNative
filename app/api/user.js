import client from "./client";

const endpoint = "/user";

const getSaller = (id) => {
  return client.get(`${endpoint}/${id}`);
};

const getUpdatedUser = () => client.get(endpoint);

const getUserAddress = () => client.get(`${endpoint}/adresss`);

const getUserPaymentMethods = () => client.get(`${endpoint}/payemtMethods`);

export default {
  getSaller,
  getUpdatedUser,
  getUserAddress,
  getUserPaymentMethods,
};
