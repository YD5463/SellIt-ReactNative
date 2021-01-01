import client from "./client";

const endpoint = "/chats";

const getChats = async () => client.get(endpoint);

export default { getChats };
