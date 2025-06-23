import express from "express";
import { transferController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post("/", 
  authMiddleware.requireRole(["admin", "logistics"]),
  transferController.createTransfer
);
router.get("/", transferController.fetchTransfers);

export default router;
