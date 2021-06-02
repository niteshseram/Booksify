import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controller/order.js";
import { isSignedIn } from "./../middleware/auth.js";

router.route("/").post(isSignedIn, addOrderItems);
router.route("/myorders").get(isSignedIn, getMyOrders);
router.route("/:id").get(isSignedIn, getOrderById);
router.route("/:id/pay").put(isSignedIn, updateOrderToPaid);

export default router;
