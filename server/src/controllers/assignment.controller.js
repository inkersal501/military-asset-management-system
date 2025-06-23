import { assignmentService } from "../services/index.js";

const createRecord = async (req, res) => {
  try {
    const record = await assignmentService.addAssignmentOrExpenditure(
      req.body,
      req.user.id
    );
    res.status(201).json({ message: "Asset recorded successfully", record });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const fetchRecords = async (req, res) => {
  try {
    const data =
      req.user.role === "admin"
        ? await assignmentService.getAllAssignments()
        : await assignmentService.getAssignmentsByBase(req.user.baseId);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { createRecord, fetchRecords };
