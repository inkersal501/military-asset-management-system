import express from "express";
import userRoutes from "./user.route.js";
import { authMiddleware } from "../middlewares/index.js";
import purchaseRoutes from "./purchase.route.js";
import transferRoutes from "./transfer.route.js";
import assignmentRoutes from "./assignment.route.js";
import baseRoutes from "./base.route.js";
import dashboardRoutes from "./dashboard.route.js";

const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/bases", baseRoutes);

router.use(authMiddleware.verifyToken);
router.use("/api/dashboard", dashboardRoutes);
router.use("/api/purchases", purchaseRoutes);
router.use("/api/transfers", transferRoutes);
router.use("/api/assignments", assignmentRoutes);


export default router;
