import express from "express";
import { purchaseController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post("/", 
  authMiddleware.requireRole(["admin", "logistics"]),
  purchaseController.createPurchase
);
router.get("/", purchaseController.fetchPurchases);

export default router;
