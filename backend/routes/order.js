import express from "express";
const router = express.Router();
import { addOrderItems } from "../controller/order.js";
import { isSignedIn } from "./../middleware/auth.js";

router.route("/").post(isSignedIn, addOrderItems);

export default router;
