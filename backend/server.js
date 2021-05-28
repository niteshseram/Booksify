import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/error.js";

//import routes
import productRoutes from "./routes/product.js";

dotenv.config();

connectDB();

const app = express();

//routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

// middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow
      .bold
  )
);
