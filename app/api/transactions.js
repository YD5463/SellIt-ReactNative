import client from "./client";
const endpoint = "/transactions";

const buy = (listingsIds, addressId, paymentId) =>
  client.post(`${endpoint}/buy`, { listingsIds, addressId, paymentId });

const getOrderedListings = () => client.get(`${endpoint}/orderedListings`);

export default { buy, getOrderedListings };
