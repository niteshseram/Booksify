import asyncHandler from "express-async-handler";
import Product from "./../models/product.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
