import client from "./client";

const endpoint = "/auth";

const login = (email, password) => client.post(endpoint, { email, password });

const userLeftApp = () => client.put(`${endpoint}/userLeft`);

const getUserActivity = () => client.get(`${endpoint}/activity`);

const validateEmail = (code) =>
  client.post(`${endpoint}/validate_email`, { code });

const resendValidationCode = () =>
  client.get(`${endpoint}/send_velidation_code`);

export default {
  login,
  userLeftApp,
  getUserActivity,
  validateEmail,
  resendValidationCode,
};
