import client from "./client";
const endpoint = "/transactions";

const buy = (details, onUploadProgress) =>
  client.post(`${endpoint}/buy`, details, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });

const getOrderedListings = () => client.get(`${endpoint}/orderedListings`);

export default { buy, getOrderedListings };
