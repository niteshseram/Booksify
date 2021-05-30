import express from "express";
const router = express.Router();
import { authUser } from "./../controller/user.js";

router.route("/login").post(authUser);

export default router;
