import config from "./config";
import axios from "axios";

const getPurchases = async (token) => {
  const res = await axios.get(`${config.apiEndpoint}/purchases`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const addPurchase = async (data, token) => {
  const res = await axios.post(`${config.apiEndpoint}/purchases`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export { getPurchases, addPurchase };
