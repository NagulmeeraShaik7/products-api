import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./apps/auth/routers/auth.route.mjs";
import productRouter from "./apps/products/routers/prouduct.route.mjs";
import errorMiddleware from "./middlewares/error.middleware.mjs";

// Load environment variables
dotenv.config();

/**
 * Initializes and configures the Express application.
 * @function
 */
const app = express();

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Connects to MongoDB using the provided MONGO_URI environment variable.
 * @throws {Error} If the connection fails, logs the error and exits the process.
 */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/**
 * Mounts the authentication routes under /api/auth.
 */
app.use("/api/auth", authRouter);

/**
 * Mounts the product routes under /api/products.
 */
app.use("/api/products", productRouter);

/**
 * Applies the error handling middleware to catch and process errors.
 */
app.use(errorMiddleware);

/**
 * Starts the Express server on the specified port.
 * @constant {number} PORT - The port number from environment variable or default to 5000.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});