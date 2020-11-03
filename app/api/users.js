import client from "./client";

const endpoint = "/users";

const getFormData = (user_info) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(user_info)) {
    if (key === "profile_image") {
      if (value.startsWith("http")) continue;
      data.append(key, {
        name: `${user_info.name}ProfileImage.png`,
        type: "image/png",
        uri: value,
      });
      continue;
    }
    data.append(key, value);
  }
  console.log(data);
  return data;
};
const register = (userInfo) => {
  // const data = new FormData();
  // data.append("name", userInfo.name);
  // data.append("email", userInfo.email);
  // data.append("password", userInfo.password);
  // data.append("phone_number", userInfo.phone_number);
  // if (userInfo.profile_image) {
  //   data.append("profile_image", {
  //     name: `${userInfo.name}ProfileImage.jpg`,
  //     type: "image/jpg",
  //     uri: userInfo.profile_image,
  //   });
  // }
  return client.post(endpoint, getFormData(userInfo));
};

const change_password = (user_info) =>
  client.put(`${endpoint}/change_password`, {
    curr_password: user_info.current_password,
    new_password: user_info.password,
  });
const forgot_password = (email) =>
  client.put(`${endpoint}/forgot_password`, { email });

const editProfile = (user_info) =>
  client.put(`${endpoint}/edit_profile`, getFormData(user_info));

export default { register, change_password, editProfile, forgot_password };
