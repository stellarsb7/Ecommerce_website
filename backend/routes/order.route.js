import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getOrders } from "../controllers/order.controller.js";

const router = express.Router();

// Get orders for the logged-in user
router.get("/", protectRoute, getOrders);

export default router;
