import { transferModel } from "../models/index.js";

const createTransferRecord = async ( { assetType, quantity, fromBase, toBase }, userId) => {
  const transfer = transferModel.create({
    assetType,
    quantity,
    fromBase,
    toBase,
    transferredBy: userId,
  });
  return await transfer.save();
};

const getAllTransfers = async () => {
  return await transferModel
    .find()
    .populate("fromBase")
    .populate("toBase")
    .populate("transferredBy", "username");
};

const getTransfersByBase = async (baseId) => {
  return await transferModel
    .find({
      $or: [{ fromBase: baseId }, { toBase: baseId }],
    })
    .populate("fromBase toBase transferredBy", "name username");
};

export default { createTransferRecord, getAllTransfers, getTransfersByBase };
