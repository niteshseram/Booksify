import express from "express";
const router = express.Router();
import { authUser, getUserProfile } from "./../controller/user.js";
import { isSignedIn } from "./../middleware/auth.js";

router.route("/login").post(authUser);
router.route("/profile").get(isSignedIn, getUserProfile);

export default router;
