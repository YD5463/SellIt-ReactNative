import client from "./client";

const endpoint = "/user";

const getSaller = async (id) => {
  return client.get(`${endpoint}/${id}`);
};

export default { getSaller };
