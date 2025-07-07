import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./apps/auth/routers/auth.route.mjs";
import productRouter from "./apps/products/routers/prouduct.route.mjs";
import errorMiddleware from "./middlewares/error.middleware.mjs";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
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

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

// Error handler
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
