import client from "./client";

const endpoint = "/users";

const register = (userInfo) => {
  const data = new FormData();
  data.append("name", userInfo.name);
  data.append("email", userInfo.email);
  data.append("password", userInfo.password);
  data.append("phone_number", userInfo.phone_number);

  if (userInfo.profile_image) {
    data.append("profile_image", {
      name: `${userInfo.name}ProfileImage.jpg`,
      type: "image/jpg",
      uri: userInfo.profile_image,
    });
  }

  return client.post(endpoint, data);
};

const change_password = (user_info) =>
  client.put(`${endpoint}/change_password`, {
    curr_password: user_info.current_password,
    new_password: user_info.password,
  });

const editProfile = (user_info) =>
  client.put(`${endpoint}/edit_profile`, user_info);

export default { register, change_password, editProfile };
