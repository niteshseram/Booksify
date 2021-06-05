import express from "express";
const router = express.Router();
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "./../controller/product.js";
import { isAdmin, isSignedIn } from "./../middleware/auth.js";

router.route("/").get(getProducts).post(isSignedIn, isAdmin, createProduct);
router.route("/:id/reviews").post(isSignedIn, createProductReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(isSignedIn, isAdmin, deleteProduct)
  .put(isSignedIn, isAdmin, updateProduct);

export default router;
