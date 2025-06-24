import config from "./config";
import axios from "axios";

const getDashboardStats = async (filters, token) => {
  const res = await axios.post(`${config.apiEndpoint}/dashboard`, filters, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export { getDashboardStats };
