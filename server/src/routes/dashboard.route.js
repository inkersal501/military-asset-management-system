import express from "express";
import { dashboardController } from "../controllers/index.js"; 

const router = express.Router();
router.post("/", dashboardController.getMetrics);

export default router;
