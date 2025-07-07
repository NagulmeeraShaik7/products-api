import jwt from "jsonwebtoken";
import { AUTH_CONSTANTS } from "../infrasructure/constants/constants.mjs";

/**
 * Middleware to authenticate requests using JWT.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void} Calls the next middleware if authentication is successful, otherwise responds with an error.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith(AUTH_CONSTANTS.BEARER_PREFIX)) {
    return res.status(401).json({ error: AUTH_CONSTANTS.TOKEN_MISSING_ERROR });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: AUTH_CONSTANTS.TOKEN_INVALID_ERROR });
  }
};

export default authMiddleware;