import { transferService } from "../services/index.js";

const createTransfer = async (req, res) => {
  try {
    const result = await transferService.createTransferRecord(req.body, req.user.id);
    res.status(201).json({ message: "Transfer successful", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const fetchTransfers = async (req, res) => {
  try {
    const data =
      req.user.role === "admin"
        ? await transferService.getAllTransfers()
        : await transferService.getTransfersByBase(req.user.baseId);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { createTransfer, fetchTransfers };
