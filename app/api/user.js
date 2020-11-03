import client from "./client";

const endpoint = "/user";

const getSaller = (id) => {
  console.log("saller");
  return client.get(`${endpoint}/${id}`);
};

const getUpdatedUser = () => client.get(endpoint);

export default { getSaller, getUpdatedUser };
