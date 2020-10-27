import client from "./client";

const endpoint = "/categories";

const getCategories = async () => client.get(endpoint);

export default { getCategories };
