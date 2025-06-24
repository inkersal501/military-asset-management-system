import { dashboardService } from "../services/index.js";

const getMetrics = async (req, res) => {
  try {
    const baseId = req.query.baseId || req.user.baseId;
    const date = req.query.date || new Date();

    const data = await dashboardService.getDashboardMetrics(baseId, date);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {getMetrics};