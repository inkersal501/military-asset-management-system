import express from "express";
import { assignmentController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware.requireRole(["admin", "commander"]),
  assignmentController.createRecord
);
router.get("/", assignmentController.fetchRecords);

export default router;
