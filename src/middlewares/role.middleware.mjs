/**
 * Middleware factory to restrict access based on user role.
 * @param {string} requiredRole - The role required to access the route (e.g., "admin", "customer").
 * @returns {Function} Middleware function to check user role.
 */
const roleMiddleware = (requiredRole) => {
  /**
   * Middleware to verify if the authenticated user has the required role.
   * @param {Object} req - The HTTP request object, expected to contain user data from auth middleware.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {void} Calls the next middleware if the user has the required role, otherwise responds with a 403 error.
   */
  return (req, res, next) => {
    if (req.user?.role !== requiredRole) {
      return res.status(403).json({ error: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

export default roleMiddleware;