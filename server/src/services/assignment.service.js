import { assignmentModel } from "../models/index.js";

const addAssignmentOrExpenditure = async (data, userId) => {
  const record = assignmentModel.create({
    ...data,
    recordedBy: userId,
  });
  return record;
};

const getAllAssignments = async () => {
  return await assignmentModel
    .find()
    .populate("baseId", "name")
    .populate("recordedBy", "username");
};

const getAssignmentsByBase = async (baseId) => {
  return await assignmentModel
    .find({ baseId })
    .populate("baseId", "name")
    .populate("recordedBy", "username");
};

export default { addAssignmentOrExpenditure, getAllAssignments, getAssignmentsByBase };