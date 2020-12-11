import client from "./client";

const endpoint = "/address";

const getCountries = () => client.get(`${endpoint}/countries`);
const getStates = () => client.get(`${endpoint}/states`);
const getCities = () => client.get(`${endpoint}/cities`);

export default { getCountries, getStates, getCities };
