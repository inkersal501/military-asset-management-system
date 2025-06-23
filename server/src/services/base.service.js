import { baseModel } from "../models/index.js";

const getAllBases = async () => {
  return await baseModel.find().sort({ name: 1 });
};

export default { getAllBases };
