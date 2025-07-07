import { ERROR_CONSTANTS } from "../infrasructure/constants/constants.mjs";

/**
 * Middleware to handle errors in the application.
 * @param {Error} err - The error object.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void} Responds with a JSON error message and a 500 status code.
 */
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || ERROR_CONSTANTS.DEFAULT_ERROR_MESSAGE,
  });
};

export default errorMiddleware;