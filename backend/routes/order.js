import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById } from "../controller/order.js";
import { isSignedIn } from "./../middleware/auth.js";

router.route("/").post(isSignedIn, addOrderItems);
router.route("/:id").get(isSignedIn, getOrderById);

export default router;
