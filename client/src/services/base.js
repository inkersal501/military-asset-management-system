import config from "./config";
import axios from "axios";

const getBases = async () => {
  const res = await axios.get(`${config.apiEndpoint}/bases`);
  return res.data;
};
export { getBases };