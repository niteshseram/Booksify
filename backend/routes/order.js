import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controller/order.js";
import { isSignedIn } from "./../middleware/auth.js";

router.route("/").post(isSignedIn, addOrderItems);
router.route("/:id").get(isSignedIn, getOrderById);
router.route("/:id/pay").put(isSignedIn, updateOrderToPaid);

export default router;
