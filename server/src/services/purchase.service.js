import { purchaseModel } from "../models/index.js";

const addPurchaseRecord = async ({ assetType, quantity, baseId }, userId) => {
  const purchase = purchaseModel.create({
    assetType,
    quantity,
    baseId,
    createdBy: userId,
  });
  return await purchase.save();
};

const getPurchasesByBase = async (baseId) => {
  return await purchaseModel.find({ baseId }).populate("createdBy", "username");
};

const getAllPurchases = async () => {
  return await purchaseModel
    .find()
    .populate("baseId")
    .populate("createdBy", "username");
};
export default {
  addPurchaseRecord,
  getPurchasesByBase,
  getAllPurchases,
};
