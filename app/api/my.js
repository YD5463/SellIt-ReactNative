import client from "./client";

const endpoint = "/my";

const getMyListings = async () => client.get(`${endpoint}/listings`);

export default { getMyListings };
