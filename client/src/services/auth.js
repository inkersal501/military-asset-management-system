import config from "./config";
import axios from "axios";

const loginUser = async (email, password) => {
  const res = await axios.post(`${config.apiEndpoint}/users/login`, {
    email,
    password,
  });
  return res.data;
};

const registerUser = async (data) => {
  const res = await axios.post(`${config.apiEndpoint}/users/signup`, data);
  return res.data;
};

export { loginUser, registerUser };
