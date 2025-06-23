import { baseService } from "../services/index.js";

const fetchBases = async (req, res) => {
  try {
    const bases = await baseService.getAllBases();
    res.json(bases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default { fetchBases };
