import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controller/order.js";
import { isSignedIn, isAdmin } from "./../middleware/auth.js";

router
  .route("/")
  .post(isSignedIn, addOrderItems)
  .get(isSignedIn, isAdmin, getOrders);
router.route("/myorders").get(isSignedIn, getMyOrders);
router.route("/:id").get(isSignedIn, getOrderById);
router.route("/:id/pay").put(isSignedIn, updateOrderToPaid);
router.route("/:id/deliver").put(isSignedIn, isAdmin, updateOrderToDelivered);

export default router;
