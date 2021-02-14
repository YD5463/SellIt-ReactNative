import client from "./client";

const endpoint = "/messages";

const sendListingMessage = (messageInfo) => client.post(endpoint, messageInfo);

const getMessages = async (contactId) => client.get(`${endpoint}/${contactId}`);

export default { sendListingMessage, getMessages };
