import client from "./client";

const endpoint = "/checkout";

const getUserPaymentMethods = () => client.get(`${endpoint}/paymentMethods`);

const getUserAddress = () => client.get(`${endpoint}/adresss`);

const addPayemtMethods = (paymentData) => {
  const expired_date = paymentData.expired_date.split("/");
  delete paymentData.expired_date;
  paymentData.expireMonth = expired_date[0];
  paymentData.expireYear = expired_date[1];
  // console.log(paymentData);
  return client.post(`${endpoint}/addPayemtMethods`, paymentData);
};

const addAdresss = (address) => client.post(`${endpoint}/addAddress`, address);

const deletePaymentMethod = (paymentId) =>
  client.put(`${endpoint}/deletePaymentMethod`, { paymentId });

const deleteAddress = (addressId) =>
  client.put(`${endpoint}/deleteAddress`, { addressId });

export default {
  getUserPaymentMethods,
  addPayemtMethods,
  getUserAddress,
  addAdresss,
  deletePaymentMethod,
  deleteAddress,
};
