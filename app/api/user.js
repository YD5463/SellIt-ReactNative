import client from "./client";

const endpoint = "/user";

const getSaller = (id) => {
  return client.get(`${endpoint}/${id}`);
};

const getUpdatedUser = () => client.get(endpoint);

export default { getSaller, getUpdatedUser };
