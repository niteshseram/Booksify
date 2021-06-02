import express from "express";
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from "./../controller/user.js";
import { isAdmin, isSignedIn } from "./../middleware/auth.js";

router.route("/").post(registerUser).get(isSignedIn, isAdmin, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(isSignedIn, getUserProfile)
  .put(isSignedIn, updateUserProfile);

router.route("/:id").delete(isSignedIn, isAdmin, deleteUser);

export default router;
