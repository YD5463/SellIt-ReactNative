import client from "./client";

const endpoint = "/messages";

const sendListingMessage = (messageInfo) => client.post(endpoint, messageInfo);

const getMessages = () => {
  return client.get(endpoint);
};
export default { sendListingMessage, getMessages };
