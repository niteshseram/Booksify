import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
} from "./../controller/user.js";
import { isSignedIn } from "./../middleware/auth.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(isSignedIn, getUserProfile);

export default router;
