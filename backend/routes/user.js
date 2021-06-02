import express from "express";
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "./../controller/user.js";
import { isAdmin, isSignedIn } from "./../middleware/auth.js";

router.route("/").post(registerUser).get(isSignedIn, isAdmin, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(isSignedIn, getUserProfile)
  .put(isSignedIn, updateUserProfile);

router
  .route("/:id")
  .delete(isSignedIn, isAdmin, deleteUser)
  .get(isSignedIn, isAdmin, getUserById)
  .put(isSignedIn, isAdmin, updateUser);

export default router;
