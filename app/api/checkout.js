import client from "./client";

const endpoint = "/checkout";

const getUserPaymentMethods = () => client.get(`${endpoint}/paymentMethods`);

export default { getUserPaymentMethods };
