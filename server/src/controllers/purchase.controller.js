import { purchaseService } from "../services/index.js";

const createPurchase = async (req, res) => {
  try {
    const result = await purchaseService.addPurchaseRecord(
      req.body,
      req.user.id
    );
    res.status(201).json({ message: "Purchase recorded", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const fetchPurchases = async (req, res) => {
  try {
    const data =
      req.user.role === "admin"
        ? await purchaseService.getAllPurchases()
        : await purchaseService.getPurchasesByBase(req.user.baseId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { createPurchase, fetchPurchases };
