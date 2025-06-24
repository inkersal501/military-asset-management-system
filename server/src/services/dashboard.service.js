import {
  purchaseModel,
  transferModel,
  assignmentModel,
} from "../models/index.js";

const getDashboardMetrics = async (baseId, date) => {
  const queryDate = new Date(date);
  const beforeDate = new Date(queryDate);
  beforeDate.setHours(0, 0, 0, 0);

  //   Opening Purchases
  const openingPurchases = await purchaseModel.aggregate([
    { $match: { baseId, date: { $lt: beforeDate } } },
    { $group: { _id: "$assetType", total: { $sum: "$quantity" } } },
  ]);

  //   Opening Transfers IN
  const openingIn = await transferModel.aggregate([
    { $match: { toBaseId: baseId, date: { $lt: beforeDate } } },
    { $group: { _id: "$assetType", total: { $sum: "$quantity" } } },
  ]);

  //   Opening Transfers OUT
  const openingOut = await transferModel.aggregate([
    { $match: { fromBaseId: baseId, date: { $lt: beforeDate } } },
    { $group: { _id: "$assetType", total: { $sum: "$quantity" } } },
  ]);

  //   Assigned + Expended
  const assignments = await assignmentModel.aggregate([
    { $match: { baseId, date: { $lt: beforeDate } } },
    {
      $group: {
        _id: { assetType: "$assetType", type: "$type" },
        total: { $sum: "$quantity" },
      },
    },
  ]);

    const formatGroup = (groupArr) => {
        const map = {};
        groupArr.forEach((g) => {
            map[g._id] = g.total;
        });
        return map;
    };

    return {
        opening: {
            purchases: formatGroup(openingPurchases),
            transferIn: formatGroup(openingIn),
            transferOut: formatGroup(openingOut),
            assignments: formatGroup(assignments),
        },
    };
};

export default {getDashboardMetrics};