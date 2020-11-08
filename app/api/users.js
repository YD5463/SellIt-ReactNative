import client from "./client";

const endpoint = "/users";

const getFormData = (user_info) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(user_info)) {
    if (key === "profile_image") {
      if (typeof value === "object") continue;
      data.append(key, {
        name: `${user_info.name}ProfileImage.png`,
        type: "image/png",
        uri: value,
      });
      continue;
    }
    data.append(key, value);
  }
  return data;
};
const register = (userInfo) => {
  return client.post(endpoint, getFormData(userInfo));
};

const change_password = (user_info) =>
  client.put(`${endpoint}/change_password`, {
    curr_password: user_info.current_password,
    new_password: user_info.password,
  });
const forgot_password = (email) =>
  client.put(`${endpoint}/forgot_password`, { email });

const editProfile = (user_info) => {
  return client.put(`${endpoint}/edit_profile`, getFormData(user_info));
};

export default { register, change_password, editProfile, forgot_password };
