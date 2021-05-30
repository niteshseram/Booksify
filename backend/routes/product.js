import express from "express";
const router = express.Router();
import { getProductById, getProducts } from "./../controller/product.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route("/").get(getProducts);

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  Public
router.route("/:id").get(getProductById);

export default router;
