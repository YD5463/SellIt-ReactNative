import client from "./client";

const endpoint = "/checkout";

const getUserPaymentMethods = () => client.get(`${endpoint}/paymentMethods`);

const addPayemtMethods = (paymentData) =>
  client.post(`${endpoint}/addPayemtMethods`, paymentData);

const addAdresss = (address) => client.post(`${endpoint}/addAdresss`, address);

const deletePaymentMethod = (paymentId) =>
  client.put(`${endpoint}/deletePaymentMethod`);

export default {
  getUserPaymentMethods,
  addPayemtMethods,
  addAdresss,
  deletePaymentMethod,
};
