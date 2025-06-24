import config from "./config";
import axios from "axios";

const assignAsset = async (data, token) => {
  const res = await axios.post(`${config.apiEndpoint}/assignments`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getAssignments = async (token) => {
  const res = await axios.get(`${config.apiEndpoint}/assignments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export { assignAsset, getAssignments };
