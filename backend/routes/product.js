import express from "express";
const router = express.Router();
import {
  deleteProduct,
  getProductById,
  getProducts,
} from "./../controller/product.js";
import { isAdmin, isSignedIn } from "./../middleware/auth.js";

router.route("/").get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(isSignedIn, isAdmin, deleteProduct);

export default router;
