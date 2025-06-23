import express from "express";
import { baseController } from "../controllers/index.js";

const router = express.Router();
router.get("/", baseController.fetchBases);

export default router;
