import client from "./client";
const endpoint = "/transactions";

const getUserAddress = () => client.get(`${endpoint}/adresss`);

const buy = (listingsIds) => client.post(`${endpoint}/buy`, { listingsIds });

export default { getUserAddress, buy };
