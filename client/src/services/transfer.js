import config from "./config";
import axios from "axios";

const addTransfer = async (data, token) => {
  const res = await axios.post(`${config.apiEndpoint}/transfers`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getTransfers = async (token) => {
  const res = await axios.get(`${config.apiEndpoint}/transfers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export { addTransfer, getTransfers };
