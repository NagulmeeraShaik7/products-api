import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "../src/apps/auth/routers/auth.route.mjs";
import productRouter from "../src/apps/products/routers/prouduct.route.mjs";
import errorMiddleware from "./middlewares/error.middleware.mjs";
import setupSwagger from "./infrasructure/config/swaggerConfig.mjs";
import { APP_CONSTANTS, DESC } from "../src/infrasructure/constants/constants.mjs";
import cors from "cors";
import { CORS_ORIGINS } from "../src/infrasructure/constants/constants.mjs";

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
    [APP_CONSTANTS.MONGO_USE_NEW_URL_PARSER]: true,
    [APP_CONSTANTS.MONGO_USE_UNIFIED_TOPOLOGY]: true,
  })
  .then(() => console.log(APP_CONSTANTS.MONGO_CONNECTION_SUCCESS))
  .catch((err) => {
    console.error(APP_CONSTANTS.MONGO_CONNECTION_ERROR, err.message);
    process.exit(1);
  });

/**
 * Mounts the authentication routes under /api/auth.
 */
app.use(APP_CONSTANTS.AUTH_ROUTE_PREFIX, authRouter);

/**
 * Mounts the product routes under /api/products.
 */
app.use(APP_CONSTANTS.PRODUCT_ROUTE_PREFIX, productRouter);

/**
 * Configures Swagger UI for API documentation.
 */
setupSwagger(app);

/**
 * Applies the error handling middleware to catch and process errors.
 */
app.use(errorMiddleware);

/**
 * Starts the Express server on the specified port.
 * @constant {number} PORT - The port number from environment variable or default to 3000.
 */
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: CORS_ORIGINS,
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`${APP_CONSTANTS.SERVER_START_MESSAGE}${PORT}`);
  console.log(`${APP_CONSTANTS.SWAGGER_UI_MESSAGE}${PORT}${APP_CONSTANTS.SWAGGER_UI_PATH}`);
});